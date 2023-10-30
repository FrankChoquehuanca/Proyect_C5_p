package com.example.venta.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.example.venta.dto.Cliente;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String serie;
    private String numero;
    private String codigo;
    private Integer clienteId;
    private Double total;  // Monto total de la venta
    private String estado;  // Estado actual de la venta (por ejemplo, "En proceso", "Completada", etc.)
    private String tipoPago;  // Método de pago utilizado (por ejemplo, "Tarjeta de crédito", "Efectivo", etc.)
    private String direccionEnvio;  // Dirección a la que se enviarán los productos, si aplica
    private String observaciones;  // Campo para notas u observaciones adicionales sobre la venta

    private LocalDateTime created_at = LocalDateTime.now();
    private LocalDateTime updated_at = LocalDateTime.now();

    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "venta_id")
    private List<VentaDetalle> detalle;
    @Transient
    private Cliente cliente;
}