var gameScreen = document.createElement("CANVAS");
gameScreen.style.position = "absolute";
gameScreen.style.left = "0px";
gameScreen.style.top = "0px";
gameScreen.width = window.innerWidth;
gameScreen.height = window.innerHeight;
gameScreen.style.backgroundColor = "rgba(0,0,0,1)";
document.body.appendChild(gameScreen);

var infoBox = document.createElement("DIV");
infoBox.style.position = "absolute";
infoBox.style.left = "0px";
infoBox.style.top = "0px";
infoBox.style.width = window.innerWidth;
infoBox.style.height = "30px";
infoBox.style.backgroundColor = "rgba(100,100,100,1)";
infoBox.innerHTML = "";
document.body.appendChild(infoBox);



var map = [];
var size = 100;
var scale = size/100;
var total = 0;
var pixSize = 3;
var seaLevel = 130;
var mountLevel = 195;
var crossSectionX = true;
var crossSectionLayer = size/2;
var veiw = 0;

var angle = 45;

var xAngle = 45;

var xOff = 0;
var yOff = 0;

var noise = new noise2d(size, 25);
var noise2 = new noise2d(size,10);
var noise3 = new noise2d(size,5);
for(i = 0; i < size; i++){
  map.push([]);
  for(k = 0; k < size; k++){
    map[i][k]=Math.floor(255*(0.70*noise.getPointTri2(i,k)+0.2*noise2.getPointTri2(i,k)+0.1*noise3.getPointTri2(i,k)));
  }
}


// map = [];
size = map.length;
function erosion(){
  
  var tempMap = [];
  for(i = 0; i < size; i++){
    tempMap.push([]);
    for(k = 0; k < size; k++){
      tempMap[i][k] = map[i][k];
    }
  }
  
  for(i = 0; i < size; i++){
    for(k = 0; k < size; k++){
      var leftX = i - 1;
      var leftY = k;
      if(leftX < 0)leftX+=size;
      var rightX = i + 1;
      var rightY = k;
      if(rightX >= size)rightX-=size;
      var botX = i;
      var botY = k - 1;
      if(botY < 0)botY+=size;
      var topX = i;
      var topY = k + 1;
      if(topY >=size)topY-=size;
      
      var leftDiff = tempMap[i][k]-tempMap[leftX][leftY];
      var rightDiff = tempMap[i][k]-tempMap[rightX][rightY];
      var botDiff = tempMap[i][k]-tempMap[botX][botY];
      var topDiff = tempMap[i][k]-tempMap[topX][topY];
      map[i][k]-=leftDiff/4;
      map[i][k]-=rightDiff/4;
      map[i][k]-=botDiff/4;
      map[i][k]-=topDiff/4;
    }
  }
}

