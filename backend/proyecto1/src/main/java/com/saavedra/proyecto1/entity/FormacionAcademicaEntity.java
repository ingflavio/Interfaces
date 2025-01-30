package com.saavedra.proyecto1.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.grammars.hql.HqlParser;

import java.lang.annotation.Target;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(exclude = "datosDelUsuario")
public class FormacionAcademicaEntity {


    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String Instituto;

    private String Titulo;

    private String FechaIni;

    private String FechaFin;

    @ManyToOne(targetEntity = DatosDelUsuario.class)
    @JoinColumn(name = "usuario_id")
    @JsonBackReference
    private DatosDelUsuario datosDelUsuario;


}
