package de.lowani.backend.controller;

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
import org.springframework.http.HttpHeaders;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest(
        properties = "spring.profiles.active:h2",
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class UserControllerTest {

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

    }


    @Test
    public void createNewUserAsAdmin(){

    }

    @Test
    public void createNewUserAsUserShouldFail(){

    }

    @Test
    public void createNewUserAsAdminWithNullShouldFail(){

    }

    @Test
    public void getAllUsersShouldReturnAllUsers(){

    }

    @Test
    public void userCanChangeHerPassword(){

    }

    @Test
    public void userCanChangeHerName(){

    }

    @Test
    public void userCanNotChangeHerNameIfItAlreadyExists(){

    }

    @Test
    public void adminCanResetAUsersPassword(){

    }

    @Test
    public void testOnlyAdminCanResetAUsersPassword(){

    }

    @Test
    public void aUserCanNotDeleteAnyUser(){

    }

    @Test
    public void adminCanDeleteAnyUser(){

    }

    @Test
    public void adminCanNotDeleteHerself(){

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