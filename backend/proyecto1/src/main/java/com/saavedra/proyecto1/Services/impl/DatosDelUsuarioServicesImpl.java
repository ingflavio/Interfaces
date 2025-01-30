package com.saavedra.proyecto1.Services.impl;

import com.saavedra.proyecto1.Services.DatosDelUsuarioServices;
import com.saavedra.proyecto1.controller.Dtos.IniciarSesionRequest;
import com.saavedra.proyecto1.controller.Dtos.IniciarSesionResponse;
import com.saavedra.proyecto1.controller.Dtos.LoginRequest;
import com.saavedra.proyecto1.entity.DatosDelUsuario;
import com.saavedra.proyecto1.entity.Permisos;
import com.saavedra.proyecto1.repository.UsuarioRepository;
import com.saavedra.proyecto1.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Security;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
@Service
public class DatosDelUsuarioServicesImpl implements DatosDelUsuarioServices, UserDetailsService {


    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Optional<DatosDelUsuario> findByNombreDeUsuario(String NombreDeUsuario) {
       return usuarioRepository.findByNombreDeUsuario(NombreDeUsuario);
    }

    @Override
    public String Guardar(LoginRequest usuario) {
        DatosDelUsuario datosDelUsuario = DatosDelUsuario.builder()
                .NombreDeUsuario(usuario.getNombreDeUsuario())
                .Gmail(usuario.getGmail())
                .Contrasena(passwordEncoder.encode(usuario.getContrasena()))
                .build();
        usuarioRepository.save(datosDelUsuario);

        return "Listo";
    }

    @Override
    public IniciarSesionResponse Login(IniciarSesionRequest request) {
        String username= request.getNombreDeUsuario();
        String password= request.getContrasena();

        Authentication authentication= this.Auth(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String Token= jwtUtils.CrearToken(authentication);
        return new IniciarSesionResponse(username,Token,"Bienvenido");
    }

    @Override
    public Authentication Auth(String username, String password) {
        DatosDelUsuario usuario = usuarioRepository.findByNombreDeUsuario(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        if (!passwordEncoder.matches(password, usuario.getContrasena())) {
            throw new BadCredentialsException("Incorrect Password");
        }

        return new UsernamePasswordAuthenticationToken(usuario, password,usuario.getPermisos().stream()
                .map(permiso -> new SimpleGrantedAuthority(permiso.name()))
                .collect(Collectors.toList()));
    }

    @Override
    public String ActualizarDatos(String Username) {
        return "Actualizado Con Exito!";

    }

    @Override
    public String GuardarFoto(MultipartFile file) throws Exception {
        try {
            // Generar un nombre único para el archivo
            String filename = UUID.randomUUID().toString();

            // Obtener el nombre original y el tamaño del archivo
            String fileOriginalName = file.getOriginalFilename();
            long fileSize = file.getSize();
            long maxFileSize = 9 * 1024 * 1024; // 9 MB

            // Validar el tamaño del archivo
            if (fileSize > maxFileSize) {
                throw new IllegalArgumentException("El archivo es demasiado grande. Tamaño máximo permitido: 9 MB.");
            }

            // Validar la extensión del archivo
            if (!fileOriginalName.endsWith(".jpg") && !fileOriginalName.endsWith(".png") && !fileOriginalName.endsWith(".jpeg")) {
                throw new IllegalArgumentException("Formato de archivo no admitido. Solo se permiten archivos JPG, PNG o JPEG.");
            }

            // Obtener la extensión del archivo
            String fileExtension = fileOriginalName.substring(fileOriginalName.lastIndexOf("."));
            String newFileName = filename + fileExtension;

            // Crear la carpeta si no existe
            File folder = new File("src/main/resources/pictures");
            if (!folder.exists()) {
                folder.mkdirs();
            }

            // Guardar el archivo en la ruta especificada
            Path path = Paths.get("src/main/resources/pictures/" + newFileName);
            Files.write(path, file.getBytes());

            // Retornar el nombre del archivo guardado
            return newFileName;

        } catch (Exception e) {
            // Lanzar una excepción con el mensaje de error
            throw new Exception("Error al guardar el archivo: " + e.getMessage(), e);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<DatosDelUsuario> usuario = usuarioRepository.findByNombreDeUsuario(username);

        if (usuario.isPresent()) {
            Set<Permisos> permisos = usuario.get().getPermisos();
            List<GrantedAuthority> authorities = permisos.stream()
                    .map(permiso -> new SimpleGrantedAuthority(permiso.name()))
                    .collect(Collectors.toList());

            return new User(usuario.get().getNombreDeUsuario(), usuario.get().getContrasena(), authorities);
        } else {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }
    }
}


