const gameScreen = document.createElement("CANVAS");
gameScreen.id = "gameScreen";
gameScreen.style.position = "absolute";
gameScreen.style.left = "0px";
gameScreen.style.top = "0px";
gameScreen.width = window.innerWidth;
gameScreen.height = window.innerHeight;
gameScreen.style.backgroundColor = "rgba(0,0,0,1)";
document.body.appendChild(gameScreen);
var ctx = gameScreen.getContext("2d");
var proceed = true;
var delay = 0;
var cursor = [0, 0];

function animation() {
    document.body.removeChild(document.getElementById("button"));
    spellOut("Candle In a Jar!", 0, "green", 40, 1363 / 2 - 200, 100);
    incrementDelay("Candle In a Jar!");
    incrementDelayLine(300);
    setTimeout(function() {
        cursor = [800, 100];
        drawLine(2 * Math.PI / 5, 350, 0, "white", 10);
    }, delay);
    incrementDelayLine(350);
    setTimeout(function() {
        drawLine(Math.PI / 2, 100, 0, "white", 10);
    }, delay);
    incrementDelayLine(100);
    setTimeout(function() {
        drawLine(0, 100, 0, "white", 10);
    }, delay);
    incrementDelayLine(100);
    setTimeout(function() {
        drawLine(-Math.PI / 2, 100, 0, "white", 10);
    }, delay);
    incrementDelayLine(100);
    setTimeout(function() {
        drawLine(-2 * Math.PI / 5, 350, 0, "white", 10);
    }, delay);
    incrementDelayLine(350);
    setTimeout(function() {
        drawLine(Math.PI, 310, 0, "white", 10);
    }, delay);
    incrementDelayLine(310);
    setTimeout(function() {
        cursor = [940, 550];
        drawLine(0, 30, 0, "yellow", 10);
    }, delay);
    incrementDelayLine(30);
    setTimeout(function() {
        drawLine(-Math.PI / 2, 200, 0, "yellow", 10);
    }, delay);
    incrementDelayLine(200);
    setTimeout(function() {
        drawLine(Math.PI, 30, 0, "yellow", 10);
    }, delay);
    incrementDelayLine(30);
    setTimeout(function() {
        drawLine(Math.PI / 2, 200, 0, "yellow", 10);
    }, delay);
    incrementDelayLine(200);
    setTimeout(function() {
        cursor = [940, 330];
        drawLine(0, 30, 0, "red", 10);
    }, delay);
    incrementDelayLine(30);
    setTimeout(function() {
        drawLine(-2 * Math.PI / 3, 25, 0, "red", 10);
    }, delay);
    incrementDelayLine(30);
    setTimeout(function() {
        drawLine(2 * Math.PI / 3, 25, 0, "red", 10);
    }, delay);
    incrementDelayLine(30);
    setTimeout(function() {
        spellOut("So - why does it happen?", 0, "blue", 30, 200, 500);
    }, delay);
    incrementDelay("So - why does it happen?");
    setTimeout(function() {
        spellOut("Let's take a look!", 0, "blue", 30, 350, 600);
    }, delay);
    incrementDelay("Let's take a look!");
    incrementDelayLine(500);
    setTimeout(function() {
        clear();
    }, delay);
    setTimeout(function() {
        spellOut("First set up the experiment", 0, "green", 40, 100, 100);
    }, delay);
    incrementDelay("First set up the experiment");
    setTimeout(function() {
        cursor = [100, 500];
        drawLine(Math.PI / 12, 400, 0, "white", 10);
    }, delay);
    incrementDelayLine(400);
    setTimeout(function() {
        drawLine(0, 400, 0, "white", 10);
    }, delay);
    incrementDelayLine(400);
    setTimeout(function() {
        drawLine(-Math.PI / 12, 400, 0, "white", 10);
    }, delay);
    incrementDelayLine(400);
    setTimeout(function() {
        spellOut("The Plate", 0, "lightgreen", 40, 100, 600);
    }, delay);
    incrementDelay("The Plate");
    setTimeout(function() {
        cursor = [1363 / 2 - 100, 600];
        drawLine(0, 200, 0, "gray", 10);
    }, delay);
    incrementDelayLine(200);
    setTimeout(function() {
        drawLine(-5 * Math.PI / 6, 120, 0, "gray", 10);
    }, delay);
    incrementDelayLine(120);
    setTimeout(function() {
        drawLine(5 * Math.PI / 6, 120, 0, "gray", 10);
    }, delay);
    incrementDelayLine(120);
    setTimeout(function() {
        spellOut("The Clay", 0, "lightgreen", 40, 1363 / 2 - 100, 650);
    }, delay);
    incrementDelay("The Clay");
    setTimeout(function() {
        cursor = [1363 / 2 - 20, 550];
        drawLine(0, 40, 0, "yellow", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        drawLine(-Math.PI / 2, 300, 0, "yellow", 10);
    }, delay);
    incrementDelayLine(300);
    setTimeout(function() {
        drawLine(Math.PI, 40, 0, "yellow", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        drawLine(Math.PI / 2, 300, 0, "yellow", 10);
    }, delay);
    incrementDelayLine(300);
    setTimeout(function() {
        cursor = [1363 / 2, 250];
        drawLine(-Math.PI / 2, 40, 0, "white", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        spellOut("The Candle", 0, "lightgreen", 40, 1363 / 2 + 30, 400);
    }, delay);
    incrementDelay("The Candle");
    setTimeout(function() {
        cursor = [170, 520];
        drawLine(0, 1020, 0, "blue", 10);
    }, delay);
    incrementDelayLine(1020);
    setTimeout(function() {
        spellOut("The Water", 0, "lightgreen", 40, 1363 / 2 - 400, 480);
    }, delay);
    incrementDelay("The Water");
    incrementDelayLine(300);
    setTimeout(function() {
        clearArea(100, 550, 170, 50);
    }, delay);
    setTimeout(function() {
        clearArea(1363 / 2 - 100, 620, 170, 50);
    }, delay);
    setTimeout(function() {
        clearArea(1363 / 2 + 30, 360, 210, 50);
    }, delay);
    setTimeout(function() {
        clearArea(1363 / 2 - 400, 440, 190, 50);
    }, delay);
    setTimeout(function() {
        clearArea(100, 60, 600, 50);
    }, delay);
    setTimeout(function() {
        spellOut("When the candle is lit...", 0, "green", 40, 100, 100);
    }, delay);
    incrementDelay("When the candle is lit...");
    setTimeout(function() {
        cursor = [1363 / 2, 243];
        drawLine(-Math.PI / 4, 40, 0, "red", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        drawLine(-3 * Math.PI / 4, 40, 0, "red", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        drawLine(3 * Math.PI / 4, 40, 0, "red", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        drawLine(Math.PI / 4, 40, 0, "red", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        spellOut("The air around the flame", 0, "green", 40, 100, 150);
    }, delay);
    incrementDelay("The air around the flame");
    setTimeout(function() {
        spellOut("begins to heat. But", 0, "green", 40, 100, 200);
    }, delay);
    incrementDelay("begins to heat. But");
    setTimeout(function() {
        spellOut("the heat disperses, so", 0, "green", 40, 100, 250);
    }, delay);
    incrementDelay("the heat disperses, so");
    setTimeout(function() {
        spellOut("nothing notable happens.", 0, "green", 40, 100, 300);
    }, delay);
    incrementDelay("nothing notable happens.");
    incrementDelayLine(100);
    setTimeout(function() {
        spellOut("However, if we were to", 0, "green", 40, 800, 100);
    }, delay);
    incrementDelay("However, if we were to");
    setTimeout(function() {
        spellOut("trap that heat, then", 0, "green", 40, 800, 150);
    }, delay);
    incrementDelay("trap that heat, then");
    setTimeout(function() {
        spellOut("something interesting will", 0, "green", 40, 800, 200);
    }, delay);
    incrementDelay("something interesting will");
    setTimeout(function() {
        spellOut("occur...", 0, "green", 40, 800, 250);
    }, delay);
    incrementDelay("occur...");
    incrementDelayLine(300);
    setTimeout(function() {
        clearArea(100, 50, 500, 350);
    }, delay);
    setTimeout(function() {
        clearArea(800, 50, 600, 350);
    }, delay);
    setTimeout(function() {
        cursor = [1363 / 2 - 50, 550];
        drawLine(0, 100, 0, "white", 10);
    }, delay);
    incrementDelayLine(100);
    setTimeout(function() {
        drawLine(-Math.PI / 2, 150, 0, "white", 10);
    }, delay);
    incrementDelayLine(150);
    setTimeout(function() {
        drawLine(-2 * Math.PI / 5, 400, 0, "white", 10);
    }, delay);
    incrementDelayLine(400);
    setTimeout(function() {
        drawLine(Math.PI, 350, 0, "white", 10);
    }, delay);
    incrementDelayLine(350);
    setTimeout(function() {
        drawLine(2 * Math.PI / 5, 400, 0, "white", 10);
    }, delay);
    incrementDelayLine(400);
    setTimeout(function() {
        drawLine(Math.PI / 2, 150, 0, "white", 10);
    }, delay);
    incrementDelayLine(150);
    setTimeout(function() {
        spellOut("When we place the flask", 0, "green", 40, 70, 100);
    }, delay);
    incrementDelay("When we place the flask");
    setTimeout(function() {
        spellOut("over the candle, the", 0, "green", 40, 100, 150);
    }, delay);
    incrementDelay("over the candle, the");
    setTimeout(function() {
        spellOut("energy from the fire, ", 0, "green", 40, 100, 200);
    }, delay);
    incrementDelay("energy from the fire, ");
    setTimeout(function() {
        spellOut("gets trapped inside.", 0, "green", 40, 100, 250);
    }, delay);
    incrementDelay("gets trapped inside.");
    setTimeout(function() {
        spellOut("Energy means heat, and", 0, "green", 40, 100, 300);
    }, delay);
    incrementDelay("Energy means heat, and");
    setTimeout(function() {
        spellOut("heat means pressure.", 0, "green", 40, 100, 350);
    }, delay);
    incrementDelay("heat means pressure.");
    setTimeout(function() {
        spellOut("We know this because of", 0, "green", 40, 100, 400);
    }, delay);
    incrementDelay("We know this because of");
    setTimeout(function() {
        spellOut("the ideal gas law: P = nRT/V", 0, "green", 40, 100, 450);
    }, delay);
    incrementDelay("the ideal gas law: P = nRT/V");
    incrementDelayLine(400);
    setTimeout(function() {
        clearArea(70, 50, 430, 250);
    }, delay);
    setTimeout(function() {
        clearArea(100, 200, 460, 260);
    }, delay);
    setTimeout(function() {
        clearArea(100, 350, 500, 100);
    }, delay);
    setTimeout(function() {
        spellOut("more heat and pressure", 0, "red", 25, 1363 / 2 - 130, 50);
    }, delay);
    incrementDelay("more heat and pressure");
    setTimeout(function() {
        spellOut("This pressure exerts force", 0, "green", 40, 50, 100);
    }, delay);
    incrementDelay("This pressure exerts force");
    setTimeout(function() {
        spellOut("upon the surface of the", 0, "green", 40, 50, 150);
    }, delay);
    incrementDelay("upon the surface of the");
    setTimeout(function() {
        spellOut("water in the flask, but", 0, "green", 40, 50, 200);
    }, delay);
    incrementDelay("water in the flask, but ");
    setTimeout(function() {
        spellOut("because water is non-solid,", 0, "green", 40, 50, 250);
    }, delay);
    incrementDelay("because water is non-solid,");
    setTimeout(function() {
        spellOut("some air gets forced through", 0, "green", 40, 50, 300);
    }, delay);
    incrementDelay("some air gets forced through");
    setTimeout(function() {
        spellOut("the water, out of the flask.", 0, "green", 40, 50, 350);
    }, delay);
    incrementDelay("the water, out of the flask.");
    setTimeout(function() {
        cursor = [1363 / 2 - 35, 250];
        drawLine(Math.PI / 2, 320, 0, "orange", 10);
    }, delay);
    incrementDelayLine(320);
    setTimeout(function() {
        drawLine(Math.PI, 100, 0, "orange", 10);
    }, delay);
    incrementDelayLine(100);
    setTimeout(function() {
        drawLine(-Math.PI / 2, 100, 0, "orange", 10);
    }, delay);
    incrementDelayLine(100);
    setTimeout(function() {
        drawLine(2 * Math.PI / 3, 30, 0, "orange", 10);
    }, delay);
    incrementDelayLine(30);
    setTimeout(function() {
        drawLine(0, 30, 0, "orange", 10);
    }, delay);
    incrementDelayLine(30);
    setTimeout(function() {
        drawLine(-2 * Math.PI / 3, 30, 0, "orange", 10);
    }, delay);
    incrementDelayLine(30);
    setTimeout(function() {
        clearArea(50, 50, 460, 250);
    }, delay);
    setTimeout(function() {
        clearArea(50, 200, 510, 260);
    }, delay);
    setTimeout(function() {
        clearArea(50, 350, 550, 100);
    }, delay);
    setTimeout(function() {
        spellOut("But then, when the candle", 0, "green", 40, 50, 100);
    }, delay);
    incrementDelay("But then, when the candle");
    setTimeout(function() {
        spellOut("goes out and the", 0, "green", 40, 50, 150);
    }, delay);
    incrementDelay("goes out and the");
    setTimeout(function() {
        cursor = [1363 / 2, 243];
        drawLine(-Math.PI / 4, 40, 0, "black", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        drawLine(-3 * Math.PI / 4, 40, 0, "black", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        drawLine(3 * Math.PI / 4, 40, 0, "black", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        drawLine(Math.PI / 4, 40, 0, "black", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        spellOut("temperature cools...", 0, "green", 40, 50, 200);
    }, delay);
    incrementDelay("temperature cools...");
    setTimeout(function() {
        spellOut("There is less air", 0, "green", 40, 50, 250);
    }, delay);
    incrementDelay("There is less air");
    setTimeout(function() {
        spellOut("inside the flask", 0, "green", 40, 50, 300);
    }, delay);
    incrementDelay("inside the flask");
    setTimeout(function() {
        spellOut("than originally.", 0, "green", 40, 50, 350);
    }, delay);
    incrementDelay("than originally.");
    setTimeout(function() {
        cursor = [1363 / 2 - 35, 250];
        drawLine(Math.PI / 2, 320, 0, "black", 10);
    }, delay);
    incrementDelayLine(320);
    setTimeout(function() {
        drawLine(Math.PI, 100, 0, "black", 10);
    }, delay);
    incrementDelayLine(100);
    setTimeout(function() {
        drawLine(-Math.PI / 2, 100, 0, "black", 10);
    }, delay);
    incrementDelayLine(100);
    setTimeout(function() {
        drawLine(2 * Math.PI / 3, 30, 0, "black", 10);
    }, delay);
    incrementDelayLine(30);
    setTimeout(function() {
        drawLine(0, 30, 0, "black", 10);
    }, delay);
    incrementDelayLine(30);
    setTimeout(function() {
        drawLine(-2 * Math.PI / 3, 30, 0, "black", 10);
    }, delay);
    incrementDelayLine(30);
    setTimeout(function() {
        clearArea(1363 / 2 - 130, 25, 280, 40);
    }, delay);
    setTimeout(function() {
        spellOut("less heat and pressure", 0, "blue", 25, 1363 / 2 - 130, 50);
    }, delay);
    incrementDelay("less heat and pressure");
    incrementDelayLine(300);
    setTimeout(function() {
        spellOut("There is now less pressure", 0, "green", 40, 860, 100);
    }, delay);
    incrementDelay("There is now less pressure");
    setTimeout(function() {
        spellOut("in the flask, meaning", 0, "green", 40, 840, 150);
    }, delay);
    incrementDelay("in the flask, meaning");
    setTimeout(function() {
        spellOut("that the atmospheric", 0, "green", 40, 820, 200);
    }, delay);
    incrementDelay("that the atmospheric");
    setTimeout(function() {
        spellOut("pressure outside exerts more", 0, "green", 40, 800, 250);
    }, delay);
    incrementDelay("pressure outside exerts more");
    setTimeout(function() {
        spellOut("force on the water than", 0, "green", 40, 800, 300);
    }, delay);
    incrementDelay("force on the water than");
    setTimeout(function() {
        spellOut("the air inside the flask.", 0, "green", 40, 800, 350);
    }, delay);
    incrementDelay("the air inside the flask.");
    setTimeout(function() {
        cursor = [300, 400];
        drawLine(Math.PI / 2, 100, 0, "orange", 10);
    }, delay);
    incrementDelayLine(320);
    setTimeout(function() {
        drawLine(-Math.PI / 3, 40, 0, "orange", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        drawLine(Math.PI, 40, 0, "orange", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        drawLine(Math.PI / 3, 40, 0, "orange", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        cursor = [400, 400];
        drawLine(Math.PI / 2, 100, 0, "orange", 10);
    }, delay);
    incrementDelayLine(320);
    setTimeout(function() {
        drawLine(-Math.PI / 3, 40, 0, "orange", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        drawLine(Math.PI, 40, 0, "orange", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        drawLine(Math.PI / 3, 40, 0, "orange", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        cursor = [500, 400];
        drawLine(Math.PI / 2, 100, 0, "orange", 10);
    }, delay);
    incrementDelayLine(320);
    setTimeout(function() {
        drawLine(-Math.PI / 3, 40, 0, "orange", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        drawLine(Math.PI, 40, 0, "orange", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        drawLine(Math.PI / 3, 40, 0, "orange", 10);
    }, delay);
    incrementDelayLine(40);
    setTimeout(function() {
        spellOut("atmospheric force", 0, "red", 25, 300, 390);
    }, delay);
    incrementDelay("atmospheric force");
    setTimeout(function() {
        clearArea(50, 50, 460, 250);
    }, delay);
    setTimeout(function() {
        clearArea(50, 200, 510, 260);
    }, delay);
    setTimeout(function() {
        clearArea(50, 350, 550, 100);
    }, delay);
    setTimeout(function() {
        spellOut("The result?", 0, "green", 40, 50, 100);
    }, delay);
    incrementDelay("The result?");
    setTimeout(function() {
        spellOut("This force pushes on", 0, "green", 40, 50, 150);
    }, delay);
    incrementDelay("This force pushes on");
    setTimeout(function() {
        spellOut("the water and it begins", 0, "green", 40, 50, 200);
    }, delay);
    incrementDelay("the water and it begins");
    setTimeout(function() {
        spellOut("to rise inside the flask!", 0, "green", 40, 50, 250);
    }, delay);
    incrementDelay("to rise inside the flask!");
    incrementDelayLine(200);
    setTimeout(function() {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(1363 / 2 - 50, 550);
        ctx.lineTo(1363 / 2 + 45, 550);
        ctx.lineTo(1363 / 2 + 45, 400);
        ctx.lineTo(1363 / 2 + 45 + Math.cos(-2 * Math.PI / 5) * 200, 400 + Math.sin(-2 * Math.PI / 5) * 200);
        ctx.lineTo(1363 / 2 - 50 + Math.cos(-3 * Math.PI / 5) * 200, 400 + Math.sin(-3 * Math.PI / 5) * 200);
        ctx.lineTo(1363 / 2 - 50, 400);
        ctx.fill();
    }, delay);
    incrementDelayLine(200);
    setTimeout(function() {
        spellOut("The water continues to", 0, "green", 40, 50, 300);
    }, delay);
    incrementDelay("The water continues to");
    setTimeout(function() {
        spellOut("rise untill pressure has", 0, "green", 40, 50, 350);
    }, delay);
    incrementDelay("rise untill pressure has");
    setTimeout(function() {
        spellOut("equalized inside and outside", 0, "green", 40, 50, 400);
    }, delay);
    incrementDelay("equalized inside and ouside");
    setTimeout(function() {
        spellOut("the flask!", 0, "green", 40, 50, 450);
    }, delay);
    incrementDelay("the flask!");
    incrementDelayLine(600);
    setTimeout(function() {
        clear();
    }, delay);
    setTimeout(function() {
        spellOut("Thus we have proved that the best way", 0, "purple", 60, 120, 100);
    }, delay);
    incrementDelay("Thus we have proved that the best way")
    setTimeout(function() {
        spellOut("to perform magic is with science!", 0, "purple", 60, 230, 160);
    }, delay);
    incrementDelay("to perform magic is with science!");
}

function clear() {
    ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
}

function clearArea(x, y, width, height) {
    ctx.clearRect(x, y, width, height);
}

function spellOut(text, index, color, size, x, y) {
    ctx.fillStyle = color;
    ctx.font = size + "px Arial";
    setTimeout(function() {
        ctx.fillText(text.substring(0, index), x, y);
        if(index < text.length) spellOut(text, index + 1, color, size, x, y);
    }, 40);
}

function drawLine(angle, length, curLength, color, size) {
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    setTimeout(function() {
        ctx.beginPath();
        ctx.moveTo(cursor[0], cursor[1]);
        ctx.lineTo(cursor[0] + Math.cos(angle) * curLength, cursor[1] + Math.sin(angle) * curLength);
        ctx.stroke();
        if(curLength < length) drawLine(angle, length, curLength + 5, color, size);
        else cursor = [cursor[0] + Math.cos(angle) * length, cursor[1] + Math.sin(angle) * length]
    }, 1)
}

function incrementDelay(text) {
    delay += text.length * 55;
}

function incrementDelayLine(len) {
    delay += len * 1.6;
}
// animation();
var button = document.createElement("BUTTON");
button.id = "button";
button.style.position = "absolute";
button.style.left = window.innerWidth / 2 - 100 + "px";
button.style.top = window.innerHeight / 2 + "px";
button.style.width = 100;
button.style.height = 40;
button.style.backgroundColor = "rgba(0,250,150,1)";
button.innerHTML = "START ANIMATION!"
button.onclick = function() {
    animation()
};
document.body.appendChild(button);