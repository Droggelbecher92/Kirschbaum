package de.lowani.backend.controller;

import de.lowani.backend.api.Category;
import de.lowani.backend.api.Topic;
import de.lowani.backend.config.JwtConfig;
import de.lowani.backend.entities.CategoryEntity;
import de.lowani.backend.entities.TopicEntity;
import de.lowani.backend.repo.CategoryRepo;
import de.lowani.backend.repo.TopicRepo;
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
class TopicControllerTest {
    @LocalServerPort
    private int port;

    private String url(){
        return "http://localhost:" + port + "/topic";
    }

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private JwtConfig jwtConfig;

    @Autowired
    private TopicRepo topicRepo;

    @AfterEach
    public void clearRepo(){
        topicRepo.deleteAll();
    }

    @BeforeEach
    public void fillDB(){

        TopicEntity topic1 = TopicEntity.builder()
                .name("Gin")
                .build();
        topicRepo.save(topic1);

        TopicEntity topic2 = TopicEntity.builder()
                .name("Bier")
                .build();
        topicRepo.save(topic2);

        TopicEntity topic3 = TopicEntity.builder()
                .name("Gemüse")
                .build();
        topicRepo.save(topic3);
    }

    @Test
    public void getAllTopicsShouldReturnAll(){

        //GiVEN
        int amountOfTopics = 3;
        //WHEN
        HttpEntity<Void> httpEntity = new HttpEntity<>(authorizedHeader("Bernd", "admin"));
        ResponseEntity<List<Topic>> response = restTemplate
                .exchange(url(), HttpMethod.GET, httpEntity, new ParameterizedTypeReference<List<Topic>>(){});
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        List<Topic> responseBody= response.getBody();
        assertThat(responseBody.size(), is(amountOfTopics));
        assertThat(responseBody.get(1).getTopic(), is("Bier"));
    }

    @Test
    public void postNewTopicAsUserNotPossible(){

        //GiVEN
        Topic topicToAdd = Topic.builder().topic("Suppen").build();
        //WHEN
        HttpEntity<Topic> httpEntity = new HttpEntity<>(topicToAdd,authorizedHeader("Bernd", "user"));
        ResponseEntity<Topic> response = restTemplate
                .exchange(url()+"/new", HttpMethod.POST, httpEntity, Topic.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.UNAUTHORIZED));
    }

    @Test
    public void postNewCategoryAsUAdminPossible(){

        //GiVEN
        Topic topicToAdd = Topic.builder().topic("Suppen").build();
        //WHEN
        HttpEntity<Topic> httpEntity = new HttpEntity<>(topicToAdd,authorizedHeader("Bernd", "admin"));
        ResponseEntity<Topic> response = restTemplate
                .exchange(url()+"/new", HttpMethod.POST, httpEntity, Topic.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        Topic responseBody= response.getBody();
        assertThat(responseBody.getTopic(), is("Suppen"));

    }

    @Test
    public void postNewCategoryWithEmptyNotPossible(){

        //GiVEN
        Topic topicToAdd = Topic.builder().topic("").build();
        //WHEN
        HttpEntity<Topic> httpEntity = new HttpEntity<>(topicToAdd,authorizedHeader("Bernd", "admin"));
        ResponseEntity<Topic> response = restTemplate
                .exchange(url()+"/new", HttpMethod.POST, httpEntity, Topic.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
    }

    @Test
    public void postNewCategoryThatAlreadyExistsNotPossible(){

        //GiVEN
        Topic topicToAdd = Topic.builder().topic("Bier").build();
        //WHEN
        HttpEntity<Topic> httpEntity = new HttpEntity<>(topicToAdd,authorizedHeader("Bernd", "admin"));
        ResponseEntity<Topic> response = restTemplate
                .exchange(url()+"/new", HttpMethod.POST, httpEntity, Topic.class);
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