function cargaPedidosSessionStorage() {
    const pedidos = sessionStorage.getItem('pedidos');
    return pedidos ? JSON.parse(pedidos) : [];
}

function guardarPedidoSessionStorage() {
    sessionStorage.setItem('pedidos', JSON.stringify(pedidos));
}

function cargaComprasLocalStorage() {
    const compras = localStorage.getItem('compras');
    return compras ? JSON.parse(compras) : [];
}

function guardarCompraLocalStorage() {
    localStorage.setItem('compras', JSON.stringify(compras));
}

function mostrarPedido() {
    pedidos.forEach(item => {
        const contenedor = document.createElement('tr');
        contenedor.innerHTML = `<td> ${item.nombre} </td>
                                <td> $${item.precio} </td>
                                <td> ${item.cantidad} </td>
                                <td> $${item.precioFinal.toFixed(2)} </td>`;  
    tablaBody_Pedidos.appendChild(contenedor);                          
    });
}

function mostrarHora(){
    const DATE = new Date();
    const TIME = DATE.toLocaleString();
    const footer = document.getElementById('footer');
    const footerTime = document.createElement('p');
    footer.appendChild(footerTime);
    footerTime.innerHTML = TIME;
    footerTime.style.color = 'antiquewhite';
    footerTime.style.marginTop = '20px';
}

function redirigirURL() {
    let newWindow = window.open();
    newWindow.location.href = 'https://www.johnniewalker.com/es-ar/';
}

function agregarPedido(id, cantidad) {
    const producto = productos.find(p => p.id === id);
    producto ? null :   Swal.fire({
        position: "center",
        icon: "error",
        title: `Producto no encontrado`,
        showConfirmButton: false,
        timer: 1000
    });
    producto.stock -= cantidad;
    const pedidoItem = pedidos.find(item => item.id === id);
    manejoStock(producto, cantidad, pedidoItem);
}

function manejoStock(producto, cantidad, pedidoItem){
    cantidadStock = document.getElementById('stock');
    cantidadStock.setAttribute("style", "margin: 50px 50px; width: 25%; color: cadetblue; background-color: antiquewhite; font-size: large; font-weight: bolder; border: 3px solid cadetblue;");
    const mensajeStock = producto.stock < 0 
    ? `<p> -- Sin stock disponible de ${producto.nombre} -- </p>`
    : `<p> -- Stock disponible de ${producto.nombre}: ${producto.stock} -- </p>`;
    cantidadStock.innerHTML = mensajeStock;
    if (producto.stock < 0) { 
        Swal.fire({
            position: "center",
            icon: "error",
            title: `Stock no disponible de ${producto.nombre}`,
            showConfirmButton: false,
            timer: 1000
        });
    }else{
        Toastify({
            text: "Agregado al carrito",
            duration: 1500,
            gravity: "top",
            position: "center",
            style: { background: "cadetblue", color: "black"}
        }).showToast();
        manejoPedido(producto, cantidad, pedidoItem);
    }
}

function manejoPedido(producto, cantidad, pedidoItem){
    pedidoItem ? ( 
            pedidoItem.cantidad += cantidad,
            pedidoItem.precioFinal = pedidoItem.cantidad * producto.precio * 1.21
        ) 
        : pedidos.push({
            ...producto,
            cantidad: cantidad,
            precioFinal: parseFloat((cantidad * producto.precio) * 1.21)
        });
    guardarPedidoSessionStorage();
    localStorage.setItem('productos', JSON.stringify(productos));
}

function manejoCompra(envioSeleccionado){
    let sumaPedido = 0;
    pedidos.forEach(item => {
    sumaPedido += item.precioFinal;
    });
    const cadenaEnvioSeleccionado = envioSeleccionado.split('-');
    const costoEnvioSeleccionado = cadenaEnvioSeleccionado[1].replace(/\$/g, '');
    sumaPedido += parseFloat(costoEnvioSeleccionado);
    let contenedor = document.createElement('tr');
    contenedor.innerHTML = `<td> $${parseFloat(costoEnvioSeleccionado)} </td>
                            <td> $${sumaPedido.toFixed(2)} </td>`;
    tablaBody_Media.appendChild(contenedor);
    compras.push({
        pedidos: pedidos,
        envio: costoEnvioSeleccionado,
        importeFinal: sumaPedido.toFixed(2)
    });
    pedidos.forEach(function(item, index){
        let contenedor = document.createElement('tr');
        contenedor.innerHTML = `<td> ${index+1}- COMPRA CONFIRMADA DE (${item.cantidad}) ${item.marca.toUpperCase()} - ${item.nombre.toUpperCase()}</td>`;
        tablaBody_Final.appendChild(contenedor);
    });
    guardarCompraLocalStorage();
    sessionStorage.clear();
    let confirmarBoton = document.getElementById('botonConfirma');
    let limpiarBoton = document.getElementById('botonLimpia');
    confirmarBoton.style.display = "none";
    limpiarBoton.style.display = "none";
}