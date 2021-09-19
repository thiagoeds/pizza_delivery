/* Neste projeto vamos utilizar muito o "querySelector", e para evitar repetindo o codigo o tempo todo vamos criar uma const e colocar um nome minusculo para deixar o nosso codigo mais inxuto, criamos uma "function" que retorna o elemento "document.querySelector" e para isso basta utilizar a letra "c" para seleção. */

//função resumida ou anonima

const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);
 
/* const c = (el)=> {
    return document.querySelector(el);
} */



pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    // preencher as informações em pizza-item

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    

    c('.pizza-area').append( pizzaItem );
});


