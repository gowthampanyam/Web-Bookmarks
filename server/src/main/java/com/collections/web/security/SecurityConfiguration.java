package com.collections.web.security;


//Muutama huomio alla
/*
CREATE TABLE user (
		  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
		  username varchar(32),
		  password varchar(128),
		  role varchar(10),
		  enabled int  // Ajatus, että käyttäjän voi disabloida poistamatta käyttäjää
		);

POM:SSA riippuvuus
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
		</dependency>

*/


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfiguration {


	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf().disable();
		//http.cors().disable();
		http.authorizeHttpRequests((requests) -> requests
			.requestMatchers(HttpMethod.PUT,"/api/login").permitAll()
			.requestMatchers(HttpMethod.DELETE,"/api/login").permitAll()
			.requestMatchers(HttpMethod.POST,"/api/login").permitAll() // Uses method permissions at LoginController
			.requestMatchers(HttpMethod.GET,"/api/login").permitAll()
			.requestMatchers(HttpMethod.GET, "/api/categories").permitAll()
			.requestMatchers(HttpMethod.GET, "/api/websites").permitAll()
			.requestMatchers(HttpMethod.POST, "/api/websites").permitAll()
			.requestMatchers(HttpMethod.PUT, "/api/websites/*").permitAll()
			.requestMatchers(HttpMethod.DELETE, "/api/websites/*").permitAll()
			.requestMatchers(HttpMethod.GET, "/api/tags").permitAll()
			.requestMatchers("/api/users").hasAuthority("admin")
			.requestMatchers("/api/*").authenticated()
			.anyRequest().permitAll()
		);
		return http.build();
	}

	
	@Bean
	public UserDetailsService userDetailsService() {
		return new UserService();
	}
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService());
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
	    return authenticationConfiguration.getAuthenticationManager();
	}
}
