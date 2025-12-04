//package com.example.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        // Disable CSRF for simplicity (not for production)
//        ///http.csrf().disable();
//
//        // Permit all requests to /api/** for demo; require auth for others (if any)
//        http.authorizeHttpRequests(auth -> auth
//                .requestMatchers("/api/**").permitAll()
//                .anyRequest().authenticated()
//        );
//
//        // No form login
//        http.httpBasic(Customizer.withDefaults());
//        return http.build();
//    }
//}
package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())          // Disable CSRF
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()      // Allow ALL requests
                )
                .formLogin(form -> form.disable())      // Disable login page
                .httpBasic(basic -> basic.disable());   // Disable basic auth

        return http.build();
    }
}
