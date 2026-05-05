const express = require("express");
const app = express();

app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("Webhook cooperativa café activo");
});

// Ruta webhook Dialogflow
app.post("/webhook", (req, res) => {
  console.log("REQUEST:");
  console.log(JSON.stringify(req.body, null, 2));

  const intentName = req.body.queryResult.intent.displayName;

  let response = "No entendí tu solicitud";

  // Intent 1
  if (intentName === "saludo") {
    response =
      "Hola ☕ Bienvenido al sistema de gestión cafetera";
  }

  // Intent 2
  if (intentName === "precio_cafe") {
    response =
      "El precio actual del café pergamino es 2.050.000 COP";
  }

  // Intent 3
  if (intentName === "estado_lote") {
    response =
      "Tu lote está en proceso de secado";
  }

  res.json({
    fulfillmentText: response
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});