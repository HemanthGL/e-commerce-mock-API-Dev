document.write(`
<nav class="navbar navbar-expand-lg bg-body-tertiary mb-1 mt-1 ms-2 me-2">
  <div class="container-fluid">
    <a class="navbar-brand" href="./">NCIX Store</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">

      <ul class="navbar-nav">

        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="./">Home</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="./categories.html?categ=electronics">Electronics</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="./categories.html?categ=jewelery    ">Jewelery</a>
        </li>

        <li class="nav-item dropdown">

          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Clothing
          </a>

          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="./categories.html?categ=men's clothing">Men</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="./categories.html?categ=women%27s%20clothing">Women</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="./categories.html?categ=all">All</a></li>
          </ul>

        </li>

         <li class="nav-item">
          <a class="nav-link" href="./cart.html">Cart &nbsp <!-- insert Icon instead -->
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="mb-1 bi bi-bag " viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
            </svg>
          </a>
        </li>
        
      </ul>

    </div>
  </div>
</nav>
`)