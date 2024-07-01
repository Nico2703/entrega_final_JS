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

function cargaProductosLocalStorage() {
    const productos = localStorage.getItem('productos');
    return productos ? JSON.parse(productos) : guardarProductoLocalStorage();
}

function guardarProductoLocalStorage() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

function agregarPedido(id, cantidad) {
    const producto = productos.find(p => p.id === id);
    producto ? null : alert("Producto no encontrado");
    
    producto.stock -= cantidad;

    cantidadStock = document.getElementById('stock');
    cantidadStock.setAttribute("style", "margin: 50px 50px; color: cadetblue; font-size: large; font-weight: bolder;  text-decoration-line: overline;");
    if (producto.stock < 0) {
        cantidadStock.innerHTML = `<p> -- Sin stock disponible de ${producto.nombre} -- </p>`;
        
        Swal.fire({
            position: "center",
            icon: "error",
            title: `Stock no disponible de ${producto.nombre}`,
            showConfirmButton: false,
            timer: 1000
        });
        return;
    }
    else{
        cantidadStock.innerHTML = `<p> -- Stock disponible de ${producto.nombre}: ${producto.stock} -- </p>`;
    }
    
    const pedidoItem = pedidos.find(item => item.id === id);

    if (pedidoItem) {
        pedidoItem.cantidad += cantidad;
        pedidoItem.precioFinal = pedidoItem.cantidad * producto.precio;
    } else {
        pedidos.push({
            ...producto,
            cantidad: cantidad,
            precioFinal: parseFloat((cantidad * producto.precio) * 1.21)
        });
    }
    
    Toastify({
        text: "Agregado al carrito",
        duration: 1500,
        gravity: "top",
        position: "center",
        style: { background: "cadetblue", color: "black"}
    }).showToast();

    guardarProductoLocalStorage();
    guardarPedidoSessionStorage();
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
mostrarHora();

function redirigirURL() {
    var newWindow = window.open();
    newWindow.location.href = 'https://www.johnniewalker.com/es-ar/';
}
