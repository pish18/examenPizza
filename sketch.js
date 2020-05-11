var x,y, ax,ay, widthHalf,heightHalf, parts, result;
const radioC=250;

function setup() {
  createCanvas(windowWidth, windowHeight);
  widthHalf=windowWidth/2
  heightHalf=windowHeight/2
}

function draw() {  
  //PUNTO A PUNTO
  fill('red');
  const y= 200;
  let x=200;
  //x, y, rad
  ellipse(x+180, y,radioC);
  //DDA
  ellipse(x+radioC+380, y, radioC)
  //BRESENHAM
  ellipse(x+(radioC*2)+520, y,radioC)
  noLoop();
}

function dividePizza(){
  var getParts=document.getElementById("piezas").value;
  parts = parseInt(getParts);
  draw()
  if(parts>1)
  {
    let radio=125;
    let degree=360/parts;
    let aux=degree;
    let xCenterO =380;
    let xCenterT= 830;
    let xCenterTh =1220;
    let yCenter = 200
    draw()

    while(degree<=360){
      let x2=radio*Math.cos(degree* Math.PI / 180)
      let y2=radio*Math.sin(degree * Math.PI / 180)

      let x2P1=xCenterO+x2;
      let x2P2 = xCenterT + x2
      let x2P3 = xCenterTh + x2;
      
      y2=yCenter+y2;
      x2P1=floor(x2P1)
      x2P2=floor(x2P2)
      x2P3 = floor(x2P3)
      y2=floor(y2)
  
      pendiente(xCenterO,yCenter,x2P1,y2);
      DDA(xCenterT,yCenter,x2P2,y2)
      Bresenham(xCenterTh,yCenter,x2P3,y2) 

      degree+=aux;
    }
  }else{
    
  }

}

function pendiente(puntoInicio,puntoInicioY,puntoFinal,puntoFinalY){
  if(puntoFinal<puntoInicio){
    let aux=puntoFinal;
    puntoFinal=puntoInicio; puntoInicio=aux; aux = puntoFinalY; puntoFinalY=puntoInicioY;
    puntoInicioY=aux
  }
  const dx = puntoFinal - puntoInicio
  const dy = puntoFinalY - puntoInicioY
  const m = dy / dx
  const b = puntoInicioY - (m * puntoInicio)
  point( puntoInicio, puntoInicioY )
  if(puntoInicio===puntoFinal){
    if(puntoInicioY>puntoFinalY){
      let aux=puntoInicioY;
      puntoInicioY=puntoFinalY;
      puntoFinalY=aux
    }
    let y = puntoInicioY + 1
    while(y!=puntoFinalY){
      point(puntoInicio,y)
      y++
    }
  }else{ 
    let x = puntoInicio+ 1
    let y = m * x + b
    while(x !=puntoFinal){
      y = m * x + b
      y = floor(y)
      point(x, y)
      x++
    }
  }

}


function DDA(x1, y1, x2, y2) {
  let dx=x2-x1;
  let dy=y2-y1;
  let limite;

  if(Math.abs(dx)>Math.abs(dy)){
    limite=Math.abs(dx)
  }else{
    limite=Math.abs(dy)
  }

  let xi=dx/limite;
  let yi=dy/limite;
  let x=x1;
  let y= y1;
  
  for(let i=0;i<limite;i++){
      point(x, y)
      x+=xi
      y+=yi
  }
  
} 

function Bresenham(x1, y1, x2, y2) {
  let pY
  let pX
  let x
  let y
  let p
  let aux
  let aux2

  let dx = x2 - x1
  let dy = y2 - y1

  if(dy < 0) {
    dy = -dy
    pY = -1
  }else{
    pY = 1
  }

  if(dx < 0) {
    dx = -dx
    pX = -1
  }else{
    pX = 1
  }

  x = x1
  y = y1
  
  point(x,y)

  if(dx > dy) {
    
    
    p = 2 * dy - dx
    aux = 2 * dy
    aux2 = 2 * (dy - dx)

    while(x != x2) {
      x += pX

      if(p < 0) {
        p += aux
      }else {
        y += pY
        p += aux2
      }

      point(x,y)
    }
  
  }else{
    
    p = 2 * dx - dy
    aux = 2 * dx
    aux2 = 2 * (dx - dy)

    while(y != y2) {
      y += pY

      if(p < 0) {
        p += aux
      }else {
        x += pX
        p += aux2
      }

      point(x,y)
    }
  
  }
}



