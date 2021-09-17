package de.lowani.backend.controller;

import de.lowani.backend.api.Category;
import de.lowani.backend.api.Question;
import de.lowani.backend.config.JwtConfig;
import de.lowani.backend.entities.CategoryEntity;
import de.lowani.backend.entities.QuestionEntity;
import de.lowani.backend.entities.TopicEntity;
import de.lowani.backend.entities.UserEntity;
import de.lowani.backend.repo.CategoryRepo;
import de.lowani.backend.repo.QuestionRepo;
import de.lowani.backend.repo.TopicRepo;
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
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest(
        properties = "spring.profiles.active:h2",
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class QuestionControllerTest {
    @LocalServerPort
    private int port;

    private String url(){
        return "http://localhost:" + port + "/question";
    }

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private JwtConfig jwtConfig;

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private TopicRepo topicRepo;
    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired
    private QuestionRepo questionRepo;

    @AfterEach
    public void clearUserRepo(){
        questionRepo.deleteAll();
        topicRepo.deleteAll();
        categoryRepo.deleteAll();
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

        TopicEntity topic1 = TopicEntity.builder()
                .name("Gin")
                .build();
        topicRepo.save(topic1);

        CategoryEntity category1 = CategoryEntity.builder()
                .name("Bar")
                .build();
        categoryRepo.save(category1);

        QuestionEntity question1 = QuestionEntity.builder()
                .question("Java ist...?")
                .answerOne("doof")
                .answerTwo("unnütz")
                .answerThree("toll")
                .answerFour("langweilig")
                .solution("toll")
                .category(category1)
                .topic(topic1)
                .type("SINGLE")
                .build();
        questionRepo.save(question1);

        QuestionEntity question2 = QuestionEntity.builder()
                .question("Bier ist...?")
                .answerOne("lecker")
                .answerTwo("grün")
                .answerThree("spritzig")
                .answerFour("Saft")
                .solution("lecker spritzig ")
                .category(category1)
                .topic(topic1)
                .type("MULTI")
                .build();
        questionRepo.save(question2);

        QuestionEntity question3 = QuestionEntity.builder()
                .question("Ist das toll?")
                .answerOne("UP")
                .answerTwo("DOWN")
                .solution("UP")
                .category(category1)
                .topic(topic1)
                .type("THUMB")
                .build();
        questionRepo.save(question3);
    }

    @Test
    public void getRandomShouldReturn3Questions(){

        //GiVEN

        //WHEN
        HttpEntity<Void> httpEntity = new HttpEntity<>(authorizedHeader("Bernd", "user"));
        ResponseEntity<List<Question>> response = restTemplate
                .exchange(url()+"/random", HttpMethod.GET, httpEntity, new ParameterizedTypeReference<List<Question>>(){});
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        List<Question> actual = response.getBody();
        assert actual != null;
        assertThat(actual.size(), is(3));
        assertThat(actual.get(0).getCategoryName(),is("Bar"));
        assertThat(actual.get(0).getTopicName(),is("Gin"));
    }

    @Test
    public void getCategoryShouldReturn3Questions(){

        //GiVEN

        //WHEN
        HttpEntity<Void> httpEntity = new HttpEntity<>(authorizedHeader("Bernd", "user"));
        ResponseEntity<List<Question>> response = restTemplate
                .exchange(url()+"/category/Bar", HttpMethod.GET, httpEntity, new ParameterizedTypeReference<List<Question>>(){});
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        List<Question> actual = response.getBody();
        assert actual != null;
        assertThat(actual.size(), is(3));
        assertThat(actual.get(0).getCategoryName(),is("Bar"));
        assertThat(actual.get(0).getTopicName(),is("Gin"));
    }

    @Test
    public void getTopicShouldReturn3Questions(){

        //GiVEN

        //WHEN
        HttpEntity<Void> httpEntity = new HttpEntity<>(authorizedHeader("Bernd", "user"));
        ResponseEntity<List<Question>> response = restTemplate
                .exchange(url()+"/topic/Gin", HttpMethod.GET, httpEntity, new ParameterizedTypeReference<List<Question>>(){});
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        List<Question> actual = response.getBody();
        assert actual != null;
        assertThat(actual.size(), is(3));
        assertThat(actual.get(0).getCategoryName(),is("Bar"));
        assertThat(actual.get(0).getTopicName(),is("Gin"));
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