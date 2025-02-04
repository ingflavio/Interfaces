package com.saavedra.proyecto1.controller;

import com.saavedra.proyecto1.Services.impl.DatosDelUsuarioServicesImpl;

import com.saavedra.proyecto1.controller.Dtos.IniciarSesionRequest;
import com.saavedra.proyecto1.controller.Dtos.IniciarSesionResponse;
import com.saavedra.proyecto1.controller.Dtos.LoginRequest;
import com.saavedra.proyecto1.entity.*;
import com.saavedra.proyecto1.repository.*;
import com.saavedra.proyecto1.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RestController
@RequestMapping("Api")
public class ControllerFree {

    @Autowired
    private DatosDelUsuarioServicesImpl usuarioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository1;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private FormacionRepository formacionRepository;

    @Autowired
    private ExperenciaLaboralRepository experenciaLaboralRepository;

    @Autowired
    private HabilidadesRepository habilidadesRepository;

    @Autowired
    private CompetenciasRepository competenciasRepository;


    @PostMapping("/register")
    public ResponseEntity<?> CrearUsuario(@RequestBody LoginRequest request) {

        Optional<DatosDelUsuario> usuarioExistente = usuarioRepository.findByNombreDeUsuario(request.getNombreDeUsuario());
        if (usuarioExistente.isPresent()) {
            return ResponseEntity.badRequest().body("El usuario ya existe");
        }
        String resultado = usuarioRepository.Guardar(request);
        return ResponseEntity.ok(resultado);
    }
    @PostMapping("/login")
    public ResponseEntity<?> IniciarSesion(@RequestBody IniciarSesionRequest request) {
        try {
            IniciarSesionResponse response = usuarioRepository.Login(request);
            return ResponseEntity.ok(response);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body("Contraseña incorrecta");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
        }
    }
    @PutMapping("/datos-extras")
    public ResponseEntity<?> actualizarDatos(@RequestBody DatosDelUsuario datosDelUsuario//, @RequestParam("foto") MultipartFile foto
    ) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String authUsername = authentication.getName();
            Optional<DatosDelUsuario> usuarioEntity = usuarioRepository1.findByNombreDeUsuario(authUsername);


            if (!usuarioEntity.isPresent()) {
                return new ResponseEntity<>("Usuario no encontrado", HttpStatus.UNAUTHORIZED);
            }

            DatosDelUsuario usuarioActual = usuarioEntity.get();
            System.out.println(usuarioActual.getNombreDeUsuario() + " hola??");
            usuarioActual.setPermisos(datosDelUsuario.getPermisos());
            usuarioActual.setProfesion(datosDelUsuario.getProfesion());
            usuarioActual.setIdiomas(datosDelUsuario.getIdiomas());
            usuarioActual.setGmail(datosDelUsuario.getGmail());
            usuarioActual.setTelefono(datosDelUsuario.getTelefono());
            usuarioActual.setApellido(datosDelUsuario.getApellido());
            usuarioActual.setPerfil(datosDelUsuario.getPerfil());
            usuarioActual.setSitioWeb(datosDelUsuario.getSitioWeb());
            usuarioActual.setDireccion(datosDelUsuario.getDireccion());
            usuarioActual.setNombre(datosDelUsuario.getNombre());

            CrearDatos(usuarioActual, datosDelUsuario.getFormacion(), datosDelUsuario.getCompetencias(),
                    datosDelUsuario.getHabilidades(), datosDelUsuario.getExperenciasLaborales());

           //usuarioActual.setFoto(usuarioRepository.GuardarFoto(foto));
            usuarioActual.setTelefono("asdas");

            usuarioRepository1.save(usuarioActual);

            return ResponseEntity.ok(usuarioActual);

        } catch (IllegalArgumentException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);

        } catch (Exception e) {
            return new ResponseEntity<>("Error al actualizar los datos: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/datos-extras")
    public ResponseEntity<?> VerDatos() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authUsername = authentication.getName();
        Optional<DatosDelUsuario> UsuarioEntity = usuarioRepository1.findByNombreDeUsuario(authUsername);
        if (UsuarioEntity.isPresent()) {
            System.out.println(UsuarioEntity.get().getNombreDeUsuario() + "hola??");
            return ResponseEntity.ok(UsuarioEntity);


        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }

    @GetMapping("/Todos")
    public ResponseEntity<?> get() {
        new ResponseEntity<>(HttpStatus.OK);
        return ResponseEntity.ok(usuarioRepository1.findAll());

    }

    void CrearDatos(DatosDelUsuario usuarioActual, List<FormacionAcademicaEntity> formacion, List<CompetenciasEntity> competencias,
                    List<HabilidadesEntities> habilidades, List<ExperenciaLaboralEntity> experenciasLaborales) {
        for (FormacionAcademicaEntity formacionAcademicaEntity : formacion) {
            formacionAcademicaEntity.setDatosDelUsuario(usuarioActual);
            formacionRepository.save(formacionAcademicaEntity);
        }
        for (HabilidadesEntities habildadesEntities : habilidades) {
            habildadesEntities.setDatosDelUsuario(usuarioActual);
            habilidadesRepository.save(habildadesEntities);
        }

        for (CompetenciasEntity competenciasEntities : competencias) {
            competenciasEntities.setDatosDelUsuario(usuarioActual);
            competenciasRepository.save(competenciasEntities);
        }

        for (ExperenciaLaboralEntity experenciaLaboralEntity : experenciasLaborales) {
            experenciaLaboralEntity.setDatosDelUsuario(usuarioActual);
            experenciaLaboralRepository.save(experenciaLaboralEntity);
        }



    }



}