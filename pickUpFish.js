//input
var input = document.getElementById("input");
//output
var output = document.getElementById("screen");
//inventory
var inventoryScreen = document.getElementById("inventory");
//Declare area VAR
var area;
//declare player Inventory array
var inventory = [];
//curFish is used to Check if the # of fish in player's inven has changed in checkFish()
var curFish = 0;
//Keep track of how many times the player has teleported
var teleports = 0;
//Add an item to the player's inventory
function addToInven(item, amount) {
    for (i = 0; i < amount; i++) inventory.push(item);
    logInven();
}
//Remove an item from the player's inventory
function removeFromInven(item, amount) {
    for (i = 0; i < amount; i++) inventory.splice(inventory.indexOf(item), 1);
    logInven();
}
//Check the player's inventory for an amount of an item
function checkInven(item, amount) {
    var found = 0;
    for (i = 0; i < inventory.length; i++) { //cycles through inventory
        if (inventory[i] == item) found++; //Adds to amount of item found every time item is found
    }
    if (found >= amount) return true;
    else return false;
}
//Check the players inventory to see how many fish they have!
function checkFish() {
    var total = 0;
    for (i = 0; i < inventory.length; i++) if (inventory[i].indexOf("fish") != -1) total++;
    if (curFish != total) loadNewArea(total);
    curFish = total;
    return total;
}
//After a fish # change has been detected a new zone is loaded
function loadNewArea(num) {
    switch (num) {
        case 0:
            area = areas.theDock.onDock; //first area
            load();
            break;
        case 1:
            area = areas.theFishverse.wayPoint; //second area
            load();
            break;
        case 2:
            area = areas.thePondRoom.onLand; //third area
            load();
            break;
        case 3:
            log("check");
            area = areas.theBox.inBox; //fourth area
            load();
            break;
    }
}
//When teleporting to a new demention, this function choses the text based on certain factors.
function teleportText() {

}
//Log Inventory
function logInven() {
    var invenHTML = "Inventory<br>";
    for(i=0;i<inventory.length;i++)invenHTML+="<br>"+inventory[i];
    inventoryScreen.innerHTML = invenHTML;
}
//When the player presses enter, this clears the input box and runs their input!
function Enter() {
    var playerInput = input.value;
    input.value = "";
    if (playerInput !== "") {
        checkAction(playerInput);
    }
}
//Logs the paramater 'text' to the ingame console.
function log(text, playerInput, valid) {
    var style = "";
    if (playerInput) {
        //Changes color of text based on validity of input
        if (valid) style = "color:blue";
        else style = "color:red";
    }
    output.insertAdjacentHTML("beforeend", "<p style = '" + style + "'>> " + text + "</p>");
    output.scrollTop = output.scrollHeight;
}
//Checks if the input the player put in is a valid commnad
//rip
function checkAction(action) {
    //changed player input to lower case because upper case is irelevent.
    action = action.toLowerCase();
    //sets action and target to none.
    var actionFinal = "none";
    var targetFinal = "none";
    //check if the player;s input is equal to "help".
    if (action.indexOf("help") != -1) {
        log(action, true, true);
        help(action);
        return;
    }
    //for loop that runs once for every action in the player's area
    for (i = 0; i < area.actions.length; i++) {
        //for loop that runs once for every keyword for each action.
        for (o = 0; i < area.actions.length && o < area.actions[i][0].length; o++) {
            //if statement that checks if the player's input contains the current action keyword.
            if (action.indexOf(area.actions[i][0][o]) != -1) {
                actionFinal = area.actions[i][0];
                //for loop that runs once for each target for the chose action.
                for (e = 0; e < area.actions[i][1].length; e++) {
                    //for loop that runs once for each keyword for each target.
                    for (u = 0; e < area.actions[i][1].length && u < area.actions[i][1][e][0].length; u++) {
                        //if statement that checks if the player's input contains the current target keyword
                        if (action.indexOf(area.actions[i][1][e][0][u]) != -1) {
                            targetFinal = area.actions[i][1][e][0][u];
                            //log the players input to the console in blue to show it was valid.
                            log(action, true, true);
                            //call the function acoicated with the player's chosen action and target.
                            area.actions[i][1][e][1]();
                            //checks if the player's fish # has changed and loads a new area if it has.
                            checkFish();
                            //return statement to break out of the function once an action has been found.
                            return;
                        }
                    }
                }
            }
        }
    }
    //log the player's input to the console in red to show that it was invalid
    log(action, true, false);
    log("Invalid Command");
}

