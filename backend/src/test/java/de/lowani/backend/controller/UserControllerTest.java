package de.lowani.backend.controller;

import de.lowani.backend.api.NewPassword;
import de.lowani.backend.api.NewUsername;
import de.lowani.backend.api.User;
import de.lowani.backend.config.JwtConfig;
import de.lowani.backend.entities.UserEntity;
import de.lowani.backend.repo.UserRepo;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;


@SpringBootTest(
        properties = "spring.profiles.active:h2",
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class UserControllerTest{

    @LocalServerPort
    private int port;

    private String url(){
        return "http://localhost:" + port + "/user";
    }

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private JwtConfig jwtConfig;

    @Autowired
    private UserRepo userRepo;

    @AfterEach
    public void clearUserRepo(){
        userRepo.deleteAll();
    }

    @BeforeEach
    public void fillDB(){

        UserEntity user1 = UserEntity.builder()
                .name("Thomas")
                .password("$2a$10$mqED7roIDLFqR.z0QINQBeX0pb/oHneV4eCH4en1Onu4QskRdyK7C").score(0L).role("admin")
                .build();
        userRepo.save(user1);

        UserEntity user2 = UserEntity.builder()
                .name("Kim")
                .password("$2a$10$8UcrltuoyBbi4jMZHUo2r.VVoVK3SI5.T92s9VVr0gzQuhdxo0Mgy").score(0L).role("user")
                .build();
        userRepo.save(user2);

        UserEntity user3 = UserEntity.builder()
                .name("Peter")
                .password("blubblub").score(0L).role("user")
                .build();
        userRepo.save(user3);
    }


    @Test
    public void getAllUsersShouldReturnAllUsers(){
        //GiVEN
        int amountOfUsers = 3;
        //WHEN
        HttpEntity<Void> httpEntity = new HttpEntity<>(authorizedHeader("Bernd", "admin"));
        ResponseEntity<List<User>> response = restTemplate
                .exchange(url(), HttpMethod.GET, httpEntity, new ParameterizedTypeReference<List<User>>(){});
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        List<User> responseBody= response.getBody();
        assertThat(responseBody.size(), is(amountOfUsers));
        assertThat(responseBody.get(1).getName(), is("Kim"));
    }

    @Test
    public void createNewUserAsAdmin(){
        //GiVEN
        User userToAdd = User.builder().name("Fritz").build();
        //WHEN
        HttpEntity<User> httpEntity = new HttpEntity<>(userToAdd, authorizedHeader("Bernd", "admin"));
        ResponseEntity<User> response = restTemplate
                .exchange(url()+"/new", HttpMethod.POST, httpEntity, User.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().getName(), is("Fritz"));
        assertThat(response.getBody().getScore(), is(0));
        assertThat(response.getBody().getRole(), is("user"));
        UserEntity addedUser = userRepo.findByName("Fritz").orElseThrow();
        assertThat(addedUser.getScore(), is(0));
    }

    @Test
    public void createNewUserAsUserShouldFail(){
        //GiVEN
        User userToAdd = User.builder().name("Fritz").build();
        //WHEN
        HttpEntity<User> httpEntity = new HttpEntity<>(userToAdd, authorizedHeader("Kim", "user"));
        ResponseEntity<User> response = restTemplate
                .exchange(url()+"/new", HttpMethod.POST, httpEntity, User.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.UNAUTHORIZED));
    }

    @Test
    public void createNewUserAsAdminWithNullShouldFail(){
        //GiVEN
        User userToAdd = User.builder().name(null).build();
        //WHEN
        HttpEntity<User> httpEntity = new HttpEntity<>(userToAdd,authorizedHeader("Bernd", "admin"));
        ResponseEntity<User> response = restTemplate
                .exchange(url()+"/new", HttpMethod.POST, httpEntity, User.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
    }

    @Test
    public void userCanChangeHerPassword(){
        //GiVEN
        NewPassword newPassword = NewPassword.builder().password("blub").build();
        //WHEN
        HttpEntity<NewPassword> httpEntity = new HttpEntity<>(newPassword,authorizedHeader("Kim", "user"));
        ResponseEntity<User> response = restTemplate
                .exchange(url()+"/password", HttpMethod.PUT, httpEntity, User.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        User changedUser = response.getBody();
        assertThat(changedUser.getName(), is("Kim"));
        assertThat(changedUser.getPassword(), is("blub"));
        UserEntity addedUser = userRepo.findByName("Kim").orElseThrow();
        assertThat(addedUser.getPassword(), not("$2a$10$8UcrltuoyBbi4jMZHUo2r.VVoVK3SI5.T92s9VVr0gzQuhdxo0Mgy"));
    }

    @Test
    public void userCanChangeHerName(){
        //GiVEN
        NewUsername newUsername = NewUsername.builder().username("Kimchi").build();
        //WHEN
        HttpEntity<NewUsername> httpEntity = new HttpEntity<>(newUsername,authorizedHeader("Kim", "user"));
        ResponseEntity<User> response = restTemplate
                .exchange(url()+"/username", HttpMethod.PUT, httpEntity, User.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        User changedUser = response.getBody();
        assertThat(changedUser.getName(), is("Kimchi"));
        assertThat(changedUser.getPassword(), is("$2a$10$8UcrltuoyBbi4jMZHUo2r.VVoVK3SI5.T92s9VVr0gzQuhdxo0Mgy"));
        UserEntity addedUser = userRepo.findByName("Kimchi").orElseThrow();
        assertThat(addedUser.getPassword(), not("nur zum testen ob in db"));
    }

    @Test
    public void userCanNotChangeHerNameIfItAlreadyExists(){
        //GiVEN
        NewUsername newUsername = NewUsername.builder().username("Thomas").build();
        //WHEN
        HttpEntity<NewUsername> httpEntity = new HttpEntity<>(newUsername,authorizedHeader("Kim", "user"));
        ResponseEntity<User> response = restTemplate
                .exchange(url()+"/username", HttpMethod.PUT, httpEntity, User.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.CONFLICT));
        UserEntity addedUser = userRepo.findByName("Kim").orElseThrow();
        assertThat(addedUser.getPassword(), not("nur zum testen ob in db"));

    }

    @Test
    public void adminCanResetAUsersPassword(){
        //GiVEN

        //WHEN
        HttpEntity<Void> httpEntity = new HttpEntity<>(authorizedHeader("Thomas","admin"));
        ResponseEntity<User> response = restTemplate
                .exchange(url()+"/Kim/reset-pw",HttpMethod.PUT,httpEntity,User.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        User changedUser = response.getBody();
        assertThat(changedUser.getName(), is("Kim"));
        UserEntity passwordChangedUser = userRepo.findByName("Kim").orElseThrow();
        assertThat(passwordChangedUser.getPassword(), not("$2a$10$8UcrltuoyBbi4jMZHUo2r.VVoVK3SI5.T92s9VVr0gzQuhdxo0Mgy"));
    }

    @Test
    public void testOnlyAdminCanResetAUsersPassword(){
        //GiVEN

        //WHEN
        HttpEntity<Void> httpEntity = new HttpEntity<>(authorizedHeader("Kim","user"));
        ResponseEntity<User> response = restTemplate
                .exchange(url()+"/Peter/reset-pw",HttpMethod.PUT,httpEntity,User.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.UNAUTHORIZED));
        UserEntity passwordChangedUser = userRepo.findByName("Thomas").orElseThrow();
        assertThat(passwordChangedUser.getPassword(), not("$2a$10$mqED7roIDLFqR.z0QINQBeX0pb/oHneV4eCH4en1Onu4QskRdyK7C"));
    }

    @Test
    public void aUserCanNotDeleteAnyUser(){
        //GiVEN

        //WHEN
        HttpEntity<Void> httpEntity = new HttpEntity<>(authorizedHeader("Kim","user"));
        ResponseEntity<User> response = restTemplate
                .exchange(url()+"/Peter",HttpMethod.DELETE,httpEntity,User.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.UNAUTHORIZED));
    }

    @Test
    public void adminCanDeleteAnyUser(){
        //GiVEN

        //WHEN
        HttpEntity<Void> httpEntity = new HttpEntity<>(authorizedHeader("Thomas","admin"));
        ResponseEntity<User> response = restTemplate
                .exchange(url()+"/Peter",HttpMethod.DELETE,httpEntity,User.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().getName(), is("Peter"));
        List<UserEntity> allUsers = userRepo.findAll();
        assertThat(allUsers.size(), is(2));
    }

    @Test
    public void adminCanNotDeleteUserNotFound(){
        //GiVEN

        //WHEN
        HttpEntity<Void> httpEntity = new HttpEntity<>(authorizedHeader("Thomas","admin"));
        ResponseEntity<User> response = restTemplate
                .exchange(url()+"/Armin",HttpMethod.DELETE,httpEntity,User.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
    }

    @Test
    public void adminCanNotDeleteHerself(){
        //GiVEN

        //WHEN
        HttpEntity<Void> httpEntity = new HttpEntity<>(authorizedHeader("Thomas","admin"));
        ResponseEntity<User> response = restTemplate
                .exchange(url()+"/Thomas",HttpMethod.DELETE,httpEntity,User.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.CONFLICT));
    }

    // Hilfsfunktionen

    private HttpHeaders authorizedHeader(String username, String role){
        Map<String,Object> claims = new HashMap<>();
        claims.put("role", role);
        Instant now = Instant.now();
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofHours(jwtConfig.getExpiresAfterHours())));
        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(iat)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecret())
                .compact();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        return headers;
    }

}