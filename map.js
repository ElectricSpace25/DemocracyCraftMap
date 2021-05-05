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

var selectedIcon;

//Define the zoom vars
var scale = 0;
var minScale = -4;
var maxScale = 0;
var zoomFactor = 0.6;

//Define the pan vars
var panFromX;
var panFromY;

var panToX;
var panToY;

var xShift = 0;
var yShift = 0;

function preload() {
  map = loadImage("imgs/Map.png");

  //Markers
  markers.push(new Marker("Capitol", -3120, -965, loadImage("imgs/Capitol.png"), 50));
  markers.push(new Marker("Hospital", -1514, -94, loadImage("imgs/Hospital.png"), 50));
  markers.push(new Marker("Spawn", -2202, -954, loadImage("imgs/Spawn.png"), 50));
  markers.push(new Marker("Museum", -1119, -81, loadImage("imgs/Museum.png"), 50));
  markers.push(new Marker("Airport", -839, 1170, loadImage("imgs/Airport.png"), 50));
  markers.push(new Marker("Police Station", -2322, -432, loadImage("imgs/Police.png"), 50));
  markers.push(new Marker("Courthouse", -2150, -34, loadImage("imgs/Court.png"), 50));

  markers.push(new Marker("Brilliant Apartments", -2972, -2250, loadImage("imgs/Apartment.png"), 25));
  markers.push(new Marker("Paradise Escapes", -3367, -1568, loadImage("imgs/Apartment.png"), 25));

  markers.push(new Marker("ChipCorp", -2681, -2236, loadImage("imgs/Building.png"), 25));

  markers.push(new Marker("Walgreens", -3214, -1380, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Necessary Needs", -3086, -1380, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Friendly Fire", -3305, -1357, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Suuse General Store", -3366, -1357, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("Mall of DC", -3019, -1867, loadImage("imgs/Shop.png"), 35));
  markers.push(new Marker("Lemonies Garden Shop", -3303, -1564, loadImage("imgs/Shop.png"), 25));
  markers.push(new Marker("", -3363, -1507, loadImage("imgs/Shop.png"), 25));
}

function setup() {
  scale = 0;

  cnv = createCanvas(windowWidth - 20, windowHeight - 20);
  cnv.mousePressed(click);
  cnv.doubleClicked(doubleClick);

  imgOGW = map.width * 2;
  imgOGH = map.height * 2;

  imgW = imgOGW;
  imgH = imgOGH;

  centerY = height / 2;
  centerX = width / 2;

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

  display() {
    push();
    translate(centerX, centerY);
    var zoomModifier = (1 + (zoomFactor * abs(scale)));

    //Hovering

    //Shadow
    tint(0, 100);
    image(this.icon, (this.x / zoomModifier) - 3, (this.y / zoomModifier) + 3, this.size, this.size);

    if (p5.Vector.dist(new p5.Vector(this.x, this.y), new p5.Vector((mouseX - centerX) * zoomModifier, (mouseY - centerY) * zoomModifier)) < this.size + 10) {
      selectedIcon = this;
      
      //Icon
      tint(200);
      image(this.icon, this.x / zoomModifier, this.y / zoomModifier, this.size, this.size);

    } else {
      //Icon
      tint(255);
      image(this.icon, this.x / zoomModifier, this.y / zoomModifier, this.size, this.size);
    }
    tint(255);
    pop();
  }

}

function draw() {
  var zoomModifier = (1 + (zoomFactor * abs(scale)));

  background(0);
  imageMode(CENTER);
  image(map, centerX, centerY, imgW, imgH);

  for (var m of markers) {
    m.display();
  }

  push();
  translate(centerX, centerY);
  fill(0, 255, 255);
  circle(tempX / zoomModifier, tempY / zoomModifier, 10);

  if (selectedIcon != null) {
    //Text and outline
    textSize(20);
    textAlign(CENTER);
    fill(0);
    text(selectedIcon.name, (selectedIcon.x / zoomModifier) + 1, ((selectedIcon.y / zoomModifier) + 40) - 1);
    text(selectedIcon.name, (selectedIcon.x / zoomModifier) - 1, ((selectedIcon.y / zoomModifier) + 40) + 1);
    fill(255);
    text(selectedIcon.name, selectedIcon.x / zoomModifier, (selectedIcon.y / zoomModifier) + 40);
  }
  selectedIcon = null;

  pop();




}

//Pan function
function click() {
  if (mouseButton == LEFT) {
    panFromX = mouseX;
    panFromY = mouseY;
  }
}

function doubleClick() {
  if (mouseButton == LEFT) {
    tempX = (mouseX - centerX) * (1 + (zoomFactor * abs(scale)));
    tempY = (mouseY - centerY) * (1 + (zoomFactor * abs(scale)));
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
  var e = event.deltaY;

  //Zoom in
  if (e < 0) {
    if (scale < maxScale) {
      scale++;
      imgW = (int)(imgOGW / (1 + (zoomFactor * abs(scale))));
      imgH = (int)(imgOGH / (1 + (zoomFactor * abs(scale))));

      var oldCenterX = centerX;
      var oldCenterY = centerY;

      centerX = centerX - (int)(zoomFactor * (mouseX - centerX));
      centerY = centerY - (int)(zoomFactor * (mouseY - centerY));
      //                System.out.println("Scale: " + scale);
    }
  }

  //Zoom out
  if (e > 0) {
    if (scale > minScale && !(windowWidth > 1840 && scale == -3)) {
      scale--;
      imgH = (int)(imgOGH / (1 + (zoomFactor * abs(scale))));
      imgW = (int)(imgOGW / (1 + (zoomFactor * abs(scale))));

      var oldCenterX = centerX;
      var oldCenterY = centerY;

      centerX = centerX + (int)((mouseX - centerX)
        * (zoomFactor / (zoomFactor + 1)));
      centerY = centerY + (int)((mouseY - centerY)
        * (zoomFactor / (zoomFactor + 1)));

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
      //                System.out.println("Scale: " + scale);
    }
  }
}