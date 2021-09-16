package de.lowani.backend.controller;

import de.lowani.backend.api.Category;
import de.lowani.backend.api.User;
import de.lowani.backend.config.JwtConfig;
import de.lowani.backend.entities.CategoryEntity;
import de.lowani.backend.repo.CategoryRepo;
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
import static org.hamcrest.Matchers.is;

@SpringBootTest(
        properties = "spring.profiles.active:h2",
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class CategoryControllerTest {

    @LocalServerPort
    private int port;

    private String url(){
        return "http://localhost:" + port + "/category";
    }

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private JwtConfig jwtConfig;

    @Autowired
    private CategoryRepo categoryRepo;

    @AfterEach
    public void clearRepo(){
        categoryRepo.deleteAll();
    }

    @BeforeEach
    public void fillDB(){

        CategoryEntity category1 = CategoryEntity.builder()
                .name("Bar")
                .build();
        categoryRepo.save(category1);

        CategoryEntity category2 = CategoryEntity.builder()
                .name("Küche")
                .build();
        categoryRepo.save(category2);

        CategoryEntity category3 = CategoryEntity.builder()
                .name("Service")
                .build();
        categoryRepo.save(category3);
    }

    @Test
    public void getAllCategoriesShouldReturnAll(){

        //GiVEN
        int amountOfCategories = 3;
        //WHEN
        HttpEntity<Void> httpEntity = new HttpEntity<>(authorizedHeader("Bernd", "admin"));
        ResponseEntity<List<Category>> response = restTemplate
                .exchange(url(), HttpMethod.GET, httpEntity, new ParameterizedTypeReference<List<Category>>(){});
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        List<Category> responseBody= response.getBody();
        assertThat(responseBody.size(), is(amountOfCategories));
        assertThat(responseBody.get(1).getCategory(), is("Küche"));
    }

    @Test
    public void postNewCategoryAsUserNotPossible(){

        //GiVEN
        Category categoryToAdd = Category.builder().category("HSK").build();
        //WHEN
        HttpEntity<Category> httpEntity = new HttpEntity<>(categoryToAdd,authorizedHeader("Bernd", "user"));
        ResponseEntity<Category> response = restTemplate
                .exchange(url()+"/new", HttpMethod.POST, httpEntity, Category.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.UNAUTHORIZED));
    }

    @Test
    public void postNewCategoryAsUAdminPossible(){

        //GiVEN
        Category categoryToAdd = Category.builder().category("HSK").build();
        //WHEN
        HttpEntity<Category> httpEntity = new HttpEntity<>(categoryToAdd,authorizedHeader("Bernd", "admin"));
        ResponseEntity<Category> response = restTemplate
                .exchange(url()+"/new", HttpMethod.POST, httpEntity, Category.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        Category responseBody= response.getBody();
        assertThat(responseBody.getCategory(), is("HSK"));

    }

    @Test
    public void postNewCategoryWithEmptyNotPossible(){

        //GiVEN
        Category categoryToAdd = Category.builder().category("").build();
        //WHEN
        HttpEntity<Category> httpEntity = new HttpEntity<>(categoryToAdd,authorizedHeader("Bernd", "admin"));
        ResponseEntity<Category> response = restTemplate
                .exchange(url()+"/new", HttpMethod.POST, httpEntity, Category.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
    }

    @Test
    public void postNewCategoryThatAlreadyExistsNotPossible(){

        //GiVEN
        Category categoryToAdd = Category.builder().category("Bar").build();
        //WHEN
        HttpEntity<Category> httpEntity = new HttpEntity<>(categoryToAdd,authorizedHeader("Bernd", "admin"));
        ResponseEntity<Category> response = restTemplate
                .exchange(url()+"/new", HttpMethod.POST, httpEntity, Category.class);
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