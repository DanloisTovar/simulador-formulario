/* Boton enviar */
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');

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

  /* enviar email: */
  formulario.addEventListener('submit', enviarEmail);

  /* boton reset: */
  btnReset.addEventListener('click', resetearFormulario);
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

function enviarEmail(e) {
  e.preventDefault();
  /* mostar spinner */
  const spinner = document.querySelector('#spinner');
  /* una vez que se envie el mail se cambia el status a mostar spiner: */
  spinner.style.display = 'flex';

  /* ocultar spinner despues de 3 segundos: */

  /* crear parrafo de mensaje de exito: */
  const parrafo = document.createElement('p');

  setTimeout(() => {
    spinner.style.display = 'none';

    /* notificacion de mensaje enviado: */
    parrafo.textContent = 'El mensaje fue enviado con exito!';
    /* estilos parrafo */
    parrafo.classList.add(
      'text-center',
      'my-10',
      'p-5',
      'bg-green-500',
      'text-white',
      'font-bold',
      'uppercase'
    );

    /* insertar antes del spinner */
    formulario.insertBefore(parrafo, spinner);
    console.log('enviado');

    setTimeout(() => {
      /* remover el mensaje de envio exitoso: */

      parrafo.remove();
      resetearFormulario();
      iniciarApp();
    }, 5000);
  }, 3000);
}

/* resetear formulario: */

function resetearFormulario() {
  formulario.reset();
}
