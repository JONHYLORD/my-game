var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var blocodecima, blocodebaixo
var predio1img, predio2img, posteimg,passaro1img, passaro2img;

var grupodeobstaculos

function preload(){
bgImg = loadImage("assets/bg.png")
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
predio1img = loadImage("assets/obsBottom1.png");
predio2img = loadImage("assets/obsBottom3.png");
posteimg = loadImage("assets/obsBottom2.png");
passaro1img = loadImage("assets/obsTop1.png");
passaro2img = loadImage("assets/obsTop2.png");
}

function setup(){
createCanvas(800,600);
//imagem de plano de fundo
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 2

//criando canto superior e inferior
bottomGround = createSprite(200,580,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//criando o balão     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

grupodeobstaculos = new Group();

balloon.debug = true
balloon.setCollider("rectangle", 0, 0, 100,200);
}

function draw() {
  
  background("black");
        
          //fazendo o balão de ar quente pular
          if(keyDown("space")) {
            balloon.velocityY = -12 ;
            
          }

          //adicionando gravidade
           balloon.velocityY = balloon.velocityY + 1;
   
          balloon.collide(topGround) 
          balloon.collide(bottomGround)
          drawSprites();
          criarblocosdecima();
          criarblocosdebaixo();

          if (balloon.isTouching(grupodeobstaculos) ){
            balloon.destroy()
          gameOver()
          }
        
}
function criarblocosdecima(){
  if (frameCount%160===0) {
    var obstaculo = createSprite(820, 100);
    obstaculo.y = Math.round(random(50, 200));
    obstaculo.velocityX = -5;

    var aleatorio = Math.round(random(1, 2));
    if (aleatorio === 1) {
      obstaculo.addImage(passaro1img);
      obstaculo.scale = 0.15
    } else if(aleatorio === 2){
      obstaculo.addImage(passaro2img);
      obstaculo.scale = 0.1
    }
    obstaculo.debug = true;
    balloon.setCollider("rectangle", 0, 0, 100,200);
    grupodeobstaculos.add(obstaculo);

  }
}

function criarblocosdebaixo(){
  if (frameCount%160===0) {
    var obstaculo = createSprite(820, 100);
    
    obstaculo.velocityX = -10;

    var aleatorio = Math.round(random(1, 3));
    if (aleatorio === 1) {
      obstaculo.addImage(predio1img);
      obstaculo.scale = 0.2
      obstaculo.y = 420
    } else if(aleatorio === 2){                
      obstaculo.addImage(predio2img);
      obstaculo.scale = 0.2
      obstaculo.y = 420
    } else if(aleatorio === 3){
      obstaculo.addImage(posteimg);
      obstaculo.scale = 0.15
      obstaculo.y = 480
    }

    obstaculo.debug = true;
    
    grupodeobstaculos.add(obstaculo);
  }
  
}

function gameOver() {
  swal(
    {
      title: `Fim de Jogo!!!`,
      text: "Opa! Você perdeu 💔",
      imageUrl:
        "",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}