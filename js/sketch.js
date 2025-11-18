let imgListe = [];
let imgMasque = [];

let compteur = 0; 
let gomme = 0;
let frameRate = 50;
let currentRandomPinceau;
let frameInterval = 1;
let currentSize;
let newFeuille;


let x, y, x2, y2, x3, y3, x4, y4,x5,y5,x6,y6;

let size = 100;

let couleur1, couleur2, couleur3, couleur4, couleur6;
let couleurBackground;
let couleurBackground2;

let pinceauFixe; 
let pinceauFixe2;
let currentMasque;

let pinceauSouris;

    let gommeActive = false;
    

    let angleSouris = 0;




function preload() {
    for (let i = 1; i < 11; i++) {//import images pinceaux coraux
        imgListe[i - 1] = loadImage('images/corail ' + i + '.png');   
    }   

 for (let i = 1; i <6; i++) {//importer les images masque
 imgMasque[i-1]=loadImage('images/masques/masque '+i+'.png');   
 } 
}


function setup() {

couleurBackground = color(random(0,10),random(0,25),random(25,110))
couleurBackground2 = color(random(0,10),random(0,25),random(25,110),5)

    createCanvas(windowWidth, windowHeight);
    background(couleurBackground);
    // background(255)
    imageMode(CENTER);
    rectMode(CENTER);
    angleMode(DEGREES);

    frameRate=30;
    currentMasque = random(imgMasque)
   

  // Redimensionner les pinceaux
  for (let i = 0; i < imgListe.length; i++) {
    imgListe[i].resize(100, 0);
  }

  // Redimensionner les masques à la hauteur du canvas
  for (let i = 0; i < imgMasque.length; i++) {
    imgMasque[i].resize(0, random(900,1200));
  }
    
//création palette cohérente avec une base rgb et des couleurs qui varient autour(intervalle de 70)
let baseR = random(0, 255);
let baseG = random(0, 255);
let baseB = random(0, 255);

couleur1 = color(baseR, baseG, baseB);
couleur2 = color(baseR + random(-70, 70), baseG + random(-70, 70), baseB + random(-70, 70));
couleur3 = color(baseR + random(-70, 70), baseG + random(-70, 70), baseB + random(-70, 70),50);
couleur4 = color(baseR + random(-70, 70), baseG + random(-70, 70), baseB + random(-70, 70));
couleur6 = color(baseR + random(-100, 100), baseG + random(-100, 100), baseB + random(-70, 70),60);
 



    pinceauFixe = random(imgListe); // pinceau fixe pour le deuxième pinceau
   pinceauFixe2 = random(imgListe);

   pinceauSouris = random (imgListe)


    newFeuille = createGraphics(width,height)
    newFeuille.background(couleurBackground2);
      // newFeuille.background(255,5);
    newFeuille.blendMode(REMOVE);
    newFeuille.imageMode(CENTER)
    newFeuille.image(currentMasque,width/2,height/2)




}




function draw() {
 noTint()


  x = noise(2000 + frameCount * random(0.0006,0.006)) * width;
  y = noise(frameCount * random(0.0006,0.006)) * height;

  x2 = noise(500 + frameCount * 0.005) * width; 
  y2 = noise(695 + frameCount * 0.005) * height;

  x3 = noise(967 + frameCount * 0.008) * width; 
  y3 = noise(1593 + frameCount * 0.008) * height;

  x4 = noise(2089 + frameCount*0.002)*width;
  y4 = noise(369 + frameCount * 0.002) * height;
 
  x5 = mouseX,mouseY;
  y5 = mouseX,mouseY;

  x6 = noise(642 + frameCount*0.004)*width;
  y6 = noise(483 + frameCount * 0.004) * height;

  //permet changement de taille progressif des pinceaux
  let breathing1 = map(sin(frameCount * 0.15), -1, 1, 0.6, 1.5);
  let breathing2 = map(sin(frameCount * 0.18 + 50), -1, 1, 0.7, 1.4);
  let breathing3 = map(sin(frameCount * 0.12 + 45), -1, 1, 0.5, 1.6);
  let breathing4 = map(sin(frameCount * 0.5 + 200), -1, 1, 0.5, 1.6);

//randomwalker inconstant
  push();
  translate(x, y);
  rotate(frameCount);
  tint(couleur1);
  image(random(imgListe), 0, 0, size * breathing1, size * breathing1);
  pop();

//randomwalker constant 
  push();
  translate(x2, y2);
  rotate(frameCount);
  tint(couleur2);   
  image(pinceauFixe, 0, 0, size * breathing4, size * breathing4); 
  pop();

//randomwalker constant et petit
    push();
  translate(x4, y4);
  rotate(frameCount);
  tint(couleur4);   
  image(pinceauFixe2, 0, 0, size * 0.35, size * 0.35); 
  pop();


 //randomwalker inconstant
  push();
  translate(x3, y3);
  rotate(frameCount);
  tint(couleur3);
  image(random(imgListe), 0, 0, size * breathing3, size * breathing3);
  pop();


  //randomwalker inconstant + flou
    push();
  translate(x6, y6);
  rotate(frameCount*2);
  tint(couleur6);
  image(random(imgListe), 0, 0, size * breathing4, size * breathing4);
  pop();



    noTint()

  image(newFeuille,width/2,height/2)

  // dessin avec la souris
  if (mouseIsPressed) {
    dessinerAvecSouris(mouseX, mouseY);
  }
}

function dessinerAvecSouris(x, y) {
  angleSouris += 10; // le pinceau tourne à chaque mouvement
  let taillePinceau = random(50,110);

  if (gommeActive) {
    blendMode(REMOVE); // efface
  } else {
    blendMode(BLEND);
    tint(255); // couleur d’origine du pinceau
  }

  push();
  translate(x, y);
  rotate(angleSouris);
  image(pinceauSouris, 0, 0, taillePinceau, taillePinceau);
  pop();

  blendMode(BLEND);
}

// activation gomme avec g
function keyPressed() {
  if (key === 'g' || key === 'G') {
    gommeActive = !gommeActive;
    console.log(gommeActive ? " Gomme activée" : " Pinceau activé");
  }

  // changement pinceau manuel
  if (key === 'p' || key === 'P') {
    pinceauSouris = random(imgListe);
    console.log("Nouveau pinceau souris choisi !");
  }


    if (keyCode === UP_ARROW) {
    let r = constrain(red(couleurBackground) + 10, 0, 255);
    let g = constrain(green(couleurBackground) + 10, 0, 255);
    let b = constrain(blue(couleurBackground) + 10, 0, 255);
    couleurBackground = color(r, g, b);
    background(couleurBackground); 
  }

  if (keyCode === DOWN_ARROW) {
    let r = constrain(red(couleurBackground) - 10, 0, 255);
    let g = constrain(green(couleurBackground) - 10, 0, 255);
    let b = constrain(blue(couleurBackground) - 10, 0, 255);
    couleurBackground = color(r, g, b);
    background(couleurBackground); 
  }
}






























