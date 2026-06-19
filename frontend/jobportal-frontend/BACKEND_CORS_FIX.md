# Backend fix required: enable CORS

Your SecurityConfig.java has no CORS configuration. Without this, the browser
will block every request from the React app (running on http://localhost:5173)
to your API (running on http://localhost:8080) with a CORS error in the console,
even though Postman/curl would work fine.

## Fix

In `SecurityConfig.java`, add a CorsConfigurationSource bean and wire it into
the filter chain:

```java
package com.example.JobPortal.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {
    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity h) throws Exception {
        return h.csrf(c -> c.disable())
                .cors(c -> c.configurationSource(corsConfigurationSource()))
                .sessionManagement(se -> se.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**", "/api/applications/test-email").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/jobs").hasRole("RECRUITER")
                        .requestMatchers(HttpMethod.PUT, "/api/jobs/**").hasRole("RECRUITER")
                        .requestMatchers(HttpMethod.GET, "/api/applications/job/**").hasRole("RECRUITER")
                        .requestMatchers(HttpMethod.POST, "/api/applications/**").hasRole("JOB_SEEKER")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
```

The only changes from your original file: the new `corsConfigurationSource()`
bean, and one added line `.cors(c -> c.configurationSource(corsConfigurationSource()))`
in the filter chain. Everything else — your role rules, JWT filter, password
encoder — stays exactly the same.

If you ever deploy the frontend somewhere other than localhost:5173, add that
URL to the `setAllowedOrigins` list too.

## Second fix required: serve uploaded resumes as static files

Your `FileUploadUtil` saves resumes to a local `uploads/resumes/` folder, but
nothing in your project tells Spring Boot to actually serve files from that
folder over HTTP. Right now `http://localhost:8080/uploads/resumes/abc.pdf`
will return a 404, even with the path formatted correctly, because Spring Boot
only auto-serves `src/main/resources/static` by default — not arbitrary
folders on disk.

Add this new class anywhere in your `config` package:

```java
package com.example.JobPortal.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String uploadsPath = new File("uploads").getAbsolutePath();
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadsPath + File.separator);
    }
}
```

This maps any request to `/uploads/**` to the `uploads/` folder relative to
where your Spring Boot app runs from (the same folder `FileUploadUtil` already
writes into). After adding this and restarting the backend, the "View Resume"
links from the frontend will actually open the PDF instead of 404ing.

Note: this resource handler path is not covered by your existing
`SecurityConfig` rules, so it falls under `.anyRequest().authenticated()` —
meaning resume links will only work if the browser tab opening them is
otherwise authenticated. Since JWT is sent via an `Authorization` header (not
a cookie), and a plain link click can't attach that header, **add this line**
to your `SecurityConfig`'s `authorizeHttpRequests` block so resume files are
publicly viewable by link:

```java
.requestMatchers("/uploads/**").permitAll()
```

If you'd rather keep resumes private, the alternative is a backend endpoint
that streams the file through an authenticated controller method instead of
exposing the folder directly — let me know if you want that version instead.
