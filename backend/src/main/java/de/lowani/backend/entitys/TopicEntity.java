package de.lowani.backend.entitys;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "question_category")
@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class TopicEntity {

    @Id
    @GeneratedValue
    @Column(name = "topic_id", nullable = false)
    private Long id;

    @Column(name = "topic_name", nullable = false)
    private String name;
}
