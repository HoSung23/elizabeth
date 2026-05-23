/**
 * CONSTANTS.JS
 * Datos de productos y proveedores
 */

const products = [
    // FRUTAS
    { id:1,  name:"Aguacate Criollo Grande",       cat:"frutas",    icon:"🥑", desc:"Red (90-100 u.) · 24 kg",              presentacion:"Red (24 kg)",       precio1:500,    precio2:387.50,  medida:"Red" },
    { id:2,  name:"Aguacate Hass Importado",       cat:"frutas",    icon:"🥑", desc:"Mediano · Caja 7 kg",                  presentacion:"Caja (7 kg)",       precio1:130,    precio2:125,     medida:"Caja" },
    { id:3,  name:"Banano Criollo",                cat:"frutas",    icon:"🍌", desc:"Mediano, de primera · Quintal",         presentacion:"Quintal",           precio1:185,    precio2:160,     medida:"Quintal" },
    { id:4,  name:"Banano de Exportación",         cat:"frutas",    icon:"🍌", desc:"Mediano · Caja (100-105 u.)",           presentacion:"Caja (100-105 u.)", precio1:70,     precio2:70,      medida:"Caja" },
    { id:5,  name:"Fresa Mediana",                 cat:"frutas",    icon:"🍓", desc:"De primera · Caja 40 lb",              presentacion:"Caja (40 lb)",      precio1:350,    precio2:275,     medida:"Caja" },
    { id:6,  name:"Limón Criollo Mediano",         cat:"frutas",    icon:"🍋", desc:"Millar (17.5 kg)",                     presentacion:"Millar (17.5 kg)",  precio1:500,    precio2:400,     medida:"Millar" },
    { id:7,  name:"Limón Persa Mediano",           cat:"frutas",    icon:"🍋", desc:"Millar (110 kg)",                      presentacion:"Millar (110 kg)",   precio1:1400,   precio2:1350,    medida:"Millar" },
    { id:8,  name:"Mango Pashte/Pita Mediano",     cat:"frutas",    icon:"🥭", desc:"Ciento (23.5 kg)",                     presentacion:"Ciento (23.5 kg)", precio1:400,    precio2:220,     medida:"Ciento" },
    { id:9,  name:"Mango Tommy Atkins Mediano",    cat:"frutas",    icon:"🥭", desc:"Ciento (50 kg)",                       presentacion:"Ciento (50 kg)",    precio1:250,    precio2:220,     medida:"Ciento" },
    { id:10, name:"Mora Mediana",                  cat:"frutas",    icon:"🍇", desc:"De primera · Caja 40 lb",              presentacion:"Caja (40 lb)",      precio1:190,    precio2:190,     medida:"Caja" },
    { id:11, name:"Naranja Piña (Azucarona)",      cat:"frutas",    icon:"🍊", desc:"Ciento (18.9 kg)",                     presentacion:"Ciento (18.9 kg)", precio1:80,     precio2:80,      medida:"Ciento" },
    { id:12, name:"Naranja Valencia Hondureña",    cat:"frutas",    icon:"🍊", desc:"Mediana · Ciento (23.9 kg)",           presentacion:"Ciento (23.9 kg)", precio1:150,    precio2:120,     medida:"Ciento" },
    { id:13, name:"Papaya Tainung Mediana",        cat:"frutas",    icon:"🍈", desc:"De primera · Caja 40 lb",              presentacion:"Caja (40 lb)",      precio1:135,    precio2:130,     medida:"Caja" },
    { id:14, name:"Piña Mediana",                  cat:"frutas",    icon:"🍍", desc:"Ciento (105 kg)",                      presentacion:"Ciento (105 kg)",   precio1:600,    precio2:600,     medida:"Ciento" },
    { id:15, name:"Plátano Maduro Grande",         cat:"frutas",    icon:"🍌", desc:"Ciento (29 kg)",                       presentacion:"Ciento (29 kg)",    precio1:245,    precio2:235,     medida:"Ciento" },
    { id:16, name:"Plátano Maduro Mediano",        cat:"frutas",    icon:"🍌", desc:"Ciento (20.5 kg)",                     presentacion:"Ciento (20.5 kg)", precio1:210,    precio2:200,     medida:"Ciento" },
    { id:17, name:"Sandía Redonda Mediana",        cat:"frutas",    icon:"🍉", desc:"Ciento (177.35 kg)",                   presentacion:"Ciento (177.35 kg)",precio1:1500,   precio2:1300,    medida:"Ciento" },
    { id:18, name:"Uva Roja Importada",            cat:"frutas",    icon:"🍇", desc:"Caja (22 lb)",                         presentacion:"Caja (22 lb)",      precio1:373,    precio2:342,     medida:"Caja" },
    { id:19, name:"Zapote Mediano",                cat:"frutas",    icon:"🍑", desc:"De primera · Ciento (39.6 kg)",        presentacion:"Ciento (39.6 kg)", precio1:350,    precio2:350,     medida:"Ciento" },
    { id:20, name:"Coco Verde Mediano",            cat:"frutas",    icon:"🥥", desc:"Ciento (136.3 kg)",                    presentacion:"Ciento (136.3 kg)",precio1:400,    precio2:400,     medida:"Ciento" },

    // VERDURAS
    { id:21, name:"Apio Mediano",                  cat:"verduras",  icon:"🌿", desc:"De primera · Docena",                  presentacion:"Docena",            precio1:27.50,  precio2:27.50,   medida:"Docena" },
    { id:22, name:"Brócoli Mediano",               cat:"verduras",  icon:"🥦", desc:"De primera · Bolsa 2 docenas",         presentacion:"Bolsa (2 doc.)",    precio1:130,    precio2:95,      medida:"Bolsa" },
    { id:23, name:"Cebolla con Tallo Blanca",      cat:"verduras",  icon:"🧅", desc:"Mediana · Manojo (50 u.)",             presentacion:"Manojo (50 u.)",    precio1:95,     precio2:60,      medida:"Manojo" },
    { id:24, name:"Cebolla Seca Amarilla",         cat:"verduras",  icon:"🧅", desc:"Mediana de primera · Quintal",         presentacion:"Quintal",           precio1:340,    precio2:310,     medida:"Quintal" },
    { id:25, name:"Cebolla Seca Blanca Nacional",  cat:"verduras",  icon:"🧅", desc:"Mediana de primera · Quintal",         presentacion:"Quintal",           precio1:350,    precio2:350,     medida:"Quintal" },
    { id:26, name:"Cebolla Seca Blanca Importada", cat:"verduras",  icon:"🧅", desc:"Segunda · Quintal",                    presentacion:"Quintal",           precio1:300,    precio2:210,     medida:"Quintal" },
    { id:27, name:"Cebolla Seca Morada Nacional",  cat:"verduras",  icon:"🧅", desc:"Mediana de primera · Quintal",         presentacion:"Quintal",           precio1:350,    precio2:330,     medida:"Quintal" },
    { id:28, name:"Cebolla Seca Morada Importada", cat:"verduras",  icon:"🧅", desc:"Mediana de primera · Quintal",         presentacion:"Quintal",           precio1:370,    precio2:360,     medida:"Quintal" },
    { id:29, name:"Chile Jalapeño Grande",         cat:"verduras",  icon:"🌶️", desc:"De primera · Caja 36 lb",              presentacion:"Caja (36 lb)",      precio1:145,    precio2:125,     medida:"Caja" },
    { id:30, name:"Chile Jalapeño Mediano",        cat:"verduras",  icon:"🌶️", desc:"De primera · Caja 36 lb",              presentacion:"Caja (36 lb)",      precio1:125,    precio2:115,     medida:"Caja" },
    { id:31, name:"Chile Pimiento Grande",         cat:"verduras",  icon:"🫑", desc:"Caja (90-100 u.)",                     presentacion:"Caja (90-100 u.)", precio1:125,    precio2:100,     medida:"Caja" },
    { id:32, name:"Chile Pimiento Mediano",        cat:"verduras",  icon:"🫑", desc:"Caja (100-150 u.)",                    presentacion:"Caja (100-150 u.)",precio1:100,    precio2:85,      medida:"Caja" },
    { id:33, name:"Cilantro de Primera",           cat:"verduras",  icon:"🌿", desc:"Red (100 manojos, 30.83 kg)",          presentacion:"Red (30.83 kg)",    precio1:325,    precio2:325,     medida:"Red" },
    { id:34, name:"Coliflor Mediana",              cat:"verduras",  icon:"🥦", desc:"De primera · Red (13-15 u.)",          presentacion:"Red (13-15 u.)",    precio1:55,     precio2:55,      medida:"Red" },
    { id:35, name:"Ejote Chino",                   cat:"verduras",  icon:"🥬", desc:"Costal (40 lb)",                       presentacion:"Costal (40 lb)",    precio1:105,    precio2:90,      medida:"Costal" },
    { id:36, name:"Ejote Francés",                 cat:"verduras",  icon:"🥬", desc:"Revuelto de primera · Costal 40 lb",   presentacion:"Costal (40 lb)",    precio1:90,     precio2:90,      medida:"Costal" },
    { id:37, name:"Arveja China",                  cat:"verduras",  icon:"🫛", desc:"Revuelta de primera · Costal 40 lb",   presentacion:"Costal (40 lb)",    precio1:110,    precio2:110,     medida:"Costal" },
    { id:38, name:"Arveja Dulce en Grano",         cat:"verduras",  icon:"🫛", desc:"Arroba (11.34 kg)",                    presentacion:"Arroba (11.34 kg)",precio1:437.50, precio2:437.50,  medida:"Arroba" },
    { id:39, name:"Güicoy Sazón Mediano",          cat:"verduras",  icon:"🎃", desc:"Red (12-15 u., 14.8 kg)",              presentacion:"Red (14.8 kg)",     precio1:320,    precio2:310,     medida:"Red" },
    { id:40, name:"Güisquil Mediano",              cat:"verduras",  icon:"🥬", desc:"Ciento (40.2 kg)",                     presentacion:"Ciento (40.2 kg)", precio1:325,    precio2:275,     medida:"Ciento" },
    { id:41, name:"Lechuga Repollada",             cat:"verduras",  icon:"🥬", desc:"Mediana de primera · Caja 30 u.",      presentacion:"Caja (30 u.)",      precio1:55,     precio2:52.50,   medida:"Caja" },
    { id:42, name:"Loroco de Primera",             cat:"verduras",  icon:"🌸", desc:"Quintal",                              presentacion:"Quintal",           precio1:1750,   precio2:1750,    medida:"Quintal" },
    { id:43, name:"Pepino Mediano",                cat:"verduras",  icon:"🥒", desc:"De primera · Caja (50-60 u.)",         presentacion:"Caja (50-60 u.)",   precio1:125,    precio2:100,     medida:"Caja" },
    { id:44, name:"Rábano Mediano",                cat:"verduras",  icon:"🌱", desc:"De primera · Canasto (200-250 u.)",    presentacion:"Canasto (200-250)", precio1:40,     precio2:30,      medida:"Canasto" },
    { id:45, name:"Remolacha Mediana",             cat:"verduras",  icon:"🫀", desc:"De primera · Red (4-5 doc., 7 kg)",    presentacion:"Red (7.02 kg)",     precio1:65,     precio2:55,      medida:"Red" },
    { id:46, name:"Repollo Blanco Mediano",        cat:"verduras",  icon:"🥬", desc:"De primera · Red (12-15 u., 27 kg)",   presentacion:"Red (27 kg)",       precio1:85,     precio2:50,      medida:"Red" },
    { id:47, name:"Tomate de Cocina Grande",       cat:"verduras",  icon:"🍅", desc:"De primera · Caja (45-50 lb)",         presentacion:"Caja (45-50 lb)",   precio1:155,    precio2:125,     medida:"Caja" },
    { id:48, name:"Tomate de Cocina Mediano",      cat:"verduras",  icon:"🍅", desc:"De primera · Caja (45-50 lb)",         presentacion:"Caja (45-50 lb)",   precio1:130,    precio2:105,     medida:"Caja" },
    { id:49, name:"Yuca Entera Mediana",           cat:"verduras",  icon:"🥔", desc:"Red (75-80 u., 42.4 kg)",              presentacion:"Red (42.4 kg)",     precio1:305,    precio2:305,     medida:"Red" },
    { id:50, name:"Zanahoria Mediana",             cat:"verduras",  icon:"🥕", desc:"De primera · Red (7-8 doc., 13.9 kg)", presentacion:"Red (13.92 kg)",    precio1:110,    precio2:90,      medida:"Red" },
    { id:51, name:"Ajo Blanco Mediano",            cat:"verduras",  icon:"🧄", desc:"De primera · Mazo (20 trenzas)",       presentacion:"Mazo (20 trenzas)", precio1:120,    precio2:120,     medida:"Mazo" },

    // GRANOS
    { id:52, name:"Arroz Oro Blanco",              cat:"granos",    icon:"🌾", desc:"De primera · Quintal",                 presentacion:"Quintal",           precio1:450,    precio2:450,     medida:"Quintal" },
    { id:53, name:"Arroz Oro Blanco Segunda",      cat:"granos",    icon:"🌾", desc:"De segunda · Quintal",                 presentacion:"Quintal",           precio1:420,    precio2:420,     medida:"Quintal" },
    { id:54, name:"Frijol Negro Primera",          cat:"granos",    icon:"⚫", desc:"De primera · Quintal",                 presentacion:"Quintal",           precio1:525,    precio2:500,     medida:"Quintal" },
    { id:55, name:"Frijol Negro Segunda",          cat:"granos",    icon:"⚫", desc:"De segunda · Quintal",                 presentacion:"Quintal",           precio1:500,    precio2:500,     medida:"Quintal" },
    { id:56, name:"Frijol Blanco Primera",         cat:"granos",    icon:"⚪", desc:"De primera · Quintal",                 presentacion:"Quintal",           precio1:1100,   precio2:1100,    medida:"Quintal" },
    { id:57, name:"Frijol Rojo Primera",           cat:"granos",    icon:"🔴", desc:"De primera · Quintal",                 presentacion:"Quintal",           precio1:675,    precio2:600,     medida:"Quintal" },
    { id:58, name:"Maíz Amarillo Primera",         cat:"granos",    icon:"🌽", desc:"De primera · Quintal",                 presentacion:"Quintal",           precio1:190,    precio2:185,     medida:"Quintal" },
    { id:59, name:"Maíz Blanco Primera",           cat:"granos",    icon:"🌽", desc:"De primera · Quintal",                 presentacion:"Quintal",           precio1:190,    precio2:190,     medida:"Quintal" },
    { id:60, name:"Sorgo Blanco Primera",          cat:"granos",    icon:"🌾", desc:"De primera · Quintal",                 presentacion:"Quintal",           precio1:200,    precio2:200,     medida:"Quintal" },

    // TUBÉRCULOS
    { id:61, name:"Papa Larga Lavada Grande",      cat:"tuberculos",icon:"🥔", desc:"De primera · Quintal",                 presentacion:"Quintal",           precio1:300,    precio2:250,     medida:"Quintal" },
    { id:62, name:"Papa Loman Grande",             cat:"tuberculos",icon:"🥔", desc:"Lavada, de primera · Quintal",         presentacion:"Quintal",           precio1:420,    precio2:392.50,  medida:"Quintal" },
    { id:63, name:"Papa Loman Mediana",            cat:"tuberculos",icon:"🥔", desc:"Lavada, de primera · Quintal",         presentacion:"Quintal",           precio1:320,    precio2:250,     medida:"Quintal" },
    { id:64, name:"Papa Loman Pequeña",            cat:"tuberculos",icon:"🥔", desc:"Lavada, de primera · Quintal",         presentacion:"Quintal",           precio1:255,    precio2:217.50,  medida:"Quintal" },
    { id:65, name:"Papa Redonda Grande Lavada",    cat:"tuberculos",icon:"🥔", desc:"De primera · Quintal",                 presentacion:"Quintal",           precio1:275,    precio2:220,     medida:"Quintal" },
    { id:66, name:"Papa Redonda Grande Sin Lavar", cat:"tuberculos",icon:"🥔", desc:"De primera · Quintal",                 presentacion:"Quintal",           precio1:255,    precio2:200,     medida:"Quintal" },

    // PROTEÍNAS (CARNES Y AVES)
    { id:67, name:"Bovino en Canal Primera",       cat:"proteinas", icon:"🥩", desc:"De primera · Libra",                   presentacion:"Libra",             precio1:23.50,  precio2:23.50,   medida:"Libra" },
    { id:68, name:"Porcino en Canal",              cat:"proteinas", icon:"🥩", desc:"Libra",                                presentacion:"Libra",             precio1:16,     precio2:16,      medida:"Libra" },
    { id:69, name:"Pollo Entero Sin Menudos",      cat:"proteinas", icon:"🍗", desc:"De primera · Libra",                   presentacion:"Libra",             precio1:14.50,  precio2:14.50,   medida:"Libra" },

    // MARISCOS Y PESCADOS
    { id:70, name:"Camarón Blanco Mediano",        cat:"mariscos",  icon:"🦐", desc:"Sin cabeza (mar) · Quintal",           presentacion:"Quintal",           precio1:3300,   precio2:3300,    medida:"Quintal" },
    { id:71, name:"Camarón Grande Estanque",       cat:"mariscos",  icon:"🦐", desc:"Con cabeza · Quintal",                 presentacion:"Quintal",           precio1:3000,   precio2:3000,    medida:"Quintal" },
    { id:72, name:"Camarón Mediano Estanque",      cat:"mariscos",  icon:"🦐", desc:"Con cabeza · Quintal",                 presentacion:"Quintal",           precio1:2500,   precio2:2500,    medida:"Quintal" },
    { id:73, name:"Camarón Pequeño Estanque",      cat:"mariscos",  icon:"🦐", desc:"Con cabeza · Quintal",                 presentacion:"Quintal",           precio1:2100,   precio2:2100,    medida:"Quintal" },
    { id:74, name:"Filete de Dorado Primera",      cat:"mariscos",  icon:"🐟", desc:"Quintal",                              presentacion:"Quintal",           precio1:4500,   precio2:4500,    medida:"Quintal" },
    { id:75, name:"Filete de Róbalo Primera",      cat:"mariscos",  icon:"🐟", desc:"Arroba (11.34 kg)",                    presentacion:"Arroba (11.34 kg)",precio1:2100,   precio2:2100,    medida:"Arroba" },
    { id:76, name:"Filete de Tiburón Primera",     cat:"mariscos",  icon:"🦈", desc:"Quintal",                              presentacion:"Quintal",           precio1:2950,   precio2:2950,    medida:"Quintal" },
    { id:77, name:"Pargo Pequeño Primera",         cat:"mariscos",  icon:"🐡", desc:"Quintal",                              presentacion:"Quintal",           precio1:3700,   precio2:3700,    medida:"Quintal" },
    { id:78, name:"Róbalo Entero Revuelto",        cat:"mariscos",  icon:"🐟", desc:"Quintal",                              presentacion:"Quintal",           precio1:1850,   precio2:1850,    medida:"Quintal" },
    { id:79, name:"Tiburón Entero Revuelto",       cat:"mariscos",  icon:"🦈", desc:"De primera · Quintal",                 presentacion:"Quintal",           precio1:1950,   precio2:1950,    medida:"Quintal" },
    { id:80, name:"Tilapia Grande Primera",        cat:"mariscos",  icon:"🐟", desc:"Quintal",                              presentacion:"Quintal",           precio1:1700,   precio2:1700,    medida:"Quintal" },
    { id:81, name:"Tilapia Mediana Primera",       cat:"mariscos",  icon:"🐟", desc:"Quintal",                              presentacion:"Quintal",           precio1:1700,   precio2:1700,    medida:"Quintal" },
    { id:82, name:"Tilapia Pequeña Primera",       cat:"mariscos",  icon:"🐟", desc:"Quintal",                              presentacion:"Quintal",           precio1:1500,   precio2:1500,    medida:"Quintal" },
];

