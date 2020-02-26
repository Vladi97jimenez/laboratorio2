document.addEventListener("DOMContentLoaded", e=>{
    document.querySelector("#frmAlumnos").addEventListener("submit", event=>{
        event.preventDefault();

        let codigo = document.querySelector("#txtCodigoAlumno").value,
            nombre = document.querySelector("#txtNombreAlumno").value,
            direccion = document.querySelector("#txtDireccionAlumno").value,
            telefono = document.querySelector("#txtTelefonoAlumno").value;

        console.log(codigo, nombre, direccion, telefono);
        
        if( 'localStorage' in window ){
            window.localStorage.setItem("codigo "+codigo, codigo);
            window.localStorage.setItem("nombre "+codigo, nombre);
            window.localStorage.setItem("direccion "+codigo, direccion);
            window.localStorage.setItem("telefono "+codigo, telefono);

            alert("Datos Guardados con exito.");

            limpiar();


          //SE LE AÑADE UN IDENTIFICADOR A CADA CLAVE, EN ESTE CASO ESE IDENTIFICADOR ES EL CODIGO YA QUE NO SE PUEDE REPETIR
          //ASI CADA CLAVE SERA DIFERENTE 
        

        } else {
            alert("Por favor ACTUALIZATE!!!.");
        }
    });


    /*SE  DEBE INGRESAR UN CODIGO DE ESTUDIANTE QUE YA ESTE GUARDADO
     PARA LUEGO DARLE CLICK AL BOTON RECUPERAR */
    document.querySelector("#btnRecuperarAlumno").addEventListener("click", event=>{

        if(document.querySelector("#txtCodigoAlumno").Value = !"" ){
            TraerDatos();

        } else {
            alert("Introduzca un codigo de usuario para buscar.");
        }
        
        //LUEGO PREGUNTAMOS SI LA CAJA DE TEXTO QUE CONTIENE EL CODIGO NO ESTÁ VACIA. 
        //Y AL DARLE CLICK AL BOTON RECUPERAR TRAERA LOS VALORES QUE ESTEN ASOCIADOS AL CODIGO
        //Y PARA ELLO GUARDAMOS EL VALOR QUE HAY EN LA CAJA DE TEXTO DEL CODIGO 
        //Y SE LO CONCATENAMOS A LAS DEMAS CLAVES PARA ASI TRAER A LOS DATOS CORRESPONDIENTES
    
    });

    function TraerDatos(){
        let traer = document.querySelector("#txtCodigoAlumno").value
        document.querySelector("#txtNombreAlumno").value = window.localStorage.getItem("nombre "+traer);
        document.querySelector("#txtDireccionAlumno").value = window.localStorage.getItem("direccion "+traer);
        document.querySelector("#txtTelefonoAlumno").value = window.localStorage.getItem("telefono "+traer);
    }

    function limpiar(){
        document.querySelector("#txtCodigoAlumno").value= "";
        document.querySelector("#txtNombreAlumno").value = "";
        document.querySelector("#txtDireccionAlumno").value = "";
        document.querySelector("#txtTelefonoAlumno").value = "";
    }

    document.querySelector("#btnLimpiar").addEventListener("click", event=>{
        limpiar();


    });
});

// Usis025418 Eliezer Vladimir Jimenez Pineda 