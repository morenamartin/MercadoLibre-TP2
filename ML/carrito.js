const selectorHora = document.getElementById('selector-hora');

selectorHora.addEventListener('change', (evento) => {
    const horaSeleccionada = evento.target.value;
    console.log("El usuario programó la entrega a las: " + horaSeleccionada);
})

