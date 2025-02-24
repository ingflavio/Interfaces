package com.saavedra.proyecto1.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaletaDeColores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_paleta")
    private String NombrePaleta;
    private String primary_color;
    private String secondary;
    private String accent;
    private String button;

    // Tamaños de fuente
    private Integer titleSize;
    private Integer subtitleSize;
    private Integer paragraphSize;

    @Column(name = "activa")
    private boolean activa;

    @ManyToOne(targetEntity = DatosDelUsuario.class)
    @JoinColumn(name = "usuario_id")
    @JsonBackReference
    private DatosDelUsuario datosDelUsuario;

}





