document.addEventListener('DOMContentLoaded', () => {
  fetch('/productos.json')
    .then(response => response.json())
    .then(productos => {
      const productosContainer = document.getElementById('productos');
      if (productosContainer) {
        productos.forEach(producto => {
          const productoDiv = document.createElement('div');
          productoDiv.classList.add('producto');

          productoDiv.innerHTML = `
            <div class="image-container">
              <img src="${producto.imagen}" alt="fotoproducto">
            </div>
            <h2>${producto.nombre}</h2>
            <p>Precio: $${producto.precio}</p>
            <button class="agregar-carrito" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
          `;

          productosContainer.appendChild(productoDiv);
        });
      } else {
        console.error('No se encontró el contenedor de productos.');
      }
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
  if (cantidadCarrito) {
    cantidadCarrito.textContent = carrito.length;
  } else {
    console.error('No se encontró el elemento cantidad-carrito.');
  }
}

function mostrarCarrito() {
  console.log('Mostrando carrito...');
  const modal = document.getElementById('myModal');
  const productosCarritoModal = document.getElementById('productos-carrito-modal');
  if (modal && productosCarritoModal) {
    productosCarritoModal.innerHTML = '';

    const titulo = document.createElement('h3');
    titulo.textContent = 'Productos en carrito:';
    productosCarritoModal.appendChild(titulo);

    if (carrito.length === 0) {
      const mensaje = document.createElement('p');
      mensaje.textContent = 'El carrito está vacío';
      productosCarritoModal.appendChild(mensaje);
      ocultarBotonVaciar();
    } else {
      const productosAcumulados = {};
      carrito.forEach((item) => {
        if (productosAcumulados[item.producto]) {
          productosAcumulados[item.producto]++;
        } else {
          productosAcumulados[item.producto] = 1;
        }
      });
      Object.entries(productosAcumulados).forEach(([producto, cantidad]) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-div');
        productoDiv.textContent = `${producto} x${cantidad} - Precio: $${carrito.find(item => item.producto === producto).precio * cantidad}`;

        const eliminarBtn = document.createElement('img');
        eliminarBtn.src = '/img/borrar.png';
        eliminarBtn.alt = 'Eliminar';
        eliminarBtn.classList.add('eliminar-img');
        eliminarBtn.addEventListener('click', () => {
          eliminarProducto(producto);
        });
        productoDiv.appendChild(eliminarBtn);

        productosCarritoModal.appendChild(productoDiv);
      });
      mostrarBotonVaciar();
    }

    modal.style.display = 'block';

    const closeModal = document.querySelector('.close');
    if (closeModal) {
      closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    } else {
      console.error('No se encontró el botón de cerrar modal.');
    }

    window.addEventListener('click', (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  } else {
    console.error('No se encontraron los elementos del modal o productos-carrito-modal.');
  }
}

function mostrarBotonVaciar() {
  if (!document.getElementById('vaciarBtn')) {
    const vaciarBtn = document.createElement('button');
    vaciarBtn.textContent = 'Vaciar carrito';
    vaciarBtn.id = 'vaciarBtn';
    vaciarBtn.addEventListener('click', () => {
      vaciarCarrito();
    });
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
      modalContent.appendChild(vaciarBtn);
    } else {
      console.error('No se encontró el contenido del modal.');
    }
  }
}

function ocultarBotonVaciar() {
  const vaciarBtn = document.getElementById('vaciarBtn');
  if (vaciarBtn) {
    vaciarBtn.remove();
  }
}

function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
  mostrarCantidadCarrito();
}

function eliminarProducto(producto) {
  const index = carrito.findIndex(item => item.producto === producto);
  if (index !== -1) {
    carrito.splice(index, 1);
  }
  mostrarCarrito();
  mostrarCantidadCarrito();
}