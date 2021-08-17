import {data} from '../data/data.js';

const templeProduct = document.getElementById('template-product').content;
const fragment = document.createDocumentFragment();
const  items = document.getElementById('items');
const detail = document.getElementById('detail');
const listaCompra = document.getElementById('listaCompra')
const listaTotal = document.getElementById('listaTotal')
let articulo = {};
let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    loadImage(data);
})


const loadImage = data => {

    data.forEach( articulo =>{
        const {id,name,image} = articulo;
        templeProduct.querySelector('h5').textContent = name;
        templeProduct.querySelector('img').setAttribute('src',image);
        templeProduct.querySelector('img').dataset.id = id;
       const clone = templeProduct.cloneNode(true);
       fragment.appendChild(clone);


})
 items.appendChild(fragment);
}
items.addEventListener('click', e => {
    
    let idTarget = e.target.dataset.id;
    
   
    data.forEach(articulo => {
        
        const {id,name,image,almacenamiento,ram,camaraT,camaraF,bateria,color,precio} = articulo
       
        if(id == idTarget){
            const objeto = {
                id: id,
                name: name,
                image: image,
                almacenamiento: almacenamiento,
                ram: ram,
                camaraT: camaraT,
                camaraF: camaraF,
                bateria: bateria,
                color: color,
                precio: precio
            }
            localStorage.setItem("producto",JSON.stringify(objeto));
            getArticulo();
           carrito.push(objeto);
           localStorage.setItem('Carrito',JSON.stringify(carrito));
           listarCarrito();
        }   
    })
    e.stopPropagation();
    e.preventDefault();
 })
 function getArticulo(){
    detail.innerHTML = '';
   articulo = JSON.parse(localStorage.getItem("producto")); 
    const {name,image,almacenamiento,ram,camaraT,camaraF,bateria,color,precio} = articulo;
    detail.innerHTML = `
    <table border="2px" align="center">
    <tr>
        <td rowspan="3"><img src="${image}"  width="400" height="500"></td>
        <td align="center">
         <h2>${name}</h2><br>
         <h4>${almacenamiento}</h4><br>
         <h5>${ram}</h5><br>
         <h5>${camaraT}</h5><br>
         <h5>${camaraF}</h5><br>
         <h5>${bateria}</h5><br>
         <h5>${color}</h5><br>
         <h5>${precio}</h5>
        </td>
    </tr>
</table>
 `
}

const listarCarrito = () => {
    listaCompra.innerHTML = '';
    let total = 0;
    let totalInt = 0;
    carrito = JSON.parse(localStorage.getItem('Carrito'));
    carrito === null ? ( carrito = []) : (
        carrito.forEach(element => {
            totalInt += element.precio;
            listaCompra.innerHTML += 
            `<br> <br>
         <div width="100" height="100" align="center">
         <span>${element.name}</span>
         <span>${element.precio}</span>
         <span><button id="${element.id}">x</button></span><br>
         </div>`
         total = totalInt;
        })
    )
    getTotal(total);
}

function getTotal(total){
    listaTotal.innerHTML = '';
    listaTotal.innerHTML = `<h1 align="center">Total a pagar ${total}</h1>`
    localStorage.setItem('Total',total)
}

listaCompra.addEventListener('click', (e) =>{
    e.preventDefault();

   if(e.target.innerHTML == 'x'){
        let id = e.target.id;
        deleteProduct(id);
   }

})


function deleteProduct(idI){
    let indexArreglo;

    carrito.forEach((elemento,index) =>{
        if(elemento.id==idI)
        indexArreglo = index;
    })
    
    carrito.splice(indexArreglo,1);
    localStorage.setItem('Carrito',JSON.stringify(carrito));
    listarCarrito();
}
