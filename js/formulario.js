function validarFormulario() {
    var nombre = document.getElementById('nombre').value;
    var correo = document.getElementById('correo').value;
    var mensaje = document.getElementById('mensaje').value;
    var errorNombre = document.getElementById('errorNombre');
    var errorCorreo = document.getElementById('errorCorreo');
    var errorMensaje = document.getElementById('errorMensaje');
    var valido = true;

    errorNombre.textContent = '';
    errorCorreo.textContent = '';
    errorMensaje.textContent = '';

    if (nombre === '') {
        errorNombre.textContent = 'Por favor ingresa tu nombre.';
        valido = false;
    }

    if (correo === '') {
        errorCorreo.textContent = 'Por favor ingresa tu dirección de correo electrónico.';
        valido = false;
    } else if (!validarCorreo(correo)) {
        errorCorreo.textContent = 'Por favor ingresa una dirección de correo válida.';
        valido = false;
    }

    if (mensaje === '') {
        errorMensaje.textContent = 'Por favor ingresa tu opinión.';
        valido = false;
    }

    return valido;
}

function validarCorreo(correo) {
    // Expresión regular para validar correo electrónico
    var patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patronCorreo.test(correo);
}