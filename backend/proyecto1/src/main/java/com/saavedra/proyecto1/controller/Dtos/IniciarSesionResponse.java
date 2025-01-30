package com.saavedra.proyecto1.controller.Dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class IniciarSesionResponse {


    private String username;
    private String Token;
    private String Mensaje;

}
