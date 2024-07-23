const divMain = document.getElementById('cards');
divMain.style.margin = '40px 40px';
divMain.style.display = 'flex';
divMain.style.flexDirection = 'row';

const peticionProductos = async () => {
    const respuesta = await fetch('../productos.json');
    const datos = await respuesta.json();
    const data = await datos;
    for (const producto of data) {
        let contenedor = document.createElement('div');
        contenedor.innerHTML = `<img src="../assets/img/${producto.codImg}" alt="">
                                <h4 style='padding-bottom: 5px;'> ${producto.nombre} </h4>
                                <h5> ${producto.categoria} </h5>
                                <h5> ${producto.descripcion} </h5> 
                                <h5 style='padding-bottom: 10px;'> ${producto.marca} </h5> 
                                <h5> Precio: $${producto.precio} </h5>
                                <button style='margin-top: 10px; background-color: cadetblue;' onclick="agregarPedido(${producto.id}, 1)"> Agregar a Pedidos </button>`
        contenedor.style.width = '15%';
        contenedor.style.border = '2px solid cadetblue';
        contenedor.style.padding = '10px';
        contenedor.style.margin = '0px 10px';
        contenedor.style.backgroundColor = 'antiquewhite';
        contenedor.addEventListener('mouseover', () => {
        contenedor.style.backgroundColor = 'black';
        contenedor.style.color = 'antiquewhite';
        })
        contenedor.addEventListener('mouseout', () => {
        contenedor.style.backgroundColor = 'antiquewhite';
        contenedor.style.color = 'black';
        })
        divMain.appendChild(contenedor);
        }
        let productosGuardados = localStorage.getItem('productos');
        if (productosGuardados){
            productos = JSON.parse(productosGuardados);
        }else{
            localStorage.setItem('productos', JSON.stringify(data));
        }
}

peticionProductos()
    .catch(error =>
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Error al cargar productos",
            showConfirmButton: false,
            timer: 0
        })
);
