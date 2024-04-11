
let data=[
    {
        img:'../../img/phyton3.png',
        tittle: "Aprende en Phyton",
        describe: 
        "Explora Python, el lenguaje de programación versátil que impulsa la innovación en inteligencia artificial, ciencia de datos y más. Crea desde simples scripts hasta aplicaciones complejas con una sintaxis clara."
    },
    {
        img:'../../img/laravel3.jpg',
        tittle: "Descubriendo Laravel",
        describe: "Descubre Laravel, el framework de PHP que simplifica el desarrollo web. Construye aplicaciones potentes con una sintaxis intuitiva y características avanzadas."
    },
    {
        img:'../../img/node2.jpg',
        tittle: "Desarrollando en Node-JS",
        describe: "Sumérgete en Node.js, el entorno de ejecución de JavaScript del lado del servidor. Desarrolla aplicaciones web escalables y de alto rendimiento con un solo lenguaje en todo el stack tecnológico."
    },
    {
        img:'../../img/img3.PNG',
        tittle: "Programando en PHP",
        describe: "Aprende PHP y domina la web dinámica. PHP es un lenguaje de programación potente y versátil que te permite crear desde simples páginas web hasta aplicaciones web complejas con funcionalidades avanzadas. ¡Inscríbete en nuestros cursos de PHP y descubre un mundo de posibilidades para desarrollar tus proyectos web!"
    },
    
    ];
    
    const introduce =document.querySelector(".introduce");
    const ordinalNumber= document.querySelector('.ordinal-number');
    
    introduce.innerHTML="";
    ordinalNumber.innerHTML="";
    
    for (let i=0; i<data.length; i++){
        introduce.innerHTML += `
            <div class="wrapper">
                <span>
                    <h1 class="tittle" style="--idx: 1">${data[i].tittle}</h1>
                </span>
                <span>
                    <p class="describe" style="--idx: 2">${data[i].describe}</p>
                </span>
    
                <span>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                </span>
            </div>
        `;
        ordinalNumber.innerHTML += `<h2>0${i+ 1}</h2>`
    }
    
    introduce.children[0].classList.add("active");
    ordinalNumber.children[0].classList.add("active");
    
    const thumbnailListWrapper =document.querySelector(".thumbnail-list .wrapper");
    
    thumbnailListWrapper.innerHTML += `
        <div class="thumbnail zoom">
            <img src="./img/${data[0].img}" alt="">
        </div>
    `;
    for (let i=1; i<data.length; i++){
        thumbnailListWrapper.innerHTML += `
            <div class="thumbnail" style="--idx: ${i - 1}">
                <img src="./img/${data[i].img}" alt="">
            </div>
        `;
    }
    
    const nextBtn = document.querySelector(".navigation .next-button");
    var currentIndex= 0;
    nextBtn.addEventListener("click", () => {
        nextBtn.disabled=true;
        var clone = thumbnailListWrapper.children[0].cloneNode(true);
        clone.classList.remove("zoom");
        thumbnailListWrapper.appendChild(clone);
        thumbnailListWrapper.children[1].classList.add("zoom");
        setTimeout(() => {
            thumbnailListWrapper.children[0].remove();
            nextBtn.disabled = false;
        }, 1000);
    
        for(let i=2; i<thumbnailListWrapper.childElementCount; i++){
            thumbnailListWrapper.children[i].style= `--idx: ${i-2}`;
        }
    
        if(currentIndex < data.length - 1){
            currentIndex++;
        }
        else currentIndex = 0;
        for (let  i = 0; i< data.length ; i++){
            introduce.children[i].classList.remove("active");
            ordinalNumber.children[i].classList.remove("active");
        }
        introduce.children[currentIndex].classList.add("active");
        ordinalNumber.children[currentIndex].classList.add("active");
        ordinalNumber.children[currentIndex].textContent= `0${currentIndex +1}`
    
    })
    
    //Carrucel movil
    const carouselImg = document.getElementById('carousel-img');
    // Función para cambiar la imagen
    function changeImage(direction) {
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % data.length;
    } else {
        currentIndex = (currentIndex - 1 + data.length) % data.length;
    }
    carouselImg.src =  data[currentIndex].img;
    }
    
    document.getElementById('prev').addEventListener('click', () => {
        changeImage('prev');
    });
    
    document.getElementById('next').addEventListener('click', () => {
        changeImage('next');
    });
    
    carouselImg.src = data[currentIndex].img;
    
    const divMovil = document.getElementById('carousel');
    const divPC = document.getElementById('carrucelpc');
    
    function actualizarVisibilidadDivs() {
    if (window.innerWidth <= 768) {
        divMovil.style.display = 'block';
        divPC.style.display = 'none';
    } else {
        divMovil.style.display = 'none';
        divPC.style.display = 'block';
    }
    }
    
    window.addEventListener('load', actualizarVisibilidadDivs);
    window.addEventListener('resize', actualizarVisibilidadDivs);
    