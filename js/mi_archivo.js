//Parametros globales 
let precioTotal = 0;
let precioBurgerArmada=410;
let cantidadArmada=0;

//Init arrays
const ingredientes_list=[];
const promos  = [];
let armada;
let carrito=[];

//objetos promo y burger
class Promo{
    constructor(id,hamburguesa, precio, imagen, cantidad){
    this.id=id;
    this.hamburguesa=hamburguesa;    
    this.precio=parseFloat(precio);
    this.imagen=imagen
    this.cantidad= cantidad||1;
    }
}

//objetos ingredientes
function Ingrediente(id,nombre){
    this.id=id;
    this.nombre=nombre;    
}

//push de objetos ingrediente al array
ingredientes_list.push(new Ingrediente ("001"," Pepinos"));
ingredientes_list.push(new Ingrediente ("002"," Cebolla"));
ingredientes_list.push(new Ingrediente ("003"," Cebolla morada"));
ingredientes_list.push(new Ingrediente ("004"," Panceta"));
ingredientes_list.push(new Ingrediente ("005"," Cheddar"));
ingredientes_list.push(new Ingrediente ("006"," Tomáte"));
ingredientes_list.push(new Ingrediente ("007"," Lechuga"));

//push de objetos promos al array 
promos.push(new Promo(101,"Medallón de carne con queso cheddar" ,400,"promo_demo"));
promos.push(new Promo(102,"Medallón de lentejas con cebolla morada, tomáte y lechuga",500,"promo_demo"));
promos.push(new Promo(103,"Triple medallón de carne con cebolla morada, panceta y cheddar",600,"promo_demo"));

//Funciones 
const suma=(a,b)=>a+b; 
const resta=(a,b)=>a-b;

//Renderisa la imagen del ingrediente
function agregar_imagen(){
    //Suma valor por cada ingrediente agregado
    precioBurgerArmada= suma(parseFloat(precioBurgerArmada),parseFloat(25));
    precioBurgerArmada_en_boton_update();
    localStorage.setItem("precio_armada", JSON.stringify(precioBurgerArmada)); 
    const ingredientes = document.getElementById("ingredientes_img");
    armada.push(this.id);
    localStorage.setItem("armada", JSON.stringify(armada)); 
    let div_ingredientes_img = document.createElement('div');
    //Renderiza la imagen de cada ingrediente
    div_ingredientes_img.innerHTML = 
        `<img src="assets/images/${this.id}.png" id="${this.id}_img">`;
        ingredientes.appendChild(div_ingredientes_img);
}

//Quita la imagen del ingrediente previamente renderizada
function remover_imagen(){
    const ingredientes_remocion = document.getElementById(`${this.id}_img`);
    if(ingredientes_remocion !== null){
        //Resta valor por cada ingrediente removido
        precioBurgerArmada= resta(parseFloat(precioBurgerArmada),parseFloat(25));
        precioBurgerArmada_en_boton_update();
        localStorage.setItem("precio_armada", JSON.stringify(precioBurgerArmada)); 
        ingredientes_remocion.remove(this.id)
    }
    //Filtra el ingrediente y pisa el valor del array sin ese ingrediente
    armada = armada.filter(elemento => elemento !== this.id);
    localStorage.setItem("armada", JSON.stringify(armada));
}

//Crea un objeto de "promo armada" y lo renderiza en el carrito
function crear_objeto_burgerArmada_a_carrito(){
    let cant = carrito.length
    //crea un objeto Promo nuevo asignandole un id nuevo para cada uno
    var burger_armada = new Promo(cant+1,armada,precioBurgerArmada,"parallaxBurger");
    precioTotal= suma(parseFloat(precioTotal),parseFloat(precioBurgerArmada));
    localStorage.setItem("precio_total",JSON.stringify(precioTotal));
    carrito.push (burger_armada)
    localStorage.setItem("armada",JSON.stringify(armada));
    localStorage.setItem("precio_armada",JSON.stringify(precioBurgerArmada));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    render_carrito(carrito);
    //hace visible el div que notifica que se agrego al carrito el pedido
    $(".notificacion").show();
    //luego de un tiempo esconde la notificación
    setTimeout(function(){ $(".notificacion").hide(); }, 2500);
}

