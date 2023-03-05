var cardContainer = document.querySelector('.item-container');
var products = {};

fetch('store.json')
    .then(res => res.json())
    .then(data => {
        products = Object.assign({}, data);
        console.log(data)
        data.products.forEach(a => {
            var template1 = `<div class="item-card" id="${a.id}">
                            <img class="item-img" src="img/${a.photo}">
                            <p class="item-title">${a.title}</p>
                            <p class="item-brand">${a.brand}</p>
                            <p class="item-price">가격 : ${a.price}</p>
                            <button>담기</button>
                            </div>`;
            cardContainer.insertAdjacentHTML('beforeend', template1);
        });
    })
    .catch(err =>
        console.log(err)
    )

/* store.json 에서 받아온 상품목록을 추가 */

var search = document.querySelector('.content-top input');

search.addEventListener('input', (e)=>{
    var inputData = e.currentTarget.value;
    console.log(products)
    console.log(inputData);
    cardContainer.innerHTML = '';
    products.products.forEach(a=>{
        if(a.title.includes(inputData)){
            var template2 = `<div class="item-card" id="${a.id}">
                            <img class="item-img" src="img/${a.photo}">
                            <p class="item-title">${a.title}</p>
                            <p class="item-brand">${a.brand}</p>
                            <p class="item-price">가격 : ${a.price}</p>
                            <button>담기</button>
                            </div>`;
            cardContainer.insertAdjacentHTML('beforeend', template2);
        }
    })
})