function update(){
  if(xOff<0)xOff+=size;
  if(xOff>=size)xOff-=size;
  if(yOff<0)yOff+=size;
  if(yOff>=size)yOff-=size;
  
  for(d = 0; d < 0; d++)erosion();
  
  gameScreen.getContext("2d").clearRect(0, 0, gameScreen.width, gameScreen.height);
  ctx = gameScreen.getContext("2d");
  
//   for(i = 0; i < size; i++){
//     for(k = 0; k < size; k++){
//       if(map[i][k] > mountLevel)ctx.fillStyle = "rgb("+Math.floor(map[i][k])+","+Math.floor(map[i][k])+",0)";
//       else if(map[i][k] > seaLevel) ctx.fillStyle = "rgb(0,"+Math.floor(map[i][k])+",0)";
//       else ctx.fillStyle = "rgb(0,0,"+Math.floor(map[i][k])+")";
//       ctx.fillRect(30+i*pixSize,30+k*pixSize,pixSize,pixSize);
//     }
//   }
  
//   if(crossSectionX){
//     for(i = 0; i < size; i++){
//       if(map[crossSectionLayer][i] > mountLevel)ctx.fillStyle = "rgb("+Math.floor(map[crossSectionLayer][i])+","+Math.floor(map[crossSectionLayer][i])+",0)";
//       else if(map[crossSectionLayer][i] > seaLevel) ctx.fillStyle = "rgb(0,"+Math.floor(map[crossSectionLayer][i])+",0)";
//       else ctx.fillStyle = "rgb(0,0,"+Math.floor(map[crossSectionLayer][i])+")";
//       ctx.fillRect(600+i*5,300-map[crossSectionLayer][i],5,map[crossSectionLayer][i]);
//     }
//     ctx.beginPath();
//     ctx.strokeStyle = "rgb(255,0,0)";
//     ctx.rect(30+pixSize*crossSectionLayer,30,pixSize,pixSize*size);
//     ctx.stroke();
//   }else{
//     for(i = 0; i < size; i++){
//       if(map[i][crossSectionLayer] > mountLevel)ctx.fillStyle = "rgb("+Math.floor(map[i][crossSectionLayer])+","+Math.floor(map[i][crossSectionLayer])+",0)";
//       else if(map[i][crossSectionLayer] > seaLevel) ctx.fillStyle = "rgb(0,"+Math.floor(map[i][crossSectionLayer])+",0)";
//       else ctx.fillStyle = "rgb(0,0,"+Math.floor(map[i][crossSectionLayer])+")";
//       ctx.fillRect(600+i*5,300-map[i][crossSectionLayer],5,map[i][crossSectionLayer]);
//     }
//     ctx.beginPath();
//     ctx.strokeStyle = "rgb(255,0,0)";
//     ctx.rect(30,30+pixSize*crossSectionLayer,pixSize*size,pixSize);
//     ctx.stroke();
    
//   }
  
  
  
  //draw in 3d here
  
  var x_offset = gameScreen.width/2+((45-xAngle)/45*Math.sqrt((size*pixSize)*(size*pixSize)))/(1+0.41*(Math.abs(45-xAngle)/45));
  var y_offset = gameScreen.height*0.95-0.2*(Math.abs(45-xAngle)/45*Math.sqrt((size*pixSize)*(size*pixSize)))/(1+0.41*(Math.abs(45-xAngle)/45));
  var xConstant = pixSize/(1+0.41*(Math.abs(45-xAngle)/45));
  var yConstant = pixSize/2*angle/45/(1+0.41*(Math.abs(45-xAngle)/45));
  for(i = (veiw===0||veiw==1)?size - 1:0; (veiw===0||veiw==1)?i >= 0:i<size; (veiw===0||veiw==1)?i--:i++){
    for(k = (veiw===0||veiw==3)?size - 1:0; (veiw===0||veiw==3)?k >= 0:k<size; (veiw===0||veiw==3)?k--:k++){
//   for(i = 0; i<size; i++){
//     for(k = 0; k<size; k++){
      var beforeI = i;
      var beforeK = k;
      var x = x_offset;
      var y = y_offset;
      var xAngleConst = xAngle/45;
      var yAngleConst = (90-xAngle)/45;
      if(veiw === 0){
        x+=i*xConstant*xAngleConst-k*xConstant*yAngleConst;
        y-=i*yConstant*yAngleConst+k*yConstant*xAngleConst;
      }else if(veiw == 1){
        x += (size-k)*xConstant*xAngleConst-i*xConstant*yAngleConst;
        y -=(size-k)*yConstant*yAngleConst+i*yConstant*xAngleConst;
      }else if(veiw == 2){
        x += (size-i)*xConstant*xAngleConst-(size-k)*xConstant*yAngleConst;
        y -=(size-i)*yConstant*yAngleConst+(size-k)*yConstant*xAngleConst;
      }else{
        x += k*xConstant*xAngleConst-(size-i)*xConstant*yAngleConst;
        y -=k*yConstant*yAngleConst+(size-i)*yConstant*xAngleConst;
      }
      i-=xOff;
      k-=yOff;
      if(i<0)i+=size;
      if(k<0)k+=size;
      if(map[i][k] > mountLevel){
//         ctx.fillStyle = "rgb("+Math.floor(map[i][k])+","+Math.floor(map[i][k])+","+Math.floor(map[i][k])+")";
        ctx.strokeStyle = "rgb("+Math.floor(map[i][k]/1.0)+","+Math.floor(map[i][k]/1.0)+","+Math.floor(map[i][k]/1.0)+")";
      }else if(map[i][k] >= seaLevel){
//         ctx.fillStyle = "rgb(0,"+Math.floor(map[i][k])+",0)";
        ctx.strokeStyle = "rgb(0,"+Math.floor(map[i][k]/1.0)+",0)";
      }else{
//         ctx.fillStyle = "rgb("+Math.floor(map[i][k])+","+Math.floor(map[i][k]/2)+",0)";
        ctx.strokeStyle = "rgb("+Math.floor(map[i][k]/1.0)+","+Math.floor(map[i][k]/2.0)+",0)";
      } 
      ctx.fillStyle = getColor(map[i][k]);
      ctx.strokeStyle = getColor(map[i][k]);
      var height = Math.floor(map[i][k]);
      ctx.beginPath();
      //slopes
      var behindHeight;
      var rightHeight;
      var leftHeight;
      var tempI;
      var tempK;
      if(veiw === 0){
        tempI = i+1;
        if(tempI>=size)tempI-=size;
        tempK = k+1;
        if(tempK>=size)tempK-=size;
        behindHeight = Math.floor(map[tempI][tempK]);
        rightHeight = Math.floor(map[tempI][k]);
        leftHeight = Math.floor(map[i][tempK]);
      }else if(veiw == 1){
        tempI = i+1;
        if(tempI>=size)tempI-=size;
        tempK = k-1;
        if(tempK<0)tempK+=size;
        behindHeight = Math.floor(map[tempI][tempK]);
        rightHeight = Math.floor(map[i][tempK]);
        leftHeight = Math.floor(map[tempI][k]);
      }else if(veiw == 2){
        tempI = i-1;
        if(tempI<0)tempI+=size;
        tempK = k-1;
        if(tempK<0)tempK+=size;
        behindHeight = Math.floor(map[tempI][tempK]);
        rightHeight = Math.floor(map[tempI][k]);
        leftHeight = Math.floor(map[i][tempK]);
      }else{
        tempI = i-1;
        if(tempI<0)tempI+=size;
        tempK = k+1;
        if(tempK>=size)tempK-=size;
        behindHeight = Math.floor(map[tempI][tempK]);
        rightHeight = Math.floor(map[i][tempK]);
        leftHeight = Math.floor(map[tempI][k]);
      }
      height/=scale;
      behindHeight/=scale;
      rightHeight/=scale;
      leftHeight/=scale;
      height*=2-angle/45;
      behindHeight*=2-angle/45;
      rightHeight*=2-angle/45;
      leftHeight*=2-angle/45;
//       ctx.moveTo(x, y-behindHeight);
//       ctx.lineTo(x+xConstant,y+yConstant-rightHeight);
//       ctx.lineTo(x,y+yConstant*2-height);
//       ctx.lineTo(x-xConstant,y+yConstant-leftHeight);
//       ctx.lineTo(x, y-behindHeight);
      
      
      ctx.moveTo(x, y-behindHeight);
      ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst)-rightHeight);
      ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
      ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst)-leftHeight);
      ctx.lineTo(x, y-behindHeight);
      
      //tiles
