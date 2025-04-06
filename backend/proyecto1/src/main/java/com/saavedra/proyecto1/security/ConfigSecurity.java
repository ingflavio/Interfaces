package com.saavedra.proyecto1.security;

import com.fasterxml.jackson.core.filter.TokenFilter;
import com.saavedra.proyecto1.security.jwt.JwtAuthFilter;
import com.saavedra.proyecto1.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class ConfigSecurity {

    @Autowired
    public JwtUtils tokenCreate;

    @Bean
    public  SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws  Exception {



        return httpSecurity.
                csrf( csrf-> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(http-> {
                    http.requestMatchers(HttpMethod.POST,"/Api/login").permitAll();
                    http.requestMatchers(HttpMethod.POST,"/Api/register").permitAll();
                    http.requestMatchers(HttpMethod.GET,"/Api/Todos").permitAll();
                    http.requestMatchers(HttpMethod.PUT,"/Api/datos-extras").authenticated();
                    http.requestMatchers(HttpMethod.PUT,"/Api/datos-extras/foto").authenticated();
                    http.requestMatchers(HttpMethod.GET,"/Api/datos-extras/foto").authenticated();
                    http.requestMatchers(HttpMethod.GET,"/Api/datos-extras").authenticated();
                    http.requestMatchers(HttpMethod.GET,"/Api/Colores/**").authenticated();
                    http.requestMatchers(HttpMethod.POST,"/Api/Colores/**").authenticated();
                    http.requestMatchers(HttpMethod.DELETE,"/Api/Colores/**").authenticated();
                    http.requestMatchers(HttpMethod.GET,"/Api/Videos/**").authenticated();
                    http.requestMatchers(HttpMethod.POST,"/Api/Videos/**").authenticated();
                    http.requestMatchers(HttpMethod.DELETE,"/Api/Videos/**").authenticated();

                    //http.anyRequest().denyAll();
                    http.anyRequest().permitAll();

                })

                .addFilterBefore(new JwtAuthFilter(tokenCreate), BasicAuthenticationFilter.class)

                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:5173");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();


    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService usuarioimpl) throws Exception {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(usuarioimpl);
        return provider;

    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}