var areas = {
    //The Dock
    theDock: {
        //On Dock
        onDock: {
            //loadText
            loadText: function () {
                log("The floor under you shakes, you look around and realize that you are on a dock, there is water surounding you on all sides, next to you is a barrel with " + areas.theDock.onDock.items.fish + " fish in it.");
            },
            items: {
                fish: 2,
                swordFish: 0,
                hammerheadFish: 0
            },
            actions: [
                [
                    ["pick up", "take"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                pickUp("swordfish", area);
                            }],
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                pickUp("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                pickUp("fish", area);
                            }]
                    ]
                ],
                [
                    ["put down", "drop"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                drop("swordfish", area);
                            }],
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                drop("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                drop("fish", area);
                            }]
                    ]
                ],
                [
                    ["jump", "leap", "fall", "go"],
                    [
                        [
                            ["water", "ocean", "sea", "lake"],

                            function () {
                                log("You leap into the water... SPLASH!");
                                area = areas.theDock.inWater;
                                load();
                            }]
                    ]
                ],
                [
                    ["throw", "toss", "chuck", "fling"],
                    [
                        [
                            ["fish", "fishy"],

                            function () {
                                if (checkInven("fish", 1)) {
                                    log("You throw the fish into the ocean. Be free little one!");
                                    areas.theDock.inWater.items.fish++;
                                    removeFromInven("fish", 1);
                                } else log("You have no fish!");
                            }]
                    ]
                ],
                [
                    ["look", "see", "examine", "inspect"],
                    [
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                look("hammerheadfish", area);
                            }],
                        [
                            ["swordfish"],

                            function () {
                                look("swordfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                look("fish", area);
                            }],
                        [
                            ["barrel", "container"],

                            function () {
                                if (areas.theDock.onDock.items.fish > 0) {
                                    log("There are " + areas.theDock.onDock.items.fish + " fish in the barrel.");
                                } else {
                                    log("The barrel is empty, somehow you exhausted 2 fish, GG, no RE.");
                                }
                            }],
                        [
                            ["dock", "down", "ground"],

                            function () {
                                log("You are standing on the dock, it seems sturdy enough.");
                            }],
                        [
                            ["water", "ocean", "sea", "lake"],

                            function () {
                                log("The water goes as far as you can see in ever direction. What is out there?");
                            }],
                        [
                            ["around", "everywhere", "stuff", "things"],

                            function () {
                                log("You are standing on a dock, next to you is a barrel of fish, you could probably pick one up if you wanted to...");
                            }]
                    ]
                ]
            ]
        },
        //In Water
        inWater: {
            loadText: function () {
                log("You are submurged in water, above you there appears to be a dock of some type, near you swim " + areas.theDock.inWater.items.fish + " Fish");
            },
            items: {
                fish: 0,
                swordFish: 0,
                hammerheadFish: 0
            },
            actions: [
                [
                    ["pick up", "take"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                pickUp("swordfish", area);
                            }],
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                pickUp("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                pickUp("fish", area);
                            }]
                    ]
                ],
                [
                    ["put down", "drop"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                drop("swordfish", area);
                            }],
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                drop("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                drop("fish", area);
                            }]
                    ]
                ],
                [
                    ["climb", "go"],
                    [
                        [
                            ["dock", "up"],

                            function () {
                                log("You climb out of the water onto the dock.");
                                area = areas.theDock.onDock;
                                load();
                            }]
                    ]
                ],
                [
                    ["look", "see", "examine", "inspect"],
                    [
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                look("hammerheadfish", area);
                            }],
                        [
                            ["swordfish"],

                            function () {
                                look("swordfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                look("fish", area);
                            }],
                        [
                            ["dock", "up"],

                            function () {

                                log("The dock floats above you.");

                            }],
                        [
                            ["down", "floor"],

                            function () {

                                log("The water quickly grows dark below you, you cannot see the bottom");

                            }],
                        [
                            ["around", "things", "stuff", "everywhere"],

                            function () {

                                log("Above you there is a dock, around you there is water, as far as the eye can see, you are very wet, " + areas.theDock.inWater.items.fish + " fish swim around you.");

                            }]
                    ]
                ]
            ]
        }
    },
    //The Fishverse
    theFishverse: {
        wayPoint: {
            loadText: function () {
                log("You are in a room, the floor is green, the roof is green, there is a lot of green. There are " + areas.theFishverse.wayPoint.items.fish + " fish on the ground");
            },
            items: {
                fish: 0,
                swordFish: 0,
                hammerheadFish: 0
            },
            actions: [
                [
                    ["pick up", "take"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                pickUp("swordfish", area);
                            }],
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                pickUp("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                pickUp("fish", area);
                            }]
                    ]
                ],
                [
                    ["put down", "drop"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                drop("swordfish", area);
                            }],
                        [
                            ["hammerheadfish"],

                            function () {
                                drop("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                drop("fish", area);
                            }]
                    ]
                ],
                [
                    ["look", "see", "examine", "inspect"],
                    [
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                look("hammerheadfish", area);
                            }],
                        [
                            ["swordfish"],

                            function () {
                                look("swordfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                look("fish", area);
                            }],
                        [
                            ["up", "roof", "sky"],

                            function () {
                                log("The roof is green.");
                            }],
                        [
                            ["floor", "down", "ground"],

                            function () {
                                log("The ground is green.");
                            }],
                        [
                            ["walls", "left", "right"],

                            function () {
                                log("The walls are green.");
                            }]
                    ]
                ],

                ]
        }
    },
    //The Pond Room
    thePondRoom: {
        onLand: {
            loadText: function () {
                log("You are in a room, there is a small pond in front of you.");
            },
            items: {
                fish: 0,
                swordFish: 0,
                hammerheadFish: 0
            },
            actions: [
                [
                    ["pick up", "take"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                pickUp("swordfish", area);
                            }],
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                pickUp("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                pickUp("fish", area);
                            }]
                    ]
                ],
                [
                    ["drop", "put down"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                drop("swordfish", area);
                            }],
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                drop("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                drop("fish", area);
                            }]
                    ]
                ],
                [
                    ["throw", "chuck"],
                    [
                        [
                            ["fish", "fishy"],

                            function () {
                                if (checkInven("fish", 1)) {
                                    log("You throw a fish into the pond.");
                                    areas.thePondRoom.middlePond.items.fish++;
                                    removeFromInven("fish", 1);
                                } else log("You have no fish to throw");
                            }]
                    ]
                ],
                [
                    ["jump", "go", "enter", "swim"],
                    [
                        [
                            ["water", "pond", "lake"],

                            function () {
                                log("You enter the pond.");
                                area = areas.thePondRoom.middlePond;
                                load();
                            }]
                    ]
                ],
                [
                    ["look", "see", "examine", "inspect"],
                    [
                        [
                            ["hammerheadfish"],

                            function () {
                                look("hammerheadfish", "shark", "hammerhead", area);
                            }],
                        [
                            ["swordfish"],

                            function () {
                                look("swordfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                look("fish", area);
                            }],
                        [
                            ["pond", "pool", "lake", "ocean", "water", "forward", "straight"],

                            function () {
                                log("the pool is of small and unobtrusive, but the fish seem to like it");
                            }],
                        [
                            ["up", "sky", "roof"],

                            function () {
                                log("The roof is normal");
                            }],
                        [
                            ["around", "everywhere", "stuff", "things"],

                            function () {
                                log("The room is average, except for a small pond in front of you.");
                            }]
                    ]
                ]
            ]
        },
        middlePond: {
            loadText: function () {
                log("The pond is very wet, in front of you is a wall, to your left and right are open spaces");
            },
            items: {
                fish: 0,
                swordFish: 0,
                hammerheadFish: 0
            },
            actions: [
                [
                    ["pick up", "take"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                pickUp("swordfish", area);
                            }],
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                pickUp("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                pickUp("fish", area);
                            }]
                    ]
                ],
                [
                    ["drop", "put down"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                drop("swordfish", area);
                            }],
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                drop("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                drop("fish", area);
                            }]
                    ]
                ],
                [
                    ["turn", "go", "swim", "climb"],
                    [
                        [
                            ["left"],

                            function () {
                                log("You move twords the left side of the pond.");
                                area = areas.thePondRoom.leftPond;
                                load();
                            }],
                        [
                            ["right"],

                            function () {
                                log("You move twords the right side of the pond.");
                                area = areas.thePondRoom.rightPond;
                                load();
                            }],
                        [
                            ["out", "land", "back"],

                            function () {
                                log("You climb out of the pond");
                                area = areas.thePondRoom.onLand;
                                load();
                            }]
                    ]
                ],
                [
                    ["look", "see", "examine", "inspect"],
                    [
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                look("hammerheadfish", area);
                            }],
                        [
                            ["swordfish"],

                            function () {
                                look("swordfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                look("fish", area);
                            }],
                        [
                            ["right"],

                            function () {
                                if (areas.thePondRoom.rightPond.status.shark) log("To the right is a odd shape floating in the water");
                                else log("To the right is an odd shape slumped on the bottom of the pond.");
                            }],
                        [
                            ["left"],

                            function () {
                                log("the pond looks mostly safe that way...");
                            }],
                        [
                            ["forward", "wall", "straight", "ahead"],

                            function () {
                                log("The wall looks normal.");
                            }],
                        [
                            ["up", "sky", "roof"],

                            function () {
                                log("The pond is not very deep.");
                            }],
                        [
                            ["around", "everywhere", "things", "stuff"],

                            function () {
                                if (areas.thePondRoom.rightPond.status.shark) log("The pond is rather peacefull, really. The though of dramatic Irony crosses your mind.");
                                else log("Its a pond...");
                            }]
                    ]
                ]
            ]
        },
        leftPond: {
            loadText: function () {
                log("The pond is still very wet, in front of you there is a swordfish");
            },
            items: {
                fish: 0,
                swordFish: 1,
                hammerheadFish: 0
            },
            actions: [
                [
                    ["pick up", "take"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                pickUp("swordfish", area);
                            }],
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                pickUp("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                pickUp("fish", area);
                            }]
                    ]
                ],
                [
                    ["drop", "put down"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                drop("swordfish", area);
                            }],
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                drop("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                drop("fish", area);
                            }]
                    ]
                ],
                [
                    ["turn", "go", "swim"],
                    [
                        [
                            ["back", "right"],

                            function () {
                                log("You move twords the middle of the pond.");
                                area = areas.thePondRoom.middlePond;
                                load();
                            }]
                    ]
                ],
                [
                    ["look", "see", "examine", "inspect"],
                    [
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                look("hammerheadfish", area);
                            }],
                        [
                            ["swordfish"],

                            function () {
                                look("swordfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                look("fish", area);
                            }],
                        [
                            ["back", "right", "behind"],

                            function () {
                                log("The exit to the pool is that way.");
                            }],
                        [
                            ["forward", "wall", "ahead"],

                            function () {
                                log("The edge of the pool looks normal");
                            }],
                        [
                            ["up", "sky", "around"],

                            function () {
                                log("The surface of the pond is just within arm's reach");
                            }],
                        [
                            ["around", "everywhere", "stuff", "things"],

                            function () {
                                log("The water is pure and clear.");
                            }]

                    ]
                ]
            ]
        },
        rightPond: {
            loadText: function () {
                log("There is a shark right in front of you!");
            },
            items: {
                fish: 0,
                swordFish: 0,
                hammerheadFish: 0
            },
            status: {
                shark: true
            },
            actions: [
                [
                    ["pick up", "take"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                pickUp("swordfish", area);
                            }],
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                pickUp("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                pickUp("fish", area);
                            }]
                    ]
                ],
                [
                    ["drop", "put down"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                drop("swordfish", area);
                            }],
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                drop("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                drop("fish", area);
                            }]
                    ]
                ],
                [
                    ["turn", "go", "swim"],
                    [
                        [
                            ["back", "left"],

                            function () {
                                log("You move twords the middle of the pond.");
                                area = areas.thePondRoom.middlePond;
                                load();
                            }]
                    ]
                ],
                [
                    ["swing", "fight", "attack", "kill"],
                    [
                        [
                            ["shark", "monster"],

                            function () {
                                if (areas.thePondRoom.rightPond.status.shark) {
                                    if (checkInven("swordfish", 1)) {
                                        log("You take a swing at the shark, and fell the mighty beast! As its body melts away a small object dropts from it's body... it looks like a hammerheadfish!");
                                        areas.thePondRoom.rightPond.items.hammerheadFish++;
                                        areas.thePondRoom.rightPond.status.shark = false;
                                    } else log("You have no weapon to attack!");
                                } else log("The shark is dead already!");
                            }]
                    ]
                ],
                [
                    ["look", "see", "examine", "inspect"],
                    [
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                look("hammerheadfish", area);
                            }],
                        [
                            ["swordfish"],

                            function () {
                                look("swordfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                look("fish", area);
                            }],
                        [
                            ["shark", "monster"],

                            function () {
                                if (areas.thePondRoom.rightPond.status.shark) log("It has very big teath.");
                                else log("The shark is dead, thank goodness.");
                            }],
                        [
                            ["up", "sky", "roof"],

                            function () {
                                log("The surface of the water glimmers above you... how can you breath?");
                            }],
                        [
                            ["around", "everywhere", "stuff", "things"],

                            function () {
                                log("The pool is clear.");
                            }],
                        [
                            ["back", "left", "behind"],

                            function () {
                                log("Behind you the middle of the pond beckons.");
                            }]
                    ]
                ]
            ]
        }
    },
    //The Box
    theBox: {
        inBox: {
            loadText: function () {
                log("You appear to be in some sort of box, the wall to your right appears to be damaged.");
            },
            items: {
                fish: 0,
                swordFish: 0,
                hammerheadFish: 0
            },
            status: {
                wall: true
            },
            actions: [
                [
                    ["pick up", "take"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                pickUp("swordfish", area);
                            }],
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                pickUp("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                pickUp("fish", area);
                            }]
                    ]
                ],
                [
                    ["drop", "put down"],
                    [
                        [
                            ["swordfish"],

                            function () {
                                drop("swordfish", area);
                            }],
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                drop("hammerheadfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                drop("fish", area);
                            }]
                    ]
                ],
                [
                    ["attack", "strike", "hit", "hammer", "attack"],
                    [
                        [
                            ["wall", "damage", "crack", "weakness"],

                            function () {
                                if (areas.theBox.inBox.status.wall) {
                                    if (checkInven("hammerheadfish", 1)) {
                                        areas.theBox.inBox.status.wall = false;
                                        log("you slam the hammerheadfish into the wall, and it crumbles to pieces!");
                                    } else log("you have nothing to destroy the wall with!");
                                } else log("The wall is already destroyed!");
                            }]
                    ]
                ],
                [
                    ["step", "go", "leave", "use", "walk"],
                    [
                        [
                            ["wall", "space", "crack", "box"],

                            function () {
                                if (!areas.theBox.inBox.status.wall) {
                                    log("As you step out into the light, you look up, and think to yourself how glad you are that you picked up that fish! What is out here, a world of fishy goodness!");
                                } else log("The crack is not small enough to walk through!");
                            }]
                    ]
                ],
                [
                    ["look", "see", "examine", "inspect"],
                    [
                        [
                            ["hammerheadfish", "shark", "hammerhead"],

                            function () {
                                look("hammerheadfish", area);
                            }],
                        [
                            ["swordfish"],

                            function () {
                                look("swordfish", area);
                            }],
                        [
                            ["fish", "fishy"],

                            function () {
                                look("fish", area);
                            }],
                        [
                            ["wall", "crack", "walls", "damage"],

                            function () {
                                if (area.theBox.inBox.status.wall) {
                                    log("The wall has a small crack in it... a glimmer of light shines through... what is out there, anyway?");
                                } else log("The wall is no more than a pile of rubble, you are free, what is beyond this fishy cage?");
                            }],
                        [
                            ["roof", "up", "sky"],

                            function () {
                                log("You look up and see a roof, theres not much to say about it.");
                            }],
                        [
                            ["floor", "down", "ground"],

                            function () {
                                log("Its the ground...");
                            }],
                        [
                            ["around", "everywhere", "stuff", "things"],

                            function () {
                                log("The box you are in is rather ordinary really.");
                            }]
                    ]
                ]
            ]
        }
    }
};
//called when the player picks an item up, checks to see if there is an item to pick up, and if there is, adds it to the player's inventory and removes it from the area.
function pickUp(item, areaVar) {
    switch (item) {
        case "fish":
            if (areaVar.items.fish > 0) {
                log("You pick up a fish.");
                areaVar.items.fish--;
                addToInven("fish", 1);
            } else log("There are no fish here.");
            break;
        case "swordfish":
            if (areaVar.items.swordFish > 0) {
                log("You pick the a swordfish.");
                areaVar.items.swordFish--;
                addToInven("swordfish", 1);
            } else log("There is no swordfish here.");
            break;
        case "hammerheadfish":
            if (areaVar.items.hammerheadFish > 0) {
                log("You pick the a hammerheadfish.");
                areaVar.items.hammerheadFish--;
                addToInven("hammerheadfish", 1);
            } else log("There is no hammerheadfish here.");
            break;
    }
}
//called when the player drops an item, checks to see if there is an item to drop, and if there is, removes it from the player's inventory and adds it to the area.
function drop(item, areaVar) {
    switch (item) {
        case "fish":
            if (checkInven("fish", 1)) {
                log("You put down a fish in disgust, why did you pick it up anyway?");
                areaVar.items.fish++;
                removeFromInven("fish", 1);
            } else log("You posses no fish to drop.");
            break;
        case "swordfish":
            if (checkInven("swordfish", 1)) {
                log("You drop the swordfish");
                areaVar.items.swordFish++;
                removeFromInven("swordfish", 1);
            } else log("You have no swordfish to drop!");
            break;
        case "hammerheadfish":
            if (checkInven("hammerheadfish", 1)) {
                log("You drop the hammerheadfish");
                areaVar.items.hammerheadFish++;
                removeFromInven("hammerheadfish", 1);
            } else log("You have no hammerheadfish to drop!");
            break;
    }
}
//called when the player looks at an item, checks to see if there is an item to look at, and logs text.
function look(item, areaVar) {
    switch (item) {
        case "fish":
            if (areaVar.items.fish > 0) {
                log("The fish are slimy and fishy. There are " + areaVar.items.fish + " fish here.");
            } else log("There are no fish here.");
            break;
        case "swordfish":
            if (areaVar.items.swordFish > 0) {
                log("The swordfish is sharp and fishy. There are " + areaVar.items.swordFish + " fish here.");
            } else log("There are no swordfish here.");
            break;
        case "hammerheadfish":
            if (areaVar.items.hammerheadFish > 0) {
                log("The hammerheadfish is hard and fishy. There are " + areaVar.items.hammerheadFish + " fish here.");
            } else log("There are no hammerheadfish here.");
            break;
    }
}
//called when the game is started.
function startGame() {
    area = areas.theDock.onDock;
    load();
}
//called when an area is loaded, it logs the loadText to the console.
function load() {
    area.loadText();
}

