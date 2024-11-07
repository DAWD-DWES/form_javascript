document.addEventListener("DOMContentLoaded", function () {
    const formRegistro = document.getElementById('registro');
    // Añade el evento submit al formulario
    formRegistro.addEventListener("submit", (event) => {
        // Luego comprueba la validez general del formulario
        const allValid = formRegistro.checkValidity();
        if (!allValid) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
        const password1 = document.getElementById('password1');
        const password2 = document.getElementById('password2');
        const passwordErrorBox = document.getElementById('password2Error');

        // Limpia cualquier estado de error previo
        passwordErrorBox.textContent = "";

        // Verifica si las contraseñas coinciden
        if (password1.value !== password2.value) {
            passwordErrorBox.textContent = "Los passwords introducidos deben de ser iguales";
            event.preventDefault(); // Previene el envío del formulario
            event.stopImmediatePropagation();
        }
    });

    // Evento invalid y input para otros campos
    const fields = Array.from(formRegistro.elements);
    fields.forEach((field) => {
        const errorBox = document.getElementById(field.id + "Error");
        field.addEventListener("invalid", (event) => {
            let message = "";
            if (field.id === "usuario" && (field.validity.valueMissing || field.validity.tooShort || field.validity.patternMismatch)) {
                message = "El nombre debe estar formado por al menos 3 caracteres de palabra.";
            } else if (field.id === 'password1' && (field.validity.valueMissing || field.validity.patternMismatch)) {
                message = "El password debe tener una minúscula, mayúscula, dígito y caracter especial";
            } else if (field.id === "email" && (field.validity.valueMissing || field.validity.patternMismatch)) {
                message = "El correo debe tener un formato correcto";
            }
            errorBox.textContent = message;
        });

        field.addEventListener("input", () => {
            // Limpia el mensaje de error personalizado
            errorBox.textContent = ""; // Limpia el texto del error
        });
    });
});
