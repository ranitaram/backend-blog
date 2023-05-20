
const { error } = require("console");
const {validarArticulo} = require("../helpers/validar");
const Articulo = require("../models/Articulos");
const fs = require("fs");
const path = require("path");


const prueba = (req, res)=> {
    return res.status(200).send({
        message: "prueba de controlador"
    });
}


const crear = async (req, res) => {
    // Recoger parámetros
    let parametros = req.body;
  
    // Validar datos
    try {
      validarArticulo(parametros);
    } catch (error) {
      return res.status(400).json({
        status: "error",
        mensaje: "Faltan datos por enviar"
      });
    }
  
    // Crear el objeto a guardar
    const articulo = new Articulo(parametros); //de forma automatica
   // articulo.titulo = parametros.titulo; DE FORMA MANUAL
  
    // Guardarlo utilizando promesas
    try {
      const articuloGuardado = await articulo.save();
      return res.status(200).json({
        status: "exito",
        articulo: articuloGuardado,
        mensaje: "Artículo guardado con éxito!!"
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        mensaje: "No se ha guardado el artículo"
      });
    }
  };


  const listarArticulos = async (req, res) => {
    try {
        
        
        let articulos = await Articulo.find({})
        .sort({fecha: -1});
        
        if (req.params.ultimos) {
             articulos = await Articulo.find({})
            .sort({fecha: -1})
            .limit(2);
            
        } 
      
      return res.status(200).json({
          //con req.params recogemos los parametros de la url
        status: "success",
        parametro: req.params.ultimos,
        contador: articulos.length,
        articulos: articulos || []
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        mensaje: "Error al obtener los artículos"
      });
    }
  };
  
  const uno = async (req, res) => {
    try {
      let id = req.params.id;
      let articulo = await Articulo.findById(id);
  
      if (articulo) {
        return res.status(200).json({
          status: "success",
          articulo
        });
      } else {
        return res.status(500).json({
          status: "error",
          mensaje: "No se ha encontrado el articulo"
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        mensaje: "Error en el servidor"
      });
    }
  }

const borrar = async (req, res)=> {
    try {
       let articulo_id = req.params.id;
        let articulo = await Articulo.findOneAndDelete({
            _id: articulo_id
        });
        if (articulo) {
            return res.status(200).json({
                status: "success",
                articulo: articulo,
                message: "Artículo borrado"
              });
        } else {
            return res.status(500).json({
                status: "error",
                mensaje: "No se pudo borrar el artículo"
              });
        }

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error en el servidor"
          });
    }
}  

const editar = async (req, res) => {
    try {
        //recoger el id
        let articuloId = req.params.id;

        //recoger los datos del body
       let parametros = req.body;

       //validar datos
       try {
       validarArticulo(parametros);
      } catch (error) {
        return res.status(400).json({
          status: "error",
          mensaje: "Faltan datos por enviar"
        });
      }
      //buscar y actualizar articulo
     let articuloActualizado = await Articulo.findByIdAndUpdate(
         articuloId,
         parametros,
         //{ new: true } Esto nos permite obtener el artículo actualizado 
         //directamente en  la variable articuloActualizado sin usar un callback.
         {new: true}
        );

        if (!articuloActualizado) {
            return res.status(500).json({
              status: "error",
              message: "Error al actualizar el artículo"
            });
          }

           // Devolver respuesta 
    return res.status(200).json({
        status: "success",
        articulo: articuloActualizado,
        message: "Artículo actualizado con éxito"
      });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error en el servidor"
          });
    
    }
}
  
const subir = async (req, res) => {
  
    //recoger el fichero de la imagen subido
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "error",
            mensaje: "Peticion invalida"
        });
    }
    //Nombre del archivo
    let archivo = req.file.originalname;
    //extension del archivo
    let archivo_split = archivo.split(".");
    let extension = archivo_split[1];
    //Comprobar extension correcta
    if (
        extension != "png" && 
        extension != "jpg" && 
        extension != "jpeg" && 
        extension != "gif"
        ){
            //borrar archivo y dar respuesta
            fs.unlink(req.file.path, (error)=>{
                return res.status(400).json({
                    status: "error",
                    mensaje: "Imagen invalida"
                });
            })
        }else{
            try {
                //recoger el id
                let articuloId = req.params.id;

                // Construir objeto con la propiedad imagen
                    let updateObj = {
                        imagen: req.file.filename
                    };

        
              //buscar y actualizar articulo
             let articuloActualizado = await Articulo.findByIdAndUpdate(
                 articuloId,
                 updateObj,
                 //{ new: true } Esto nos permite obtener el artículo actualizado 
                 //directamente en  la variable articuloActualizado sin usar un callback.
                 {new: true}
                );
        
                if (!articuloActualizado) {
                    return res.status(500).json({
                      status: "error",
                      message: "Error al actualizar el artículo"
                    });
                  }
        
                   // Devolver respuesta 
            return res.status(200).json({
                status: "success",
                articulo: articuloActualizado,
                fichero: req.file,
                message: "Artículo actualizado con éxito"
              });
            } catch (error) {
                return res.status(500).json({
                    status: "error",
                    mensaje: "Error en el servidor"
                  });
            
            }

        }
};

const imagen = async (req, res) => {
    try {
        let fichero = req.params.fichero;
        let rutaFisica = "./imagenes/articulos/"+fichero;

        fs.stat(rutaFisica, (error, existe)=>{
            if (existe) {
                //conseguir el archivo fisico
                return res.sendFile(path.resolve(rutaFisica));
            }else{
                return res.status(404).json({
                    status: "error",
                    mensaje: "La imagen no existe",
                    existe,
                    fichero,
                    rutaFisica
                });
            }
        })
    } catch (error) {
        
    }
}

const buscador = async (req, res) => {
    try {
        let busqueda = req.params.busqueda;

        let articulos = await Articulo.find({ "$or":[
            {"titulo": {"$regex": busqueda, "$options": "i"}},
            {"contenido": {"$regex": busqueda, "$options": "i"}},
        ]})
        .sort({fecha: -1});
        
        if (!articulos || articulos.length <= 0) {
            return res.status(404).json({
                status: error,
                mensaje: "No se han encontrado artículos"
            });
        }
        return res.status(200).json({
            status: "success",
            articulos
        })
    } catch (error) {
        
    }
}
  


module.exports = {
    prueba,
    crear,
    listarArticulos, 
    uno,
    borrar,
    editar,
    subir,
    imagen,
    buscador
}

