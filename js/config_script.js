const main = document.getElementById('main');
main.style.margin = '80px 100px';
main.style.display = 'flex';
main.style.flexDirection = 'column';

let contenedor = document.createElement('div');
contenedor.innerHTML = `<h2> Chequeá nuestros productos disponibles </h2>
                        <h2> Elegí el tuyo y armá tu pedido </h2>
                        <h2>  Aguardamos tu compra </h2>
                        <h3>  Para consultas, comunicate al + 54 11 4345 3221 </h3>`
contenedor.style.width = '50%';
contenedor.addEventListener('mouseover', () => {
    contenedor.style.border = '2px outset cadetblue';
    contenedor.style.fontSize = 'larger';
})
contenedor.addEventListener('mouseout', () => {
    contenedor.style.border = 'none';
    contenedor.style.fontSize = 'medium';
})
main.appendChild(contenedor);
