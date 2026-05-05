const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const regiones = {
  "Huila": "El café de Huila es reconocido por su alta calidad, buena acidez y aroma intenso. Suele presentar notas dulces, frutales y cítricas, por eso es muy valorado en cafés especiales.",
  "Nariño": "El café de Nariño se cultiva en zonas de gran altitud. Suele tener acidez brillante, notas frutales, aroma floral y buen dulzor.",
  "Antioquia": "El café de Antioquia es suave y balanceado, con notas a chocolate, caramelo y frutos secos. Es una región con gran tradición cafetera.",
  "Tolima": "El café del Tolima se caracteriza por buen cuerpo, acidez media y notas dulces, frutales y achocolatadas. Es una región reconocida por cafés especiales.",
  "Caldas": "El café de Caldas hace parte del Eje Cafetero colombiano. Se caracteriza por ser balanceado, aromático y suave, con notas dulces y achocolatadas.",
  "Risaralda": "El café de Risaralda se destaca por su suavidad, aroma agradable y buen balance entre acidez y cuerpo. Suele presentar notas a chocolate, caramelo y frutos secos.",
  "Quindío": "El café del Quindío es reconocido por su tradición cafetera, suavidad y aroma. Suele tener notas dulces, achocolatadas y acidez media.",
  "Cauca": "El café del Cauca se caracteriza por su acidez brillante, notas dulces, frutales y florales. Sus condiciones de altitud y clima favorecen cafés especiales con perfiles complejos.",
  "Santander": "El café de Santander suele tener buen cuerpo, baja acidez y notas achocolatadas o a frutos secos. Es una región con tradición cafetera y cafés suaves.",
  "Sierra Nevada": "El café de la Sierra Nevada se cultiva en una zona montañosa cercana al mar Caribe. Presenta notas frutales, dulces y achocolatadas, con buen cuerpo y un perfil especial por su clima y biodiversidad."
};

const altitud = {
  "importancia": "La altitud influye en el desarrollo del grano de café. En zonas más altas, el fruto madura más lento, lo que puede generar mayor acidez, aromas más complejos y sabores más definidos. Por eso muchas regiones cafeteras de Colombia se asocian con cafés especiales de montaña."
};

const variedades = {
  "Arábica": "El café Arábica es una de las especies más importantes del mundo cafetero. En Colombia es muy común por su suavidad, aroma agradable, buena acidez y perfiles dulces o frutales.",
  "Robusta": "El café Robusta tiene mayor contenido de cafeína y un sabor más fuerte e intenso. En Colombia predomina el Arábica, pero Robusta sirve como referencia dentro de la clasificación de tipos de grano.",
  "Caturra": "El Caturra es una variedad arábica cultivada en Colombia. Se caracteriza por buena acidez, cuerpo medio y notas dulces o cítricas. Puede encontrarse en regiones como Huila, Antioquia y Tolima.",
  "Castillo": "El Castillo es una variedad desarrollada en Colombia por su resistencia a enfermedades como la roya. Produce una taza balanceada, con buen cuerpo, dulzor medio y notas suaves.",
  "Bourbon": "El Bourbon es una variedad arábica apreciada por su dulzor, aroma intenso y notas frutales. Cuando se cultiva en buena altitud, puede producir cafés de excelente calidad.",
  "Típica": "La variedad Típica es una variedad tradicional de café Arábica. Produce tazas suaves, aromáticas y de buena calidad, aunque requiere buenas condiciones de cultivo.",
  "Colombia": "La variedad Colombia fue desarrollada para adaptarse a las condiciones cafeteras del país y mejorar la resistencia a enfermedades como la roya. Produce una taza suave, balanceada y de buena calidad."
};

const metodos = {
  "Lavado": "El método lavado consiste en retirar la pulpa del café y fermentar el grano antes del secado. Produce una taza limpia, con acidez marcada y sabores más definidos.",
  "Natural": "El método natural seca el grano con la cereza completa. Esto genera cafés más frutales, dulces y con mayor cuerpo.",
  "Honey": "El método honey deja parte del mucílago durante el secado. Produce una bebida dulce, con buen cuerpo y notas similares a miel o caramelo.",
  "Fermentación controlada": "La fermentación controlada regula variables como tiempo, temperatura y condiciones del proceso para desarrollar sabores específicos en el café. Puede resaltar notas frutales, florales, dulces o exóticas."
};

