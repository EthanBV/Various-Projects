window.onerror = function(msg, url, line) {
    alert("Window error: " + msg + ", " + url + ", line " + line);
};
var gameScreen = document.createElement("CANVAS");
gameScreen.style.position = "absolute";
gameScreen.style.left = "0px";
gameScreen.style.top = "0px";
gameScreen.width = window.innerWidth;
gameScreen.height = window.innerHeight;
gameScreen.style.backgroundColor = "rgba(0,0,0,1)";
gameScreen.addEventListener("mousedown", function() {
    click = true;
});
gameScreen.addEventListener("mouseup", function() {
    click = false;
});
document.body.appendChild(gameScreen);
var ctx = gameScreen.getContext("2d");
var cursorX = 0;
var cursorY = 0;
var click = false
document.onmousemove = function(e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
}
var centerTypes = ["Singular, Bi, Mult, Black Hole"];
var normStars = ["Class B", "Class A", "Class F", "Class G", "Class K", "Class M"];
var specialStars = ["Neutron", "Pulsar", "Black Hole"]
var allStars = normStars.concat(specialStars);
var habitable = ["Continental", "Oceanic", "Artic", "Tundra", "Arid", "Desert", "Jungle"];
var inhabitable = ["Molten", "Toxic", "Barren", "Frozen", "Gas Giant"];
var planets = habitable.concat(inhabitable);
var allHabitable = habitable.concat(["Gaia", "Tomb"]);
var colorIndexes = ["Class B", "Class A", "Class F", "Class G", "Class K", "Class M", "Neutron", "Pulsar", "Black Hole", "Continental", "Oceanic", "Artic", "Tundra", "Arid", "Desert", "Jungle", "Motlen", "Toxic", "Barren", "Frozen", "Gas Giant"];
var colors = ["rgb(100,100,255)", "rgb(150,150,255)", "rgb(215,255,255)", "rgb(250,200,0)", "rgb(250,100,0)", "rgb(250,50,0)", "rgb(200,200,255)", "rgb(230,230,255)", "rgb(100,50,100)", "rgb(0,200,100)", "rgb(0,100,200)", "rgb(200,215,215)", "rgb(160,195,195)", "rgb(150,100,0)", "rgb(200,200,0)", "rgb(0,150,0)", "rgb(150,0,0)", "rgb(100,150,0)", "rgb(60,60,50)", "rgb(255,255,255)", "rgb(255,0,255)"];
var curSystem = new System(Math.floor(Math.random() * 10000000));
var specialCatagories = ["Planets", "Habitable", "Inhabitable"];

