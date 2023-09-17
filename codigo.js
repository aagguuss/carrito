// Función para crear la página web y establecer el título EL siguiente COdigo esta escrito en google script 
function doGet() {
  return HtmlService.createHtmlOutputFromFile('indice')
    .setTitle('Listado MG MAYORISTA')
     .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

// Función para obtener los datos de Google Sheets
function getDataFromGoogleSheets() {
  try {
    var productData = getProductData(); // Obtener datos de productos
    var imageLinks = getImageLinks(); // Obtener enlaces de imágenes

    // Combinar los datos de productos y enlaces de imágenes
    for (var i = 0; i < productData.length; i++) {
      productData[i].imagen = imageLinks[i];
    }
    return productData;
  } catch (error) {
    return { error: "Error al obtener los datos de Google Sheets" };
  }
}

// Función para obtener los datos de productos
function getProductData() {
  var sheet = SpreadsheetApp.openById('1OCOPbf8A6txohHauCEic3T-pds53VLD6pzSA6Yz6cW4').getSheetByName('precios');
  var data = sheet.getRange(1, 1, sheet.getLastRow(), 7).getDisplayValues();

  var products = [];
  for (var i = 0; i < data.length; i++) {
    var descripcion = data[i][0];
    var precio1 = data[i][1];
    var precio2 = data[i][2];
    var precio3 = data[i][3];
    var precio4 = data[i][4];

    if (descripcion.toLowerCase() === 'titulo de categoria') {
      // Si es un título de categoría, agrega solo la descripción a los productos
      products.push({
        descripcion: precio1,
        estilo:'bold'
      });
    } else if (descripcion.toLowerCase() === 'fin de lista') {
      break;
    } else {
      products.push({
        descripcion: descripcion,
        precio1: precio1,
        precio2: precio2,
        precio3: precio3,
        precio4: precio4,
        estilo: 'normal' // Estilo normal para otros productos
      });
    }
  }
  return products;
}

// Función para obtener enlaces de imágenes
function getImageLinks() {
  var sheet = SpreadsheetApp.openById('1OCOPbf8A6txohHauCEic3T-pds53VLD6pzSA6Yz6cW4').getSheetByName('precios');
  var data = sheet.getRange(1, 8, sheet.getLastRow(), 1).getDisplayValues();
  var imageLinks = [];
  for (var i = 0; i < data.length; i++) {
    var imagenLink = data[i][0];
    if (imagenLink === "FIN DE LISTA") {
      // Si encuentra "FIN DE LISTA", rompe el bucle
      break;
    } else {
      imageLinks.push(imagenLink);
    }
  }
  return imageLinks;
}