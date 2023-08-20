const dotenv=require('dotenv');
const express=require('express');
const path = require('path');
const bodyParser=require('body-parser');
const app= express();


// MUY IMPORTANTE PARA QUE EL INDEX MUESTRE LAS IMAGENES SIEMPRE QUE EL INDEX ESTE EN EL MISMO DIRECTORIO QUE EL Server.JS
// app.use(express.static(__dirname));
// SI ESTA EN DIRECTORIO PUBLIC USAR:
app.use(express.static("public"));
const {leerPeliculas,obtenerTituloFilter,obtenerCategoriaFilter,obtenerRepartoFilter}=require('./scr/trailerflix.manager');
const PORT = process.env.PORT || 3000;
let TRAILERFLIX = [];
dotenv.config();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    TRAILERFLIX = leerPeliculas();
    next();
})

app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname + '/public/index.html'));
 
})

 app.get('/bienvenida', (req,res)=>{
     res.sendFile(path.join(__dirname + '/public/index.html'));
    
})

app.get('/catalogo',(req,res)=>{
  res.send(TRAILERFLIX)
})


  app.get('/titulo/:titulo',(req,res)=>{
 
    const title=req.params.titulo.trim().toLowerCase()
     const pelicula=obtenerTituloFilter(title)
     pelicula.length==0
     ?res.json({id:"ERROR",description:`No se encontró ninguna película con el titulo : ${title}`})
     :res.json(pelicula)
    })

    app.get('/categoria/:categoria',(req,res)=>{
 
        const cat=req.params.categoria.trim().toLowerCase()
         const pelicula=obtenerCategoriaFilter(cat)
         pelicula.length==0
         ?res.json({id:"ERROR",description:`No se encontró ninguna película con la categoria : ${cat}`})
         :res.json(pelicula)


        })


app.get('/reparto/:reparto',(req,res)=>{
 
    const act=req.params.reparto.trim().toLocaleLowerCase()
     const pelicula=obtenerRepartoFilter(act)

     pelicula.length==0
     ?res.json({id:"ERROR",description:`No se encontró ninguna película con el reparto : ${act}`})
     :res.json(pelicula)
  
    })


app.get('/trailer/:id',(req,res)=>{
  let codigo = parseInt(req.params.id);
  TRAILERFLIX = leerPeliculas();
  if (typeof codigo === "number") {
    const peli = TRAILERFLIX .find((elemento) => elemento.id == codigo);

    peli?.trailer
      ? res.json(
         "ID :"  + 
            peli.id +"                                                                                                                                                                                                      "+
            " Titulo : " +        
            peli.titulo +"                                                                                                                                                                                                                  "+
            " Link al trailer :" +
            peli.trailer
       )
      : res.status(404).json({
          id: "Error",
          descripcion:
            "El trailer de la pelicula con id : " +
            codigo +
            " no se encuentra disponible",
        });
  }
       

  });

  

app.get('*', (req, res) => {
    res.status(404).send('Lo siento, la página que buscas no existe.'); 
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});