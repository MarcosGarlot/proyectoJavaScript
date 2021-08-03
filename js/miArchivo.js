let precioTotal = 0;
let precioBurgerArmada=0;
const suma=(a,b)=>a+b; 
const resta=(a,b)=>a-b;
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
//Itera promos y crea una card por cada uno de los objetos del array
for (const promo of promos) {
        let divPromo = document.createElement('div');
        //ASIGNAMOS UNA CLASE AL DIV CREADO
        divPromo.classList.add("card");
        //DEFINIMOS LA ESTRUCTURA INTERNA DEL DIV
        divPromo.innerHTML = `<div class="circulo_card">
                                    <h3>${promo.id}</h3>
                                </div>
                                <div class="contenido_card textos_txt">
                                    <img src="assets/images/promo_demo.png" alt="promo hamburguesa">
                                    <p>Hamburguesa: ${promo.hamburguesa}</p>
                                    <p>Papas: ${promo.papas}</p>
                                    <p>Precio: $${promo.precio}</p>
                                    <p></p>
                                    <a href="#" class="boton_para_carrito">Agregar al carrito</a>
                                </div>`;
        //agrega divs al id
        promociones.appendChild(divPromo);
}
//Array con objetos ingredientes
function Ingrediente(id,nombre){
    this.id=id;
    this.nombre=nombre;    
}
const ingredientes_list=[];

ingredientes_list.push(new Ingrediente ("001","Pepinos"));
ingredientes_list.push(new Ingrediente ("002","Cebolla"));
ingredientes_list.push(new Ingrediente ("003","Cebolla morada"));
ingredientes_list.push(new Ingrediente ("004","Panceta"));
ingredientes_list.push(new Ingrediente ("005","Cheddar"));
ingredientes_list.push(new Ingrediente ("006","Tomáte"));
ingredientes_list.push(new Ingrediente ("007","Lechuga"));

//Form con ingredientes de array para armar haburguesa
const ingredientes_hamburguesa_txt = document.getElementById("form_ingredientes");
//Itera 1 por 1 los ingredientes del array y crea botones en el form
for (let index = 0; index < 7; index++) {
        let div_ingredientes = document.createElement('div');
        div_ingredientes.innerHTML = 
        `<div>
            <p class="textos_txt list_txt">
                ${ingredientes_list[index].nombre}
            </p>
            <input type="button" id="${ingredientes_list[index].id}"  class="boton_armado boton_armado_agregado" value="+"></input>
            <input type="button" id="${ingredientes_list[index].id}"  class="boton_armado boton_armado_removido" value="-"></input>
         </div>`;
        ingredientes_hamburguesa_txt.appendChild(div_ingredientes);
}

//agrega ingredientes por su Id
function agregar_imagen(){
    precioBurgerArmada= suma(parseFloat(precioBurgerArmada),parseFloat(5));
    const ingredientes = document.getElementById("ingredientes_img");
    let div_ingredientes_img = document.createElement('div');
        div_ingredientes_img.innerHTML = 
        `<img src="assets/images/${this.id}.png" alt="" id="${this.id}">`;
        ingredientes.appendChild(div_ingredientes_img);
}
//Evento click en los botones más de la lista
const botones_agregado =document.getElementsByClassName('boton_armado_agregado');
for (const boton_mas of botones_agregado){
    boton_mas.addEventListener('click', agregar_imagen);
}

//quita ingredientes por su Id
function remover_imagen(){
    precioBurgerArmada= resta(parseFloat(precioBurgerArmada),parseFloat(5));
    const ingredientes_remocion = document.getElementById(this.id);
    ingredientes_remocion.remove()
}
//Evento click en los botones menos de la lista
const botones_remoción =document.getElementsByClassName('boton_armado_removido');
for (const boton_menos of botones_remoción){
    boton_menos.addEventListener('click', remover_imagen);
}