const mongoose = require("mongoose");

// Método para conectarnos
const connection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     // createIndexes: true, // Cambia CreateIndexes a createIndexes
    });
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(error);
    throw new Error("No se ha podido conectar a la base de datos");
  }
};

module.exports = {
  connection,
};
