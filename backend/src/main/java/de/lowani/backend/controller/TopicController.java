package de.lowani.backend.controller;

import de.lowani.backend.api.Topic;
import de.lowani.backend.entities.TopicEntity;
import de.lowani.backend.entities.UserEntity;
import de.lowani.backend.exception.UnauthorizedUserException;
import de.lowani.backend.service.MapperService;
import de.lowani.backend.service.TopicService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityExistsException;
import java.util.List;

import static de.lowani.backend.controller.TopicController.TOPIC_CONTROLLER_TAG;
import static javax.servlet.http.HttpServletResponse.*;
import static javax.servlet.http.HttpServletResponse.SC_CONFLICT;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;


@Tag(name = TOPIC_CONTROLLER_TAG, description = "Provides CRUD operations for the Categories")
@Api(
        tags = TOPIC_CONTROLLER_TAG
)
@CrossOrigin
@RestController
@RequestMapping("/topic")
public class TopicController {

    public static final String TOPIC_CONTROLLER_TAG = "topic";

    private final TopicService topicService;
    private final MapperService mapperService;

    @Autowired
    public TopicController(TopicService topicService, MapperService mapperService) {
        this.topicService = topicService;
        this.mapperService = mapperService;
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No topics found")
    })
    public ResponseEntity<List<Topic>> getAllCTopics(){
        List<TopicEntity> allEntities = topicService.findAll();
        if (allEntities.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<Topic> topics = mapperService.mapListOfTopic(allEntities);
        return ok(topics);
    }

    @PostMapping(value="/new" ,produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE )
    @ApiResponses(value = {
            @ApiResponse(code = SC_BAD_REQUEST, message = "Category must not be empty"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "User can not add new Category"),
            @ApiResponse(code = SC_CONFLICT, message = "Category already present")
    })
    public ResponseEntity<Topic> postNewTopic(@AuthenticationPrincipal UserEntity authUser, @RequestBody Topic newTopic){
        if (!authUser.getRole().equals("admin")){
            throw new UnauthorizedUserException("Only Admin can add a Category");
        }
        if (newTopic.getTopic().isEmpty()||newTopic.getTopic().length()<1){
            throw new IllegalArgumentException("No valid Topic name");
        }
        if (topicService.findByName(newTopic.getTopic()).isPresent()){
            throw new EntityExistsException("Topic already in use");
        }
        TopicEntity topicEntity = mapperService.map(newTopic);
        TopicEntity addedTopicEnt = topicService.save(topicEntity);
        Topic addedTopic = mapperService.map(addedTopicEnt);
        return ok(addedTopic);
    }
}
