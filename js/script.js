//Endpoint de Integrantes - API
const API_URL = "https://retoolapi.dev/LMXVos/integrantes";

//Funcion que manda a traer el JSON con GET
async function ObtenerIntegrantes(){
    //Respuesta del servidor
    const respuesta = await fetch(API_URL);

    //Pasamos a JSON la respuesta del servidor
    const data = await respuesta.json(); //Esto es un JSON

    //Enviamos el JSON a la funcion que genera las filas en la tabla
    MostrarDatos(data);
}

//Funcion para crear las filas de la tabla e base a un JSON
//Datos representara al JSON donde viene la informacion
function MostrarDatos(datos){

    //Se llama a la tabla con elemeto id y luego al tbody
    const tabla = document.querySelector("#tabla tbody")

    //para inyectar codigo HTML usamos una propieedad innerHTML
    tabla.innerHTML = ""; //Para vaciar el contenido de la tabla

    datos.forEach(integrante => {
        tabla.innerHTML += `
        <tr>
                <td>${integrante.id}</td>
                <td>${integrante.nombre}</td>
                <td>${integrante.apellido}</td>
                <td>${integrante.correo}</td>

                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>

        </tr>
        `;
    });
}

ObtenerIntegrantes();


//Proceso para agregar un nuevo integrante
const modal = document.getElementById("mdAgregar"); //Cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar"); //Boton para agregar
const btnCerrar = document.getElementById("btnCerrar"); //Boton para cerrar

btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); //Abrir el modal al hacer clic en el boton
});

btnCerrar.addEventListener("click", ()=>{
    modal.close(); //Cerrar el modal al hacer clic en la x
});

//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); // "e" representa a "submit" evita que el formulario se envie de un solo.

    //Capturar los valores del formulario
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();

    //Validacion basica
    if(!nombre || !apellido || !correo){
        alert("Ingrese los valores correctamente");
        return; //Para evitar que el codigo se siga ejecutando
    }

    //Llamar a la API para enviar el registro
    const respuesta = await fetch(API_URL, {
        method: "POST",
        
    });

});