function System(seed) {
    this.name = "NONE";
    this.centerType = "NONE";
    this.class = "NONE";
    this.data = "NONE";
    this.obs = [];
    this.usageOdds = 20;
    this.originSeed = seed;
    this.seed = new Seed(seed);
    this.canHaveHabitable = true;
    //what type of system is it?
    if(this.seed.random() > 0.6) this.centerType = "Singular";
    else if(this.seed.random() > 0.05) this.centerType = "Binary";
    else this.centerType = "Complex";
    //star setup
    if(this.centerType == "Singular") {
        //Singular Systems
        if(this.seed.random() > 0.05) this.obs.push(new Planet(this.seed.getRandom(normStars), 0, 0, 0, 0, 1, 1, 20, 30, []));
        else this.obs.push(new Planet(this.seed.getRandom(specialStars), 0, 0, 0, 0, 1, 1, 20, 30, []));
    } else if(this.centerType == "Binary") {
        //Binary Systems
        if(this.seed.random() > 0.7) {
            this.data = "Seperate";
            this.obs.push(new Planet(this.seed.getRandom(normStars), 50, 70, 0, 360, 1, 1, 20, 30, []));
            this.obs.push(new Planet(this.seed.getRandom(normStars), 0, 10, 180, 180, 1, 1, 20, 30, []));
        } else {
            this.data = "Central";
            this.obs.push(new Planet(this.seed.getRandom(normStars), 15, 25, 0, 360, 1, 1, 20, 30, []));
            this.obs.push(new Planet(this.seed.getRandom(normStars), 0, 10, 180, 180, 1, 1, 20, 30, []));
        }
    } else {
        //Complex Systems
        var sys1Mass = 10 + Math.floor(this.seed.random() * 30);
        var sys2Mass = 10 + Math.floor(this.seed.random() * 30);
        var sys1Num = 1 + Math.floor(this.seed.random() * 2);
        var sys2Num = 1 + Math.floor(this.seed.random() * 2);
        var sys1Dist = sys2Mass;
        var sys2Dist = sys1Mass;
        if(sys1Num == 1) {
            this.obs.push(new Planet(this.seed.getRandom(normStars), sys1Dist * 0.9, sys1Dist * 1.1, 0, 360, 1, 1, sys1Mass * 0.9, sys1Mass * 1.1, []));
        } else {
            var p1Mass = 5 + Math.floor(this.seed.random() * (sys1Mass - 10))
            var p2Mass = sys1Mass - p1Mass;
            var moon = new Planet(this.seed.getRandom(normStars), sys1Mass * 0.4, sys1Mass * 0.5, 0, 360, 1, 1, p2Mass * 0.9, p2Mass * 1.1, [])
            this.obs.push(new Planet(this.seed.getRandom(normStars), sys1Dist * 0.9, sys1Dist * 1.1, 0, 360, 1, 1, p1Mass * 0.9, p1Mass * 1.1, [moon]));
        }
        if(sys2Num == 1) {
            if(sys2Dist > sys1Dist) {
                this.obs.push(new Planet(this.seed.getRandom(normStars), (sys2Dist * 0.9) - sys1Dist, (sys2Dist * 1.1) - sys1Dist, 180, 180, 1, 1, sys2Mass * 0.9, sys2Mass * 1.1, []));
            } else {
                this.obs.unshift(new Planet(this.seed.getRandom(normStars), sys2Dist * 0.9, sys2Dist * 1.1, 180, 180, 1, 1, sys2Mass * 0.9, sys2Mass * 1.1, []));
                this.obs[1].distMin = (sys1Dist * 0.9) - sys2Dist;
                this.obs[1].distMax = (sys1Dist * 1.1) - sys2Dist;
            }
        } else {
            var p1Mass = 5 + Math.floor(this.seed.random() * (sys2Mass - 10));
            var p2Mass = sys2Mass - p1Mass;
            var moon = new Planet(this.seed.getRandom(normStars), sys2Mass * 0.4, sys2Mass * 0.5, 0, 360, 1, 1, p2Mass * 0.9, p2Mass * 1.1, []);
            if(sys2Dist > sys1Dist) {
                this.obs.push(new Planet(this.seed.getRandom(normStars), (sys2Dist * 0.9) - sys1Dist, (sys2Dist * 1.1) - sys1Dist, 180, 180, 1, 1, p1Mass * 0.9, p1Mass * 1.1, [moon]));
            } else {
                this.obs.unshift(new Planet(this.seed.getRandom(normStars), sys2Dist * 0.9, sys2Dist * 1.1, 180, 180, 1, 1, p1Mass * 0.9, p1Mass * 1.1, [moon]));
                this.obs[1].distMin = (sys1Dist * 0.9) - sys2Dist;
                this.obs[1].distMax = (sys1Dist * 1.1) - sys2Dist;
            }
        }
    }
    //figure out what star should represent the system
    var bigStar = this.obs[0];
    for(var i = 0; i < this.obs.length; i++) {
        if(this.obs[i].sizeMin > bigStar.sizeMin) bigStar = this.obs[i];
    }
    this.class = bigStar.type;
    var numPlanets = Math.floor(this.seed.random() * this.seed.random() * 10 * ((this.centerType == "Binary") ? 0.6 : ((this.centerType == "Complex") ? 0.3 : 1)));
    if(this.centerType == "Singular") {
        for(var i = 0; i < numPlanets; i++) {
            var type = this.seed.getRandom(planets);
            var distance = 15 + this.seed.random() * 30;
            var count = this.seed.random() * 5;
            var size = 6 + Math.random() * 20;
            if(type == "Gas Giant") size *= 1.5;
            var moons = [];
            var planet = new Planet(type, Math.floor(distance * 0.8), Math.floor(distance), 0, 180, Math.floor(count * 0.5), Math.floor(count), Math.floor(size * 0.6), Math.floor(size), moons);
            this.obs.push(planet);
        }
    } else if(this.centerType == "Binary") {} else if(this.centerType == "Complex") {}
    this.render = function(centerX, centerY) {
        var systemScale = (gameScreen.height / 4) / 100;
        var angle = 0;
        var distance = 0;
        for(var i = 0; i < this.example.length; i++) {
            var ob = this.example[i];
            angle += ob.angleMin;
            distance += ob.distanceMin;
            var x = Math.cos(angle / 180 * Math.PI) * distance * systemScale;
            var y = Math.sin(angle / 180 * Math.PI) * distance * systemScale;
            var radius = ob.sizeMin;
            if(ob.type == "Gas Giant") radius = Math.pow(radius, 3 / 4);
            else if(planets.indexOf(ob.type) != -1) radius = Math.pow(radius, 2 / 3);
            ctx.fillStyle = "rgb(100,100,100)";
            ctx.fillStyle = colors[colorIndexes.indexOf(ob.type)];
            //properties dont seem to be correct
            ctx.beginPath();
            ctx.arc(centerX + x, centerY + y, radius, 0, Math.PI * 2);
            ctx.fill();
            var moonAngle = 0;
            var moonDistance = 0;
            for(var k = 0; k < this.example[i].moons.length; k++) {
                var ob = this.example[i].moons[k];
                moonAngle += ob.angleMin;
                moonDistance = ob.distanceMin;
                var moonX = x + Math.cos(moonAngle / 180 * Math.PI) * moonDistance * systemScale;
                var moonY = y + Math.sin(moonAngle / 180 * Math.PI) * moonDistance * systemScale;
                radius = ob.sizeMin;
                ctx.fillStyle = "rgb(100,100,100)";
                ctx.fillStyle = colors[colorIndexes.indexOf(ob.type)];
                ctx.beginPath();
                ctx.arc(centerX + moonX, centerY + moonY, radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.fillStyle = "rgb(200,200,200)";
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.fillText("Type: " + this.centerType, gameScreen.width / 2 + 103, 35);
        ctx.fillText("Data: " + this.data, gameScreen.width / 2 + 103, 55);
        ctx.fillText("Class: " + this.class, gameScreen.width / 2 + 103, 75);
    }
    this.example = [];
    this.generateExample = function() {
        this.example = [];
        for(var i = 0; i < this.obs.length; i++) {
            var ob = this.obs[i];
            var count = Math.floor(ob.countMin + Math.random() * (ob.countMax - ob.countMin));
            for(var e = 0; e < count; e++) {
                var type = ob.type;
                var dist = Math.floor(ob.distanceMin + Math.random() * (ob.distanceMax - ob.distanceMin));
                var angle = Math.floor(ob.angleMin + Math.random() * (ob.angleMax - ob.angleMin));
                var size = Math.floor(ob.sizeMin + Math.random() * (ob.sizeMax - ob.sizeMin));
                var moons = []
                for(var k = 0; k < this.obs[i].moons.length; k++) {
                    var ob2 = this.obs[i].moons[k];
                    var count2 = Math.floor(ob2.countMin + Math.random() * (ob2.countMax - ob2.countMin));
                    for(var j = 0; j < count2; j++) {
                        var type2 = ob2.type
                        var dist2 = Math.floor(ob2.distanceMin + Math.random() * (ob2.distanceMax - ob2.distanceMin));
                        var angle2 = Math.floor(ob2.angleMin + Math.random() * (ob2.angleMax - ob2.angleMin));
                        var size2 = Math.floor(ob2.sizeMin + Math.random() * (ob2.sizeMax - ob2.sizeMin));
                        moons.push(new Planet(type2, dist2, dist2, angle2, angle2, count2, count2, size2, size2, []));
                    }
                }
                this.example.push(new Planet(type, dist, dist, angle, angle, count, count, size, size, moons));
            }
        }
    }
    this.generateExample();
    this.translate = function() {
        this.str = "";
    }
}

function Planet(type, distMin, distMax, angleMin, angleMax, countMin, countMax, sizeMin, sizeMax, moons) {
    this.type = type;
    this.distanceMin = distMin;
    this.distanceMax = distMax;
    this.angleMin = angleMin;
    this.angleMax = angleMax;
    this.countMin = countMin;
    this.countMax = countMax;
    this.sizeMin = sizeMin;
    this.sizeMax = sizeMax;
    this.moons = moons;
}

function Seed(seed) {
    this.seed = seed;
    this.random = function() {
        seed = Math.sin(seed) * 10000
        seed -= Math.floor(seed);
        return seed;
    }
    this.getRandom = function(list) {
        return list[Math.floor(list.length * this.random())];
    }
}

function random(seed) {
    var value = Math.sin(seed) * 10000;
    seed *= 1.1;
    value -= Math.floor(value);
    return value;
}
var curMenu = 0;
//code for interface

function renderMain() {
    ctx.beginPath();
    ctx.rect(0, 0, gameScreen.width, gameScreen.height);
    ctx.rect(0, 2 * gameScreen.height / 3, gameScreen.width / 2, gameScreen.height / 3);
    ctx.rect(gameScreen.width / 2, 2 * gameScreen.height / 3, gameScreen.width / 2, gameScreen.height / 3);
    ctx.fillStyle = "rgb(15,15,15)";
    ctx.fill();
    ctx.strokeStyle = "rgb(150,150,150)";
    ctx.lineWidth = 30;
    ctx.stroke();
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.font = "150px Arial";
    ctx.fillStyle = "rgb(150,150,150)";
    ctx.fillText("!!!!!!!!!!!!!!!!!!!!!!", gameScreen.width / 2, 150);
    ctx.font = "75px Arial";
    ctx.fillText("Generate", gameScreen.width / 4, 5 * gameScreen.height / 6 + 25);
    ctx.fillText("About", 3 * gameScreen.width / 4, 5 * gameScreen.height / 6 + 25);
    //check buttons
    if(click) {
        if(cursorY > 2 * gameScreen.height / 3 && cursorY < gameScreen.height) {
            if(cursorX > 0 && cursorX < gameScreen.width / 2) {
                curMenu = 1;
            } else if(cursorX > gameScreen.width / 2 && cursorX < gameScreen.width) {
                curMenu = 2;
            }
        }
    }
}

function renderGenerator() {
    ctx.beginPath();
    ctx.rect(0, 0, gameScreen.width, gameScreen.height);
    ctx.rect(0, 0, gameScreen.height, gameScreen.height);
    ctx.rect(gameScreen.width * 5 / 6, 0, gameScreen.width / 6, gameScreen.height);
    ctx.fillStyle = "rgb(15,15,15)";
    ctx.fill();
    ctx.strokeStyle = "rgb(150,150,150)";
    ctx.lineWidth = 30;
    ctx.stroke();
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(gameScreen.height / 2 - 15, gameScreen.height / 2);
    ctx.lineTo(gameScreen.height / 2 + 15, gameScreen.height / 2);
    ctx.moveTo(gameScreen.height / 2, gameScreen.height / 2 - 15);
    ctx.lineTo(gameScreen.height / 2, gameScreen.height / 2 + 15);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(100,100,100)";
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(gameScreen.width * 5 / 6 + 17.5, 0 + 17.5, gameScreen.width / 6 - 35, gameScreen.height / 12);
    ctx.rect(gameScreen.width * 5 / 6 + 17.5, gameScreen.height / 12 + 17.5, gameScreen.width / 6 - 35, gameScreen.height / 12);
    ctx.fillStyle = "rgb(100,100,100)";
    ctx.fill();
    ctx.strokeStyle = "rgb(200,200,200)";
    ctx.stroke();
    ctx.fillStyle = "rgb(200,200,200)";
    ctx.fillText("Regenerate System", gameScreen.width * 5 / 6 + 23, gameScreen.width / 24 - 5);
    ctx.fillText("Regenerate Example", gameScreen.width * 5 / 6 + 23, gameScreen.height / 12 + gameScreen.width / 24 - 5);
    //render the system
    curSystem.render(gameScreen.height / 2, gameScreen.height / 2);
    if(click) {
        if(cursorX > gameScreen.width * 5 / 6 && cursorX < gameScreen.width) {
            if(cursorY > 15 && cursorY < gameScreen.height / 12 + 15) {
                curSystem = new System(Math.floor(Math.random() * 10000000))
            } else if(cursorY > gameScreen.height / 12 + 15 && cursorY < gameScreen.height / 6 + 15) {
                curSystem.generateExample();
            }
        }
    }
}

function renderAbout() {}

function update() {
    ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
    if(curMenu == 0) {
        renderMain();
    } else if(curMenu == 1) {
        renderGenerator();
    } else if(curMenu == 2) {
        renderAbout();
    }
    window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);