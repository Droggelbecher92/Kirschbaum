package de.lowani.backend.controller;

import de.lowani.backend.api.Answer;
import de.lowani.backend.api.Question;
import de.lowani.backend.config.JwtConfig;
import de.lowani.backend.entities.*;
import de.lowani.backend.repo.*;
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
class AnswerHistoryControllerTest {
    @LocalServerPort
    private int port;

    private String url(){
        return "http://localhost:" + port + "/answer";
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
    @Autowired
    private AnswerHistoryRepo answerRepo;

    @AfterEach
    public void clearRepos(){
        answerRepo.deleteAll();
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
    public void saveGivenAnswer(){

        //GiVEN
        Answer givenAnswer = Answer.builder()
                .userName("Kim")
                .score(1)
                .question("Bier ist...?")
                .build();
        //WHEN
        HttpEntity<Answer> httpEntity = new HttpEntity<>(givenAnswer, authorizedHeader("Bernd", "user"));
        ResponseEntity<Answer> response = restTemplate
                .exchange(url(), HttpMethod.POST, httpEntity, Answer.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        Answer actual = response.getBody();
        assertThat(answerRepo.findAll().size(), is(1));
        AnswerHistoryEntity answerInDB = answerRepo.findAll().get(0);
        assertThat(answerInDB.getQuestion().getQuestion(),is("Bier ist...?"));
        assertThat(answerInDB.getUser().getName(),is("Kim"));
    }

    @Test
    public void saveWithoutQuestionShouldFail(){

        //GiVEN
        Answer givenAnswer = Answer.builder()
                .userName("")
                .score(1)
                .question("Bier ist...?")
                .build();
        //WHEN
        HttpEntity<Answer> httpEntity = new HttpEntity<>(givenAnswer, authorizedHeader("Bernd", "user"));
        ResponseEntity<Answer> response = restTemplate
                .exchange(url(), HttpMethod.POST, httpEntity, Answer.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
    }

    @Test
    public void saveWithoutUserShouldFail(){

        //GiVEN
        Answer givenAnswer = Answer.builder()
                .userName("Kim")
                .score(1)
                .question("")
                .build();
        //WHEN
        HttpEntity<Answer> httpEntity = new HttpEntity<>(givenAnswer, authorizedHeader("Bernd", "user"));
        ResponseEntity<Answer> response = restTemplate
                .exchange(url(), HttpMethod.POST, httpEntity, Answer.class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
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