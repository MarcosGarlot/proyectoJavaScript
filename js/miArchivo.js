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
                                    <input type="button" id="${promo.id}"  class="boton_para_carrito" value="Agregar al carrito"></input>
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
let carrito;
if(localStorage.getItem('carrito') !== null){
    carrito = JSON.parse(localStorage.getItem('carrito'));
    const ingredientes = document.getElementById("ingredientes_img");
    for(let i = 0 ; i < carrito.length ; i++){
        let div_ingredientes_img = document.createElement('div');
        div_ingredientes_img.innerHTML = 
        `<img src="assets/images/${carrito[i]}.png" id="${carrito[i]}_img">`;
        ingredientes.appendChild(div_ingredientes_img);
    }
}else{
    carrito = [];
}
function agregar_imagen(){
    precioBurgerArmada= suma(parseFloat(precioBurgerArmada),parseFloat(5));
    const ingredientes = document.getElementById("ingredientes_img");
    carrito.push(this.id);
    localStorage.setItem("carrito", JSON.stringify(carrito)); 
    // Ingredientes eera mi viejo this.id
    let div_ingredientes_img = document.createElement('div');
        div_ingredientes_img.innerHTML = 
        `<img src="assets/images/${this.id}.png" id="${this.id}_img">`;
        ingredientes.appendChild(div_ingredientes_img);
}
//Evento click en los botones más de la lista
const botones_agregado =document.getElementsByClassName('boton_armado_agregado');
for (const boton_mas of botones_agregado){
    boton_mas.addEventListener('click', agregar_imagen);
}
//quita ingredientes por su Id
function remover_imagen(){
    const ingredientes_remocion = document.getElementById(`${this.id}_img`);
    if(ingredientes_remocion !== null){
        precioBurgerArmada= resta(parseFloat(precioBurgerArmada),parseFloat(5));
        ingredientes_remocion.remove(this.id)
    }
    carrito = carrito.filter(elemento => elemento !== this.id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
//Evento click en los botones menos de la lista
const botones_remoción =document.getElementsByClassName('boton_armado_removido');
for (const boton_menos of botones_remoción){
    boton_menos.addEventListener('click', remover_imagen);
}
//Agrega los precios de cada item al valor total que debera pagar el usuario y los guarda de manera local
function agrega_item_a_carrito(){
    if ( this.id== "boton_para_carrito_armado"){
        precioBurgerArmada= suma(parseFloat(precioBurgerArmada),parseFloat(410));
        precioTotal=suma (parseFloat(precioBurgerArmada),parseFloat(precioTotal));
        precioBurgerArmada=0
    }
    else if (this.id == "01"){
        precioTotal=suma (parseFloat(promos[0].precio),parseFloat(precioTotal));
    }
    else if (this.id == "02"){
        precioTotal=suma (parseFloat(promos[1].precio),parseFloat(precioTotal));
    }
    else if (this.id == "03"){
        precioTotal=suma (parseFloat(promos[2].precio),parseFloat(precioTotal));
    }       
    localStorage.setItem('precio a pagar', precioTotal)
}
//Evento de los botones "agregar al carrito"
const botones_agregar_a_carrito =document.getElementsByClassName('boton_para_carrito');
for (const boton_agregado_carrito of botones_agregar_a_carrito){
    boton_agregado_carrito.addEventListener('click', agrega_item_a_carrito);
}