const certificaciones = {
  "Orgánico": "El café orgánico se produce evitando químicos sintéticos y aplicando prácticas más amigables con el ambiente. Esta certificación demuestra una producción sostenible.",
  "Comercio Justo": "Comercio Justo busca que los caficultores reciban mejores condiciones de pago y trabajo. En una cooperativa, fortalece la venta directa y responsable.",
  "Rainforest Alliance": "Rainforest Alliance certifica prácticas agrícolas sostenibles, protección ambiental y mejores condiciones sociales para los productores.",
  "Denominación de Origen": "La Denominación de Origen certifica que un café proviene de una región específica y que sus características están relacionadas con ese lugar, como el clima, la altitud, el suelo y las prácticas de producción."
};

const derivados = {
  "Tinto": "El tinto colombiano es una bebida tradicional preparada con café filtrado. Se consume mucho en regiones como Antioquia, Huila, Tolima y el Eje Cafetero.",
  "Espresso": "El espresso es una bebida concentrada preparada con presión. Usa café molido fino y sirve como base para bebidas como capuchino, latte y americano.",
  "Capuchino": "El capuchino es una bebida derivada del café que combina espresso, leche caliente y espuma de leche. Puede prepararse con café colombiano de buena calidad.",
  "Café filtrado": "El café filtrado se prepara pasando agua caliente por café molido usando filtro. Es una forma tradicional de resaltar aromas y sabores limpios.",
  "Cold brew": "El cold brew es café preparado en frío durante varias horas. Tiene sabor suave, baja acidez y suele resaltar notas dulces y achocolatadas.",
  "Café campesino": "El café campesino es una bebida tradicional preparada de forma sencilla, generalmente filtrada o hervida. Es común en zonas rurales cafeteras y se asocia con la cultura de los caficultores."
};

const sabores = {
  "Dulce": "Para un perfil dulce, te recomiendo cafés de Huila o Antioquia. Suelen tener notas a caramelo, panela, chocolate o frutas maduras.",
  "Frutal": "Para notas frutales, una buena opción es café de Nariño, Cauca o Sierra Nevada. Estos cafés suelen tener acidez brillante y aromas más complejos.",
  "Cítrico": "Si buscas un café cítrico, te recomiendo cafés de Nariño, Huila o Cauca. Suelen tener acidez brillante y notas que recuerdan a limón, naranja o frutas frescas.",
  "Floral": "Para un perfil floral, una buena opción es café de Nariño, Cauca o Sierra Nevada. Estos cafés pueden presentar aromas delicados y una experiencia más aromática en taza.",
  "Chocolate": "Para notas achocolatadas, te recomiendo cafés de Antioquia, Caldas, Risaralda o Quindío. Son cafés balanceados, suaves y agradables.",
  "Caramelo": "Para notas a caramelo, te recomiendo cafés de Antioquia, Caldas, Risaralda, Quindío o Huila. Estos perfiles suelen ser dulces, suaves y muy agradables.",
  "Suave": "Si prefieres un café suave, te recomiendo cafés de Antioquia, Caldas, Risaralda o Quindío. Son cafés balanceados, aromáticos y agradables para consumo diario.",
  "Ácido": "Si buscas un café con acidez marcada, te recomiendo cafés de Nariño, Cauca o Huila. La acidez aporta frescura y viveza al sabor.",
  "Intenso": "Para un café intenso, puedes probar cafés de Tolima o Sierra Nevada. Suelen tener buen cuerpo, aroma marcado y sabores profundos."
};

