package de.lowani.backend.entities;


import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "kirsch_question_category")
@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class CategoryEntity {

    @Id
    @GeneratedValue
    @Column(name = "category_id", nullable = false)
    private Long id;

    @Column(name = "category_name", nullable = false)
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CategoryEntity that = (CategoryEntity) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
