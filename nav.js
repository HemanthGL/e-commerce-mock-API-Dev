function createNav() {
    var main_div = document.createElement('div');
    main_div.setAttribute('class', 'main-navbar');
    main_div.setAttribute('class', 'navbar');
    main_div.classList.add('navbar-expand-lg', 'bg-body-tertiary');
    var bodyEle = document.getElementsByTagName('body');
    console.log(bodyEle);
}
createNav();
