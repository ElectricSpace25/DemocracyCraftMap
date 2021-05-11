var markers = [];

var tempX = -10000;
var tempY = -10000;

var map;
var imgW;
var imgH;
var imgOGW;
var imgOGH;

var centerX;
var centerY;

var viewX;
var viewY;

var selectedIcon;

//Define the zoom vars
var scale = 1;
var zoomFactor = 0.4;

//Define the pan vars
var panFromX;
var panFromY;

var panToX;
var panToY;

var xShift = 0;
var yShift = 0;

function preload() {
  map = loadImage("imgs/Map 5-10-21.png");

  //Markers

  //Key
  markers.push(new Marker("Capitol", -3120, -965, loadImage("imgs/Capitol.png"), 50));

  markers.push(new Marker("Department of Construction and Transport", -2732, -1189, loadImage("imgs/Dept Construction.png"), 35));
  markers.push(new Marker("Department of Health", -2540, -1189, loadImage("imgs/Dept Health.png"), 35));
  markers.push(new Marker("Department of Environment and Recreation", -2347, -1189, loadImage("imgs/Dept Environment.png"), 35));
  markers.push(new Marker("Department of Education and Commerce", -2732, -718, loadImage("imgs/Dept Education.png"), 35));
  markers.push(new Marker("Department of Public Affairs", -2540, -718, loadImage("imgs/Dept Public.png"), 35));
  markers.push(new Marker("Department of Justice", -2347, -718, loadImage("imgs/Dept Justice.png"), 35));


  markers.push(new Marker("Hospital", -1514, -94, loadImage("imgs/Hospital.png"), 50));
  markers.push(new Marker("Spawn", -2202, -954, loadImage("imgs/Spawn.png"), 50));
  markers.push(new Marker("Museum", -1119, -81, loadImage("imgs/Museum.png"), 50));
  markers.push(new Marker("Airport", -839, 1170, loadImage("imgs/Airport.png"), 50));
  markers.push(new Marker("Police Station", -2322, -432, loadImage("imgs/Police.png"), 50));
  markers.push(new Marker("Courthouse", -2150, -34, loadImage("imgs/Court.png"), 50));
  markers.push(new Marker("Tutorial Building", -1900, -1507, loadImage("imgs/Tutorial.png"), 50));
  markers.push(new Marker("Animal Shelter", -3076, -2877, loadImage("imgs/Animal Shelter.png"), 50));
  markers.push(new Marker("Police Station\n(South Branch)", -2202, 2026, loadImage("imgs/Police.png"), 35));
  markers.push(new Marker("Vehicle Dealership", -1616, -395, loadImage("imgs/Dealership.png"), 35));
  markers.push(new Marker("Gas Station", -1015, -664, loadImage("imgs/Gas.png"), 35));
  markers.push(new Marker("University", 1429, -1028, loadImage("imgs/University.png"), 50));

  //Train stations
  markers.push(new Marker("Central Park Station", -1946, -954, loadImage("imgs/Train.png"), 50));
  markers.push(new Marker("Train Station", -2702, 1862, loadImage("imgs/Train.png"), 50));

  //Buses
  markers.push(new Marker("Central Park Bus", -2079, -1046, loadImage("imgs/Bus.png"), 20));
  markers.push(new Marker("Animal Shelter Bus", -2879, -2825, loadImage("imgs/Bus.png"), 20));
  markers.push(new Marker("Patriot Drive West Bus", -2777, -1624, loadImage("imgs/Bus.png"), 20));
  markers.push(new Marker("Capitol Bus", -2878, -748, loadImage("imgs/Bus.png"), 20));
  markers.push(new Marker("Department State Building Bus", -3444, -9, loadImage("imgs/Bus.png"), 20));
  markers.push(new Marker("Industrial Area Bus", -3351, 1092, loadImage("imgs/Bus.png"), 20));
  markers.push(new Marker("Hamilton Train Station Bus", -2841, 1621, loadImage("imgs/Bus.png"), 20));
  markers.push(new Marker("Hamilton Correctional Facility Bus", -1886, 2011, loadImage("imgs/Bus.png"), 20));
  markers.push(new Marker("South Hamilton Business District Bus", -2336, 663, loadImage("imgs/Bus.png"), 20));
  markers.push(new Marker("Esplanade Bus", -165, -535, loadImage("imgs/Bus.png"), 20));
  markers.push(new Marker("Central Business District Bus", -1018, -1151, loadImage("imgs/Bus.png"), 20));

  //Shops
  markers.push(new Marker("Walgreens", -3214, -1380, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Necessary Needs", -3086, -1380, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Friendly Fire", -3305, -1357, loadImage("imgs/Gun.png"), 25));
  markers.push(new Marker("Suuse General Store", -3366, -1357, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Mall of DC", -3019, -1867, loadImage("imgs/Mall.png"), 35));
  markers.push(new Marker("Lemonies Garden Shop", -3303, -1564, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("", -3363, -1507, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Wish\n(WIP)", -2843, 1513, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("TESCO\n(WIP)", -2539, 2074, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("", -2085, 2304, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("The Exchange", -2192, 1575, loadImage("imgs/Shop.png"), 35));
  markers.push(new Marker("Amazon", -835, -1033, loadImage("imgs/Shop.png"), 35));
  markers.push(new Marker("IKEA", -416, -1304, loadImage("imgs/Shop.png"), 35));
  markers.push(new Marker("Funyolk Bar", -3011, -2494, loadImage("imgs/Bar.png"), 25));
  markers.push(new Marker("Panera Bread\n(WIP)", -3216, -2445, loadImage("imgs/Food.png"), 25));
  markers.push(new Marker("Dark Oak Distillery", -2610, -2472, loadImage("imgs/Bar.png"), 25));
  markers.push(new Marker("", -1615, -1256, loadImage("imgs/Gun.png"), 25));
  markers.push(new Marker("", -1300, -1030, loadImage("imgs/Mall.png"), 35));
  markers.push(new Marker("Krix Mart", -1623, -808, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("", -1619, -713, loadImage("imgs/Bar.png"), 25));
  markers.push(new Marker("Art Museum\n(WIP)", -1614, -589, loadImage("imgs/Museum.png"), 25));
  markers.push(new Marker("Lousy Inc.", -1623, -522, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("", -1440, -341, loadImage("imgs/ShopCasino.png"), 25));
  markers.push(new Marker("(WIP)", -1387, -374, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("(WIP)", -1210, -372, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Alphabar", -1145, -372, loadImage("imgs/Bar.png"), 25));
  markers.push(new Marker("Green Cross", -1085, -376, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("Honey Co.", -1005, -368, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Book & Shop", -996, -460, loadImage("imgs/Shop.png"), 20));
  markers.push(new Marker("TESCO", -995, -510, loadImage("imgs/Shop.png"), 20));
  markers.push(new Marker("Rock Hard", -1034, -510, loadImage("imgs/Shop.png"), 20));
  markers.push(new Marker("(Vacated)", -1058, -513, loadImage("imgs/Shop.png"), 20));
  markers.push(new Marker("The Miner's Inn", -1195, -486, loadImage("imgs/Bar.png"), 25));
  markers.push(new Marker("", -1342, -418, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("West Decor", -1441, -492, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Slate Pharmacy", -1428, -625, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("", -1275, -617, loadImage("imgs/Food.png"), 25));
  markers.push(new Marker("Andino Liquors", -1215, -614, loadImage("imgs/Bar.png"), 25));
  markers.push(new Marker("Wish Convenience Store", -1017, -760, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("", -1016, -943, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Flag Shop", -1017, -1087, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Government Shop", -1154, -793, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("AquaChants", -1245, -867, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Mini Mart Shop &\nFlo Flower Shop", -1298, -807, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Hamilton City Marketplace", -1424, -794, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Wish", -572, -696, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Wish Delivery Center", 72, -711, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Reina de Sicile", 163, -732, loadImage("imgs/Food.png"), 25));
  markers.push(new Marker("Starbucks", 170, -619, loadImage("imgs/Food.png"), 25));
  markers.push(new Marker("", -549, -1072, loadImage("imgs/Mall.png"), 35));
  markers.push(new Marker("Mooshroom Tower", -1010, 865, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("7-Eleven", -1010, 755, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("", -1610, 800, loadImage("imgs/Mall.png"), 25));
  markers.push(new Marker("Phat Mall", -1127, 526, loadImage("imgs/Mall.png"), 35));
  markers.push(new Marker("Onyx Shop", -3344, -531, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Starbucks", -1814, 302, loadImage("imgs/Food.png"), 25));
  markers.push(new Marker("Ararat Cafe and Grill", -1924, 302, loadImage("imgs/Food.png"), 25));
  markers.push(new Marker("Cubex", -1928, 432, loadImage("imgs/Mall.png"), 25));
  markers.push(new Marker("Ray Market", -1820, 490, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("", -1871, 873, loadImage("imgs/Mall.png"), 35));
  markers.push(new Marker("The Home Depot", -2642, -1760, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("", -2777, -1519, loadImage("imgs/Bar.png"), 25));
  markers.push(new Marker("The Home Depot", -2677, -1472, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("DouCo Buy and Sell &\nThe Blocky Cauldron", -2663, -1523, loadImage("imgs/ShopCasino.png"), 25));
  markers.push(new Marker("DouCo", -2673, -1573, loadImage("imgs/Shop.png"), 25));

  //Apartments
  markers.push(new Marker("Brilliant Apartments", -2972, -2250, loadImage("imgs/Apartment.png"), 25));
  markers.push(new Marker("Paradise Escapes", -3367, -1568, loadImage("imgs/Apartment.png"), 25));
  markers.push(new Marker("The Alleyway", -2175, 1809, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("", -2518, 1557, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("", -2756, -2598, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("", -3340, -1416, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("", -3342, -2514, loadImage("imgs/Apartment.png"), 25));
  markers.push(new Marker("", -1625, -1484, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("Mhad Inc.", -1619, -1021, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("", -1015, -509, loadImage("imgs/Apartment.png"), 25));
  markers.push(new Marker("Goldenrose", -1155, -620, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("Raymart", -1221, -764, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("Krix Corner Apartments", -1215, -669, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("", -1020, -1301, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("", -813, -672, loadImage("imgs/Apartment.png"), 25));
  markers.push(new Marker("", -669, -648, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("", -416, -675, loadImage("imgs/Apartment.png"), 25));
  markers.push(new Marker("", -226, -670, loadImage("imgs/Apartment.png"), 25));
  markers.push(new Marker("Le Matissia Apartments", 145, -674, loadImage("imgs/Apartment.png"), 25));
  markers.push(new Marker("", -1194, 864, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("YZY", -1424, 870, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("", -1594, 557, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("Imperium Apartments", -1372, 430, loadImage("imgs/Apartment.png"), 25));
  markers.push(new Marker("", -1615, 443, loadImage("imgs/Apartment.png"), 25));
  markers.push(new Marker("Raybucks", -3210, -521, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("", -2756, -1940, loadImage("imgs/Apartment.png"), 25));
  markers.push(new Marker("", -2304, 749, loadImage("imgs/Apartment.png"), 25));
  markers.push(new Marker("", -2780, -1377, loadImage("imgs/ShopApt.png"), 25));
  markers.push(new Marker("", -2675, -1379, loadImage("imgs/ShopApt.png"), 25));

  //Houses
  markers.push(new Marker("", -1422, -2241, loadImage("imgs/House.png"), 25));
  markers.push(new Marker("", -1422, -2114, loadImage("imgs/House.png"), 25));
  markers.push(new Marker("", -1422, -2005, loadImage("imgs/House.png"), 25));
  markers.push(new Marker("", -1620, -2219, loadImage("imgs/House.png"), 25));
  markers.push(new Marker("", -1620, -2059, loadImage("imgs/House.png"), 25));
  markers.push(new Marker("", -1620, -1935, loadImage("imgs/House.png"), 25));
  markers.push(new Marker("", -1620, -1794, loadImage("imgs/House.png"), 25));
  markers.push(new Marker("", -1727, -1800, loadImage("imgs/House.png"), 25));
  markers.push(new Marker("", -1716, -1961, loadImage("imgs/House.png"), 25));
  markers.push(new Marker("", -1724, -2105, loadImage("imgs/House.png"), 25));
  markers.push(new Marker("", -1720, -2225, loadImage("imgs/House.png"), 25));

  //Businesses/Buildings
  markers.push(new Marker("ChipCorp", -2681, -2236, loadImage("imgs/Building.png"), 25));
  markers.push(new Marker("Honey Co.", -3041, 1412, loadImage("imgs/Building.png"), 25));
  markers.push(new Marker("", -2780, 1175, loadImage("imgs/Building.png"), 25));
  markers.push(new Marker("", -834, -1373, loadImage("imgs/Building.png"), 25));
  markers.push(new Marker("LogiCo HQ", -101, -665, loadImage("imgs/Building.png"), 25));
  markers.push(new Marker("Google", -1183, 747, loadImage("imgs/Building.png"), 25));
  markers.push(new Marker("CFN Studios", -1614, 332, loadImage("imgs/Building.png"), 25));
  markers.push(new Marker("RGB Storage Facility", -2331, 366, loadImage("imgs/Building.png"), 25));
  markers.push(new Marker("The Design World Tower", -2489, 402, loadImage("imgs/Building.png"), 25));

  //Factories
  markers.push(new Marker("Mercedes", -3265, 1313, loadImage("imgs/Factory.png"), 25));

  //Other
  markers.push(new Marker("Auditorium 4", -2677, 1182, loadImage("imgs/Auditorium.png"), 25));
  markers.push(new Marker("Golden Globe Casino\n(Closed)", -2516, 1380, loadImage("imgs/Casino.png"), 25));
  markers.push(new Marker("Democratic Reformist Party Building", -2211, 2262, loadImage("imgs/Building.png"), 25));
  markers.push(new Marker("Clockwork Bank", -636, -1256, loadImage("imgs/Bank.png"), 25));
  markers.push(new Marker("Laundry", -3123, -2608, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("Park", -3335, -2438, loadImage("imgs/Park.png"), 25));
  markers.push(new Marker("", -1617, -1380, loadImage("imgs/Bank.png"), 25));
  markers.push(new Marker("Gas Station", -674, -735, loadImage("imgs/Gas.png"), 25));
  markers.push(new Marker("Gas Station", 79, -619, loadImage("imgs/Gas.png"), 25));
  markers.push(new Marker("", 79, -619, loadImage("imgs/Park.png"), 25));
  markers.push(new Marker("Parking", -1094, 1004, loadImage("imgs/Parking.png"), 25));
  markers.push(new Marker("Gas Station", -2333, 284, loadImage("imgs/Gas.png"), 25));
  markers.push(new Marker("Gas Station", -2488, 753, loadImage("imgs/Gas.png"), 25));
  markers.push(new Marker("Park", -2320, 955, loadImage("imgs/Park.png"), 25));
  markers.push(new Marker("Home Depot Parking", -2765, -1752, loadImage("imgs/Parking.png"), 25));

  //Under Construction
  markers.push(new Marker("", -2981, -2608, loadImage("imgs/Construction.png"), 25));
  markers.push(new Marker("", -3305, -1504, loadImage("imgs/Construction.png"), 25));
  markers.push(new Marker("", -3339, -2593, loadImage("imgs/Construction.png"), 25));
  markers.push(new Marker("", -3217, -2522, loadImage("imgs/Construction.png"), 25));
  markers.push(new Marker("", -3215, -2595, loadImage("imgs/Construction.png"), 25));
  markers.push(new Marker("", -3111, -2549, loadImage("imgs/Construction.png"), 25));
  markers.push(new Marker("", -3108, -2453, loadImage("imgs/Construction.png"), 25));
  markers.push(new Marker("", -2938, -2455, loadImage("imgs/Construction.png"), 25));
  markers.push(new Marker("", -3015, -2440, loadImage("imgs/Construction.png"), 25));
  markers.push(new Marker("", -2961, -1379, loadImage("imgs/Construction.png"), 25));
  markers.push(new Marker("", -2756, -2471, loadImage("imgs/Construction.png"), 25));
  markers.push(new Marker("", -2607, -2593, loadImage("imgs/Construction.png"), 25));
  markers.push(new Marker("", -1291, -1366, loadImage("imgs/Construction.png"), 25));
  markers.push(new Marker("", -1931, 555, loadImage("imgs/Construction.png"), 25));
  markers.push(new Marker("", -2139, 321, loadImage("imgs/Construction.png"), 25));
  markers.push(new Marker("", -2137, 543, loadImage("imgs/Construction.png"), 25));

  //Unknown
  markers.push(new Marker("", -2028, 1803, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -1991, 1698, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -2605, 1633, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -627, -1351, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -3301, -2167, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -3340, -1817, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -3209, -1536, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -3040, -1537, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -3028, -528, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -1689, -2526, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("(WIP)", -1277, -366, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("(WIP)", -1312, -704, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("(WIP)", -1156, -707, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -1018, -1456, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -833, -902, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -413, -886, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("ALDO", -178, -1074, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -1413, 557, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -1485, 387, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -2313, 585, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("(WIP)", -2333, 489, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("Gatsby Tower\n(WIP)", -2490, 296, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -2491, 556, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -2146, 748, loadImage("imgs/Marker.png"), 25));
  markers.push(new Marker("", -2408, -1462, loadImage("imgs/Marker.png"), 25));

}

function setup() {

  scale = 1;

  cnv = createCanvas(windowWidth - 20, windowHeight - 20);
  cnv.mousePressed(click);
  cnv.doubleClicked(doubleClick);

  imgOGW = map.width * 2;
  imgOGH = map.height * 2;

  imgW = imgOGW;
  imgH = imgOGH;

  centerY = height / 2;
  centerX = width / 2;

  viewX = 0;
  viewY = 0;

}

function windowResized() {
  resizeCanvas(windowWidth - 20, windowHeight - 20);
}

class Marker {

  constructor(name, x, y, icon, size) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.icon = icon;
    this.size = size;
  }

  display(mousePos) {
    push();
    translate(centerX, centerY);

    //Shadow
    tint(0, 100);
    image(this.icon, (this.x * scale) - 3, (this.y * scale) + 3, this.size, this.size);

    this.position = new p5.Vector(this.x * scale, this.y * scale);

    if (p5.Vector.dist(this.position, mousePos) < this.size / 2) {
      selectedIcon = this;

      // Hovering Icon
      tint(200);
      image(this.icon, this.x * scale, this.y * scale, this.size, this.size);

    } else {
      //Icon
      tint(255);
      image(this.icon, this.x * scale, this.y * scale, this.size, this.size);
    }
    tint(255);
    pop();
  }
}

function draw() {

  var mousePos = new p5.Vector((mouseX - centerX), (mouseY - centerY));

  background(0);
  imageMode(CENTER);
  image(map, centerX, centerY, imgW, imgH);

  for (var m of markers) {
    if (m.x * scale > viewX - (width / 2) && m.x * scale < viewX + (width / 2) && m.y * scale > viewY - (height / 2) && m.y * scale < viewY + (height / 2)) {
      m.display(mousePos);
    }
  }

  push();
  translate(centerX, centerY);
  fill(0, 255, 255);
  circle(tempX * scale, tempY * scale, 10);

  if (selectedIcon != null) {
    //Text and outline
    textAlign(CENTER);
    textSize(20);
    fill(0);
    text(selectedIcon.name, (selectedIcon.x * scale) + 1, ((selectedIcon.y * scale) + 40) - 1);
    text(selectedIcon.name, (selectedIcon.x * scale) - 1, ((selectedIcon.y * scale) + 40) + 1);
    fill(255);
    text(selectedIcon.name, selectedIcon.x * scale, (selectedIcon.y * scale) + 40);
  }
  selectedIcon = null;

  viewX = -(centerX - (width / 2));
  viewY = -(centerY - (height / 2));
  pop();

  textSize(20);
  textAlign(LEFT);
  fill(255);
  text("Map updated 5/10/2021", 10, 22,);

}

//Pan function
function click() {
  if (mouseButton == LEFT) {
    panFromX = mouseX;
    panFromY = mouseY;
  }
  if (selectedIcon != null) {
    console.log(selectedIcon.x, selectedIcon.y);
  }
}

function doubleClick() {
  if (mouseButton == LEFT) {
    tempX = (mouseX - centerX) / scale;
    tempY = (mouseY - centerY) / scale;
    console.log(tempX, tempY);
  }
}

//Pan function continued..
function mouseDragged() {
  if (mouseButton == LEFT) {
    panToX = mouseX;
    panToY = mouseY;

    xShift = panToX - panFromX;
    yShift = panToY - panFromY;

    //Only pan with the image occupies the whole display
    if (centerX - imgW / 2 <= 0
      && centerX + imgW / 2 >= width
      && centerY - imgH / 2 <= 0
      && centerY + imgH / 2 >= height) {
      centerX = centerX + xShift;
      centerY = centerY + yShift;
    }

    //Set the constraints for pan
    if (centerX - imgW / 2 > 0) {
      centerX = imgW / 2;
    }

    if (centerX + imgW / 2 < width) {
      centerX = width - imgW / 2;
    }

    if (centerY - imgH / 2 > 0) {
      centerY = imgH / 2;
    }

    if (centerY + imgH / 2 < height) {
      centerY = height - imgH / 2;
    }

    panFromX = panToX;
    panFromY = panToY;
  }
}

//Zoom function
function mouseWheel(event) {
  var zoom = pow(1 + zoomFactor, -event.deltaY / 125);
  if (imgW * zoom > width && imgH * zoom > height) {
    scale *= zoom;
    imgW *= zoom;
    imgH *= zoom;
    centerX = mouseX + (zoom * (centerX - mouseX));
    centerY = mouseY + (zoom * (centerY - mouseY));
  }
}