//       ctx.moveTo(x, y-height);
//       ctx.lineTo(x+xConstant,y+yConstant-height);
//       ctx.lineTo(x,y+yConstant*2-height);
//       ctx.lineTo(x-xConstant,y+yConstant-height);
//       ctx.lineTo(x, y-height);
      ctx.stroke();
      ctx.fill();
      if(map[i][k] > mountLevel)ctx.fillStyle = "rgb("+Math.floor(map[i][k]/1.3)+","+Math.floor(map[i][k]/1.3)+","+Math.floor(map[i][k]/1.3)+")";
      else if(map[i][k] >= seaLevel) ctx.fillStyle = "rgb(0,"+Math.floor(map[i][k]/1.3)+",0)";
      else ctx.fillStyle = "rgb("+Math.floor(map[i][k]/1.3)+","+Math.floor(map[i][k]/2.6)+",0)";
      ctx.beginPath();
      ctx.moveTo(x, y+yConstant*2-height);
      ctx.lineTo(x,y+yConstant*2);
      ctx.lineTo(x+xConstant,y+yConstant);
      ctx.lineTo(x+xConstant, y+yConstant-height);
      ctx.moveTo(x-xConstant, y+yConstant-height);
      ctx.lineTo(x-xConstant,y+yConstant);
      ctx.lineTo(x,y+yConstant*2);
      ctx.lineTo(x,y+yConstant*2-height);
      ctx.lineTo(x-xConstant,y+yConstant-height);
      //enable during tiles