const suppliers = [
    {id:1, cert:"yax", name:"Finca Los Cuchumatanes", location:"Huehuetenango, Huehuetenango", category:"frutas", letter:"LC", cats:["frutas"], products:[{prodId:1, price:475}, {prodId:3, price:170}, {prodId:5, price:330}, {prodId:8, price:380}, {prodId:14, price:580}, {prodId:15, price:240}, {prodId:19, price:345}]},
    {id:2, cert:"yax", name:"Agroexportaciones Chiquimula", location:"Chiquimula, Chiquimula", category:"frutas", letter:"AC", cats:["frutas"], products:[{prodId:2, price:122}, {prodId:9, price:235}, {prodId:10, price:188}, {prodId:12, price:138}, {prodId:13, price:132}, {prodId:17, price:1450}, {prodId:18, price:360}]},
    {id:3, cert:"yax", name:"Frutales del Altiplano", location:"Quetzaltenango, Quetzaltenango", category:"frutas", letter:"FA", cats:["frutas"], products:[{prodId:1, price:490}, {prodId:5, price:345}, {prodId:6, price:480}, {prodId:8, price:410}, {prodId:11, price:78}, {prodId:16, price:205}]},
    {id:4, cert:"yax", name:"Tropicales del Sur", location:"Escuintla, Escuintla", category:"frutas", letter:"TS", cats:["frutas"], products:[{prodId:4, price:68}, {prodId:9, price:240}, {prodId:13, price:128}, {prodId:14, price:595}, {prodId:15, price:242}, {prodId:20, price:395}]},
    {id:5, cert:"maga", name:"Agropecuaria San Marcos", location:"San Marcos, San Marcos", category:"frutas", letter:"SM", cats:["frutas"], products:[{prodId:1, price:500}, {prodId:2, price:130}, {prodId:3, price:182}, {prodId:7, price:1380}, {prodId:12, price:145}, {prodId:19, price:350}]},
    {id:6, cert:"yax", name:"Verduras Certificadas Maya", location:"Chimaltenango, Chimaltenango", category:"verduras", letter:"VM", cats:["verduras"], products:[{prodId:22, price:115}, {prodId:29, price:138}, {prodId:33, price:315}, {prodId:34, price:52}, {prodId:41, price:53}, {prodId:47, price:148}, {prodId:50, price:102}]},
    {id:7, cert:"yax", name:"Cooperativa Agrícola Quiché", location:"Santa Cruz del Quiché, Quiché", category:"verduras", letter:"CQ", cats:["verduras"], products:[{prodId:24, price:318}, {prodId:25, price:345}, {prodId:27, price:342}, {prodId:30, price:120}, {prodId:31, price:118}, {prodId:32, price:96}, {prodId:44, price:36}]},
    {id:8, cert:"yax", name:"Distribuidora Hortícola Verapaz", location:"Cobán, Alta Verapaz", category:"verduras", letter:"DH", cats:["verduras"], products:[{prodId:21, price:27}, {prodId:35, price:98}, {prodId:36, price:88}, {prodId:37, price:108}, {prodId:38, price:435}, {prodId:40, price:310}, {prodId:43, price:118}]},
    {id:9, cert:"yax", name:"Hortalizas del Pacífico", location:"Mazatenango, Suchitepéquez", category:"verduras", letter:"HP", cats:["verduras"], products:[{prodId:23, price:88}, {prodId:26, price:285}, {prodId:28, price:362}, {prodId:39, price:312}, {prodId:45, price:60}, {prodId:46, price:75}, {prodId:49, price:305}]},
    {id:10, cert:"yax", name:"Campo Verde Jalapa", location:"Jalapa, Jalapa", category:"verduras", letter:"CV", cats:["verduras"], products:[{prodId:29, price:145}, {prodId:31, price:122}, {prodId:33, price:320}, {prodId:42, price:1720}, {prodId:47, price:152}, {prodId:48, price:128}, {prodId:51, price:118}]},
    {id:11, cert:"maga", name:"Productores Unidos Jutiapa", location:"Jutiapa, Jutiapa", category:"verduras", letter:"PU", cats:["verduras"], products:[{prodId:22, price:128}, {prodId:24, price:335}, {prodId:29, price:142}, {prodId:34, price:55}, {prodId:43, price:122}, {prodId:48, price:130}, {prodId:50, price:108}]},
    {id:12, cert:"yax", name:"Granos Selectos Petén", location:"Flores, Petén", category:"granos", letter:"GS", cats:["granos"], products:[{prodId:52, price:442}, {prodId:54, price:512}, {prodId:56, price:1080}, {prodId:58, price:186}, {prodId:60, price:198}]},
    {id:13, cert:"yax", name:"Semillas y Granos de Occidente", location:"Huehuetenango, Huehuetenango", category:"granos", letter:"SG", cats:["granos"], products:[{prodId:53, price:418}, {prodId:55, price:498}, {prodId:57, price:665}, {prodId:59, price:188}, {prodId:60, price:202}]},
    {id:14, cert:"maga", name:"Granos Básicos Chiquimula", location:"Chiquimula, Chiquimula", category:"granos", letter:"GB", cats:["granos"], products:[{prodId:52, price:450}, {prodId:54, price:525}, {prodId:56, price:1100}, {prodId:57, price:672}, {prodId:58, price:190}]},
    {id:15, cert:"maga", name:"Cooperativa de Granos Izabal", location:"Puerto Barrios, Izabal", category:"granos", letter:"GI", cats:["granos"], products:[{prodId:52, price:448}, {prodId:55, price:505}, {prodId:59, price:192}, {prodId:60, price:200}, {prodId:58, price:188}]},
    {id:16, cert:"yax", name:"Tubérculos Premium Alta Verapaz", location:"Cobán, Alta Verapaz", category:"tuberculos", letter:"TP", cats:["tuberculos"], products:[{prodId:61, price:285}, {prodId:62, price:408}, {prodId:63, price:308}, {prodId:64, price:248}, {prodId:65, price:265}]},
    {id:17, cert:"yax", name:"Papas del Altiplano Central", location:"Chimaltenango, Chimaltenango", category:"tuberculos", letter:"PA", cats:["tuberculos"], products:[{prodId:61, price:295}, {prodId:62, price:415}, {prodId:63, price:315}, {prodId:64, price:252}, {prodId:66, price:248}]},
    {id:18, cert:"maga", name:"Productores de Tubérculos Sacatepéquez", location:"Antigua, Sacatepéquez", category:"tuberculos", letter:"PT", cats:["tuberculos"], products:[{prodId:61, price:300}, {prodId:62, price:420}, {prodId:63, price:318}, {prodId:65, price:272}, {prodId:66, price:252}]},
    {id:19, cert:"yax", name:"Carnes Frescas del Norte", location:"Cobán, Alta Verapaz", category:"proteinas", letter:"CF", cats:["proteinas"], products:[{prodId:67, price:22.50}, {prodId:68, price:15.50}, {prodId:69, price:13.75}]},
    {id:20, cert:"yax", name:"Distribuidora Pecuaria Zacapa", location:"Zacapa, Zacapa", category:"proteinas", letter:"DP", cats:["proteinas"], products:[{prodId:67, price:23.50}, {prodId:68, price:16.00}, {prodId:69, price:14.25}]},
    {id:21, cert:"maga", name:"Ganadería y Cárnicos del Sur", location:"Escuintla, Escuintla", category:"proteinas", letter:"GC", cats:["proteinas"], products:[{prodId:67, price:23.50}, {prodId:68, price:16.00}, {prodId:69, price:14.50}]},
    {id:22, cert:"yax", name:"Mariscos del Pacífico Retalhuleu", location:"Retalhuleu, Retalhuleu", category:"mariscos", letter:"MP", cats:["mariscos"], products:[{prodId:70, price:3250}, {prodId:71, price:2950}, {prodId:72, price:2450}, {prodId:73, price:2050}, {prodId:74, price:4480}, {prodId:77, price:3650}]},
    {id:23, cert:"yax", name:"Acuicultura Escuintla S.A.", location:"Escuintla, Escuintla", category:"mariscos", letter:"AE", cats:["mariscos"], products:[{prodId:70, price:3280}, {prodId:71, price:2980}, {prodId:72, price:2480}, {prodId:73, price:2080}, {prodId:80, price:1680}, {prodId:81, price:1680}, {prodId:82, price:1480}]},
    {id:24, cert:"yax", name:"Pesquería Caribe Izabal", location:"Puerto Barrios, Izabal", category:"mariscos", letter:"PC", cats:["mariscos"], products:[{prodId:74, price:4450}, {prodId:75, price:2080}, {prodId:76, price:2900}, {prodId:78, price:1820}, {prodId:79, price:1920}]},
    {id:25, cert:"maga", name:"Distribuidora Marítima Nacional", location:"Champerico, Retalhuleu", category:"mariscos", letter:"DM", cats:["mariscos"], products:[{prodId:70, price:3300}, {prodId:72, price:2500}, {prodId:74, price:4500}, {prodId:77, price:3700}, {prodId:80, price:1700}, {prodId:82, price:1500}]},
];

const catNames = { frutas:'Frutas', verduras:'Verduras', granos:'Granos', proteinas:'Carnes', tuberculos:'Tubérculos', mariscos:'Mariscos' };

const sellerCatLabels = {
    frutas: 'Frutas', verduras: 'Verduras', granos: 'Granos',
    proteinas: 'Proteínas', tuberculos: 'Tubérculos', mariscos: 'Mariscos', otros: 'Otros',
};

const bgMap = {
    catalog: 'bg-catalog',
    suppliers: 'bg-catalog',
    login: 'bg-login',
    register: 'bg-register',
    checkout: 'bg-cart',
    about: 'bg-catalog',
    'seller-panel': 'bg-register',
};
