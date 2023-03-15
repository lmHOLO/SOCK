package com.holo.sock;

import com.holo.sock.security.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class SockApplication {
	public static void main(String[] args) {
		SpringApplication.run(SockApplication.class, args);
	}

}
