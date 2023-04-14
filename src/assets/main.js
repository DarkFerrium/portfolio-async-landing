/*
Agrego la url como una constante
*/
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCPy3uAh7QwTplnxBE9WGPCw&part=snippet%2Cid&order=date&maxResults=9'

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd011e682b6mshf74aa98e050aae2p15f679jsn21cef18f6cf6',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};
//creamos una nueva funcion
async function fetchData(urlApi){
    //ojo no mostrar las KEY de X-RapidApi
    //llamamos la informacion pormedio de fetch
    const response = await fetch(urlApi, options)
    //transformamos la informacion
    const data = await response.json();
    return data;
}

//vamos a generar una logica para que una funcion se llame a si misma, para que cuando el compilardor lea el codigo llame automaticamente a la funcion y genere la secuencia, se hace son async y una funcion anonima
//
(async () =>{
    try{
        const videos = await fetchData(API);
        //ahora creamos un template html, para que itere por cada uno de los elementos que esta en la respuesta
        //copiamos el codigo html ubicado en content de nuestro index.html, qe es la base de como se representa un item, como la imagen, el titulo y enlace
        
        //creamos una valor llamado let view y una un template con comillas francesas, donde llamamos a video dentro de video accedo a items
        //luego uso el metodo map para regresar un nuevo arreglo pero con la tranformacion que estoy haciendo con el template
        //map me sirve para iterar cada elemente , en este caso cada video y llenar la siguiente platilla con la informacion de cada video de a uno a uno, por eso itera
        let view = `
        ${videos.items.map(video => `
          <div class="group relative">
          <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${video.snippet.title}
            </h3>
          </div>
        </div>        
        `).slice(0,4).join('')}
        `;
      //aca le metemos el contenido de la plantilla una vez lleno al documento html
        content.innerHTML = view ;

    } catch (error) {
      console.log(error);
            /*
      En el código que muestras, el parámetro "error" en la cláusula "catch" captura la excepción que se ha producido en el bloque "try".

      Cuando se produce una excepción en el bloque "try", el control del flujo del programa se transfiere automáticamente a la cláusula "catch", donde el parámetro "error" hace referencia al objeto que representa la excepción que se ha producido.

      El objeto de excepción generalmente contiene información sobre el error que se ha producido, como su tipo, su mensaje y su pila de llamadas. Al capturar la excepción en la cláusula "catch", se puede acceder a esta información y manejar el error de manera apropiada.

      Ojo si sale el error Cannot set properties of null (setting 'innerHTML'), debo colocarle defer al script, pasa porque el DOM no ha cargado completamente y el escript no encuentra donde meter el codigo

      -AHora lo que vamos a hacer es el deploy con github pages, para lo cual usamos 
      npm install gh-pages --save-dev
      -con el fin de instalar esta dependencia, ahora lo que hacemos es una configuracion para subir los cambio inmediatamente a esa rama
      -ahora vamos al package json y agregamos un script
      "lo que modificamos fue "scripts": {
    "deploy": "gh-pages -d src""

      */
    }
})();



