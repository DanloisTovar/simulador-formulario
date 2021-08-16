/* Boton enviar */
const btnEnviar = document.querySelector('#enviar');

/* expreciones regulares */
const regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/* Campos */
const campoMail = document.querySelector('#email');
const campoAsunto = document.querySelector('#asunto');
const campoMensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');
/* enventos */
eventListeners();

function eventListeners() {
  /* cuando inicia la app */
  document.addEventListener('DOMContentLoaded', iniciarApp);

  /* campos del formulario */
  campoMail.addEventListener('blur', validarFormulario);
  campoAsunto.addEventListener('blur', validarFormulario);
  campoMensaje.addEventListener('blur', validarFormulario);
}

/* funciones */

function iniciarApp() {
  console.log('iniciando...');
  btnEnviar.disabled = true;
  btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

/* calidar formulario */
function validarFormulario(e) {
  if (e.target.value.length > 0) {
    /* eliminar errores */
    const error = document.querySelector('p.error');

    if (error) {
      error.remove();
    }

    e.target.classList.remove('border', 'border-red-500');
    e.target.classList.add('border', 'border-green-500');
  } else {
    e.target.classList.remove('border', 'border-green-500');
    e.target.classList.add('border', 'border-red-500');
    /* mostar error */
    mostrarError('Todos los campos son obligatorios!');
  }

  if (e.target.type === 'email') {
    if (regex.test(e.target.value)) {
      /* eliminar errores */
      const error = document.querySelector('p.error');

      if (error) {
        error.remove();
      }
      e.target.classList.remove('border', 'border-red-500');
      e.target.classList.add('border', 'border-green-500');
    } else {
      e.target.classList.remove('border', 'border-green-500');
      e.target.classList.add('border', 'border-red-500');
      /* mostar error */
      mostrarError('El email no es valido!!!');
    }
  }

  if (
    regex.test(campoMail.value) &&
    campoAsunto.value !== '' &&
    campoMensaje !== ''
  ) {
    console.log('Pasaste la vaidacion');
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
  }
}

/* mostar error: */

function mostrarError(mensaje) {
  const mensajeError = document.createElement('p');

  mensajeError.textContent = mensaje;

  mensajeError.classList.add(
    'border',
    'border-red-500',
    'background-red-100',
    'text-red-500',
    'p-3',
    'mt-5',
    'text-center',
    'error'
  );

  const errores = document.querySelectorAll('.error');

  if (errores.length === 0) {
    /* para que apararezca abajo: */
    formulario.appendChild(mensajeError);
    /* para que aparezca arriba: */
    // formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
  }
}
