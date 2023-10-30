package com.example.producto.entity;

import java.time.LocalDateTime;

import com.example.producto.dto.Categoria;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.Data;

@Entity
@Data
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    private Double costo;
    private Integer categoriaId;
    private double tasaIGV;
    private String descripcion;        // Descripción detallada del producto
    private String codigoBarras;       // Código de barras asociado al producto
    private int cantidadStock;          // Cantidad de unidades en stock
    private boolean disponible;         // Indica si el producto está disponible para la venta
    private String proveedor;   
    private LocalDateTime created_at = LocalDateTime.now();
    private LocalDateTime updated_at = LocalDateTime.now();

    @Transient
    private Categoria categoria;

    public Producto() {
        this.costo = (double) 0;
    }
}
