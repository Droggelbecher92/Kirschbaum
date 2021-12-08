package de.lowani.backend.controller;

import de.lowani.backend.api.Question;
import de.lowani.backend.entities.QuestionEntity;
import de.lowani.backend.entities.UserEntity;
import de.lowani.backend.exception.UnauthorizedUserException;
import de.lowani.backend.service.MapperService;
import de.lowani.backend.service.QuestionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static de.lowani.backend.controller.QuestionController.QUESTION_CONTROLLER_TAG;
import static javax.servlet.http.HttpServletResponse.*;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Tag(name = QUESTION_CONTROLLER_TAG, description = "Provides question operations")
@Api(
        tags = QUESTION_CONTROLLER_TAG
)
@CrossOrigin
@RestController
@RequestMapping("/api/question")
public class QuestionController {

    public static final String QUESTION_CONTROLLER_TAG = "Question";

    private final QuestionService questionService;
    private final MapperService mapperService;

    public QuestionController(QuestionService questionService, MapperService mapperService) {
        this.questionService = questionService;
        this.mapperService = mapperService;
    }

    @GetMapping(value = "/random", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No questions found"),
            @ApiResponse(code = SC_BAD_REQUEST, message = "Not enough questions")
    })
    public ResponseEntity<List<Question>> get3RandomQuestions() {
        List<QuestionEntity> randomQuestionsEnt = questionService.findRandom(3);
        if (randomQuestionsEnt.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<Question> questions = mapperService.mapListOfQuestions(randomQuestionsEnt);
        return ok(questions);
    }

    @GetMapping(value = "category/{category}", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No questions found"),
            @ApiResponse(code = SC_BAD_REQUEST, message = "Not enough questions")
    })
    public ResponseEntity<List<Question>> get3QuestionsByCategory(@PathVariable String category) {
        List<QuestionEntity> randomQuestionsEnt = questionService.findByCategory(category, 3);
        if (randomQuestionsEnt.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<Question> questions = mapperService.mapListOfQuestions(randomQuestionsEnt);
        return ok(questions);
    }

    @GetMapping(value = "topic/{topic}", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No questions found"),
            @ApiResponse(code = SC_BAD_REQUEST, message = "Not enough questions")
    })
    public ResponseEntity<List<Question>> get3QuestionsByTopic(@PathVariable String topic) {
        List<QuestionEntity> randomQuestionsEnt = questionService.findByTopic(topic, 3);
        if (randomQuestionsEnt.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<Question> questions = mapperService.mapListOfQuestions(randomQuestionsEnt);
        return ok(questions);
    }

    @PostMapping(produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_UNAUTHORIZED, message = "Admin only"),
            @ApiResponse(code = SC_BAD_REQUEST, message = "Question not complete")
    })
    public ResponseEntity<Question> postNewQuestion(@AuthenticationPrincipal UserEntity authUser, @RequestBody Question newQuestion) {
        if (!authUser.getRole().equals("admin")) {
            throw new UnauthorizedUserException("Only admins can create questions");
        }
        QuestionEntity newQuestionEnt = mapperService.map(newQuestion);
        QuestionEntity savedQuestionEnt = questionService.save(newQuestionEnt);
        Question savedQuestion = mapperService.map(savedQuestionEnt);
        return ok(savedQuestion);
    }
}
