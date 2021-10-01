/* Neste projeto vamos utilizar muito o "querySelector", e para evitar repetindo o codigo o tempo todo vamos criar uma const e colocar um nome minusculo para deixar o nosso codigo mais inxuto, criamos uma "function" que retorna o elemento "document.querySelector" e para isso basta utilizar a letra "c" para seleção. */

//função resumida ou anonima
let cart = [];
let modalQt = 1;
let modalKey = 0;

const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);
 
/* const c = (el)=> {
    return document.querySelector(el);
} */

//Listagem das pizzas
pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    // preencher as informações em pizza-item

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price[2].toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;     
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price[0].toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2) {
                size.classList.add('selected');             
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        c('.pizzaInfo--qt').innerHTML = modalQt;


        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);         
    });    

    c('.pizza-area').append( pizzaItem );
});

//Eventos do modal

function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

//forEach: para cada um deles vou adicionar um evento

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
})

//adicionar quantidade de cada produto no modal

c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1) {
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }   
});

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});

cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
   size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');

        
   });
});

c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    //Qual a pizza?
    //console.log("Pizza: "+modalKey);
    //Qual o tamanho?
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    //console.log("Tamanho: "+size);
    //Qual o valor?

    //Quantas pizzas?
    //console.log("Quantidade: "+modalQt);

    let identifier = pizzaJson[modalKey].id+'@'+size;

    let key = cart.findIndex((item)=>item.identifier == identifier);

    if(key > -1) {
        cart[key].qt +=modalQt;
    } else {
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt
        });
    }

    closeModal();
});







