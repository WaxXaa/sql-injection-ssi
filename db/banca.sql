CREATE DATABASE IF NOT EXISTS banco_demo;
USE banco_demo;

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(50),
  clave VARCHAR(50),
  direccion VARCHAR(100),
  monto DECIMAL(10, 2),
  tarjeta_credito VARCHAR(20)
);

INSERT INTO usuarios (usuario, clave, direccion, monto, tarjeta_credito) VALUES
('admin', 'admin123', 'Av. Bancaria #123', 12500.75, '4111 1111 1111 1111'),
('cliente1', '1234', 'Calle Falsa 123', 380.50, '5500 0000 0000 0004');
