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
                    <button onclick="EliminarPersona(${integrante.id})">Eliminar</button>
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
    const nombre = document.getElementById("txombre").value.trim();
    const apellido = document.getElementById("tApellido").value.trim();
    const correo = document.getElementById("txtail").value.trim();

    //Validacion basica
    if(!nombre || !apellido || !correo){
        alert("Ingrese los valores correctamente");
        return; //Para evitar que el codigo se siga ejecutando
    }

    //Llamar a la API para enviar el registro
    const respuesta = await fetch(API_URL, {
        method: "POST", //Tipo de solicitud
        headers: {'Content-Type':'application/json'}, //Tipo de dato enviado
        body: JSON.stringify({nombre, apeldo, correo}) //Datos enviados
    });

    //Verificar si la API responde que los datos fueron enviados corectamente
    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario
        document.getElementById("frmAgrar").reset();

        //Cerrar el modal (dialog)
        modal.close();

        //Recargar la tabla
        ObtenerIntegrantes();
    }
    else{
        //En caso de que la API devuelva un codigo diferente  a 200-299
        alert("El registro no pudo ser agregado");
    }

});


//Funcion para Eliminar registros
async function EliminarPersona(id){
    const confirmacion = confirm("¿Realmente deseas eliminar el registro?");

    //Validamos su el usuario si escogio borrar
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELEE"
        });

        //Recargar la tabla despues de eliminar
        ObtenerIntegrantes();
    }
}