const altitudesRegiones = {
  "Huila": "El café de Huila se cultiva aproximadamente entre 1.200 y 1.800 metros sobre el nivel del mar. Esta altitud favorece cafés con buena acidez, notas dulces, frutales y cítricas.",
  "Nariño": "El café de Nariño se cultiva aproximadamente entre 1.600 y 2.200 metros sobre el nivel del mar. Por eso suele tener acidez brillante, aromas florales y notas frutales.",
  "Antioquia": "El café de Antioquia suele cultivarse entre 1.200 y 1.900 metros sobre el nivel del mar. Esto permite producir cafés suaves, balanceados y con notas a chocolate o caramelo.",
  "Tolima": "El café del Tolima suele cultivarse entre 1.300 y 2.000 metros sobre el nivel del mar. Su altitud favorece cafés con buen cuerpo, acidez media y notas dulces.",
  "Caldas": "El café de Caldas suele cultivarse entre 1.200 y 1.800 metros sobre el nivel del mar. Esta altitud ayuda a obtener cafés suaves, aromáticos y balanceados.",
  "Risaralda": "El café de Risaralda suele cultivarse entre 1.200 y 1.800 metros sobre el nivel del mar. Favorece cafés suaves, con buen aroma, cuerpo medio y notas dulces.",
  "Quindío": "El café del Quindío suele cultivarse entre 1.200 y 1.800 metros sobre el nivel del mar. Su altitud contribuye a cafés suaves, aromáticos y con notas dulces o achocolatadas.",
  "Cauca": "El café del Cauca suele cultivarse entre 1.500 y 2.100 metros sobre el nivel del mar. Esta altitud favorece perfiles con acidez brillante, notas frutales y florales.",
  "Santander": "El café de Santander suele cultivarse entre 1.200 y 1.700 metros sobre el nivel del mar. Sus cafés suelen tener buen cuerpo, baja acidez y notas achocolatadas.",
  "Sierra Nevada": "El café de la Sierra Nevada suele cultivarse entre 900 y 1.700 metros sobre el nivel del mar. Su cercanía al mar Caribe genera perfiles dulces, frutales y achocolatados."
};

const altitudesVariedades = {
  "Arábica": "El café Arábica suele cultivarse en zonas de montaña, aproximadamente entre 1.200 y 2.000 metros sobre el nivel del mar.",
  "Robusta": "El café Robusta puede cultivarse en altitudes más bajas, aproximadamente desde 600 hasta 1.200 metros sobre el nivel del mar.",
  "Caturra": "El café Caturra se cultiva aproximadamente a 1.500 metros sobre el nivel del mar, donde puede desarrollar notas dulces, cítricas y frutales.",
  "Castillo": "El café Castillo se cultiva aproximadamente a 1.600 metros sobre el nivel del mar. Esta altitud favorece una taza balanceada, suave y con buen cuerpo.",
  "Bourbon": "El café Bourbon se cultiva aproximadamente a 1.700 metros sobre el nivel del mar. A esa altura desarrolla buen dulzor, aroma intenso y notas frutales.",
  "Típica": "La variedad Típica se cultiva aproximadamente a 1.800 metros sobre el nivel del mar. Esta altitud favorece perfiles florales, cítricos y aromáticos.",
  "Colombia": "La variedad Colombia se cultiva aproximadamente a 1.550 metros sobre el nivel del mar. Esta altura favorece cafés suaves, balanceados y con notas achocolatadas."
};

const productores = {
  "general": "Los productores de café pueden ser caficultores, fincas o cooperativas. Están asociados a una o varias regiones cafeteras y pueden tener certificaciones como Orgánico, Comercio Justo o Rainforest Alliance.",
  "cooperativa": "Una cooperativa cafetera agrupa productores para mejorar la comercialización, calidad, certificación y venta directa del café. También ayuda a organizar la producción por regiones y variedades.",
  "caficultores": "Los caficultores son quienes cultivan, cosechan y preparan el café. Su trabajo influye directamente en la calidad, el sabor y la sostenibilidad del producto."
};

const preguntasFrecuentes = [
  "Puedes preguntarme: ¿Qué café se produce en Huila?, ¿Qué es el café Caturra?, ¿Qué significa café lavado?, ¿Qué certificaciones puede tener el café?, ¿Qué bebidas se hacen con café colombiano?",
  "También puedes consultar: ¿Cómo es el café del Quindío?, ¿Qué café se produce en Nariño?, ¿Qué es Comercio Justo?, ¿Qué es un tinto colombiano?, ¿Qué café me recomiendas si me gusta dulce?",
  "Ejemplos de preguntas: ¿Qué café se produce en Santander?, ¿Qué es el método honey?, ¿Qué es café orgánico?, ¿Qué es cold brew?, ¿A qué altitud se cultiva el café colombiano?"
];

