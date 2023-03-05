var cardContainer = document.querySelector('.item-container');
var products = {};
var dragarea = document.querySelector('.cart-dragarea');
var cartList = [];

let addItems = function(data){
    data.products.forEach(a => {
        var template1 = `<div class="item-card" draggable="true" ondragstart="drag(event)">
                        <img class="item-img" src="img/${a.photo}">
                        <p class="item-title">${a.title}</p>
                        <p class="item-brand">${a.brand}</p>
                        <p class="item-price">가격 : ${a.price}</p>
                        <button class="add" id="${a.id}">담기</button>
                        </div>`;
        cardContainer.insertAdjacentHTML('beforeend', template1);
        var id = a.id;
        id.toString();
        cartList.push( {id : 1} )
    });
}

/*=================================== */
/* 드래그 드랍 구현 */
/*=================================== */
var total = 0;

function allowDrop(ev) {
    ev.preventDefault();
  }
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.childNodes[9].id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    if(cartList[data].id >1){
        var test = document.getElementById(`${data}th`);
        test.childNodes[9].value = cartList[data].id++;
    }
    else{
        var tmp = `<div class="item-card" id="${products.products[data].id}th" draggable="true">
                <img class="item-img" src="img/${products.products[data].photo}">
                <p class="item-title">${products.products[data].title}</p>
                <p class="item-brand">${products.products[data].brand}</p>
                <p class="item-price">${products.products[data].price}</p>
                <input value="${cartList[data].id}">
                </div>`;
        dragarea.insertAdjacentHTML('beforeend', tmp);
        cartList[data].id++;
    }
    var price = products.products[data].price;
    
    total += price;
    document.querySelector('.result h2').innerHTML = `합계 ${total}`;
}


fetch('store.json')
.then(res => res.json())
.then(data => {
    products = data;
    addItems(products);


    document.querySelectorAll('.add').forEach((a)=>{
        a.addEventListener('click', (e)=>{
            var value = e.currentTarget.id;

            if(cartList[value].id >1){
                var test = document.getElementById(`${value}th`);
                test.childNodes[9].value = cartList[value].id++;
            }
            else{
                var tmp = `<div class="item-card" id="${products.products[value].id}th" draggable="true">
                        <img class="item-img" src="img/${products.products[value].photo}">
                        <p class="item-title">${products.products[value].title}</p>
                        <p class="item-brand">${products.products[value].brand}</p>
                        <p class="item-price">${products.products[value].price}</p>
                        <input value="${cartList[value].id}">
                        </div>`;
                dragarea.insertAdjacentHTML('beforeend', tmp);
                cartList[value].id++;
            }    
            total += products.products[value].price;;
            document.querySelector('.result h2').innerHTML = `합계 ${total}`;
        })
    })

})
.catch(err =>
    console.log(err)
)


/* store.json 에서 받아온 상품목록을 추가 */

var search = document.querySelector('.content-top input');

search.addEventListener('input', (e)=>{
    var inputData = e.currentTarget.value;
    cardContainer.innerHTML = '';
    products.products.forEach(a=>{
        if(a.title.includes(inputData)){
            var template2 = `<div class="item-card" draggable="true">
                            <img class="item-img" src="img/${a.photo}">
                            <p class="item-title">${a.title}</p>
                            <p class="item-brand">${a.brand}</p>
                            <p class="item-price">가격 : ${a.price}</p>
                            <button id="${a.id}">담기</button>
                            </div>`;
            cardContainer.insertAdjacentHTML('beforeend', template2);
            var title = document.querySelector('.item-title');
            title.innerHTML = title.innerHTML.replace(inputData, `<span style="background : yellow">${inputData}</span>`)
        }
    })
})

/* input을 통해 원하는 상품을 검색 */
var modal = document.querySelector('.modal-bg');
document.querySelector('.buyBtn').addEventListener('click', ()=>{
    modal.classList.remove('hide');
})

document.querySelector('.closeBtn').addEventListener('click', ()=>{
    modal.classList.add('hide');
})


document.querySelector('.canvas button').addEventListener('click', ()=>{
    document.querySelector('.canvas').classList.add('hide');
})


document.querySelector('.inputBtn').addEventListener('click', ()=>{
    modal.classList.add('hide');
    document.querySelector('.canvas').classList.remove('hide');
})