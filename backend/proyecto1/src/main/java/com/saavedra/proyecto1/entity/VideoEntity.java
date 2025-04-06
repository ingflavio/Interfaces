package com.saavedra.proyecto1.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)

public class VideoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descripcion;
    private String nombreArchivo; // Nombre del archivo de video (ej: "video123.mp4")

    // Subtítulos
    private String subtitulosEs; // Nombre archivo subtítulos español (ej: "subtitles_es.vtt")
    private String subtitulosEn; // Nombre archivo subtítulos inglés

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private DatosDelUsuario usuario;
}