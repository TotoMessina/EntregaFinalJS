document.addEventListener('DOMContentLoaded', () => {
  fetch('/productos.json')
    .then(response => response.json())
    .then(productos => {
      const productosContainer = document.getElementById('productos');
      productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        
        productoDiv.innerHTML = `
          <h2>${producto.nombre}</h2>
          <div class="image-container">
            <img src="${producto.imagen}" alt="fotoproducto">
          </div>
          <p>Precio: $${producto.precio}</p>
          <button class="agregar-carrito" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
        `;
        
        productosContainer.appendChild(productoDiv);
      });
    })
    .catch(error => console.error('Error al cargar los productos:', error));
});

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
  console.log('Carrito clicado');
  const productosCarrito = document.getElementById('productos-carrito');
  productosCarrito.innerHTML = '';
  if (carrito.length === 0) {
    productosCarrito.textContent = 'El carrito está vacío';
  } else {
    carrito.forEach(item => {
      const producto = document.createElement('div');
      producto.textContent = `${item.nombre} - Precio: $${item.precio}`;
      productosCarrito.appendChild(producto);
    });
  }
  productosCarrito.classList.toggle('oculto');
  console.log('productos-carrito:', productosCarrito.classList);
}
