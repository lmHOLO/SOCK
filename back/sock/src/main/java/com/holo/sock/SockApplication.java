package com.holo.sock;

import com.holo.sock.common.config.security.jwt.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class SockApplication {
	public static void main(String[] args) {
		SpringApplication.run(SockApplication.class, args);
	}

}
