const seleccion_2 = document.getElementById('opciones_2');

envio.forEach(objeto => {
    const opcion_2 = document.createElement('option');
    opcion_2.text = objeto.opcion + ' - $' + objeto.costo;
    seleccion_2.add(opcion_2);
});

const formulario = document.getElementById('form_in');

formulario.addEventListener("submit", function(event){
    event.preventDefault();
    if (pedidos.length===0){
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Carrito vacío",
            showConfirmButton: false,
            timer: 1000
        });
    }
    else{
        Swal.fire({
            title: "Confirma la compra ?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Compra confirmada!", "", "success");
                const envioSeleccionado = seleccion_2.value;
                manejoCompra(envioSeleccionado);
            } else if (result.isDenied) {
                Swal.fire("Compra cancelada", "", "error");
            }
        });
    }
});
