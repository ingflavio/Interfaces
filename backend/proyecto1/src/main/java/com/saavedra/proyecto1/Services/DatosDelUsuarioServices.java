package com.saavedra.proyecto1.Services;

import com.saavedra.proyecto1.controller.Dtos.IniciarSesionRequest;
import com.saavedra.proyecto1.controller.Dtos.IniciarSesionResponse;
import com.saavedra.proyecto1.controller.Dtos.LoginRequest;
import com.saavedra.proyecto1.entity.DatosDelUsuario;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public interface DatosDelUsuarioServices {

    Optional<DatosDelUsuario> findByNombreDeUsuario(String NombreDeUsuario);

    String Guardar(LoginRequest usuario);

    IniciarSesionResponse Login(IniciarSesionRequest request);
    Authentication Auth(String username, String password);

    String ActualizarDatos(String Username);

    String GuardarFoto(MultipartFile file) throws Exception;








}
