// Reseteo del local storage - Solo para pruebas
//localStorage.clear();

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



