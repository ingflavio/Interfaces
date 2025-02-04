package com.saavedra.proyecto1.controller.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class DatosDelUsuarioDTO {
    private String nombre;
    private String apellido;
    private String profesion;
    private String telefono;
    private String gmail;
    private String sitioWeb;
    private String perfil;
    private String direccion;
    private List<IdiomaDTO> idiomas;
    private List<CompetenciaDTO> competencias;
    private List<HabilidadDTO> habilidades;
    private List<ExperienciaLaboralDTO> experienciasLaborales;
    private List<FormacionDTO> formacion;

}
