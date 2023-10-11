// import { createNav } from "./nav";

interface Prod{
    categ: string;
    desc: string;
    id: number;
    image: string;
    price: number;
    rating: {rate:number, count:number};
    title: string

}

// Fn. to create cards supplied in an Array

function makeCarousel(categClass: string, targetEle: HTMLElement, arrProd: Array<Prod>){


    const card = (prod: Prod) => {
        const iconHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/> </svg>'
        
        let ln = prod.title.length;

        let sub = prod.title.substring(0, 35)

        if (sub.length < prod.title.length){
            sub += '...'
        }

        const strHTML = `
            <div class="card" style="min-width: 220px" >
                <div class="card-body d-flex flex-column justify-content-between">
                    <img src="${prod.image}" class="card-img-top p-3" alt="...">
                    <h5 class="card-title">${sub}</h5>
                    <a href="./product.html?id=${prod.id}" class = ""> </a>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>Price:</b> $${prod.price}</li>
                    <li class="list-group-itemn d-flex justify-content-between p-4">
                        <div>
                        <b>Rating:</b> 
                        ${prod.rating.rate} ${iconHTML}
                        </div>
                        <div>
                            [${prod.rating.count}]
                        </div>
                        </li> 
                        <!-- change to two separate divs later on -->
                    <li class="list-group-item text-center p-3"><button class="btn btn-primary cart-btn" id="${prod.id}" >Add Cart</button></li>
                </ul>
            </div>
        `

        return strHTML;
    }
    
    let idFind = document.getElementById('product-carousel')
    idFind!.classList.add('d-flex', 'flex-wrap', 'gap-4');
    
    arrProd.forEach((ele) => {
        
        idFind!.innerHTML += card(ele)
        
    })


function addCart(id: number){
    if (localStorage.getItem('cart') === null || localStorage.getItem('cart') === undefined){
        let value = JSON.stringify([ { id : id, quant : 1} ])
        console.log('value parsed here is ', value)
        localStorage.setItem('cart', value)

        console.log(' in above if only ')
        console.log(JSON.parse(localStorage.getItem('cart')!))
    }
    else{
        let parsed = JSON.parse(localStorage.getItem('cart')!)
        console.log(parsed + ' is parsed here ');
        console.log(parsed);
    
        let found = parsed.some((ele:StoredObject) => ele.id === id)

        if (!found){
            parsed.push({id: id, quant : 1})
            console.log('after not found, adding, parse is: ', parsed)
        } else {
            let idx = parsed.findIndex((ele:StoredObject) => ele.id === id);
            parsed[idx].quant += 1
        }

        // if (parsed.id !== undefined){
        //     let value = parsed.id
        //     parsed.id = value + 1
        //     console.log('entered if ')
        // } else {
        //     console.log('entere else ')
        //     parsed.id = 1;
        // }
    
        console.log(parsed)
        console.log('before exiting')
        localStorage.setItem('cart', JSON.stringify(parsed));

    }
}

    
    let buttons = document.querySelectorAll('.cart-btn')
    buttons.forEach((btn) => {
        btn.addEventListener('click', (event: any) => {
            let addToCart = event.target!.id!;
            console.log(addToCart)

            let element = document.getElementById(`${addToCart}`)
            element!.textContent = "Added to Cart"
            element!.style.backgroundColor = 'yellow'
            element!.style.color = "black"

            addCart(addToCart);
        })
    })


    // arrProd.forEach((ele: Prod) => {
    //     // container for card deets
    //     let new_anch = document.createElement('a')
    //     new_anch.href = `./product.html?id=${ele.id}`
    //     let new_div = document.createElement('div')
    //     new_div.setAttribute('class', 'card')
    //     new_div.setAttribute('class', `${categClass}-product-in-carousel`)
    //     new_div.setAttribute('class', `prod-id-${ele.id}`)  // to access id: HTMLElement.attributes [ check whether this gives array, or what ]
    //     new_div.style.width = '18rem'
    //     new_div.style.border = '5px solid black'
    //     new_div.style.display = 'flex'
    //     new_div.style.flexDirection = 'column'
    //     new_div.style.justifyContent = 'center'
    //     new_div.style.alignContent = 'center'

    //     new_anch.appendChild(new_div)
    //     // CARD BODY
    //     let body = document.createElement('div')
    //     body.setAttribute('class', 'card-body')
    //     // body.style.maxWidth = '8vw'
    //     body.style.display = 'flex'
    //     body.style.flexDirection = 'column'
    //     body.style.justifyContent = 'center'
    //     body.style.alignContent = 'center'
    //     body.setAttribute('class', 'text-center')
    //     body.style.border = '2px solid brown'
        

    //     // PRODUCT TITLE
    //     let title = document.createElement('div')
    //     title.setAttribute('class', 'product-title')
    //     title.setAttribute('class', 'card-title')
    //     title.textContent = ele.title

    //     // PRODUCT IMAGE
    //     let img_div = document.createElement('div')
    //     img_div.setAttribute('class', 'product_img_encl')
    //     img_div.setAttribute('class', 'card-img-top')
    //     let img_tag = document.createElement('img')
    //     img_tag.src = ele.image
    //     img_tag.style.height = '8vh';

    //     img_div.appendChild(img_tag)
    //     img_div.style.display = 'flex'
    //     img_div.style.justifyContent = 'center'

    //     // PRODUCT PRICE
    //     let price = document.createElement('div')
    //     price.setAttribute('class', 'product-price')
    //     price.setAttribute('class', 'card-text')
    //     price.textContent = ele.price.toString();

    //     // PRODUCT RATING & COUNT
    //     let rating = document.createElement('div')
    //     rating.setAttribute('class', 'product-rating')
    //     rating.setAttribute('class', 'card-text')
    //     rating.textContent = `${ele.rating.rate} Stars [${ele.rating.count}]`

    //     // All into main div
    //     body.appendChild(title)
    //     new_div.appendChild(img_div)
    //     body.appendChild(price)
    //     body.appendChild(rating)
    //     new_div.appendChild(body)

    //     targetEle.appendChild(new_anch)
    // });

}

// createNav()

const url:string = 'https://fakestoreapi.com/products'
// let prodArray:Array<

async function fetchData(){
    try{
        const resp = await fetch(`${url}`)
        const resol:Array<Prod> = await resp.json()
    
        let carous_ele = document.getElementById('product-carousel')
        makeCarousel('All', carous_ele!, resol)
        // resol.forEach((ele: Prod) => { 

        //     // let new_div = document.createElement('div')
        //     // new_div.setAttribute('class', 'product-in-carousel')

        //     // let title = document.createElement('div')
        //     // title.setAttribute('class', 'product-title');

        //     // let 
        //     // title, categ, desc, img, price, rating

        //     console.log(ele);})
        console.log(typeof(resol))


    } catch {
        console.error('Error at fetching Data')
    }
}

fetchData()