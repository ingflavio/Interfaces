package com.saavedra.proyecto1.security.jwt;

import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;

@Component
@AllArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private JwtUtils tokenCreate;
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {


        String Header=request.getHeader(HttpHeaders.AUTHORIZATION);

        if (Header != null && Header.startsWith("Bearer ")) {

            String token=Header.substring(7);
            DecodedJWT decodedJWT= tokenCreate.ValidarToken(token);
            String Username= tokenCreate.ObtenerUsername(decodedJWT);
            String Claims= tokenCreate.ObtenerClaims(decodedJWT).asString();
            Collection<? extends GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(Claims);
            System.out.println(authorities);

            System.out.println("Username: " + Username);
            System.out.println("Claims: " + Claims);


            SecurityContext context = SecurityContextHolder.createEmptyContext();
            Authentication authenticationToken = new UsernamePasswordAuthenticationToken(Username, null   , authorities);
            context.setAuthentication(authenticationToken);
            SecurityContextHolder.setContext(context);


        }

        filterChain.doFilter(request,response);


    }




}