function normalizarTexto(valor) {
  if (!valor) return "";
  return String(valor)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function buscarRespuesta(diccionario, valor) {
  const valorNormalizado = normalizarTexto(valor);
  const llave = Object.keys(diccionario).find(
    key => normalizarTexto(key) === valorNormalizado
  );

  return llave ? diccionario[llave] : null;
}

function obtenerIntent(body) {
  return body?.queryResult?.intent?.displayName ||
    body?.fulfillmentInfo?.tag ||
    body?.intentInfo?.displayName ||
    "";
}

function obtenerParametros(body) {
  return body?.queryResult?.parameters ||
    body?.sessionInfo?.parameters ||
    {};
}

function normalizarIntent(intent) {
  return normalizarTexto(intent)
    .replace(/\s+/g, "_")
    .replace(/^consultar_region_cafetera$/, "consultar_region")
    .replace(/^consultar_variedades$/, "consultar_variedad")
    .replace(/^consultar_metodo_de_procesamiento$/, "consultar_metodo")
    .replace(/^consultar_certificaciones$/, "consultar_certificacion")
    .replace(/^consultar_derivados$/, "consultar_derivado");
}

function responderDialogflow(req, res, texto) {
  if (req.body?.queryResult) {
    return res.json({
      fulfillmentText: texto,
      fulfillmentMessages: [
        {
          text: {
            text: [texto]
          }
        }
      ],
      source: "caficol-webhook"
    });
  }

  return res.json({
    fulfillment_response: {
      messages: [
        {
          text: {
            text: [texto]
          }
        }
      ]
    }
  });
}

app.get("/", (req, res) => {
  res.send("Webhook de CafetoBot funcionando correctamente.");
});

function manejarWebhook(req, res) {
  const intent = normalizarIntent(obtenerIntent(req.body));
  const parametros = obtenerParametros(req.body);

  console.log("Intent:", intent);
  console.log("Parámetros:", parametros);

  let respuesta = "No encontré una respuesta específica para esa consulta. Puedes preguntarme por regiones, variedades, métodos, certificaciones, sabores, derivados o altitudes del café colombiano.";

  const region = parametros.region_cafetera;
  const tipoGrano = parametros.tipo_grano;
  const metodo = parametros.metodo_procesamiento;
  const certificacion = parametros.certificacion;
  const derivado = parametros.derivado_cafe;
  const sabor = parametros.perfil_sabor;

  switch (intent) {
    case "consultar_region":
      respuesta = buscarRespuesta(regiones, region) ||
        "Puedo hablarte sobre regiones cafeteras como Huila, Nariño, Antioquia, Tolima, Caldas, Risaralda, Quindío, Cauca, Santander y Sierra Nevada.";
      break;

    case "consultar_variedad":
      respuesta = buscarRespuesta(variedades, tipoGrano) ||
        "En Colombia existen variedades como Arábica, Robusta, Caturra, Castillo, Bourbon, Típica y Colombia.";
      break;

    case "consultar_metodo":
      respuesta = buscarRespuesta(metodos, metodo) ||
        "Los métodos más comunes son Lavado, Natural, Honey y Fermentación controlada.";
      break;

    case "consultar_certificacion":
      respuesta = buscarRespuesta(certificaciones, certificacion) ||
        "Las certificaciones más comunes son Orgánico, Comercio Justo, Rainforest Alliance y Denominación de Origen.";
      break;

    case "consultar_derivado":
      respuesta = buscarRespuesta(derivados, derivado) ||
        "Del café colombiano se preparan derivados como tinto, espresso, capuchino, café filtrado, café campesino y cold brew.";
      break;

    case "consultar_sabor":
      respuesta = buscarRespuesta(sabores, sabor) ||
        "Puedo recomendar cafés según perfiles como dulce, frutal, cítrico, floral, suave, ácido, caramelo, achocolatado o intenso.";
      break;

    case "consultar_altitud_region":
      respuesta = buscarRespuesta(altitudesRegiones, region) ||
        "El café colombiano suele cultivarse entre 1.200 y 2.000 metros sobre el nivel del mar, según la región.";
      break;

    case "consultar_altitud_variedad":
      respuesta = buscarRespuesta(altitudesVariedades, tipoGrano) ||
        "La altitud de cultivo depende de la variedad. Muchas variedades colombianas se cultivan entre 1.200 y 2.000 metros sobre el nivel del mar.";
      break;

    case "consultar_productores":
      respuesta = productores.general;
      break;

    case "cooperativa_cafetera":
      respuesta = productores.cooperativa;
      break;

    case "caficultores":
      respuesta = productores.caficultores;
      break;

    case "preguntas_frecuentes":
      respuesta = preguntasFrecuentes[Math.floor(Math.random() * preguntasFrecuentes.length)];
      break;
    
    case "consultar_importancia_altitud":
      respuesta = altitud.importancia;
      break;
  }

  responderDialogflow(req, res, respuesta);
}

app.post("/", manejarWebhook);
app.post("/webhook", manejarWebhook);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
