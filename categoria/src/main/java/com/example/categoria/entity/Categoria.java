package com.example.categoria.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String titulo;
    private String descripccion;
    private String imagenUrl;    // URL de la imagen asociada a la categoría
    private int orden;           // Orden de visualización de la categoría
    private String etiqueta;     // Etiqueta asociada a la categoría
    private String color;        // Color asociado a la categoría (puede ser utilizado en la interfaz de usuario) 
    private LocalDateTime created_at = LocalDateTime.now();
    private LocalDateTime updated_at = LocalDateTime.now();
}
