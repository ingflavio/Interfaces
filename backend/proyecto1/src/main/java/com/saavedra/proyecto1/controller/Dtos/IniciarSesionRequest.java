package com.saavedra.proyecto1.controller.Dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"NombreDeUsuario","Contrasena"})
public class IniciarSesionRequest {

    private String NombreDeUsuario;
    private String Contrasena;

}
