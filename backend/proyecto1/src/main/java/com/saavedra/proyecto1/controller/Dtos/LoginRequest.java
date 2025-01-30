package com.saavedra.proyecto1.controller.Dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"NombreDeUsuario","Gmail","Contrasena"})
public class LoginRequest {

    private String NombreDeUsuario;
    private String Gmail;
    private String Contrasena;




}


