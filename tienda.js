let carrito = [];

function agregarAlCarrito(producto, precio) {
  carrito.push({ producto, precio });
  mostrarCantidadCarrito();
}

function mostrarCantidadCarrito() {
  const cantidadCarrito = document.getElementById('cantidad-carrito');
  cantidadCarrito.textContent = carrito.length;
}

function mostrarCarrito() {
  const productosCarrito = document.getElementById('productos-carrito');
  productosCarrito.innerHTML = '';
  if (carrito.length === 0) {
    productosCarrito.textContent = 'El carrito está vacío';
  } else {
    carrito.forEach(item => {
      const producto = document.createElement('div');
      producto.textContent = `${item.producto} - Precio: $${item.precio}`;
      productosCarrito.appendChild(producto);
    });
  }
  productosCarrito.classList.toggle('oculto');
}
