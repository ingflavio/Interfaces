package com.saavedra.proyecto1.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ExperenciaLaboralEntity {


    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String Empresa;

    private String Descripcion;

    private String FechaIni;

    private String FechaFin;

    @ManyToOne(targetEntity = DatosDelUsuario.class)
    @JoinColumn(name = "usuario_id")
    @JsonBackReference
    private DatosDelUsuario datosDelUsuario;







}
