var $ = el => document.querySelector(el);
document.addEventListener("DOMContentLoaded", event => {
   
    let alumnos = document.getElementById("alumnos"); // Instanciamos los elementos
    let docentes = document.getElementById("docentes"); //

    //SE AGREGAN LOS EVENTOS LISTENER PARA CADA VISTA
    alumnos.addEventListener("click", e=>{
        e.stopPropagation();
        let vista = "alumnos";
        colocarVista(vista);

    });

    docentes.addEventListener("click", e=>{
        e.stopPropagation();
        let vista = "docentes";
        colocarVista(vista);
    
    });
}); 
 function colocarVista(vista){

    fetch(`public/vistas/${vista}/${vista}.html`).then( resp => resp.text()).then( resp => {

        document.getElementById(`vistas-${vista}`).innerHTML = resp;
        let btnCerrar = $(".close");

        btnCerrar.addEventListener("click", event => {
            $(`#vistas-${vista}`).innerHTML = "";
        });

        let cuerpo = $("body"), script = document.createElement("script");
        script.src = `public/vistas/${vista}/${vista}.js`;
        cuerpo.appendChild(script);
            
    });

 }