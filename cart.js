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
function fetchCartData(id) {
    return __awaiter(this, void 0, void 0, function () {
        var resp, prod, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://fakestoreapi.com/products/".concat(id))];
                case 1:
                    resp = _a.sent();
                    console.log(resp);
                    return [4 /*yield*/, resp.json()];
                case 2:
                    prod = _a.sent();
                    console.log(prod);
                    // console.log(prod)
                    // console.log(typeof(prod))
                    return [2 /*return*/, prod];
                case 3:
                    error_1 = _a.sent();
                    console.log('catch error');
                    console.error(error_1);
                    console.log('catch error end');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var tBody = document.getElementById('tb-body');
renderCart(tBody);
function incQuant(id) {
    console.log("request to increase quant of id: ".concat(id));
    var data = localStorage.getItem('cart');
    if (data == null) {
        console.error('Cannot find cart data in LocalStorage');
        return;
    }
    var resp = JSON.parse(data); // DOING ADD REMOVE BUTTONS IN CART
    var idx = resp.findIndex(function (ele) {
        return ele.id == id.toString();
    });
    if (idx == undefined) {
        console.error('given prod not in card obj');
        return;
    }
    resp[idx].quant += 1;
    // changing value onPage
    document.getElementById("".concat(id, "-quant")).textContent = resp[idx].quant.toString();
    // setting data to storage again
    var stringify = JSON.stringify(resp);
    localStorage.setItem('cart', stringify);
}
function decQuant(id) {
    var _a;
    console.log("request to decrease quant of id: ".concat(id));
    var data = localStorage.getItem('cart');
    if (data == null) {
        console.error('Cannot find cart data in LocalStorage');
        return;
    }
    var resp = JSON.parse(data); // DOING ADD REMOVE BUTTONS IN CART
    var idx = resp.findIndex(function (ele) {
        return ele.id == id.toString();
    });
    if (idx == undefined) {
        console.error('req dec cart size: given prod not in card obj');
        return;
    }
    resp[idx].quant -= 1;
    // to remove from cart when quant 0
    if (resp[idx].quant == 0) {
        // change in localstorage
        if (resp.length > 1)
            resp.splice(idx, 1);
        else if (resp.length == 1)
            resp = [];
        // updating in the LocalStorage
        if (resp.length == 0) {
            localStorage.removeItem('cart');
        }
        else {
            var stringify = JSON.stringify(resp);
            localStorage.setItem('cart', stringify);
        }
        window.location.reload();
        updateCartTotal();
        return;
    }
    console.log('after reload');
    console.log(resp);
    // changing value onPage
    document.getElementById("".concat(id, "-quant")).textContent = resp[idx].quant.toString();
    var each = (_a = document.getElementById("".concat(id, "-each"))) === null || _a === void 0 ? void 0 : _a.textContent;
    document.getElementById("".concat(id, "-total")).textContent = (resp[idx].quant * parseInt(each)).toString();
    // console.log(test)
    // setting data to storage again
    if (resp.length == 0) {
        localStorage.removeItem('cart');
    }
    else {
        var stringify = JSON.stringify(resp);
        localStorage.setItem('cart', stringify);
    }
    updateCartTotal();
}
function cartItem(item) {
    return __awaiter(this, void 0, void 0, function () {
        var prod, tbRow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchCartData(parseInt(item.id))];
                case 1:
                    prod = _a.sent();
                    tbRow = "\n        <tr id = '".concat(prod.id, "-prod'>\n            <th scope=\"row\" class = 'text-center'>").concat(prod.id, "</th>\n            <td class = 'text-center'>\n                <img src=\"").concat(prod.image, "\" style='width: 60px; height: 60px'/>\n            </td>\n            <td class='text-center'>").concat(prod.title, "</td>\n            <td>\n                <div class='d-flex container-fluid justify-content-evenly'>\n                    <button class='btn btn-primary' id=\"").concat(item.id, "-inc-btn\" onclick= \"incQuant(").concat(item.id, ")\" type = 'button'>+</button>\n                    <p id=\"").concat(item.id, "-quant\" class='inline'> ").concat(item.quant, " </p>\n                    <button class='btn btn-warning' id = \"").concat(item.id, "-dec-btn\" onclick= \"decQuant(").concat(item.id, ")\" = 'button'>-</button>\n                </div>\n            </td>\n            <td id = '").concat(prod.id, "-each'>").concat(prod.price, "</td>\n            <td id=\"").concat(prod.id, "-total\" class=\"prod-total\">").concat(prod.price * item.quant, "</td>\n        </tr>\n    ");
                    return [2 /*return*/, tbRow];
            }
        });
    });
}
function updateCartTotal() {
    var _a;
    var collection = document.getElementsByClassName('prod-total');
    var total = 0;
    if (collection.length != 0) {
        for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
            var ele = collection_1[_i];
            total += parseInt(ele.textContent);
        }
    }
    (_a = document.getElementById('cart-total')) === null || _a === void 0 ? void 0 : _a.textContent = total.toString();
}
function renderCart(tBody) {
    return __awaiter(this, void 0, void 0, function () {
        var strDB, cartFeed, _i, cartFeed_1, cart, idStr, idNum, addRow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    strDB = localStorage.getItem('cart');
                    if (strDB == null) {
                        return [2 /*return*/];
                    }
                    cartFeed = JSON.parse(strDB);
                    console.log('stored data is ');
                    console.log(cartFeed);
                    _i = 0, cartFeed_1 = cartFeed;
                    _a.label = 1;
                case 1:
                    if (!(_i < cartFeed_1.length)) return [3 /*break*/, 4];
                    cart = cartFeed_1[_i];
                    idStr = cart.id;
                    idNum = parseInt(idStr);
                    console.log(typeof (cart.id));
                    console.log(' is the cart item');
                    return [4 /*yield*/, cartItem(cart)];
                case 2:
                    addRow = _a.sent();
                    tBody.innerHTML += addRow;
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    updateCartTotal();
                    return [2 /*return*/];
            }
        });
    });
}
