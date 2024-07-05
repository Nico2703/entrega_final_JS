var productosGuardados = localStorage.getItem('productos');
if (productosGuardados){
    var productos = JSON.parse(productosGuardados);
}else{
    fetch('../productos.json')
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('productos', JSON.stringify(data.productos));
        console.log('Productos cargados en localStorage:', data.productos);
    })
    .catch(error => console.error('Error al cargar los productos', error))
}

const envio = [
    {opcion: "Retiro en local", costo: 0},
    {opcion: "Zona CABA", costo: 5200},
    {opcion: "Zona GBA (Todas)", costo: 8400},
    {opcion: "Interior del país", costo: 12500},
];

let pedidos = cargaPedidosSessionStorage();
let compras = cargaComprasLocalStorage();

document.addEventListener('DOMContentLoaded', () => {
    mostrarPedido();
});

const tablaPedidos = document.getElementById('tablaPedidos');
const tablaBody_Pedidos = document.createElement('tbody');
tablaPedidos.appendChild(tablaBody_Pedidos);



