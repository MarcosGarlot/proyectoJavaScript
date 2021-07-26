//objetos promo y burger
function Promo(id,hamburguesa, papas, precio){
    this.id=id;
    this.hamburguesa=hamburguesa;    
    this.papas=papas;
    this.precio=parseFloat(precio);
}

const promociones = document.getElementById("promociones");
const promos  = [];

promos.push(new Promo("01"," simple "," mediana ",500));
promos.push(new Promo("02"," de lentejas "," mediana ",600));
promos.push(new Promo("03"," triple "," grande ",700));
//Itera promos y creo un dv por cada uno
for (const promo of promos) {
        //CREAMOS UN NODO ELEMENTO DIV
        let divPromo = document.createElement('div');
        //ASIGNAMOS UNA CLASE AL DIV CREADO
        divPromo.classList.add("card");
        //DEFINIMOS LA ESTRUCTURA INTERNA DEL DIV
        divPromo.innerHTML = `<div class="circulo_card">
                                    <h3>${promo.id}</h3>
                                </div>
                                <div class="contenido_card">
                                    <img src="assets/images/promo_demo.png" alt="promo hamburguesa">
                                    <p>Hamburguesa: ${promo.hamburguesa}</p>
                                    <p>Papas: ${promo.papas}</p>
                                    <p>Precio: $${promo.precio}</p>
                                    <p></p>
                                    <a href="#">Agregar al carrito</a>
                                </div>`;
        //agrega divs al dom
        promociones.appendChild(divPromo);
}