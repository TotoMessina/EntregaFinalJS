document.addEventListener('DOMContentLoaded', function() {
    cargarMensajesAlmacenados();

    var miFormulario = document.getElementById('miFormulario');
    if (miFormulario) {
        miFormulario.addEventListener('submit', function(event) {
            event.preventDefault();
            enviarFormulario();
        });
    }

    var subirMensajeBtn = document.getElementById('subirMensajeBtn');
    if (subirMensajeBtn) {
        subirMensajeBtn.addEventListener('click', function() {
            enviarMensaje();
        });
    }

    document.addEventListener('keypress', function(event) {
        var mensajeInput = document.getElementById('mensajeInput');
        if (event.key === 'Enter' && document.activeElement === mensajeInput) {
            event.preventDefault();
            enviarMensaje();
        }
    });

    function enviarFormulario() {
        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var edad = document.getElementById('edad').value;
        var correo = document.getElementById('correo').value;
    
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('apellido', apellido);
        localStorage.setItem('correo', correo);
        localStorage.setItem('edad', edad);
    
        if (nombre !== '' && apellido !== '' && edad !== '' && correo !== '') {
            miHeader.innerHTML = 'Hola ' + nombre + ' ' + apellido + ', bienvenido a Facebook';
    
            // Aquí colocarías el código para enviar el formulario al servidor
            console.log('Formulario enviado');
    
            // Redirigir al usuario a inicio.html
            window.location.href = 'inicio.html';
        } else {
            alert('Por favor completa todos los campos del formulario.');
        }
    }

    function enviarMensaje() {
        var mensajeInput = document.getElementById('mensajeInput');
        var mensaje = mensajeInput.value.trim();
        
        if (mensaje !== '') {
            agregarMensaje(mensaje);
            mensajeInput.value = '';

            guardarMensajeEnAlmacenamiento(mensaje);
        }
    }

    function agregarMensaje(mensaje) {
        var nombre = localStorage.getItem('nombre');
        var apellido = localStorage.getItem('apellido');
        var edad = localStorage.getItem('edad');
        var correo = localStorage.getItem('correo');
    
        var fechaHora = new Date(); 
        var fechaHoraFormato = fechaHora.toLocaleString(); 
    
        var mensajeCompleto = '<span style="color: #1877f2; font-weight: bold;">' + nombre + ' ' + apellido + '</span><br><br>' + mensaje + '<br><span style="font-size: smaller; color: #888;">' + fechaHoraFormato + '</span>';
    
        var mensajeElemento = document.createElement('p');
        mensajeElemento.innerHTML = mensajeCompleto;
    
        mensajeElemento.addEventListener('click', function() {
            window.location.href = 'perfil.html?nombre=' + encodeURIComponent(nombre) + '&apellido=' + encodeURIComponent(apellido) + '&edad=' + encodeURIComponent(edad) + '&correo=' + encodeURIComponent(correo);
        });
    
        var mensajesContainer = document.getElementById('mensajesContainer');
    
        if (mensajesContainer.firstChild) {
            mensajesContainer.insertBefore(mensajeElemento, mensajesContainer.firstChild);
        } else {
            mensajesContainer.appendChild(mensajeElemento);
        }
    }
    
    

    function cargarMensajesAlmacenados() {
        var mensajesGuardados = JSON.parse(localStorage.getItem('mensajes'));
        var mensajesContainer = document.getElementById('mensajesContainer');
        if (mensajesGuardados && mensajesContainer) {
            mensajesGuardados.forEach(function(mensaje) {
                agregarMensaje(mensaje);
            });
        }
    }
    

    function guardarMensajeEnAlmacenamiento(mensaje) {
        var mensajesGuardados = JSON.parse(localStorage.getItem('mensajes')) || [];
        mensajesGuardados.push(mensaje);
        localStorage.setItem('mensajes', JSON.stringify(mensajesGuardados));
    }
});

