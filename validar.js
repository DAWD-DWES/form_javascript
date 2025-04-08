document.addEventListener("DOMContentLoaded", function () {
  const formRegistro = document.getElementById("registro");

  const mensajesError = {
    usuario: {
      valueMissing: "El nombre de usuario es obligatorio.",
      patternMismatch: "Solo se permiten letras y espacios.",
      tooShort: "Debe tener al menos 3 caracteres."
    },
    password1: {
      valueMissing: "La contraseña es obligatoria.",
      patternMismatch: "Debe tener mayúsculas, minúsculas, número y símbolo.",
      tooShort: "Debe tener al menos 8 caracteres."
    },
    password2: {
      valueMissing: "Debe repetir la contraseña.",
      patternMismatch: "Debe tener mayúsculas, minúsculas, número y símbolo.",
      tooShort: "Debe tener al menos 8 caracteres."
    },
    email: {
      valueMissing: "El correo electrónico es obligatorio.",
      typeMismatch: "Debes introducir un correo válido (ej: usuario@dominio.com)."
    }
  };

  // Validación al enviar
  formRegistro.addEventListener("submit", (event) => {
    let valido = formRegistro.checkValidity();

    // Limpia mensajes previos
    formRegistro.querySelectorAll(".text-danger").forEach(div => div.textContent = "");

    // Validar contraseñas iguales
    const password1 = document.getElementById("password1");
    const password2 = document.getElementById("password2");
    const passwordErrorBox = document.getElementById("password2Error");

    if (password1.value !== password2.value) {
      passwordErrorBox.textContent = "Las contraseñas introducidas deben ser iguales.";
      event.preventDefault();
      event.stopImmediatePropagation();
      valido = false;
    }

    // Si el formulario no es válido, evitamos el envío
    if (!valido) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });

  // Manejo de errores personalizados por campo
  formRegistro.querySelectorAll("input").forEach((input) => {
    const errorBox = document.getElementById(input.id + "Error");

    input.addEventListener("invalid", (event) => {
      event.preventDefault(); // Evita mensaje nativo del navegador

      const errores = mensajesError[input.name];
      if (!errores) return;

      for (const tipo in input.validity) {
        if (input.validity[tipo] && errores?.[tipo]) {
          errorBox.textContent = errores[tipo];
          break;
        }
      }
    });

    input.addEventListener("input", () => {
      // Limpiar mensaje si el campo se vuelve válido
      const errores = mensajesError[input.name];
      if (input.checkValidity()) {
        errorBox.textContent = "";
      } else {
        for (const tipo in input.validity) {
          if (input.validity[tipo] && errores?.[tipo]) {
            errorBox.textContent = errores[tipo];
            break;
          }
        }
      }
    });
  });
});
