const fs=require('fs');

// OBTENER TODAS LAS PELICULAS
function leerPeliculas() {
    const datos=fs.readFileSync(__dirname + process.env.DATABASE_PATH,'utf8');
    const TRAILERFLIX= JSON.parse(datos);
    return TRAILERFLIX
}
// OBTENER PELICULA POR TITULO
  function obtenerTituloFilter(title){
    
     TRAILERFLIX = leerPeliculas()

    const pelicula = TRAILERFLIX.filter(t => t.titulo.trim().toLowerCase().includes(title)) 
   
     return pelicula
}
// OBTENER PELICULA POR CATEGORIA
function obtenerCategoriaFilter(cat){
    
    TRAILERFLIX = leerPeliculas()

   const pelicula = TRAILERFLIX.filter(c => c.categoria.trim().toLowerCase().includes(cat)) 
 
    return pelicula
}
// OBTENER PELICULA POR REPARTO Y TITULO
function obtenerRepartoFilter(act){
    
    TRAILERFLIX = leerPeliculas()

   const pelicula = TRAILERFLIX.filter(r => r.reparto.trim().toLowerCase().includes(act)) 

   const peliculaReducida=pelicula.map(p=>{
   
    return{
        reparto:p.reparto,
        titulo:p.titulo
    }
   
})
return peliculaReducida
}


module.exports={leerPeliculas,obtenerTituloFilter,obtenerCategoriaFilter,obtenerRepartoFilter};