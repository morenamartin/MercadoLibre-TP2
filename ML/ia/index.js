const app = document.querySelector(".app");
const botonEnviar = document.querySelector("#boton-enviar");
const containerMensaje = document.querySelector("#container-msj");
const inputMensaje = document.querySelector("#input-mensaje");
inputMensaje.value = "¿Qué ingredientes necesito para hacer un guiso de lentejas en mi casa?";

let paso = 0;
let carrito = 0;

function primerMensajeUsuario(mensaje) {
    const app = document.querySelector(".app");

    app.classList.remove("inicio");
    app.classList.add("chat-activo");
    const mensajeUsuario = document.createElement("div");
    const titulo = document.querySelector("#titleHeader");

    if (paso === 0) {
        titulo.textContent = "Ingredientes para guiso";
    }

    mensajeUsuario.classList.add(
        "mensaje",
        "mensaje-usuario"
    );

    mensajeUsuario.textContent = mensaje;

    containerMensaje.appendChild(mensajeUsuario);
}

const preferencias = [];


function actualizarInput() {
    const seleccionados = preferencias
        .filter(item => item.checkbox.checked)
        .map(item => item.checkbox.value);

    inputMensaje.value = seleccionados.length > 0 ? seleccionados.join(", " + "\n") : "Ninguna";
}


// FUNCION GENERICA PARA CREAR CHECKBOX CON TEXTO
function crearCheckbox(labelText) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = labelText;

    const span = document.createElement("span");
    span.textContent = labelText;

    const contenedor = document.createElement("div");
    contenedor.appendChild(checkbox);
    contenedor.appendChild(span);

    return { contenedor, checkbox };
}

// MENSAJE QUE MANDA IA CON LAS PREGUNTAS
function primerRespuestaIA () {
    const mensajeIa = document.createElement("div");
    mensajeIa.classList.add("mensaje", "mensaje-ia");
    mensajeIa.textContent = "Estoy pensando...";
    containerMensaje.appendChild(mensajeIa);
    
    setTimeout(() => {
        mensajeIa.textContent = "Antes de darte los ingredientes";
        const checkboxCeliaco = crearCheckbox("¿Sos celíaco/a? (Sin TACC)");
        preferencias.push(checkboxCeliaco);

        mensajeIa.appendChild(checkboxCeliaco.contenedor);

        checkboxCeliaco.checkbox.addEventListener("change", () => {
            actualizarInput();
        });
        
        const pregunta = document.createElement("span");
        pregunta.textContent = "¿Tenés alergia a algún alimento?";
        mensajeIa.appendChild(pregunta);

        const checkboxFrutosSecos = crearCheckbox("Frutos secos");
        mensajeIa.appendChild(checkboxFrutosSecos.contenedor);
        preferencias.push(checkboxFrutosSecos);
        checkboxFrutosSecos.checkbox.addEventListener("change", () => {
            actualizarInput();
        });

        const checkboxMariscos = crearCheckbox("Mariscos");
        preferencias.push(checkboxMariscos);
        mensajeIa.appendChild(checkboxMariscos.contenedor);

        checkboxMariscos.checkbox.addEventListener("change", () => {
            actualizarInput();
        });

        const checkboxHuevos = crearCheckbox("Huevos");
        preferencias.push(checkboxHuevos);
        mensajeIa.appendChild(checkboxHuevos.contenedor);
        checkboxHuevos.checkbox.addEventListener("change", () => {
            actualizarInput();
        });

        const checkboxLeche = crearCheckbox("Leche");
        preferencias.push(checkboxLeche);
        mensajeIa.appendChild(checkboxLeche.contenedor);
        checkboxLeche.checkbox.addEventListener("change", () => {
            actualizarInput();
        });

        const checkboxSoja = crearCheckbox("Soja");
        preferencias.push(checkboxSoja);
        mensajeIa.appendChild(checkboxSoja.contenedor);
        checkboxSoja.checkbox.addEventListener("change", () => {
            actualizarInput();
        });

        const checkboxOtra = crearCheckbox("Otra (escribir)");
        preferencias.push(checkboxOtra);
        mensajeIa.appendChild(checkboxOtra.contenedor);

        checkboxOtra.checkbox.addEventListener("change", () => {
            if (checkboxOtra.checkbox.checked) {
                const existeInput = checkboxOtra.contenedor.querySelector("input[type='text']");

                if (!existeInput) {
                    const inputOtra = document.createElement("input");
                    inputOtra.type = "text";
                    inputOtra.placeholder = "Escribí el alimento aquí...";
                    checkboxOtra.contenedor.appendChild(inputOtra);
                }
            } else {
                checkboxOtra.contenedor.querySelector("input[type='text']")?.remove();
            }
        });

        const pregunta2 = document.createElement("span");
        pregunta2.textContent = "¿Sos intolerante a algo?";
        mensajeIa.appendChild(pregunta2);

        const checkboxLactosa = crearCheckbox("Lactosa");
        preferencias.push(checkboxLactosa);
        mensajeIa.appendChild(checkboxLactosa.contenedor);
        checkboxLactosa.checkbox.addEventListener("change", () => {
            actualizarInput();
        });

        const checkboxGluten = crearCheckbox("Gluten");
        preferencias.push(checkboxGluten);
        mensajeIa.appendChild(checkboxGluten.contenedor);
        checkboxGluten.checkbox.addEventListener("change", () => {
            actualizarInput();
        });

        const checkboxOtra2 = crearCheckbox("Otra (escribir)");
        mensajeIa.appendChild(checkboxOtra2.contenedor);

        checkboxOtra2.checkbox.addEventListener("change", () => {
            if (checkboxOtra2.checkbox.checked) {
                const existeInput = checkboxOtra2.contenedor.querySelector("input[type='text']");

                if (!existeInput) {
                    const inputOtra2 = document.createElement("input");
                    inputOtra2.type = "text";
                    inputOtra2.placeholder = "Escribí la intolerancia aquí...";
                    checkboxOtra2.contenedor.appendChild(inputOtra2);
                }
            } else {
                checkboxOtra2.contenedor.querySelector("input[type='text']")?.remove();
            }
        });

        actualizarInput();
    }, 1500);
}

