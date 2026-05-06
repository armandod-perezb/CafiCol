const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

/* =========================
   BASE DE CONOCIMIENTO
========================= */

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

const variedades = {
  "Arábica": "El café Arábica es una de las especies más importantes del mundo cafetero. En Colombia es muy común por su suavidad, aroma agradable, buena acidez y perfiles dulces o frutales.",
  "Robusta": "El café Robusta tiene mayor contenido de cafeína y un sabor más fuerte e intenso. En Colombia predomina el Arábica, pero Robusta sirve como referencia dentro de la clasificación de tipos de grano.",
  "Caturra": "El Caturra es una variedad arábica cultivada en Colombia. Se caracteriza por buena acidez, cuerpo medio y notas dulces o cítricas. Puede encontrarse en regiones como Huila, Antioquia y Tolima.",
  "Castillo": "El Castillo es una variedad desarrollada en Colombia por su resistencia a enfermedades como la roya. Produce una taza balanceada, con buen cuerpo, dulzor medio y notas suaves.",
  "Bourbon": "El Bourbon es una variedad arábica apreciada por su dulzor, aroma intenso y notas frutales. Cuando se cultiva en buena altitud, puede producir cafés de excelente calidad.",
  "Típica": "La variedad Típica es una variedad tradicional de café Arábica. Produce tazas suaves, aromáticas y de buena calidad, aunque requiere buenas condiciones de cultivo.",
  "Colombia": "La variedad Colombia fue desarrollada para adaptarse a las condiciones cafeteras del país y mejorar la resistencia a enfermedades como la roya. Produce una taza suave, balanceada y de buena calidad."
};

