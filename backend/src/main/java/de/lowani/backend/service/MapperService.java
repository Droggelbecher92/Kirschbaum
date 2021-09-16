package de.lowani.backend.service;

import de.lowani.backend.api.Category;
import de.lowani.backend.api.Topic;
import de.lowani.backend.api.User;
import de.lowani.backend.entities.CategoryEntity;
import de.lowani.backend.entities.TopicEntity;
import de.lowani.backend.entities.UserEntity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
@Getter
@Setter
public class MapperService {

    //Category
    public Category map(CategoryEntity categoryEntity) {
        return Category.builder().category(categoryEntity.getName()).build();
    }

    public CategoryEntity map(Category category) {
        return CategoryEntity.builder().name(category.getCategory()).build();
    }

    public List<Category> mapListOfCategory(List<CategoryEntity> categoryEntities) {
        List<Category> categories = new LinkedList<>();
        for (CategoryEntity categoryEntity : categoryEntities) {
            Category category = map(categoryEntity);
            categories.add(category);
        }
        return categories;
    }

    //Topic
    public Topic map(TopicEntity topicEntity) {
        return Topic.builder().topic(topicEntity.getName()).build();
    }

    public TopicEntity map(Topic topic) {
        return TopicEntity.builder().name(topic.getTopic()).build();
    }

    public List<Topic> mapListOfTopic(List<TopicEntity> topicEntities) {
        List<Topic> topics = new LinkedList<>();
        for (TopicEntity topicEntity : topicEntities) {
            Topic topic = map(topicEntity);
            topics.add(topic);
        }
        return topics;
    }

    //User
    public User map(UserEntity userEntity) {
        return User.builder()
                .id(userEntity.getId())
                .name(userEntity.getName())
                .role(userEntity.getRole())
                .score(userEntity.getScore()).build();
    }

    public UserEntity mapNew(User user) {
        return UserEntity.builder()
                .name(user.getName())
                .score(0L)
                .role("user").build();
    }

    public List<User> mapListOfUser(List<UserEntity> userEntities) {
        List<User> users = new LinkedList<>();
        for (UserEntity userEntity : userEntities) {
            User user = map(userEntity);
            users.add(user);
        }
        return users;
    }
}