//BRESENHAM
/*const punto1 = {x: 0, y: 0};
const punto2 = {x: 0, y: 0};
const punto3 = {x: 0, y: 0};
const punto4 = {x: 0, y: 0};
const punto5 = {x: 0, y: 0};
const punto6 = {x: 0, y: 0};
const punto7 = {x: 0, y: 0};
const punto8 = {x: 0, y: 0};

function setup() {
    createCanvas(windowWidth, windowHeight)
    //background('pink')
    console.log((windowWidth ," ", windowHeight))
    //X
    punto2.x=windowWidth;
    punto4.x=windowWidth;
    punto5.x=Math.floor(windowWidth/2);
    punto6.x=Math.floor(windowWidth/2);
    punto8.x=windowWidth;
    console.log(
    "X: "," ",
    punto2.x, " ",
    punto4.x, " ",
    punto5.x, " ",
    punto6.x, " ",
    punto8.x, " ");

    //Y
    punto2.y=windowHeight;
    punto3.y=windowHeight;
    punto6.y=windowHeight;
    punto7.y=Math.floor(windowHeight/2);
    punto8.y=Math.floor(windowHeight/2);
    console.log(
    "Y: "," ",
    punto2.y, " ",
    punto3.y, " ",
    punto6.y, " ",
    punto7.y, " ",
    punto8.y, " ");
}

function draw(){
  bresenham(punto1, punto2);// \
  bresenham(punto3, punto4);// / //error: no se pinta
  bresenham(punto5, punto6);// l
  bresenham(punto7, punto8);// --
  noLoop();
}

function bresenham(puntoInicio, puntoFinal){
  let x, y, dx, dy, m, p;
  
  dx=Math.abs(puntoFinal.x-puntoInicio.x);
  dy=Math.abs(puntoFinal.y-puntoInicio.y);
  ddy = 2*dy;
  ddx=2*dx;  
  //p= ddy-dx;
  m=Math.abs(dy/dx);
  x = puntoInicio.x;
  y = puntoInicio.y;
  p=0;
  point(x,y);

  //algoritmo
  if (m>=0 && m<1){
      let nuevaX = dx/dx;
      let nuevaY = dy/dx;

      for(let i=0; i<=dx; i++){
          x+=nuevaX;
          y+=nuevaY;
          stroke('pink')
          point(x,y);
          console.log('if')
      } 
  }
  
  if(m>=1){
    let nuevaX1 = dx/dy;
    let nuevaY1 = dy/dy;

    for(i=0; i<=dy; i++){  
        x+=nuevaX1;
        y+=nuevaY1;
        stroke('green')
        point(x,y);
        console.log('else')
    }
  }
  noLoop();
}
/* clase 1
error=debajo linea es negativo
si y=y el error se acumula, si y++
*/


//DDA
/*var ax,ay;
var x,y;
var widthHalf,heightHalf;

function setup() {
  createCanvas(windowWidth, windowHeight);
  widthHalf=windowWidth/2
  heightHalf=windowHeight/2
}

function draw() {
  DDA(0,0,windowWidth,windowHeight)
  DDA(widthHalf,0,widthHalf,windowHeight)
  DDA(windowWidth,0,0,windowHeight)
  DDA(0,heightHalf,windowWidth,heightHalf)
}
function DDA(x1, y1, x2, y2) {

  let dx=x2-x1
  let dy=y2-y1

  let final;
  if(Math.abs(dx)>Math.abs(dy)){
	final=Math.abs(dx)
  }
  else{
    final=Math.abs(dy)
  }
  
  let xi=dx/final;
  let yi=dy/final;
  let x=x1;
  let y= y1;
  
  for(let i=0;i<final;i++)
  {
    point(x, y)
    x+=xi
    y+=yi
  }
}
*/

//PUNTO PENDIENTE
/*const punto1 = {x: 0, y: 0};//arriba-izquierda
const punto2 = {x: 0, y: 0};//abajo-derecha
const punto3 = {x: 0, y: 0};//ariba-derecha
const punto4 = {x: 0, y: 0};//abajo-izquierda
const punto5 = {x: 0, y: 0};//arriba-centro
const punto6 = {x: 0, y: 0};//abajo-centro
const punto7 = {x: 0, y: 0};//centro-izquierda
const punto8 = {x: 0, y: 0};//centro-derecha



function setup() {
	createCanvas(windowWidth, windowHeight);
	//background('purple')
	//linea 1
	punto2.x=windowWidth;
    punto4.x=windowWidth;
    punto5.x=Math.floor(windowWidth/2)
    punto6.x=Math.floor(windowWidth/2)
    punto8.x=windowWidth;
    punto2.y=windowHeight;
    punto3.y=windowHeight;
    punto6.y=windowHeight;
    punto7.y=Math.floor(windowHeight/2)
    punto8.y=Math.floor(windowHeight/2)
}

function draw() {
	//line(puntoInicio.x, puntoInicio.y, puntoFinal.x, puntoFinal.y)
	pendiente(punto1, punto2)
	/*pendiente(punto3, punto4)
	pendiente(punto5, punto6)
  pendiente(punto7, punto8)
}


function pendiente(puntoInicio, puntoFinal){
	const dx = puntoFinal.x - puntoInicio.x
	const dy= puntoFinal.y-puntoInicio.y
	const m =dy/dx
	const b = (puntoInicio.y-m)*puntoInicio.x

	point(puntoInicio.x, puntoInicio.y)
	let x= puntoInicio.x +1
	//y es el val que se va a calcular
	let y
	while(x!= puntoFinal.x){
		y=m*x+b
		point(x,y)
		x++
	}
}

cada punto es la coordenada del punto de inicio (x1,y1)


y=pendiente de la linea + punto de intersección
algoritmo para encontrar la sig. x
sigX=pendiente * x + interseccion del eje
pendiente(m)= deltaY/deltaX
deltay=(y2(xpunto2)*-y1(xpunto1))
deltax=(x2(xpunto2)*-x1(xpunto1))
intersección(b)= y1 - pendiente*x1
*/