const imagenesVariedades = {
  "Arábica": "https://commons.wikimedia.org/wiki/Special:FilePath/Coffea_arabica%2C_coffee_beans_.jpg",
  "Robusta": "https://commons.wikimedia.org/wiki/Special:FilePath/Coffee_beans_robusta.jpg",
  "Caturra": "https://commons.wikimedia.org/wiki/Special:FilePath/Mata_de_caf%C3%A9_tipo_caturro_colombiano.JPG",
  "Castillo": "https://commons.wikimedia.org/wiki/Special:FilePath/Mata_de_caf%C3%A9_tipo_caturro_colombiano.JPG",
  "Bourbon": "https://commons.wikimedia.org/wiki/Special:FilePath/Bourbon_Coffee.jpg",
  "Típica": "https://commons.wikimedia.org/wiki/Special:FilePath/Amy_farms_typica_hybrid_coffee_beans.jpg",
  "Colombia": "https://commons.wikimedia.org/wiki/Special:FilePath/CoffeeFruitsShow.jpg"
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

const imagenesDerivados = {
  "Tinto": "https://commons.wikimedia.org/wiki/Special:FilePath/Colombian_Coffee.jpg",
  "Espresso": "https://commons.wikimedia.org/wiki/Special:FilePath/Espresso_coffee.jpg",
  "Capuchino": "https://commons.wikimedia.org/wiki/Special:FilePath/Classic_Cappuccino.jpg",
  "Café filtrado": "https://commons.wikimedia.org/wiki/Special:FilePath/Manual_drip_%28pour-over%29_coffee.jpg",
  "Cold brew": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Iced_cold_brew_coffee.jpg/960px-Iced_cold_brew_coffee.jpg",
  "Café campesino": "https://commons.wikimedia.org/wiki/Special:FilePath/Cup_of_black_coffee.jpg"
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

const altitud = {
  "importancia": "La altitud influye en el desarrollo del grano de café. En zonas más altas, el fruto madura más lento, lo que puede generar mayor acidez, aromas más complejos y sabores más definidos. Por eso muchas regiones cafeteras de Colombia se asocian con cafés especiales de montaña.",
  "general": "El café colombiano suele cultivarse en zonas de montaña, generalmente entre 1.200 y 2.000 metros sobre el nivel del mar. La altitud influye en la acidez, el aroma, el cuerpo y la complejidad del sabor."
};

const productores = {
  "general": "Los productores de café pueden ser caficultores, fincas o cooperativas. Están asociados a una o varias regiones cafeteras y pueden tener certificaciones como Orgánico, Comercio Justo o Rainforest Alliance.",
  "cooperativa": "Una cooperativa cafetera agrupa productores para mejorar la comercialización, calidad, certificación y venta directa del café. También ayuda a organizar la producción por regiones y variedades.",
  "caficultores": "Los caficultores son quienes cultivan, cosechan y preparan el café. Su trabajo influye directamente en la calidad, el sabor y la sostenibilidad del producto."
};

/* =========================
   PRODUCTOS PARA COMPRA DIRECTA
========================= */

const productosCafe = {
  "Huila": {
    region: "Huila",
    productor: "Cooperativa Cafetera del Huila",
    variedad: "Caturra",
    perfil: "dulce, frutal y cítrico",
    presentacion: "500 g",
    precio: 28000,
    contacto: "3001234567"
  },
  "Nariño": {
    region: "Nariño",
    productor: "Finca Altos de Nariño",
    variedad: "Típica",
    perfil: "frutal, floral y ácido",
    presentacion: "500 g",
    precio: 32000,
    contacto: "3002223344"
  },
  "Antioquia": {
    region: "Antioquia",
    productor: "Finca La Montaña",
    variedad: "Castillo",
    perfil: "suave, achocolatado y caramelo",
    presentacion: "500 g",
    precio: 26000,
    contacto: "3003334455"
  },
  "Tolima": {
    region: "Tolima",
    productor: "Asociación Cafetera del Tolima",
    variedad: "Bourbon",
    perfil: "intenso, dulce y achocolatado",
    presentacion: "500 g",
    precio: 30000,
    contacto: "3004445566"
  },
  "Quindío": {
    region: "Quindío",
    productor: "Cooperativa del Eje Cafetero",
    variedad: "Colombia",
    perfil: "suave, dulce y achocolatado",
    presentacion: "500 g",
    precio: 28000,
    contacto: "3005556677"
  },
  "Risaralda": {
    region: "Risaralda",
    productor: "Productores Unidos de Risaralda",
    variedad: "Colombia",
    perfil: "suave, caramelo y frutos secos",
    presentacion: "500 g",
    precio: 27000,
    contacto: "3006667788"
  },
  "Caldas": {
    region: "Caldas",
    productor: "Café Tradición Caldas",
    variedad: "Colombia",
    perfil: "balanceado, dulce y achocolatado",
    presentacion: "500 g",
    precio: 27500,
    contacto: "3007778899"
  },
  "Cauca": {
    region: "Cauca",
    productor: "Finca El Macizo",
    variedad: "Típica",
    perfil: "cítrico, floral y frutal",
    presentacion: "500 g",
    precio: 31000,
    contacto: "3008889900"
  },
  "Santander": {
    region: "Santander",
    productor: "Café Santander Especial",
    variedad: "Bourbon",
    perfil: "buen cuerpo, baja acidez y chocolate",
    presentacion: "500 g",
    precio: 29000,
    contacto: "3009990011"
  },
  "Sierra Nevada": {
    region: "Sierra Nevada",
    productor: "Finca Sierra Nevada",
    variedad: "Arábica",
    perfil: "frutal, dulce y achocolatado",
    presentacion: "500 g",
    precio: 33000,
    contacto: "3011112233"
  }
};

const preguntasFrecuentes = [
  `Claro, puedes preguntarme cosas como:

1. ¿Qué regiones cafeteras hay en Colombia?
2. ¿Qué café se produce en Huila?
3. ¿Cómo es el café del Quindío?
4. ¿Qué variedades de café colombiano existen?
5. ¿Qué es el café Caturra?
6. ¿Qué significa café lavado?
7. ¿Qué certificaciones puede tener el café?
8. ¿Qué es el café orgánico?
9. ¿Qué bebidas se hacen con café colombiano?
10. ¿Qué café me recomiendas si me gusta dulce?`,

  `También puedes hacerme preguntas como estas:

1. ¿Qué café se produce en Nariño?
2. ¿Cómo es el café de Antioquia?
3. ¿Qué caracteriza al café del Tolima?
4. ¿Qué es la variedad Castillo?
5. ¿Qué es el café Bourbon?
6. ¿Qué significa proceso natural?
7. ¿Qué es el método honey?
8. ¿Qué es Comercio Justo en café?
9. ¿Qué es Rainforest Alliance?
10. ¿Qué es un tinto colombiano?`,

  `Aquí tienes más ejemplos de preguntas:

1. ¿Qué café se produce en Caldas?
2. ¿Cómo es el café de Risaralda?
3. ¿Qué caracteriza al café del Cauca?
4. ¿Qué café se produce en Santander?
5. ¿Cómo es el café de la Sierra Nevada?
6. ¿Qué es el café Arábica?
7. ¿Qué es el café Robusta?
8. ¿Qué es la variedad Típica?
9. ¿Qué es la variedad Colombia?
10. ¿Qué café me recomiendas si me gusta frutal?`,

  `Puedes consultar temas más específicos como:

1. ¿Qué café me recomiendas si me gusta achocolatado?
2. ¿Qué café me recomiendas si me gusta cítrico?
3. ¿Qué café me recomiendas si me gusta floral?
4. ¿Qué café me recomiendas si me gusta suave?
5. ¿Qué café me recomiendas si me gusta intenso?
6. ¿Qué café tiene notas a caramelo?
7. ¿Qué café tiene buena acidez?
8. ¿Qué relación tiene la altitud con el sabor del café?
9. ¿A qué altitud se cultiva el café colombiano?
10. ¿Qué es un café de altura?`,

  `También puedes preguntarme sobre compra, productores y derivados:

1. ¿Dónde puedo comprar café colombiano?
2. ¿Quiero comprar café de Huila?
3. ¿Quiero comprar café del Quindío?
4. ¿Qué café puedo comprar si me gusta dulce?
5. ¿Qué es una cooperativa cafetera?
6. ¿Quiénes son los caficultores?
7. ¿Qué productores cultivan café colombiano?
8. ¿Qué es un capuchino?
9. ¿Qué es un cold brew?
10. ¿Qué es un café campesino?`
];

/* =========================
   FUNCIONES AUXILIARES
========================= */

function normalizarTexto(valor) {
  if (!valor) return "";

  if (Array.isArray(valor)) {
    valor = valor[0];
  }

  return String(valor)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function obtenerValor(parametro) {
  if (!parametro) return "";
  if (Array.isArray(parametro)) return parametro[0] || "";
  return parametro;
}

function buscarRespuesta(diccionario, valor) {
  const valorNormalizado = normalizarTexto(valor);

  const llave = Object.keys(diccionario).find(
    key => normalizarTexto(key) === valorNormalizado
  );

  return llave ? diccionario[llave] : null;
}

function buscarProductoPorRegion(region) {
  const regionNormalizada = normalizarTexto(region);

  const llave = Object.keys(productosCafe).find(
    key => normalizarTexto(key) === regionNormalizada
  );

  return llave ? productosCafe[llave] : null;
}

function buscarProductoPorSabor(sabor) {
  const saborNormalizado = normalizarTexto(sabor);

  return Object.values(productosCafe).find(producto =>
    normalizarTexto(producto.perfil).includes(saborNormalizado)
  );
}

function buscarProductoPorVariedad(tipoGrano) {
  const tipoNormalizado = normalizarTexto(tipoGrano);

  return Object.values(productosCafe).find(producto =>
    normalizarTexto(producto.variedad) === tipoNormalizado
  );
}

function formatearCOP(valor) {
  return `$${Number(valor).toLocaleString("es-CO")} COP`;
}

function obtenerIntent(body) {
  return body?.queryResult?.intent?.displayName ||
    body?.fulfillmentInfo?.tag ||
    body?.intentInfo?.displayName ||
    "";
}

function normalizarIntent(intent) {
  return normalizarTexto(intent).replace(/\s+/g, "_");
}

function obtenerParametros(body) {
  return body?.queryResult?.parameters ||
    body?.sessionInfo?.parameters ||
    {};
}

/* =========================
   RESPUESTA DE COMPRA
========================= */

function responderCompra(parametros) {
  const region = obtenerValor(parametros.region_cafetera);
  const sabor = obtenerValor(parametros.perfil_sabor);
  const tipoGrano = obtenerValor(parametros.tipo_grano);
  const cantidad = Number(obtenerValor(parametros.cantidad)) || 1;

  let producto = null;

  if (region) {
    producto = buscarProductoPorRegion(region);
  }

  if (!producto && sabor) {
    producto = buscarProductoPorSabor(sabor);
  }

  if (!producto && tipoGrano) {
    producto = buscarProductoPorVariedad(tipoGrano);
  }

  if (!producto) {
    return `Claro, puedo ayudarte a comprar café directamente a productores.

Dime qué prefieres:
- Una región: Huila, Nariño, Quindío, Antioquia, Tolima.
- Una variedad: Caturra, Castillo, Bourbon, Típica, Colombia.
- Un perfil de sabor: dulce, frutal, suave, cítrico, floral, achocolatado o intenso.

Ejemplo: "Quiero comprar café de Huila" o "Quiero comprar café dulce".`;
  }

  const total = producto.precio * cantidad;

  return `Perfecto. Te recomiendo este café directo de productor:

Región: ${producto.region}
Productor: ${producto.productor}
Variedad: ${producto.variedad}
Perfil de sabor: ${producto.perfil}
Presentación: ${producto.presentacion}
Precio unitario: ${formatearCOP(producto.precio)}
Cantidad: ${cantidad}
Total aproximado: ${formatearCOP(total)}

Para realizar la compra directa, puedes contactar al productor por WhatsApp: ${producto.contacto}.`;
}

/* =========================
   RESPUESTAS CON IMÁGENES
========================= */

function crearMensajesDialogflow(texto, imagenUrl) {
  const mensajes = [
    {
      text: {
        text: [texto]
      }
    }
  ];

  if (imagenUrl) {
    mensajes.push({
      image: {
        imageUri: imagenUrl,
        accessibilityText: "Imagen relacionada con la consulta de café"
      }
    });
  }

  return mensajes;
}

function crearRichContent(texto, imagenUrl) {
  if (!imagenUrl) return undefined;

  return [
    [
      {
        type: "image",
        rawUrl: imagenUrl,
        accessibilityText: "Imagen relacionada con la consulta de café"
      },
      {
        type: "description",
        title: "Consulta de café",
        text: [texto]
      }
    ]
  ];
}

function responderDialogflow(req, res, texto, imagenUrl = null) {
  const fulfillmentMessages = crearMensajesDialogflow(texto, imagenUrl);
  const richContent = crearRichContent(texto, imagenUrl);
  const payload = richContent ? { richContent } : undefined;

  // Dialogflow ES
  if (req.body?.queryResult) {
    const respuesta = {
      fulfillmentText: texto,
      fulfillmentMessages,
      source: "caficol-webhook"
    };

    if (payload) {
      respuesta.payload = payload;
      respuesta.fulfillmentMessages.push({ payload });
    }

    return res.json(respuesta);
  }

  // Dialogflow CX, por si lo pruebas después
  const respuesta = {
    fulfillment_response: {
      messages: fulfillmentMessages
    }
  };

  if (payload) {
    respuesta.fulfillment_response.messages.push({ payload });
  }

  return res.json(respuesta);
}

/* =========================
   WEBHOOK PRINCIPAL
========================= */

function manejarWebhook(req, res) {
  const intentOriginal = obtenerIntent(req.body);
  const intent = normalizarIntent(intentOriginal);
  const parametros = obtenerParametros(req.body);

  console.log("Intent original:", intentOriginal);
  console.log("Intent normalizado:", intent);
  console.log("Parámetros:", parametros);

  let respuesta = "No encontré una respuesta específica para esa consulta. Puedes preguntarme por regiones, variedades, métodos, certificaciones, sabores, derivados, altitudes, productores o compras de café colombiano.";
  let imagenUrl = null;

  const region = obtenerValor(parametros.region_cafetera);
  const tipoGrano = obtenerValor(parametros.tipo_grano);
  const metodo = obtenerValor(parametros.metodo_procesamiento);
  const certificacion = obtenerValor(parametros.certificacion);
  const derivado = obtenerValor(parametros.derivado_cafe);
  const sabor = obtenerValor(parametros.perfil_sabor);

  switch (intent) {
    case "consultar_region":
    case "consultar_region_cafetera":
    case "region_cafetera":
      respuesta = buscarRespuesta(regiones, region) ||
        "Puedo hablarte sobre regiones cafeteras como Huila, Nariño, Antioquia, Tolima, Caldas, Risaralda, Quindío, Cauca, Santander y Sierra Nevada.";
      break;

    case "consultar_variedad":
    case "consultar_variedades":
    case "variedad_cafe":
      respuesta = buscarRespuesta(variedades, tipoGrano) ||
        "En Colombia existen variedades como Arábica, Robusta, Caturra, Castillo, Bourbon, Típica y Colombia.";
      imagenUrl = buscarRespuesta(imagenesVariedades, tipoGrano);
      break;

    case "consultar_metodo":
    case "consultar_metodo_procesamiento":
    case "metodo_procesamiento":
      respuesta = buscarRespuesta(metodos, metodo) ||
        "Los métodos más comunes son Lavado, Natural, Honey y Fermentación controlada.";
      break;

    case "consultar_certificacion":
    case "consultar_certificaciones":
    case "certificacion":
      respuesta = buscarRespuesta(certificaciones, certificacion) ||
        "Las certificaciones más comunes son Orgánico, Comercio Justo, Rainforest Alliance y Denominación de Origen.";
      break;

    case "consultar_derivado":
    case "consultar_derivados":
    case "derivado_cafe":
      respuesta = buscarRespuesta(derivados, derivado) ||
        "Del café colombiano se preparan derivados como tinto, espresso, capuchino, café filtrado, café campesino y cold brew.";
      imagenUrl = buscarRespuesta(imagenesDerivados, derivado);
      break;

    case "consultar_sabor":
    case "perfil_sabor":
    case "recomendar_cafe_por_sabor":
      respuesta = buscarRespuesta(sabores, sabor) ||
        "Puedo recomendar cafés según perfiles como dulce, frutal, cítrico, floral, suave, ácido, caramelo, achocolatado o intenso.";
      break;

    case "consultar_altitud_region":
    case "altitud_region":
      respuesta = buscarRespuesta(altitudesRegiones, region) ||
        "El café colombiano suele cultivarse entre 1.200 y 2.000 metros sobre el nivel del mar, según la región.";
      break;

    case "consultar_altitud_variedad":
    case "altitud_variedad":
      respuesta = buscarRespuesta(altitudesVariedades, tipoGrano) ||
        "La altitud de cultivo depende de la variedad. Muchas variedades colombianas se cultivan entre 1.200 y 2.000 metros sobre el nivel del mar.";
      imagenUrl = buscarRespuesta(imagenesVariedades, tipoGrano);
      break;

    case "consultar_importancia_altitud":
    case "relacion_altitud_sabor":
      respuesta = altitud.importancia;
      break;

    case "altitud_general_cafe_colombiano":
    case "cafe_de_altura":
      respuesta = altitud.general;
      break;

    case "consultar_productores":
    case "productores":
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

    case "compra_cafe":
    case "compra":
    case "compra_de_cafe":
    case "comprar_cafe":
    case "compra_por_region":
    case "compra_por_sabor":
      respuesta = responderCompra(parametros);
      break;

    default:
      respuesta = "Estoy conectado al webhook, pero ese intent todavía no está configurado en el backend. Revisa que el nombre del intent en Dialogflow coincida con los casos del servidor.";
      break;
  }

  responderDialogflow(req, res, respuesta, imagenUrl);
}

/* =========================
   RUTAS
========================= */

app.get("/", (req, res) => {
  res.send("Webhook de CafetoBot funcionando correctamente.");
});

app.post("/", manejarWebhook);
app.post("/webhook", manejarWebhook);

/* =========================
   SERVIDOR
========================= */

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});