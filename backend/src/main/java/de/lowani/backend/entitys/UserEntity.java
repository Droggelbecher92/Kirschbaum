package de.lowani.backend.entitys;

import lombok.*;
import javax.persistence.*;


@Entity
@Table(name = "user")
@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue
    @Column(name = "user_id", nullable = false)
    private Long id;

    @Column(name = "user_name", nullable = false, unique = true)
    private String name;

    @Column(name = "user_password", nullable = false)
    private String password;

    @Column(name = "user_score", nullable = false)
    private Long score;

    @Column(name = "user_role", nullable = false)
    private String role;



}
