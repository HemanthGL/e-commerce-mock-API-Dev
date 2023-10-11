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
console.log('entered product file');
var searchParamsProd = new URLSearchParams(window.location.search);
var id = searchParamsProd.get('id');
console.log('my id is ', id);
console.log('testing this here');
function fetchDataProd(id) {
    return __awaiter(this, void 0, void 0, function () {
        var resp, res, new_arr, carous_ele;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://fakestoreapi.com/products/".concat(id))];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    res = _a.sent();
                    console.log(res);
                    new_arr = new Array;
                    new_arr.push(res);
                    carous_ele = document.getElementById('product-carousel');
                    // carous_ele.classList.add('product-carousel')
                    makeCarousel("".concat(res.categ), carous_ele, new_arr);
                    console.log('after render');
                    return [2 /*return*/];
            }
        });
    });
}
fetchDataProd(id);
// rewrite this for specific product page layouts
function makeCarousel(categClass, targetEle, arrProd) {
    arrProd.forEach(function (ele) {
        // container for card deets
        var new_anch = document.createElement('a');
        new_anch.href = "./product.html?id=".concat(ele.id);
        var new_div = document.createElement('div');
        new_div.setAttribute('class', 'card');
        new_div.setAttribute('class', "".concat(categClass, "-product-in-carousel"));
        new_div.setAttribute('class', "prod-id-".concat(ele.id)); // to access id: HTMLElement.attributes [ check whether this gives array, or what ]
        new_div.style.width = '18rem';
        new_div.style.border = '5px solid black';
        new_div.style.display = 'flex';
        new_div.style.flexDirection = 'column';
        new_div.style.justifyContent = 'center';
        new_div.style.alignContent = 'center';
        new_anch.appendChild(new_div);
        // CARD BODY
        var body = document.createElement('div');
        body.setAttribute('class', 'card-body');
        // body.style.maxWidth = '8vw'
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        body.style.justifyContent = 'center';
        body.style.alignContent = 'center';
        body.setAttribute('class', 'text-center');
        body.style.border = '2px solid brown';
        // PRODUCT TITLE
        var title = document.createElement('div');
        title.setAttribute('class', 'product-title');
        title.setAttribute('class', 'card-title');
        title.textContent = ele.title;
        // PRODUCT IMAGE
        var img_div = document.createElement('div');
        img_div.setAttribute('class', 'product_img_encl');
        img_div.setAttribute('class', 'card-img-top');
        var img_tag = document.createElement('img');
        img_tag.src = ele.image;
        img_tag.style.height = '8vh';
        img_div.appendChild(img_tag);
        img_div.style.display = 'flex';
        img_div.style.justifyContent = 'center';
        // PRODUCT PRICE
        var price = document.createElement('div');
        price.setAttribute('class', 'product-price');
        price.setAttribute('class', 'card-text');
        price.textContent = ele.price.toString();
        // PRODUCT RATING & COUNT
        var rating = document.createElement('div');
        rating.setAttribute('class', 'product-rating');
        rating.setAttribute('class', 'card-text');
        rating.textContent = "".concat(ele.rating.rate, " Stars [").concat(ele.rating.count, "]");
        // All into main div
        body.appendChild(title);
        new_div.appendChild(img_div);
        body.appendChild(price);
        body.appendChild(rating);
        new_div.appendChild(body);
        targetEle.appendChild(new_anch);
    });
}
