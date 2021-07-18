let precioTotal = 0;

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

const promo1 = new Promo(" simple "," medianas "," mediana ",500);
const promo2 = new Promo(" de lentejas "," medianas "," mediana ",600);
const promo3 = new Promo(" triple "," grandes "," grande ",700);

const suma=(a,b)=>a+b;  

function promocion() {
    alert("Promoción 1: hamburguesa" +promo1.hamburguesa+"+ papas "+promo1.papas+"+ bebida "+promo1.bebida+"\nPrecio: $"+promo1.precio +"\nPromoción 2: hamburguesa" +promo2.hamburguesa+"+ papas "+promo2.papas+"+ bebida "+promo2.bebida+"\nPrecio: $"+promo2.precio+"\nPromoción 3: hamburguesa" +promo3.hamburguesa+"+ papas "+promo3.papas+"+ bebida "+promo3.bebida+"\nPrecio: $"+promo3.precio)
}

function solicitud() {
    let promoPedida =prompt("Qué promoción desea ordenar?"+"\n(Ingrese solamente el número)")
    if (promoPedida ==1){
        precioTotal = suma(parseFloat(precioTotal),parseFloat(promo1.precio)) ;
        alert("El precio total a pagar es: $" + parseFloat(precioTotal));
        promo1.cantidades(1); 
    }
    else if (promoPedida==2){
        precioTotal = suma(parseFloat(precioTotal),parseFloat(promo2.precio));
        alert("El precio total a pagar es: $" + parseFloat(precioTotal));
        promo2.cantidades(1)
    }
    else if( promoPedida==3 ){
        precioTotal = suma(parseFloat(precioTotal),parseFloat(promo3.precio));
        alert("El precio total a pagar es: $" + parseFloat(precioTotal));
        promo3.cantidades(1)
    }
}

function agregar() {
    let agregar=prompt("Desea hacer otro pedido?"+"\nsi o no");
    while(agregar=="si"){
        solicitud();
    agregar =prompt("Desea hacer otro pedido?"+"\nsi o no");
    }
    alert("Pedido : "+"\n Promo 1 : "+ promo1.cantidad + " unidades"+"\n Promo 2 : "+ promo2.cantidad + " unidades"+"\n Promo 3 : "+ promo3.cantidad + " unidades"+"\n\n Total a pagar : $"+ precioTotal)
}

promocion();
solicitud();
agregar();