let precioTotal = 0;
let precioBurgerArmada=0;
let cantidadBurgerArmada=0;
//objetos promo y burger
function Promo(hamburguesa, papas, bebida, precio){
    this.hamburguesa=hamburguesa;    
    this.papas=papas;
    this.bebida=bebida;
    this.precio=parseFloat(precio);
    this.cantidad=0
    this.cantidades = function(cantidad){
        this.cantidad+=cantidad;
    }
}
function burger(hamburguesa, precio){
    this.hamburguesa=hamburguesa;    
    this.precio=parseFloat(precio);
    this.cantidad=0
    this.cantidades = function(cantidad){
        this.cantidad+=cantidad;
    }
}
const promo1 = new Promo(" simple "," medianas "," mediana ",500);
const promo2 = new Promo(" de lentejas "," medianas "," mediana ",600);
const promo3 = new Promo(" triple "," grandes "," grande ",700);
const burger1 = new burger("Medallón de carne",410);
const burger2 = new burger("Medallón de lenteja",400);

//array
const array=["lechuga","tomate","cheddar","panceta","cebolla caramelizada","cebolla morada","huevo","pepinillo","mayonesa","ketchup","salsa Burguesa"];
const burgerArmada=[];

//funciones 
const suma=(a,b)=>a+b; 
const resta=(a,b)=>a-b;

//Saludo inicial
function saludar(){
    alert("Bienvenido a \nLA BURGUESA \nla mejor hamburguesería del país");
    opciones();
}

//funcion con switch entre promos y armado de pedido personalizado
function opciones(){
    let opcionesDePedido = prompt ("¿Desea armar su hamburguesa o ver las promociones?\n\n(ingrese: armar o promo)");
    switch (opcionesDePedido){
        //salta a linea 59
        case"armar":
            armar()
            break;
        //salta a linea 88
        case"promo":
            promocion();
            break;
    }
}

//Funcion que utiliza arrays para armar hamburguesa
function armar(){
    let tipoBurger= prompt("Tipo de haburguesa:\n\n"+"1- "+burger1.hamburguesa+"\n2- "+burger2.hamburguesa);
    switch(tipoBurger){
        case "1": 
            precioBurgerArmada = suma(parseFloat(precioBurgerArmada),parseFloat(burger1.precio));
            burger1.cantidades(1);
            burgerArmada.push(burger1.hamburguesa);
            break;
        case "2":
            precioBurgerArmada = suma(parseFloat(precioBurgerArmada),parseFloat(burger2.precio));
            burger2.cantidades(1);
            burgerArmada.push(burger2.hamburguesa);
            break;
    }
    //Uso array para ver que ingredientes se agrega a la hamburguesa
    for (let index = 0; index < 11; index++) {
        let armadoPedido = prompt("¿Agregar "+array[index]+" a su pedido?\n\nsi o no")
        if (armadoPedido=="si"){
            precioBurgerArmada= suma(parseFloat(precioBurgerArmada),parseFloat(5));
            burgerArmada.push(array[index]);
        }
    } 
    //imprime el pedido ordenado alfabéticamente respetando la mayúscula
    alert("Su hamburguesa tiene:"+"\n"+burgerArmada.sort().join(", "));
    precioTotal=suma(parseFloat(precioTotal),parseFloat(precioBurgerArmada));
    cantidadBurgerArmada=suma(parseFloat(burger1.cantidad),parseFloat(burger2.cantidad));
}

//Funcion de menú de promociones
function promocion() {
    alert("Promoción 1: hamburguesa" +promo1.hamburguesa+"+ papas "+promo1.papas+"+ bebida "+promo1.bebida+"\nPrecio: $"+promo1.precio +"\nPromoción 2: hamburguesa" +promo2.hamburguesa+"+ papas "+promo2.papas+"+ bebida "+promo2.bebida+"\nPrecio: $"+promo2.precio+"\nPromoción 3: hamburguesa" +promo3.hamburguesa+"+ papas "+promo3.papas+"+ bebida "+promo3.bebida+"\nPrecio: $"+promo3.precio)
    solicitud()
}

//Función con switch para elegir entre promociones
function solicitud() {
    let promoPedida =prompt("Qué promoción desea ordenar?"+"\n\n(Ingrese solamente el número)")
    switch(promoPedida){
        case "1": 
            precioTotal = suma(parseFloat(precioTotal),parseFloat(promo1.precio));
            promo1.cantidades(1);
            break;
        case "2":
            precioTotal = suma(parseFloat(precioTotal),parseFloat(promo2.precio));
            promo2.cantidades(1);
            break;
        case "3":
            precioTotal = suma(parseFloat(precioTotal),parseFloat(promo3.precio));
            promo3.cantidades(1);
            break;
    }
}

//Fución con Bucle para agregar más de un pedido
function agregar() {
    let agregar=prompt("Desea hacer otro pedido?"+"\n\nsi o no");
    while(agregar=="si"){
        //vuelve a linea 44
        opciones();
    agregar =prompt("Desea hacer otro pedido?"+"\n\nsi o no");
    }
}

//Imprime la orden a pagar
function pagar(){
    alert("Pedido : "+"\n Promo 1 : "+ promo1.cantidad +" unidad(es)"+" X "+"$"+promo1.precio+" c/u"+"\n Promo 2 : "+ promo2.cantidad + " unidad(es)"+" X "+"$"+promo2.precio+" c/u"+"\n Promo 3 : "+ promo3.cantidad + " unidad(es)"+" X "+"$"+promo3.precio+" c/u"+"\n Hamburguesa armada : "+cantidadBurgerArmada+" unidad(es)"+" X "+"$"+precioBurgerArmada +"\n\n Total a pagar : $"+ precioTotal)
}

//Ejecución
saludar()
agregar()
pagar()