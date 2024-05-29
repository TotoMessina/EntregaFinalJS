document.addEventListener('DOMContentLoaded', function() {
    cargarMensajesAlmacenados();
    cargarConfiguracion();
    cargarValoraciones();

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

            console.log('Formulario enviado');
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
    
        var mensajeElemento = document.createElement('div');
        mensajeElemento.classList.add('mensaje');
    
        mensajeElemento.innerHTML = mensajeCompleto;
    
        var estrellas = document.createElement('div');
        estrellas.classList.add('valoracion');
        for (var i = 1; i <= 5; i++) {
            var estrella = document.createElement('span');
            estrella.innerHTML = '★';
            estrella.dataset.valoracion = i;
            estrella.addEventListener('click', function() {
                valorarMensaje(this.dataset.valoracion, mensajeElemento);
            });
            estrella.style.color = '#d3d3d3'; 
            estrella.classList.add('estrella'); 
            estrellas.appendChild(estrella);
        }
    
        mensajeElemento.appendChild(estrellas);
    
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

    function cargarConfiguracion() {
        const nombre = localStorage.getItem('nombre') || '';
        const apellido = localStorage.getItem('apellido') || '';
        const email = localStorage.getItem('correo') || '';
        const tema = localStorage.getItem('configTema') || 'light';

        const nombreInput = document.getElementById('nombre');
        const apellidoInput = document.getElementById('apellido');
        const emailInput = document.getElementById('email');
        const temaSelect = document.getElementById('tema');

        if (nombreInput) nombreInput.value = nombre;
        if (apellidoInput) apellidoInput.value = apellido;
        if (emailInput) emailInput.value = email;
        if (temaSelect) temaSelect.value = tema;

        document.body.className = tema;
    }

    function guardarConfiguracion() {
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const tema = document.getElementById('tema').value;

        localStorage.setItem('nombre', nombre);
        localStorage.setItem('apellido', apellido);
        localStorage.setItem('correo', email);
        localStorage.setItem('configTema', tema);

        document.body.className = tema;
        alert('Configuración guardada exitosamente.');
    }

    window.guardarConfiguracion = guardarConfiguracion;
});

function cargarValoraciones() {
    var mensajesValorados = JSON.parse(localStorage.getItem('mensajesValorados')) || {};
    var mensajes = document.querySelectorAll('.mensaje');
    mensajes.forEach(function(mensajeElemento) {
        var mensaje = mensajeElemento.querySelector('span').innerText.trim();
        var valoracion = mensajesValorados[mensaje];
        if (valoracion) {
            aplicarColorEstrellas(mensajeElemento, valoracion);
        }
    });
}

function valorarMensaje(valoracion, mensajeElemento) {
    aplicarColorEstrellas(mensajeElemento, valoracion);
    var mensaje = mensajeElemento.querySelector('span').innerText.trim();
    var mensajesValorados = JSON.parse(localStorage.getItem('mensajesValorados')) || {};
    mensajesValorados[mensaje] = valoracion;
    localStorage.setItem('mensajesValorados', JSON.stringify(mensajesValorados));
    alert('Has valorado este mensaje con ' + valoracion + ' estrellas.');
}

function aplicarColorEstrellas(mensajeElemento, valoracion) {
    var estrellas = mensajeElemento.querySelector('.valoracion').querySelectorAll('span');
    for (var i = 0; i < estrellas.length; i++) {
        if (i < valoracion) {
            estrellas[i].style.color = '#ffd700';
        } else {
            estrellas[i].style.color = '#d3d3d3';
        }
    }
}