package com.holo.sock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

//@EnableJpaAuditing
@SpringBootApplication
public class SockApplication {

	public static void main(String[] args) {
		SpringApplication.run(SockApplication.class, args);
	}

}
