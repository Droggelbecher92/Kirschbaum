package de.lowani.backend.controller;


import de.lowani.backend.api.Answer;
import de.lowani.backend.entities.AnswerHistoryEntity;
import de.lowani.backend.entities.UserEntity;
import de.lowani.backend.service.AnswerHistoryService;
import de.lowani.backend.service.MapperService;
import de.lowani.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static de.lowani.backend.controller.AnswerHistoryController.ANSWER_CONTROLLER_TAG;
import static javax.servlet.http.HttpServletResponse.*;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Tag(name = ANSWER_CONTROLLER_TAG, description = "Provides CRUD operations for the Answers")
@Api(
        tags = ANSWER_CONTROLLER_TAG
)
@CrossOrigin
@RestController
@RequestMapping("/answer")
public class AnswerHistoryController {

    public static final String ANSWER_CONTROLLER_TAG = "Answer";

    private final AnswerHistoryService answerHistoryService;
    private final UserService userService;
    private final MapperService mapperService;

    @Autowired
    public AnswerHistoryController(AnswerHistoryService answerHistoryService, UserService userService, MapperService mapperService) {
        this.answerHistoryService = answerHistoryService;
        this.userService = userService;
        this.mapperService = mapperService;
    }

    @PostMapping(produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE )
    @ApiResponses(value = {
            @ApiResponse(code = SC_BAD_REQUEST, message = "Answer not complete")
    })
    public ResponseEntity<Answer> postNewAnswer(@RequestBody Answer givenAnswer){
        if (givenAnswer.getQuestion().isEmpty()||givenAnswer.getQuestion().length()<2||givenAnswer.getUserName().isEmpty()||givenAnswer.getUserName().length()<2){
            throw new IllegalArgumentException("Name and Question must be filled");
        }
        userService.updateScore(givenAnswer.getScore(),givenAnswer.getUserName());
        AnswerHistoryEntity answerToSave = mapperService.map(givenAnswer);
        AnswerHistoryEntity savedAnswerEnt = answerHistoryService.save(answerToSave);
        Answer savedAnswer = mapperService.map(savedAnswerEnt);
        return ok(savedAnswer);
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No Answers found")
    })
    public ResponseEntity<List<Answer>> getAllAnswers(){
        List<AnswerHistoryEntity> allAnswersEnt = answerHistoryService.findAll();
        List<Answer> allAnswers = mapperService.mapListOfAnswers(allAnswersEnt);
        return ok(allAnswers);
    }

    @GetMapping(value = "topic/{topic}", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No Answers found")
    })
    public ResponseEntity<List<Answer>> getAllAnswersByTopic(@PathVariable String topic){
        List<AnswerHistoryEntity> allAnswersEnt = answerHistoryService.findAllByTopic(topic);
        List<Answer> allAnswers = mapperService.mapListOfAnswers(allAnswersEnt);
        return ok(allAnswers);
    }

    @GetMapping(value = "right", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No Answers found")
    })
    public ResponseEntity<List<Answer>> getAllCorrectAnswers(){
        List<AnswerHistoryEntity> allAnswersEnt = answerHistoryService.findRight();
        List<Answer> allAnswers = mapperService.mapListOfAnswers(allAnswersEnt);
        return ok(allAnswers);
    }

    @GetMapping(value = "wrong", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No Answers found")
    })
    public ResponseEntity<List<Answer>> getAllWrongAnswers(){
        List<AnswerHistoryEntity> allAnswersEnt = answerHistoryService.findWrong();
        List<Answer> allAnswers = mapperService.mapListOfAnswers(allAnswersEnt);
        return ok(allAnswers);
    }



}
