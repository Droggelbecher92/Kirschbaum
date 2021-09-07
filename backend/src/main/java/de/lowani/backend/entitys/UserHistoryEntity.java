package de.lowani.backend.entitys;


import lombok.*;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user_history")
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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private final Set<UserEntity> users = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "question_id")
    private final Set<QuestionEntity> questions = new HashSet<>();

    @Column(name = "score", nullable = false)
    private long score;

}