function segundaRespuestaIA() {
    const mensajeIa = document.createElement("div");

    mensajeIa.classList.add(
        "mensaje",
        "mensaje-ia"
    );

    mensajeIa.textContent =
        "Perfecto, ya tengo en cuenta tus preferencias alimentarias.";

    containerMensaje.appendChild(mensajeIa);
    setTimeout(() => {
        terceraRespuestaIA()
    }, 1000)
}

function terceraRespuestaIA() {
    const mensajeIa = document.createElement("div");
    mensajeIa.textContent = "...";
    containerMensaje.appendChild(mensajeIa);

    mensajeIa.classList.add(
        "mensaje",
        "mensaje-ia"
    );
    setTimeout(() => {
        mensajeIa.textContent = "Te dejo lo que necesitás para preparar esta receta.";
    
        containerMensaje.appendChild(mensajeIa);
            
        document.querySelector('.cargando').classList.add('oculto');
        document.querySelector('#listo').classList.remove('oculto');
        mostrarProductos();
    }, 1000)
    
}


const ingredientes = [
    {
        id: 1,
        nombre: "Lentejas",
    },
    {
        id: 2,
        nombre: "Carne para guiso",
    },
    {
        id: 3,
        nombre: "Chorizo colorado",
    },
    {
        id: 4,
        nombre: "Panceta",
    },
    {
        id: 5,
        nombre: "Cebolla",
    },
    {
        id: 6,
        nombre: "Zanahoria",
    },
    {
        id: 7,
        nombre: "Papa",
    },
    {
        id: 8,
        nombre: "Tomate triturado",
    },
    {
        id: 9,
        nombre: "Caldo de verduras",
    },
    {
        id: 10,
        nombre: "Morrón rojo",
    },
    {
        id: 11,
        nombre: "Ajo",
    },
    {
        id: 12,
        nombre: "Pimentón dulce",
    }
]


