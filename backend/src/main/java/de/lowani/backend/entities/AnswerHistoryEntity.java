package de.lowani.backend.entities;


import lombok.*;
import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "kirsch_user_history")
@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class AnswerHistoryEntity {

    @Id
    @GeneratedValue
    @Column(name = "history_id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name="question_id", nullable=false)
    private QuestionEntity question;

    @Column(name = "score", nullable = false)
    private long score;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AnswerHistoryEntity that = (AnswerHistoryEntity) o;
        return user == that.user && score == that.score && Objects.equals(id, that.id) && Objects.equals(question, that.question);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, question, score);
    }
}
