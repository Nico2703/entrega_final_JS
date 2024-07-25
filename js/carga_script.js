document.addEventListener('DOMContentLoaded', () => {
    mostrarPedido();
    mostrarHora();
});

let pedidos = cargaPedidosSessionStorage();
let compras = cargaComprasLocalStorage();

const tablaPedidos = document.getElementById('tablaPedidos');
const tablaBody_Pedidos = document.createElement('tbody');
tablaPedidos.appendChild(tablaBody_Pedidos);

const tablaMedia = document.getElementById('tablaMedia');
const tablaBody_Media = document.createElement('tbody');
tablaMedia.appendChild(tablaBody_Media);

const tablaFinal = document.getElementById('tablaFinal');
const tablaBody_Final = document.createElement('tbody');
tablaFinal.appendChild(tablaBody_Final);

const envio = [
    {opcion: "Retiro en local", costo: 0},
    {opcion: "Zona CABA", costo: 5200},
    {opcion: "Zona GBA (Todas)", costo: 8400},
    {opcion: "Interior del país", costo: 12500},
];