//Agrega a carrito. Compara ID, si existe: suma cantidad. Si no existe: la agrega al array y manda a render 
function agregar_carrito(e){
    const id_pedido = e.target.id;
    const seleccionado_precio = promos.find(p => p.id == id_pedido);
    precioTotal= suma(parseFloat(precioTotal),parseFloat(seleccionado_precio.precio));
    localStorage.setItem("precio_total",JSON.stringify(precioTotal));
    const seleccionado = carrito.find(p => p.id == id_pedido);
    if(seleccionado == undefined){
        carrito.push(promos.find(p => p.id == id_pedido))
    }
    else{
        seleccionado.cantidad = suma(parseFloat(seleccionado.cantidad),parseFloat(1));
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    render_carrito(carrito);
    //hace visible el div que notifica que se agrego al carrito el pedido
    $(".notificacion").show();
    //luego de un tiempo esconde la notificación
    setTimeout(function(){ $(".notificacion").hide(); }, 2500);
}

//ELIMINA CANTIDADES O ELEMENTOS DEL ARRAY CARRITO
function remocion_cantidades_y_elementos_carrito(e){
    const id_pedido = e.target.id;
    const seleccionado_precio = carrito.find(p => p.id == id_pedido);
    precioTotal= resta(parseFloat(precioTotal),parseFloat(seleccionado_precio.precio));
    localStorage.setItem("precio_total",JSON.stringify(precioTotal));
    for( var i = 0; i < carrito.length; i++){ 
        if(carrito[i].id == e.target.id){
            if(carrito[i].cantidad > 1){
                carrito[i].cantidad = resta(parseFloat(carrito[i].cantidad),parseFloat(1));
            }else{
                carrito.splice(i,1);
            }
        }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    render_carrito(carrito);
}

// Cambia el value del boton a pagar mostrando el monto total en tiempo real
function precioTotal_en_boton_update() {
    document.getElementById("total").value = "Total a pagar : $"+precioTotal;
}
// Cambia el value del boton para agregar a carrito, mostrando el monto total en tiempo real
function precioBurgerArmada_en_boton_update() {
    document.getElementById("total_armado").value = "Agregar pedido : $"+precioBurgerArmada;
}

//Agrega al DOM las cards con las promos
const promociones = document.getElementById("promociones");
for (const promo of promos) {
    let divPromo = document.createElement('div');
    divPromo.classList.add("card");
    divPromo.innerHTML = `<div class="circulo_card">
                                <h3>${promo.id}</h3>
                            </div>
                            <div class="contenido_card textos_txt">
                                <img src="assets/images/${promo.imagen}.png" alt="promo hamburguesa">
                                <p>Ingredientes:</br> ${promo.hamburguesa}</p>
                                <p>Precio:</br> $${promo.precio}</p>
                                <p></p>
                                <input type="button" id="${promo.id}"  class="boton_para_carrito botones" value="Agregar al carrito"></input>
                            </div>`;
    promociones.appendChild(divPromo);
}

//Agrega al DOM la lista con ingredientes 
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

//Local storage que guarda los ingredientes
if(localStorage.getItem('armada') !== null){
    armada = JSON.parse(localStorage.getItem('armada'));
    precioBurgerArmada= JSON.parse(localStorage.getItem('precio_armada'));
    precioBurgerArmada_en_boton_update();
    const ingredientes = document.getElementById("ingredientes_img");
    for(let i = 0 ; i < armada.length ; i++){
        let div_ingredientes_img = document.createElement('div');
        div_ingredientes_img.innerHTML = 
        `<img src="assets/images/${armada[i]}.png" id="${armada[i]}_img">`;
        ingredientes.appendChild(div_ingredientes_img);
    }
}else{
    armada = [];
    precioBurgerArmada=410;
}

//Evento click en los botones más de la lista
const botones_agregado =document.getElementsByClassName('boton_armado_agregado');
for (const boton_mas of botones_agregado){
    boton_mas.addEventListener('click', agregar_imagen);
}

//Evento click en los botones menos de la lista
const botones_remoción =document.getElementsByClassName('boton_armado_removido');
for (const boton_menos of botones_remoción){
    boton_menos.addEventListener('click', remover_imagen);
}

//Evento click que agrega objetos del "armado de hamburguesas" al carrito
const botones_para_carrito_armado =document.getElementsByClassName('boton_para_carrito_armado');
for (const boton_para_carrito_armado of botones_para_carrito_armado){
    boton_para_carrito_armado.addEventListener('click', crear_objeto_burgerArmada_a_carrito);
}

//Renderisa las promociones agregadas al carrito
const items_carrito = document.getElementById("carrito_items");
function render_carrito(){
    $('#carrito_items').empty();
    for (const item of carrito){
    let div_item_carrito = document.createElement('div');
    div_item_carrito.innerHTML = 
        `<div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="assets/images/${item.imagen}.png" height="100">
                <span class="textos_txt" style="margin:0 20px;color:#000;">Promoción ${item.id}</span>
            </div>
            <div class="cart-cantidad cart-column">
                <span class="textos_txt num_carrito" style="margin:0 20px;color:#000;">${item.cantidad}</span>
            </div>
            <div class="cart-precio cart-column">
                <span class=" textos_txt " style="margin:0 20px;color:#000;">$${item.precio*item.cantidad}</span>
            </div>
            <div class="cart-delete cart-column">
                <input type="button" value="x" id="${item.id}" class="boton_armado boton_x"/>
            </div>
        </div>`;
        items_carrito.appendChild(div_item_carrito);
    }
    precioTotal_en_boton_update();
    const btnBorrar = document.getElementsByClassName('boton_x');
    for( const btn of btnBorrar ){
        btn.addEventListener('click', remocion_cantidades_y_elementos_carrito);
    }
}

//EVENTO CLICK EN EL BOTON "AGREGAR A CARRITO"
const botones_para_carrito=document.getElementsByClassName('boton_para_carrito');
for (const boton_para_carrito of botones_para_carrito){
    boton_para_carrito.addEventListener('click', agregar_carrito);
}

//localStorage del carrito
if(localStorage.getItem('carrito') !== null){
    carrito = JSON.parse(localStorage.getItem('carrito'));
    precioTotal = JSON.parse(localStorage.getItem('precio_total'));
    const items_carrito = document.getElementById("carrito_items");
    for(let i = 0 ; i < carrito.length ; i++){
        let div_carrito_items = document.createElement('div');
        div_carrito_items.classList.add("item_de_carrito");
        div_carrito_items.innerHTML = 
        `<div class="cart-row">
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="assets/images/${carrito[i].imagen}.png" height="100">
            <span class="textos_txt" style="margin:0 20px;color:#000;">Promoción ${carrito[i].id}</span>
        </div>
        <div class="cart-cantidad cart-column">
            <span class="textos_txt num_carrito" style="margin:0 20px;color:#000;">${carrito[i].cantidad}</span>
        </div>
        <div class="cart-precio cart-column">
            <span class=" textos_txt " style="margin:0 20px;color:#000;">$${carrito[i].precio*carrito[i].cantidad}</span>
        </div>
        <div class="cart-delete cart-column">
            <input type="button" value="x" id="${carrito[i].id}" class="boton_armado boton_x"/>
        </div>
    </div>`;
        items_carrito.appendChild(div_carrito_items);
    }
    precioTotal_en_boton_update();
    const btnBorrar = document.getElementsByClassName('boton_x');
    for( const btn of btnBorrar ){
        btn.addEventListener('click', remocion_cantidades_y_elementos_carrito);
    }
}else{
    carrito = [];
}

//Animación de carga de página
window.addEventListener('load',()=>{
    $(".loader-wrapper").fadeOut("slow");
})