function help(action) {
    if (action.indexOf("actions") != -1) {
        log("List of all actions that can be performed in this area, keep in mind that not all actions will work on every target.");
        for (i = 0; i < area.actions.length; i++) {
            log(area.actions[i][0][0]);
        }
    } else if (action.indexOf("targets") != -1) {
        log("List of all targets that can be used in this area, keep in mind that not all targets can be applied to every action.");
        var targets = [];
        for (i = 0; i < area.actions.length; i++) {
            for (e = 0; e < area.actions[i][1].length; e++) {
                if (targets.indexOf(area.actions[i][1][e][0][0]) == -1) targets.push(area.actions[i][1][e][0][0]);
            }
        }
        for (i = 0; i < targets.length; i++) log(targets[i]);
    } else {
        log("This is a text based adventure game. Congrats on knowing the most basic commnad.");
        log("To perform an action type a verb such as 'pick up', followed by a target such as 'fish'");
        log("Some examples of actions include: 'pick up, drop, go, and look.'");
        log("While targets include items like 'fish', and areas such us: 'up, back, water, dock, etc.'");
        log("When you type a valid command it will print in <span style='color:blue'>blue</span>, invalid commands in <span style='color:red'>red</span>, everything else will be in green.");
        log("Use 'help actions' or 'help targets' to get a list of actions and targets in this area.");
    }
}
//stats the game!
startGame();
