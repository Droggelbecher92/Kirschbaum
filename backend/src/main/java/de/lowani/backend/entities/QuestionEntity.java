package de.lowani.backend.entities;

import lombok.*;
import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "kirsch_question")
@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class QuestionEntity {

    @Id
    @GeneratedValue
    @Column(name = "question_id", nullable = false)
    private Long id;

    @Column(name = "topic_id")
    private Long topic;

    @Column(name = "category_id")
    private Long category;

    @Column(name = "question", nullable = false)
    private String question;

    @Column(name = "first_answer", nullable = false)
    private String answerOne;

    @Column(name = "second_answer", nullable = false)
    private String answerTwo;

    @Column(name = "third_answer")
    private String answerThree;

    @Column(name = "fourth_answer")
    private String answerFour;

    @Column(name = "correct_answer", nullable = false)
    private String solution;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuestionEntity that = (QuestionEntity) o;
        return Objects.equals(id, that.id) && Objects.equals(topic, that.topic) && Objects.equals(category, that.category) && Objects.equals(question, that.question) && Objects.equals(answerOne, that.answerOne) && Objects.equals(answerTwo, that.answerTwo) && Objects.equals(answerThree, that.answerThree) && Objects.equals(answerFour, that.answerFour) && Objects.equals(solution, that.solution);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, topic, category, question, answerOne, answerTwo, answerThree, answerFour, solution);
    }
}

