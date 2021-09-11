package de.lowani.backend.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EntityScan(basePackages = {"de.lowani.backend.entities"})
@EnableJpaRepositories(basePackages = {"de.lowani.backend.repo"})
@EnableTransactionManagement
public class JpaConfig {
}

