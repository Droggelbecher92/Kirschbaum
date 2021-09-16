package de.lowani.backend.api;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Question {
    private Long id;
    private String type;
    private String categoryName;
    private String topicName;
    private String question;
    private String answer1;
    private String answer2;
    private String answer3;
    private String answer4;
    private String solution;

}
