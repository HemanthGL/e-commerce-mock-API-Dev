interface StoredProd{
    id: string,
    quant: number
}

interface Prod{
    categ: string;
    desc: string;
    id: number;
    image: string;
    price: number;
    rating: {rate:number, count:number};
    title: string

}

async function fetchCartData(id: number){
    try{
        const resp = await fetch(`https://fakestoreapi.com/products/${id}`)
        console.log(resp)
        const prod = await resp.json()

        console.log(prod)

        // console.log(prod)
        // console.log(typeof(prod))
    
        return prod;

    }
    catch(error){
        console.log('catch error')
        console.error(error);
        console.log('catch error end')
    }
    
}

const tBody = document.getElementById('tb-body')

renderCart(tBody)

function incQuant(id: number):void{

    console.log(`request to increase quant of id: ${id}`)
    
    let data: string | null = localStorage.getItem('cart')
    if (data == null){
        console.error('Cannot find cart data in LocalStorage')        
        return;
    }

    let resp:Array<StoredProd> = JSON.parse(data)             // DOING ADD REMOVE BUTTONS IN CART

    let idx : number | undefined = resp.findIndex((ele : StoredProd) => {
        return ele.id == id.toString();
    })

    if (idx == undefined){
        console.error('given prod not in card obj')
        return;
    }

    resp[idx].quant += 1;

    // changing value onPage
    document.getElementById(`${id}-quant`)!.textContent = resp[idx].quant.toString()

    // setting data to storage again

    let stringify = JSON.stringify(resp)
    localStorage.setItem('cart', stringify)

}

function decQuant(id: number){

    console.log(`request to decrease quant of id: ${id}`)
    
    let data: string | null = localStorage.getItem('cart')
    if (data == null){
        console.error('Cannot find cart data in LocalStorage')        
        return;
    }

    let resp:Array<StoredProd> = JSON.parse(data)             // DOING ADD REMOVE BUTTONS IN CART

    let idx : number | undefined = resp.findIndex((ele : StoredProd) => {
        return ele.id == id.toString();
    })

    if (idx == undefined){
        console.error('req dec cart size: given prod not in card obj')
        return;
    }

    resp[idx].quant -= 1;

    // to remove from cart when quant 0
    if (resp[idx].quant == 0){
        // change in localstorage
        if (resp.length > 1)
            resp.splice(idx, 1)
        else if (resp.length == 1)
            resp = []
        
        // updating in the LocalStorage
        if (resp.length == 0){
            localStorage.removeItem('cart')
        } else {
            let stringify = JSON.stringify(resp)
            localStorage.setItem('cart', stringify)
        }
        
        window.location.reload();
        updateCartTotal();
        return;
    }

    console.log('after reload')
    console.log(resp)
    // changing value onPage
    document.getElementById(`${id}-quant`)!.textContent = resp[idx].quant.toString()
    let each = document.getElementById(`${id}-each`)?.textContent;
    document.getElementById(`${id}-total`)!.textContent = (resp[idx].quant * parseInt(each!)).toString();
    // console.log(test)

    // setting data to storage again
    if (resp.length == 0){
        localStorage.removeItem('cart')
    } else {
        let stringify = JSON.stringify(resp)
        localStorage.setItem('cart', stringify)

    }
    updateCartTotal();

}


async function cartItem(item: StoredProd){


    const prod:Prod = await fetchCartData(parseInt(item.id))
    
    const tbRow = `
        <tr id = '${prod.id}-prod'>
            <th scope="row" class = 'text-center'>${prod.id}</th>
            <td class = 'text-center'>
                <img src="${prod.image}" style='width: 60px; height: 60px'/>
            </td>
            <td class='text-center'>${prod.title}</td>
            <td>
                <div class='d-flex container-fluid justify-content-evenly'>
                    <button class='btn btn-primary' id="${item.id}-inc-btn" onclick= "incQuant(${item.id})" type = 'button'>+</button>
                    <p id="${item.id}-quant" class='inline'> ${item.quant} </p>
                    <button class='btn btn-warning' id = "${item.id}-dec-btn" onclick= "decQuant(${item.id})" = 'button'>-</button>
                </div>
            </td>
            <td id = '${prod.id}-each'>${prod.price}</td>
            <td id="${prod.id}-total" class="prod-total">${prod.price * item.quant}</td>
        </tr>
    `
    
    return tbRow;

}

function updateCartTotal(){
    let collection = document.getElementsByClassName('prod-total')

    let total = 0

    if (collection.length != 0){
        for (let ele of collection){
            total += parseInt(ele.textContent)
        }
    }
    document.getElementById('cart-total')?.textContent = total.toString();
}

async function renderCart(tBody: HTMLElement):Promise<void>{
//     const cartItem = (item: StoredProd) => {
// //         `
// //             <table class="table table-striped">
// //   ...
// // </table>
// //         `
//     }

    const strDB: string | null = localStorage.getItem('cart')
    
    if (strDB == null){

        return;
    }
    
    const cartFeed:JSON = JSON.parse(strDB)

    console.log('stored data is ')
    console.log(cartFeed)

    for (let cart of cartFeed){
        let idStr = cart.id
        let idNum = parseInt(idStr)
        console.log(typeof(cart.id))
        console.log(' is the cart item')
        let addRow = await cartItem(cart);
        tBody.innerHTML += addRow;
        // tBody.innerHTML += addRow;
    }

    updateCartTotal();
}