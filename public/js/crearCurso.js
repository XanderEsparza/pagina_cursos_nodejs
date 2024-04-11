document.getElementById('agregarCampo').addEventListener('click', function() {
    // Crear input

        // Crear input
        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'objetivos');
        input.setAttribute('name', 'objetivos[]');
        input.setAttribute('required', 'true');
        input.setAttribute('maxlength', '100');
        input.setAttribute('placeholder', 'Objetivo...');

        // Crear botón para eliminar el campo
        var botonEliminar = document.createElement('a');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.href = '#';
        botonEliminar.addEventListener('click', function() {
            // Eliminar el campo cuando se hace clic en el botón
            document.getElementById('div_objetivos').removeChild(divFormGroup);
        });

        // Crear div para agrupar el input y el botón
        var divFormGroup = document.createElement('div');
        divFormGroup.classList.add('form-group');
        divFormGroup.appendChild(input);
        divFormGroup.appendChild(botonEliminar);

        // Agregar el nuevo campo al final del formulario
        document.getElementById('div_objetivos').appendChild(divFormGroup);

    // Agregar un campo cuando se hace clic en el botón
});