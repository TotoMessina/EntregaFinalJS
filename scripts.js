document.getElementById('miFormulario').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var edad = document.getElementById('edad').value;
    var correo = document.getElementById('correo').value;
    
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('apellido', apellido);
    localStorage.setItem('correo', correo);

    if (nombre !== '' && apellido !== '' && edad !== '' && correo !== '') {
        document.getElementById('formularioContainer').style.display = 'none';
        document.getElementById('contenidoOculto').style.display = 'block';
        miHeader.innerHTML = 'Hola ' + nombre + ' ' + apellido + ', bienvenido a Facebook';
    } else {
        alert('Por favor completa todos los campos del formulario.');
    }
});

function agregarMensaje(mensaje) {
    var nombre = localStorage.getItem('nombre');
    var apellido = localStorage.getItem('apellido');

    var mensajeElemento = document.createElement('p');
    mensajeElemento.textContent = nombre + ' ' + apellido + ': ' + mensaje;

    var mensajesContainer = document.getElementById('mensajesContainer');

    mensajesContainer.appendChild(mensajeElemento);
}

function manejarPresionarEnter(event) {
    if (event.key === 'Enter') {
        enviarMensaje();
    }
}

function enviarMensaje() {
    var mensajeInput = document.getElementById('mensajeInput');
    var mensaje = mensajeInput.value.trim();
    
    if (mensaje !== '') {
        agregarMensaje(mensaje);
        mensajeInput.value = '';
    }
}

document.getElementById('mensajeInput').addEventListener('keypress', manejarPresionarEnter);
document.getElementById('subirMensajeBtn').addEventListener('click', enviarMensaje);