const productos = [
    {
        id: 1,
        nombre: "Lentejas Secas 500g",
        supermercado: "COTO",
        img: "../images/ia/ingredientes/lentejas.png",
        precio: 1890,
    },
    {
        id: 2,
        nombre: "Carne para Guiso 500g",
        supermercado: "Carrefour",
        img: "../images/ia/ingredientes/carne.png",
        precio: 4590,
    },
    {
        id: 3,
        nombre: "Chorizo Colorado x 2 unidades",
        supermercado: "Jumbo",
        img: "../images/ia/ingredientes/chorizo.png",
        precio: 2750,
    },
    {
        id: 4,
        nombre: "Panceta Ahumada 200g",
        supermercado: "Día",
        img: "../images/ia/ingredientes/panceta.png",
        precio: 2390,
    },
    {
        id: 5,
        nombre: "Cebolla x 1kg",
        supermercado: "COTO",
        img: "../images/ia/ingredientes/cebolla.webp",
        precio: 990,
    },
    {
        id: 6,
        nombre: "Zanahoria x 500g",
        supermercado: "Carrefour",
        img: "../images/ia/ingredientes/zanahoria.webp",
        precio: 790,
    },
    {
        id: 7,
        nombre: "Papa x 1kg",
        supermercado: "Jumbo",
        img: "../images/ia/ingredientes/papa.png",
        precio: 1190,
    },
    {
        id: 8,
        nombre: "Tomate Triturado 520g",
        supermercado: "Día",
        img: "../images/ia/ingredientes/tomate.png",
        precio: 1250,
    },
    {
        id: 9,
        nombre: "Caldo de Verduras x 2 ",
        supermercado: "COTO",
        img: "../images/ia/ingredientes/caldo.png",
        precio: 450,
    },
    {
        id: 10,
        nombre: "Morrón Rojo x unidad",
        supermercado: "Carrefour",
        img: "../images/ia/ingredientes/morron.webp",
        precio: 850,
    },
    {
        id: 11,
        nombre: "Ajo x 3 cabezas",
        supermercado: "Jumbo",
        img: "../images/ia/ingredientes/ajo.png",
        precio: 650,
    },
    {
        id: 12,
        nombre: "Pimentón Dulce 50g",
        supermercado: "Día",
        img: "../images/ia/ingredientes/pimenton.png",
        precio: 720,
    }
];

function mostrarProductos() {
    const seccionIngredientes = document.querySelector("#ingredientes");
    const seccionProductos = document.querySelector('#productos-container')
    seccionIngredientes.innerHTML = "";
    seccionProductos.innerHTML = "";

    const listaIngredientes = document.createElement("ul");
    listaIngredientes.style.width = "100%";
    listaIngredientes.style.display = "flex";
    listaIngredientes.style.flexDirection = "row";
    listaIngredientes.style.flexWrap = "wrap";
    listaIngredientes.style.gap = "30px";

    ingredientes.forEach((ingrediente) => {
        const itemListaProductos = document.createElement("li");
        itemListaProductos.textContent = ingrediente.nombre;
        listaIngredientes.appendChild(itemListaProductos);
    });

    productos.forEach((p) => {
        const productCard = document.createElement('div');
        productCard.classList.add("product-card");
        const productSuperContainer = document.createElement('div');
        productSuperContainer.classList.add("super");
        productSuperContainer.textContent = p.supermercado;
        
        const productImgBox = document.createElement('div');
        productImgBox.classList.add("product-img-box")
        const productImg = document.createElement('img')
        productImg.src = p.img;
        const productName = document.createElement('span');
        productName.style.fontSize = "14px"
        productName.textContent = p.nombre;
        const productPrecio = document.createElement('span');
        productPrecio.style.fontSize = "16px"
        productPrecio.textContent = `$${p.precio}`;
        const btnCarrito = document.createElement('button');
        btnCarrito.classList.add('botonCarrito');
        btnCarrito.textContent = "Agregar";

        btnCarrito.addEventListener("click", () => {
            carrito++;
            console.log(carrito);

            const contenedor = document.getElementById('contenedorCarritoBtn');

            let contadorContainer = document.querySelector('.contadorCarrito');

            if (!contadorContainer) {
                contadorContainer = document.createElement('div');
                contadorContainer.classList.add('contadorCarrito');

                const contador = document.createElement('span');
                contador.style.color = 'white';

                contadorContainer.appendChild(contador);
                contenedor.appendChild(contadorContainer);
            }

            contadorContainer.querySelector('span').textContent = carrito;
        });
        
        productCard.appendChild(productSuperContainer);
        productCard.appendChild(productImgBox);
        productCard.appendChild(productName);
        productCard.appendChild(productPrecio);
        productCard.appendChild(btnCarrito);
        productImgBox.appendChild(productImg);
        seccionProductos.appendChild(productCard);
    })

    seccionIngredientes.appendChild(listaIngredientes);
}

botonEnviar.addEventListener("click", () => {
    app.classList.remove("inicio");
    app.classList.add("chat-activo");

    const mensaje = inputMensaje.value;

    if (mensaje.trim() === "") {
        return;
    }

    primerMensajeUsuario(mensaje);

    inputMensaje.value = "";

    if (paso === 0) {
        primerRespuestaIA();
        paso++;
    } else if (paso === 1) {
        segundaRespuestaIA();
        paso++;
    } else if (paso === 2) {
        terceraRespuestaIA();
        mostrarProductos();
        paso++;
    } 
});