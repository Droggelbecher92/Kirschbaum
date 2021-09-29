package de.lowani.backend.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Answer {
    private long id;
    private String userName;
    private String question;
    private String topic;
    private String category;
    private int score;
}
