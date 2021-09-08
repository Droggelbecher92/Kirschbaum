package de.lowani.backend.entitys;


import lombok.*;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "kirsch_user_history")
@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserHistoryEntity {

    @Id
    @GeneratedValue
    @Column(name = "history_id", nullable = false)
    private Long id;

    @Column(name = "user_id")
    private long user;

    @Column(name = "question_id")
    private Long question;

    @Column(name = "score", nullable = false)
    private long score;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserHistoryEntity that = (UserHistoryEntity) o;
        return user == that.user && score == that.score && Objects.equals(id, that.id) && Objects.equals(question, that.question);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, question, score);
    }
}
