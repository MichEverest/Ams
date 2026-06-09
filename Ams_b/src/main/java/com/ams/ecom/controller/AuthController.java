package com.ams.ecom.controller;

import com.ams.ecom.model.User;
import com.ams.ecom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Error: El correo electrónico ya está registrado."));
        }

        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Usuario registrado con éxito", "userId", savedUser.getId()));
    }

    @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
    String email = credentials.get("email");
    String password = credentials.get("password");

    Optional<User> userOpt = userRepository.findByEmail(email);

    if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(password)) {
        return ResponseEntity.status(401)
                .body(Map.of("message", "Error: Credenciales incorrectas."));
    }

    User user = userOpt.get();
    return ResponseEntity.ok(Map.of(
            "message", "Login exitoso",
            "userId", user.getId(),
            "name", user.getName(),
            "role", user.getRole()
    ));
}
    
}