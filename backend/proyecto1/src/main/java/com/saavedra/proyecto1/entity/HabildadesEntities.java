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
public class HabildadesEntities {


    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String NombreHabilidad;

    private Integer Habilidad;


    @ManyToOne(targetEntity = DatosDelUsuario.class)
    @JoinColumn(name = "usuario_id")
    @JsonBackReference
    private DatosDelUsuario datosDelUsuario;








}