//       ctx.fill();
      
      //draw sides
      ctx.fillStyle = "rgb( 64, 39, 24)";
      ctx.strokeStyle = "rgb( 64, 39, 24)";
        ctx.beginPath();
      
      if(veiw === 0){
          if(beforeI === 0){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst));
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst));
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst)-leftHeight);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
          }
          if(beforeK === 0){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst));
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst));
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst)-rightHeight);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
          }
        }else if(veiw === 1){
          if(beforeK === size-1){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst));
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst));
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst)-leftHeight);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
          }
          if(beforeI === 0){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst));
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst));
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst)-rightHeight);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
          }
        }else if(veiw === 2){
          if(beforeI === size-1){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst));
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst));
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst)-leftHeight);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
          }
          if(beforeK === size-1){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst));
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst));
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst)-rightHeight);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
          }
        }else if(veiw === 3){
          if(beforeK === 0){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst));
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst));
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst)-leftHeight);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
          }
          if(beforeI === size-1){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst));
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst));
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst)-rightHeight);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
          }
        }
      ctx.fill();
      ctx.stroke();
      
      //draw oceans
      if(map[i][k] < seaLevel){
        ctx.fillStyle = "rgba(0,0,255,0.3)";
        ctx.beginPath();
        ctx.moveTo(x, y-(seaLevel*(2-angle/45))/scale); // this is the right position
        ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale); 
        ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale); //fix this first
        ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
        ctx.lineTo(x, y-(seaLevel*(2-angle/45))/scale); //this is the right postion
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,0,150,0.3)";
        if(veiw === 0){
          if(beforeI === 0){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst)-leftHeight);
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
          }
          if(beforeK === 0){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst)-rightHeight);
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
          }
        }else if(veiw === 1){
          if(beforeK === size-1){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst)-leftHeight);
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
          }
          if(beforeI === 0){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst)-rightHeight);
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
          }
        }else if(veiw === 2){
          if(beforeI === size-1){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst)-leftHeight);
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
          }
          if(beforeK === size-1){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst)-rightHeight);
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
          }
        }else if(veiw === 3){
          if(beforeK === 0){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst)-leftHeight);
            ctx.lineTo(x-(1*xConstant*xAngleConst-0*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+0*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
          }
          if(beforeI === size-1){
            ctx.moveTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-height);
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst)-rightHeight);
            ctx.lineTo(x-(0*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(0*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
            ctx.lineTo(x-(1*xConstant*xAngleConst-1*xConstant*yAngleConst),y+(1*yConstant*yAngleConst+1*yConstant*xAngleConst)-(seaLevel*(2-angle/45))/scale);
          }
        }
        ctx.fill();
      }
      i = beforeI;
      k = beforeK;
    }
  }
  
  
  total = 0;
  for(i = 0; i < size; i++){
    for(k = 0; k < size; k++){
      total+=map[i][k];
    }
  }
  infoBox.innerHTML = total;
window.requestAnimationFrame(update);
}

