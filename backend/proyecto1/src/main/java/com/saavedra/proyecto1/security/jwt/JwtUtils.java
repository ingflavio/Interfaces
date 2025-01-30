package com.saavedra.proyecto1.security.jwt;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.saavedra.proyecto1.entity.DatosDelUsuario;
import com.saavedra.proyecto1.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Date;
import java.util.stream.Collectors;

import java.util.stream.Collectors;

@Component
public class JwtUtils {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Value("${my.key.private}")
    private String PrivateKey;

    @Value("${my.user.private}")
    private String UserCreate;


    public String CrearToken(Authentication authentication) {


        Algorithm algorithm = Algorithm.HMAC256(PrivateKey);
        DatosDelUsuario usuario = (DatosDelUsuario) authentication.getPrincipal();
        String permisos = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));

        DatosDelUsuario usuarioEntity=usuarioRepository.findByNombreDeUsuario(usuario.getNombreDeUsuario()).orElseThrow();

        String token = JWT.create()
                .withIssuer(UserCreate)
                .withSubject(usuario.getNombreDeUsuario())
                .withClaim("authorities", permisos)
                .withClaim("correo", usuario.getGmail())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 3600000))
                .sign(algorithm);

        return token;
    }


    public DecodedJWT ValidarToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(PrivateKey);
        try {
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(UserCreate)
                    .build();
            return verifier.verify(token);
        } catch (JWTVerificationException exception) {
            throw new JWTVerificationException("Token No valido");
        }
    }



    public String ObtenerUsername(DecodedJWT decodedJWT) {
        return decodedJWT.getSubject();
    }

    public Claim ObtenerClaims(DecodedJWT decodedJWT) {
        return decodedJWT.getClaim("authorities");
    }
}


