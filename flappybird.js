var canvas=document.querySelector("canvas");
var ctx=canvas.getContext("2d");

//load images
var bird= new Image();
bird.src="img/bird.png";

var background=new Image();
background.src="img/bg.png";

var ground=new Image();
ground.src="img/ground.png";

var south=new Image();
south.src="img/south.png";

var north=new Image();
north.src="img/north.png";
//variables
var score=0;
var birdX=10;
var birdY=150;
var gravity=1;
var pipe=[];
pipe[0]={
    x:canvas.width,
    y:0
}

//event key listener
document.addEventListener("keydown",()=>birdY-=20);

//function loop;
function draw(){
ctx.drawImage(background,0,0);

for(let i=0; i<pipe.length;i++){
    
    ctx.drawImage(north,pipe[i].x,pipe[i].y);
    ctx.drawImage(south,pipe[i].x,pipe[i].y+north.height+85);
    pipe[i].x--;
    pipe[i].x==125?pipe.push({x:canvas.width,y:Math.floor(Math.random()*north.height)-north.height+15}):null;
    // if(bird.width==pipe[i].x+north.width){score++;}
   //add score

    pipe[i].x+north.width==10?score++:null;
    
    
    //collusion    
    if( birdX + bird.width >= pipe[i].x && birdX <= pipe[i].x + north.width && (birdY <= pipe[i].y + north.height || birdY+bird.height >= pipe[i].y+north.height+85) || birdY + bird.height >=  canvas.height - ground.height){
        location.reload(); // reload the page
    }


}

ctx.drawImage(ground,0, canvas.height-ground.height);
ctx.drawImage(bird,birdX,birdY);
birdY+=gravity;
ctx.fillStyle="#000";
ctx.font="20px Consolas";
ctx.fillText(`Score: ${score}`,10,canvas.height-30);
requestAnimationFrame(draw);
}

draw();