function noise2d(width, magnitude){
    
    if(width%magnitude>1)throw "width not divisible by magnitude";
    this.width = width;
    this.magnitude = magnitude;
    this.grid = [];
    for(i = 0; i < width/magnitude; i++){
        this.grid.push([]);
        for(k = 0; k < width/magnitude; k++){
            this.grid[i].push(Math.random());
        }
    }

    this.getPointTri2 = function(x, y){
        var gridX, gridY;
        gridX = Math.floor(x/this.magnitude);
        gridY = Math.floor(y/this.magnitude);
        var bl, br, tl, tr;
        bl = this.grid[gridX][gridY];
        
        if(gridX>=this.grid.length-1)br = this.grid[0][gridY];
        else br = this.grid[gridX+1][gridY];
        
        if(gridY>=this.grid.length-1)tl = this.grid[gridX][0];
        else tl = this.grid[gridX][gridY+1];
        
        if(gridX>=this.grid.length-1&&gridY>=this.grid.length-1)tr = this.grid[0][0];
        else if(gridX>=this.grid.length-1)tr = this.grid[0][gridY+1];
        else if(gridY>=this.grid.length-1)tr = this.grid[gridX+1][0];
        else tr = this.grid[gridX+1][gridY+1];
        var setX,setY;
        setX = x-(gridX*this.magnitude);
        setY = y-(gridY*this.magnitude);
        
        var lv, rv, bv, tv, la, ra, ba, ta, lxOff, rxOff, bxOff, txOff, lyOff, ryOff, byOff, tyOff;
        
        la = (bl-tl)/2;
        ra = (br-tr)/2;
        ba = (bl-br)/2;
        ta = (tl-tr)/2;
        
        lxOff = this.magnitude/2;
        rxOff = this.magnitude/2;
        bxOff = this.magnitude/2;
        txOff = this.magnitude/2;
        
        lyOff = (bl+tl)/2;
        ryOff = (br+tr)/2;
        byOff = (bl+br)/2;
        tyOff = (tl+tr)/2;
        
        lv = la*Math.sin((Math.PI/this.magnitude)*(setY+lxOff))+lyOff;
        rv = ra*Math.sin((Math.PI/this.magnitude)*(setY+rxOff))+ryOff;
        bv = ba*Math.sin((Math.PI/this.magnitude)*(setX+bxOff))+byOff;
        tv = ta*Math.sin((Math.PI/this.magnitude)*(setX+txOff))+tyOff;
        
        var lDist, rDist, bDist, tDist;
        lDist = setX;
        rDist = this.magnitude-lDist;
        bDist = setY;
        tDist = this.magnitude-bDist;
        
        var value = 0;
//         value += bl*Math.max(0,(this.magnitude-lDist)*(this.magnitude-bDist));
//         value += br*(this.magnitude-rDist)*(this.magnitude-bDist);
//         value += tl*(this.magnitude-lDist)*(this.magnitude-tDist);
//         value += tr*Math.max(0,(this.magnitude-rDist)*(this.magnitude-tDist));
        value += lv*(this.magnitude-lDist);
        value += rv*(this.magnitude-rDist);
        value += bv*(this.magnitude-bDist);
        value += tv*(this.magnitude-tDist);
        return value/(this.magnitude*2);
    };
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 190) {
        crossSectionLayer++;
      if(crossSectionLayer>=size)crossSectionLayer-=size;
    }else if(event.keyCode == 188) {
        crossSectionLayer--;
      if(crossSectionLayer<0)crossSectionLayer+=size;
    }else if(event.keyCode == 32) {
        crossSectionX = !crossSectionX;
      veiw++;
      if(veiw > 3)veiw = 0;
    }else if(event.keyCode == 38) {
        yOff--;
    }else if(event.keyCode == 40) {
        yOff++;
    }else if(event.keyCode == 37) {
        xOff--;
    }else if(event.keyCode == 39) {
        xOff++;
    }else if(event.keyCode == 87) {
        if(angle<90)angle++;
    }else if(event.keyCode == 83) {
        if(angle>0)angle--;
    }else if(event.keyCode == 65) {
        if(xAngle>0)xAngle--;
        else{
          veiw++;
          if(veiw > 3)veiw = 0;
          xAngle = 90;
        }
    }else if(event.keyCode == 68) {
        if(xAngle<90)xAngle++;
      else{
        veiw--;
        if(veiw < 0)veiw = 3;
        xAngle = 0;
      }
    }
});
// 0 50 100 150 200 250
var indexes = [0,   100, 135,  145, 185, 195, 255];
var reds =    [20, 75,  100,  0,   0,   150, 230];
var greens =  [10,  45,  120,   100, 170, 150, 230];
var blues =   [0,   0,   50,   0,   0,   150, 230];
function getColor(layer){
  var red;
  var green;
  var blue;
//   if(layer > mountLevel){
//         color =  "rgb("+Math.floor(layer)+","+Math.floor(layer)+","+Math.floor(layer)+")";
//       }else if(layer >= seaLevel+5){
//         color = "rgb(0,"+Math.floor(layer)+",0)";
//       }else if(layer >= seaLevel){
//         color = "rgb("+Math.floor(layer)+","+Math.floor(layer)+","+Math.floor(layer/2)+")";
//       }else{
//         color = "rgb("+Math.floor(layer)+","+Math.floor(layer/2)+",0)";
//       } 
  var baseLayer;
  var topLayer;
  for(d = 0; d < indexes.length; d++){
    if(layer > indexes[d]){
      baseLayer = d;
      topLayer = d+1;
    }
  }
  var percent = (layer - indexes[baseLayer])/(indexes[topLayer] - indexes[baseLayer]);
  red = reds[topLayer]*percent+reds[baseLayer]*(1-percent);
  blue = blues[topLayer]*percent+blues[baseLayer]*(1-percent);
  green = greens[topLayer]*percent+greens[baseLayer]*(1-percent);
  return "rgb("+Math.floor(red)+","+Math.floor(green)+","+Math.floor(blue)+")";
}

window.requestAnimationFrame(update);