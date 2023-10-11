interface Prod{
    categ: string;
    desc: string;
    id: number;
    image: string;
    price: number;
    rating: {rate:number, count:number};
    title: string

}

console.log('entered product file')

let searchParamsProd = new URLSearchParams(window.location.search)

let id:string = searchParamsProd.get('id')!

console.log('my id is ', id);

console.log('testing this here')

async function fetchDataProd(id: string){

    // console.log(categ + " is the string")
    
    const resp = await fetch(`https://fakestoreapi.com/products/${id}`)
    const res: Prod = await resp.json()
    console.log(res)

    let new_arr: Array<Prod> = new Array<Prod>
    new_arr.push(res)
    const carous_ele = document.getElementById('product-carousel')!
    // carous_ele.classList.add('product-carousel')
    makeCarousel(`${res.categ}`, carous_ele, new_arr)
    console.log('after render')
    // document.getElementsByTagName('body').appendChild(carous_ele)

}


fetchDataProd(id)

// rewrite this for specific product page layouts
function makeCarousel(categClass: string, targetEle: HTMLElement, arrProd: Array<Prod>){
    arrProd.forEach((ele: Prod) => {
        // container for card deets
        let new_anch = document.createElement('a')
        new_anch.href = `./product.html?id=${ele.id}`
        let new_div = document.createElement('div')
        new_div.setAttribute('class', 'card')
        new_div.setAttribute('class', `${categClass}-product-in-carousel`)
        new_div.setAttribute('class', `prod-id-${ele.id}`)  // to access id: HTMLElement.attributes [ check whether this gives array, or what ]
        new_div.style.width = '18rem'
        new_div.style.border = '5px solid black'
        new_div.style.display = 'flex'
        new_div.style.flexDirection = 'column'
        new_div.style.justifyContent = 'center'
        new_div.style.alignContent = 'center'

        new_anch.appendChild(new_div)

        // CARD BODY
        let body = document.createElement('div')
        body.setAttribute('class', 'card-body')
        // body.style.maxWidth = '8vw'
        body.style.display = 'flex'
        body.style.flexDirection = 'column'
        body.style.justifyContent = 'center'
        body.style.alignContent = 'center'
        body.setAttribute('class', 'text-center')
        body.style.border = '2px solid brown'
        

        // PRODUCT TITLE
        let title = document.createElement('div')
        title.setAttribute('class', 'product-title')
        title.setAttribute('class', 'card-title')
        title.textContent = ele.title

        // PRODUCT IMAGE
        let img_div = document.createElement('div')
        img_div.setAttribute('class', 'product_img_encl')
        img_div.setAttribute('class', 'card-img-top')
        let img_tag = document.createElement('img')
        img_tag.src = ele.image
        img_tag.style.height = '8vh';

        img_div.appendChild(img_tag)
        img_div.style.display = 'flex'
        img_div.style.justifyContent = 'center'

        // PRODUCT PRICE
        let price = document.createElement('div')
        price.setAttribute('class', 'product-price')
        price.setAttribute('class', 'card-text')
        price.textContent = ele.price.toString();

        // PRODUCT RATING & COUNT
        let rating = document.createElement('div')
        rating.setAttribute('class', 'product-rating')
        rating.setAttribute('class', 'card-text')
        rating.textContent = `${ele.rating.rate} Stars [${ele.rating.count}]`

        // All into main div
        body.appendChild(title)
        new_div.appendChild(img_div)
        body.appendChild(price)
        body.appendChild(rating)
        new_div.appendChild(body)

        targetEle.appendChild(new_anch)
    });

}