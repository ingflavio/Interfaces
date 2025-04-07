package com.saavedra.proyecto1.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.saavedra.proyecto1.repository.VideoRepository;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@EqualsAndHashCode(exclude = {"competencias", "experenciasLaborales", "formacion", "habilidades","paletaDeColores"})
@ToString(exclude = {"competencias", "experenciasLaborales", "formacion", "habilidades","paletaDeColores"})
public class DatosDelUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @NotNull
    @Column(unique = true)
    private String NombreDeUsuario;
    @NotNull
    private String Gmail;
    @NotNull
    private String Contrasena;

    @Convert(converter = PermisosConverter.class)
    Set<Permisos> permisos;

    private String Nombre;
    private String Apellido;
    private String profesion;
    private String Perfil;
    private String Telefono;

    private String SitioWeb;
    private String Direccion;

    @ElementCollection(targetClass = Idiomas.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "usuario_idiomas")
    @Column(name = "idiomas")
    private List<Idiomas> idiomas;

    @OneToMany(mappedBy = "datosDelUsuario", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<ExperenciaLaboralEntity> experenciasLaborales;
    @OneToMany(mappedBy = "datosDelUsuario", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<CompetenciasEntity> competencias;
    @OneToMany(mappedBy = "datosDelUsuario", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<FormacionAcademicaEntity> formacion;
    @OneToMany(mappedBy = "datosDelUsuario", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<HabilidadesEntities> habilidades;
    private String Foto;
    @OneToMany(mappedBy = "datosDelUsuario", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<PaletaDeColores> paletaDeColores;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<FotosEntity> fotosCarrusel = new ArrayList<>();


}
