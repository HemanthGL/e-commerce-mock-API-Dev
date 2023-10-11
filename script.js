// import { createNav } from "./nav";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Fn. to create cards supplied in an Array
function makeCarousel(categClass, targetEle, arrProd) {
    var card = function (prod) {
        var iconHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/> </svg>';
        var ln = prod.title.length;
        var sub = prod.title.substring(0, 35);
        if (sub.length < prod.title.length) {
            sub += '...';
        }
        var strHTML = "\n            <div class=\"card\" style=\"min-width: 220px\" >\n                <div class=\"card-body d-flex flex-column justify-content-between\">\n                    <img src=\"".concat(prod.image, "\" class=\"card-img-top p-3\" alt=\"...\">\n                    <h5 class=\"card-title\">").concat(sub, "</h5>\n                    <a href=\"./product.html?id=").concat(prod.id, "\" class = \"\"> </a>\n                </div>\n                <ul class=\"list-group list-group-flush\">\n                    <li class=\"list-group-item\"><b>Price:</b> $").concat(prod.price, "</li>\n                    <li class=\"list-group-itemn d-flex justify-content-between p-4\">\n                        <div>\n                        <b>Rating:</b> \n                        ").concat(prod.rating.rate, " ").concat(iconHTML, "\n                        </div>\n                        <div>\n                            [").concat(prod.rating.count, "]\n                        </div>\n                        </li> \n                        <!-- change to two separate divs later on -->\n                    <li class=\"list-group-item text-center p-3\"><button class=\"btn btn-primary cart-btn\" id=\"").concat(prod.id, "\" >Add Cart</button></li>\n                </ul>\n            </div>\n        ");
        return strHTML;
    };
    var idFind = document.getElementById('product-carousel');
    idFind.classList.add('d-flex', 'flex-wrap', 'gap-4');
    arrProd.forEach(function (ele) {
        idFind.innerHTML += card(ele);
    });
    function addCart(id) {
        if (localStorage.getItem('cart') === null || localStorage.getItem('cart') === undefined) {
            var value = JSON.stringify([{ id: id, quant: 1 }]);
            console.log('value parsed here is ', value);
            localStorage.setItem('cart', value);
            console.log(' in above if only ');
            console.log(JSON.parse(localStorage.getItem('cart')));
        }
        else {
            var parsed = JSON.parse(localStorage.getItem('cart'));
            console.log(parsed + ' is parsed here ');
            console.log(parsed);
            var found = parsed.some(function (ele) { return ele.id === id; });
            if (!found) {
                parsed.push({ id: id, quant: 1 });
                console.log('after not found, adding, parse is: ', parsed);
            }
            else {
                var idx = parsed.findIndex(function (ele) { return ele.id === id; });
                parsed[idx].quant += 1;
            }
            // if (parsed.id !== undefined){
            //     let value = parsed.id
            //     parsed.id = value + 1
            //     console.log('entered if ')
            // } else {
            //     console.log('entere else ')
            //     parsed.id = 1;
            // }
            console.log(parsed);
            console.log('before exiting');
            localStorage.setItem('cart', JSON.stringify(parsed));
        }
    }
    var buttons = document.querySelectorAll('.cart-btn');
    buttons.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            var addToCart = event.target.id;
            console.log(addToCart);
            var element = document.getElementById("".concat(addToCart));
            element.textContent = "Added to Cart";
            element.style.backgroundColor = 'yellow';
            element.style.color = "black";
            addCart(addToCart);
        });
    });
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
var url = 'https://fakestoreapi.com/products';
// let prodArray:Array<
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var resp, resol, carous_ele, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(url))];
                case 1:
                    resp = _b.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    resol = _b.sent();
                    carous_ele = document.getElementById('product-carousel');
                    makeCarousel('All', carous_ele, resol);
                    // resol.forEach((ele: Prod) => { 
                    //     // let new_div = document.createElement('div')
                    //     // new_div.setAttribute('class', 'product-in-carousel')
                    //     // let title = document.createElement('div')
                    //     // title.setAttribute('class', 'product-title');
                    //     // let 
                    //     // title, categ, desc, img, price, rating
                    //     console.log(ele);})
                    console.log(typeof (resol));
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    console.error('Error at fetching Data');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
fetchData();
