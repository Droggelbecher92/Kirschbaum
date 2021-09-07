package de.lowani.backend.entitys;

import lombok.*;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "question")
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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "topic_id")
    private final Set<TopicEntity> topic = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private final Set<CategoryEntity> category = new HashSet<>();

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
}
