
var playerNo = [1,2,3,4];
var activePlayerNo = 0;
var dice = true;
var diceValue = 0;
var greenPlay = {g1: -1, g2: -1, g3: -1, g4: -1}
var yellowPlay = {y1: -1, y2: -1, y3: -1, y4: -1}
var yellowPlayOnBoard = {y1: -1, y2: -1, y3: -1, y4: -1}
var bluePlay = {b1: -1, b2: -1, b3: -1, b4: -1}
var bluePlayOnBoard = {b1: -1, b2: -1, b3: -1, b4: -1}
var redPlay = {r1: -1, r2: -1, r3: -1, r4: -1}
var redPlayOnBoard = {r1: -1, r2: -1, r3: -1, r4: -1}
const safeCells = [2,10,15,23,28,36,41,49]
const initial = {g: 2, y: 15, b: 28, r: 41}
const final = {g: 52, y: 13, b: 26, r: 39}
const maxCell = 51;
const homeCell = 57;

var piece = (color,id) => {return `<img src="img/${color}.png" id="${id}" onclick="play(this.id)" style="width: 100%;height: 100%;position: absolute;" alt=""/>`}

const playDice = () => {
    if(dice){
        activePlayerNo = (diceValue===0)?1:((diceValue===6)?activePlayerNo:(((activePlayerNo+1)>4)?1:activePlayerNo+1));
        diceValue = Math.floor((Math.random()*6)+1)
        dice = false;
    }
    checkAvailability();
    console.log(activePlayerNo);
    console.log(diceValue);
    if(diceValue===6){
        switch(activePlayerNo){
            case 1:
                if(greenPlay.g1<0 && greenPlay.g2<0 && greenPlay.g3<0 && greenPlay.g4<0){
                    greenPlay.g1 = initial.g;
                    document.getElementById("g1").parentNode.removeChild(document.getElementById("g1"));
                    var img = piece("green","g1")
                    document.getElementById(greenPlay["g1"].toString()).innerHTML = img;
                    dice = true;
                }
                break;
            case 2:
                if(yellowPlay.y1<0 && yellowPlay.y2<0 && yellowPlay.y3<0 && yellowPlay.y4<0){
                    yellowPlay.y1 = 1;
                    document.getElementById("y1").parentNode.removeChild(document.getElementById("y1"));
                    var img = piece("yellow","y1")
                    document.getElementById(initial.y.toString()).innerHTML = img;
                    dice = true;
                }
                break;
            case 3:
                if(bluePlay.b1<0 && bluePlay.b2<0 && bluePlay.b3<0 && bluePlay.b4<0){
                    bluePlay.b1 = 1;
                    document.getElementById("b1").parentNode.removeChild(document.getElementById("b1"));
                    var img = piece("blue","b1")
                    document.getElementById(initial.b.toString()).innerHTML = img;
                    dice = true;
                }
                break;
            case 4:
                if(redPlay.r1<0 && redPlay.r2<0 && redPlay.r3<0 && redPlay.r4<0){
                    redPlay.r1 = 1;
                    document.getElementById("r1").parentNode.removeChild(document.getElementById("r1"));
                    var img = piece("red","r1")
                    document.getElementById(initial.r.toString()).innerHTML = img;
                    dice = true;
                }
                break;
        }
    }
}

const play = (elementID) => {
    if(!dice){
        const activePlayer = ["g","y","b","r"];
        var currentElement = document.getElementById(elementID);
        if(elementID.substr(0, 1)===activePlayer[activePlayerNo-1]){
            switch(elementID.substr(0, 1)){
                case "g": 
                     if(greenPlay[elementID] === -1 && diceValue === 6){
                        greenPlay[elementID] = initial.g;
                        currentElement.parentNode.removeChild(currentElement);
                        var img = piece("green",elementID)
                        document.getElementById(greenPlay[elementID].toString()).innerHTML = img;
                        dice = true;
                    }else if(greenPlay[elementID]+diceValue<=final.g && greenPlay[elementID]>0){
                        greenPlay[elementID] += diceValue;
                        currentElement.parentNode.removeChild(currentElement);
                        var img = piece("green",elementID)
                        document.getElementById(greenPlay[elementID].toString()).innerHTML = img;
                        dice = true;
                    }else if(greenPlay[elementID]+diceValue>final.g && greenPlay[elementID] <= final.g){
                        var temp = greenPlay[elementID] + diceValue - final.g;
                        greenPlay[elementID] = 100+temp;
                        console.log(`++${greenPlay[elementID]}++`);
                        currentElement.parentNode.removeChild(currentElement);
                        var img = piece("green",elementID)
                        document.getElementById(greenPlay[elementID].toString()).innerHTML = img;
                        dice = true;
                    }else if(greenPlay[elementID]>100){
                        if(greenPlay[elementID]+diceValue <=106){
                            greenPlay[elementID] += diceValue;
                            if(greenPlay[elementID]<106){
                                currentElement.parentNode.removeChild(currentElement);
                                var img = piece("green",elementID)
                                document.getElementById(greenPlay[elementID].toString()).innerHTML = img;
                                dice = true;
                            }else{
                                var counter = 0;
                                const animFunction = () => {
                                    switch(counter){
                                        case 0:
                                            document.getElementById("home").style.borderLeft = "10px solid #008A47";
                                            document.getElementById("home").style.borderTop = "10px solid #FFD511";
                                            document.getElementById("home").style.borderRight = "10px solid #1CA3FF";
                                            document.getElementById("home").style.borderBottom = "10px solid #FB3021";
                                            break;
                                        case 1:
                                            currentElement.parentNode.removeChild(currentElement);
                                            var img = piece("green",elementID)
                                            document.getElementById("home").innerHTML = img;
                                            break;
                                        case 2:
                                            break;
                                        case 3:
                                            var img = document.getElementById(elementID);
                                            img.parentNode.removeChild(img);
                                            break;
                                        default:
                                            document.getElementById("home").style.borderLeft = "50px solid #008A47";
                                            document.getElementById("home").style.borderTop = "50px solid #FFD511";
                                            document.getElementById("home").style.borderRight = "50px solid #1CA3FF";
                                            document.getElementById("home").style.borderBottom = "50px solid #FB3021";
                                            clearInterval(anim);
                                            break;
                                    }
                                    counter++
                                }
                                const anim = setInterval(animFunction,500);
                            }
                        }else{
                            var temp = 0;
                            for(var i=1; i<5; i++){
                                if((greenPlay[`g${i}`]<0 && diceValue===6) || (greenPlay[`g${i}`]+diceValue<=final.g && greenPlay[`g${i}`]>0) || (greenPlay[`g${i}`]+diceValue<=106 && greenPlay[`g${i}`]>0)){
                                    alert("Please Select Diferent Piece");
                                    temp++;
                                    break;
                                }
                            }
                            if(temp===0){
                                alert("There is no valid space available");
                                dice = true;
                            }
                        }
                    }
                    break;
                case "y":
                    if(yellowPlay[elementID] === -1 && diceValue === 6){
                        yellowPlay[elementID] = 1;
                        yellowPlayOnBoard[elementID] = initial.y;
                        currentElement.parentNode.removeChild(currentElement);
                        var img = piece("yellow",elementID)
                        document.getElementById(initial.y.toString()).innerHTML = img;
                        dice = true;
                    }else if(yellowPlay[elementID]+diceValue<=maxCell && yellowPlay[elementID]>0){
                        yellowPlay[elementID] += diceValue;   
                        const finalVal = (yellowPlay[elementID]>38)?yellowPlay[elementID]-38:14+yellowPlay[elementID];
                        yellowPlayOnBoard[elementID] = finalVal;
                        currentElement.parentNode.removeChild(currentElement);
                        var img = piece("yellow",elementID)
                        document.getElementById(finalVal.toString()).innerHTML = img;
                        dice = true;
                    }else if(yellowPlay[elementID]+diceValue>maxCell && yellowPlay[elementID] <= maxCell){
                        var temp = yellowPlay[elementID] + diceValue - maxCell;
                        yellowPlay[elementID] = yellowPlay[elementID] + diceValue;
                        const finalVal = 200+temp;
                        yellowPlayOnBoard[elementID] = finalVal;
                        currentElement.parentNode.removeChild(currentElement);
                        var img = piece("yellow",elementID)
                        document.getElementById(finalVal.toString()).innerHTML = img;
                        dice = true;
                    }else if(yellowPlay[elementID]>maxCell){
                        if(yellowPlay[elementID]+diceValue <=homeCell){
                            yellowPlay[elementID] += diceValue;
                            if(yellowPlay[elementID]<homeCell){
                                const finalVal = 200+(yellowPlay[elementID]-maxCell);
                                yellowPlayOnBoard[elementID] = finalVal;
                                currentElement.parentNode.removeChild(currentElement);
                                var img = piece("yellow",elementID)
                                document.getElementById(finalVal.toString()).innerHTML = img;
                                dice = true;
                            }else{
                                var counter = 0;
                                const finalVal = 200+(yellowPlay[elementID]-maxCell);
                                yellowPlayOnBoard[elementID] = finalVal;
                                const animFunction = () => {
                                    switch(counter){
                                        case 0:
                                            document.getElementById("home").style.borderLeft = "10px solid #008A47";
                                            document.getElementById("home").style.borderTop = "10px solid #FFD511";
                                            document.getElementById("home").style.borderRight = "10px solid #1CA3FF";
                                            document.getElementById("home").style.borderBottom = "10px solid #FB3021";
                                            break;
                                        case 1:
                                            currentElement.parentNode.removeChild(currentElement);
                                            var img = piece("yellow",elementID)
                                            document.getElementById("home").innerHTML = img;
                                            break;
                                        case 2:
                                            break;
                                        case 3:
                                            var img = document.getElementById(elementID);
                                            img.parentNode.removeChild(img);
                                            break;
                                        default:
                                            document.getElementById("home").style.borderLeft = "50px solid #008A47";
                                            document.getElementById("home").style.borderTop = "50px solid #FFD511";
                                            document.getElementById("home").style.borderRight = "50px solid #1CA3FF";
                                            document.getElementById("home").style.borderBottom = "50px solid #FB3021";
                                            clearInterval(anim);
                                            break;
                                    }
                                    counter++
                                }
                                const anim = setInterval(animFunction,500);
                            }
                        }else{
                            var temp = 0;
                            for(var i=1; i<5; i++){
                                if((yellowPlay[`g${i}`]<0 && diceValue===6) || (yellowPlay[`g${i}`]+diceValue<=maxCell && yellowPlay[`g${i}`]>0) || (yellowPlay[`g${i}`]+diceValue<=homeCell && yellowPlay[`g${i}`]>0)){
                                    alert("Please Select Diferent Piece");
                                    temp++;
                                    break;
                                }
                            }
                            if(temp===0){
                                alert("There is no valid space available");
                                dice = true;
                            }
                        }
                    }
                    break;
                case "b":
                    if(bluePlay[elementID] === -1 && diceValue === 6){
                        bluePlay[elementID] = 1;
                        bluePlayOnBoard[elementID] = initial.b;
                        currentElement.parentNode.removeChild(currentElement);
                        var img = piece("blue",elementID)
                        document.getElementById(initial.b.toString()).innerHTML = img;
                        dice = true;
                    }else if(bluePlay[elementID]+diceValue<=maxCell && bluePlay[elementID]>0){
                        bluePlay[elementID] += diceValue;
                        const finalVal = (bluePlay[elementID]>25)?bluePlay[elementID]-25:27+bluePlay[elementID];
                        bluePlayOnBoard[elementID] = finalVal;
                        currentElement.parentNode.removeChild(currentElement);
                        var img = piece("blue",elementID)
                        document.getElementById(finalVal.toString()).innerHTML = img;
                        dice = true;
                    }else if(bluePlay[elementID]+diceValue>maxCell && bluePlay[elementID] <= maxCell){
                        var temp = bluePlay[elementID] + diceValue - maxCell;
                        bluePlay[elementID] = bluePlay[elementID] + diceValue;
                        const finalVal = 300+temp;
                        bluePlayOnBoard[elementID] = finalVal;
                        currentElement.parentNode.removeChild(currentElement);
                        var img = piece("blue",elementID)
                        document.getElementById(finalVal.toString()).innerHTML = img;
                        dice = true;
                    }else if(bluePlay[elementID]>maxCell){
                        if(bluePlay[elementID]+diceValue <=homeCell){
                            bluePlay[elementID] += diceValue;
                            if(bluePlay[elementID]<homeCell){
                                const finalVal = 300+(bluePlay[elementID]-maxCell);
                                bluePlayOnBoard[elementID] = finalVal;
                                currentElement.parentNode.removeChild(currentElement);
                                var img = piece("blue",elementID)
                                document.getElementById(finalVal.toString()).innerHTML = img;
                                dice = true;
                            }else{
                                var counter = 0;
                                const finalVal = 300+(bluePlay[elementID]-maxCell);
                                bluePlayOnBoard[elementID] = finalVal;
                                const animFunction = () => {
                                    switch(counter){
                                        case 0:
                                            document.getElementById("home").style.borderLeft = "10px solid #008A47";
                                            document.getElementById("home").style.borderTop = "10px solid #FFD511";
                                            document.getElementById("home").style.borderRight = "10px solid #1CA3FF";
                                            document.getElementById("home").style.borderBottom = "10px solid #FB3021";
                                            break;
                                        case 1:
                                            currentElement.parentNode.removeChild(currentElement);
                                            var img = piece("blue",elementID)
                                            document.getElementById("home").innerHTML = img;
                                            break;
                                        case 2:
                                            break;
                                        case 3:
                                            var img = document.getElementById(elementID);
                                            img.parentNode.removeChild(img);
                                            break;
                                        default:
                                            document.getElementById("home").style.borderLeft = "50px solid #008A47";
                                            document.getElementById("home").style.borderTop = "50px solid #FFD511";
                                            document.getElementById("home").style.borderRight = "50px solid #1CA3FF";
                                            document.getElementById("home").style.borderBottom = "50px solid #FB3021";
                                            clearInterval(anim);
                                            break;
                                    }
                                    counter++
                                }
                                const anim = setInterval(animFunction,500);
                            }
                        }else{
                            var temp = 0;
                            for(var i=1; i<5; i++){
                                if((bluePlay[`g${i}`]<0 && diceValue===6) || (bluePlay[`g${i}`]+diceValue<=maxCell && bluePlay[`g${i}`]>0) || (bluePlay[`g${i}`]+diceValue<=homeCell && bluePlay[`g${i}`]>0)){
                                    alert("Please Select Diferent Piece");
                                    temp++;
                                    break;
                                }
                            }
                            if(temp===0){
                                alert("There is no valid space available");
                                dice = true;
                            }
                        }
                    }
                    break;
                case "r":
                    if(redPlay[elementID] === -1 && diceValue === 6){
                        redPlay[elementID] = 1;
                        redPlayOnBoard[elementID] = initial.r;
                        currentElement.parentNode.removeChild(currentElement);
                        var img = piece("red",elementID)
                        document.getElementById(initial.r.toString()).innerHTML = img;
                        dice = true;
                    }else if(redPlay[elementID]+diceValue<=maxCell && redPlay[elementID]>0){
                        redPlay[elementID] += diceValue;
                        const finalVal = (redPlay[elementID]>12)?redPlay[elementID]-12:40+redPlay[elementID];
                        redPlayOnBoard[elementID] = finalVal;
                        currentElement.parentNode.removeChild(currentElement);
                        var img = piece("red",elementID)
                        document.getElementById(finalVal.toString()).innerHTML = img;
                        dice = true;
                    }else if(redPlay[elementID]+diceValue>maxCell && redPlay[elementID] <= maxCell){
                        var temp = redPlay[elementID] + diceValue - maxCell;
                        redPlay[elementID] = redPlay[elementID] + diceValue;
                        const finalVal = 400+temp;
                        redPlayOnBoard[elementID] = finalVal;
                        currentElement.parentNode.removeChild(currentElement);
                        var img = piece("red",elementID)
                        document.getElementById(finalVal.toString()).innerHTML = img;
                        dice = true;
                    }else if(redPlay[elementID]>maxCell){
                        if(redPlay[elementID]+diceValue <=homeCell){
                            redPlay[elementID] += diceValue;
                            if(redPlay[elementID]<homeCell){
                                const finalVal = 400+(redPlay[elementID]-maxCell);
                                redPlayOnBoard[elementID] = finalVal;
                                currentElement.parentNode.removeChild(currentElement);
                                var img = piece("red",elementID)
                                document.getElementById(finalVal.toString()).innerHTML = img;
                                dice = true;
                            }else{
                                var counter = 0;
                                const finalVal = 400+(redPlay[elementID]-maxCell);
                                redPlayOnBoard[elementID] = finalVal;
                                const animFunction = () => {
                                    switch(counter){
                                        case 0:
                                            document.getElementById("home").style.borderLeft = "10px solid #008A47";
                                            document.getElementById("home").style.borderTop = "10px solid #FFD511";
                                            document.getElementById("home").style.borderRight = "10px solid #1CA3FF";
                                            document.getElementById("home").style.borderBottom = "10px solid #FB3021";
                                            break;
                                        case 1:
                                            currentElement.parentNode.removeChild(currentElement);
                                            var img = piece("red",elementID)
                                            document.getElementById("home").innerHTML = img;
                                            break;
                                        case 2:
                                            break;
                                        case 3:
                                            var img = document.getElementById(elementID);
                                            img.parentNode.removeChild(img);
                                            break;
                                        default:
                                            document.getElementById("home").style.borderLeft = "50px solid #008A47";
                                            document.getElementById("home").style.borderTop = "50px solid #FFD511";
                                            document.getElementById("home").style.borderRight = "50px solid #1CA3FF";
                                            document.getElementById("home").style.borderBottom = "50px solid #FB3021";
                                            clearInterval(anim);
                                            break;
                                    }
                                    counter++
                                }
                                const anim = setInterval(animFunction,500);
                            }
                        }else{
                            var temp = 0;
                            for(var i=1; i<5; i++){
                                if((redPlay[`g${i}`]<0 && diceValue===6) || (redPlay[`g${i}`]+diceValue<=maxCell && redPlay[`g${i}`]>0) || (redPlay[`g${i}`]+diceValue<=homeCell && redPlay[`g${i}`]>0)){
                                    alert("Please Select Diferent Piece");
                                    temp++;
                                    break;
                                }
                            }
                            if(temp===0){
                                alert("There is no valid space available");
                                dice = true;
                            }
                        }
                    }
                    break;
            }
        }
    }
}

const checkAvailability = () => {
    switch(activePlayerNo){
        case 1:
                if(greenPlay.g1<0 && greenPlay.g2<0 && greenPlay.g3<0 && greenPlay.g4<0 && diceValue!==6){
                    dice = true;
                }
                break;
            case 2:
                if(yellowPlay.y1<0 && yellowPlay.y2<0 && yellowPlay.y3<0 && yellowPlay.y4<0 && diceValue!==6){
                    dice = true;
                }
                break;
            case 3:
                if(bluePlay.b1<0 && bluePlay.b2<0 && bluePlay.b3<0 && bluePlay.b4<0 && diceValue!==6){
                    dice = true;
                }
                break;
            case 4:
                if(redPlay.r1<0 && redPlay.r2<0 && redPlay.r3<0 && redPlay.r4<0 && diceValue!==6){
                    dice = true;
                }
                break;
    }
    
}

const isItSafeCell = (eId) => {
    switch(eId.substr(0, 1)){
        case 'g':
            safeCells.forEach(safe => {
                if(greenPlay[eId]===safe){
                    return true;
                } 
            });
            return false;
        case 'y':
            safeCells.forEach(safe => {
                if(yellowPlayOnBoard[eId]===safe){
                    return true;
                } 
            });
            return false;
        case 'b':
            safeCells.forEach(safe => {
                if(bluePlayOnBoard[eId]===safe){
                    return true;
                } 
            });
            return false;
        case 'r':
            safeCells.forEach(safe => {
                if(redPlayOnBoard[eId]===safe){
                    return true;
                } 
            });
            return false;
    }
}

const isSomeoneInside = (eId) => {
    switch(eId.substr(0, 1)){
        case 'g':
            for(var i=1; i<5; i++){
                if(greenPlay[eId]===greenPlay[`g${i}`] && `g${i}`!== eId){
                    return true;
                }else if(greenPlay[eId]===yellowPlayOnBoard[`y${i}`]){
                    return true;
                }else if(greenPlay[eId]===bluePlayOnBoard[`b${i}`]){
                    return true;
                }else if(greenPlay[eId]===redPlayOnBoard[`r${i}`]){
                    return true;
                }
            };
            return false;
        case 'y':
            for(var i=1; i<5; i++){
                if(yellowPlayOnBoard[eId]===yellowPlayOnBoard[`y${i}`] && `y${i}`!== eId){
                    return true;
                }else if(yellowPlayOnBoard[eId]===greenPlay[`g${i}`]){
                    return true;
                }else if(yellowPlayOnBoard[eId]===bluePlayOnBoard[`b${i}`]){
                    return true;
                }else if(yellowPlayOnBoard[eId]===redPlayOnBoard[`r${i}`]){
                    return true;
                }
            };
            return false;
        case 'b':
            for(var i=1; i<5; i++){
                if(bluePlayOnBoard[eId]===bluePlayOnBoard[`b${i}`] && `b${i}`!== eId){
                    return true;
                }else if(bluePlayOnBoard[eId]===greenPlay[`g${i}`]){
                    return true;
                }else if(bluePlayOnBoard[eId]===yellowPlayOnBoard[`y${i}`]){
                    return true;
                }else if(bluePlayOnBoard[eId]===redPlayOnBoard[`r${i}`]){
                    return true;
                }
            };
            return false;
        case 'r':
            for(var i=1; i<5; i++){
                if(redPlayOnBoard[eId]===redPlayOnBoard[`r${i}`] && `r${i}`!== eId){
                    return true;
                }else if(redPlayOnBoard[eId]===greenPlay[`g${i}`]){
                    return true;
                }else if(redPlayOnBoard[eId]===yellowPlayOnBoard[`y${i}`]){
                    return true;
                }else if(redPlayOnBoard[eId]===bluePlayOnBoard[`b${i}`]){
                    return true;
                }
            };
            return false;
    }
}

const isItMe = (eid) => {
    switch(id.substr(0, 1)){
        case "g":
            for(var i=1; i<5; i++){
                if(greenPlay[eId]===greenPlay[`g${i}`] && `g${i}`!== eId){
                    return true;
                }
            };
            break;
        case "y":
            for(var i=1; i<5; i++){
                if(yellowPlayOnBoard[eId]===yellowPlayOnBoard[`y${i}`] && `y${i}`!== eId){
                    return true;
                }
            };
            break;
        case "b":
            for(var i=1; i<5; i++){
                if(bluePlayOnBoard[eId]===bluePlayOnBoard[`b${i}`] && `b${i}`!== eId){
                    return true;
                }
            };
            break;
        case "r":
            for(var i=1; i<5; i++){
                if(redPlayOnBoard[eId]===redPlayOnBoard[`r${i}`] && `r${i}`!== eId){
                    return true;
                }
            };
            break;
    }
}

var id = "g1";
if(isItSafeCell(id) && isSomeoneInside(id)){
    switch(id.substr(0, 1)){
        case 'g':
            var cell = document.getElementById(greenPlay[id].toString());
            var cellChildrens = cell.children;
            switch(cellChildrens.length){
                case 1:
                    var img = piece("green",id);
                    cell.innerHTML += img;
                    cellChildrens[0].style.width = "60%";
                    cellChildrens[0].style.height = "60%";
                    cellChildrens[1].style.width = "60%";
                    cellChildrens[1].style.height = "60%";
                    cellChildrens[1].style.right = "0";
                    cellChildrens[1].style.bottom = "0";
                    break;
                case 2:
                    var img = piece("green",id);
                    cell.innerHTML += img;
                    cellChildrens[2].style.width = "60%";
                    cellChildrens[2].style.height = "60%";
                    cellChildrens[2].style.right = "0";
                    break;
                case 3:
                    var img = piece("green",id);
                    cell.innerHTML += img;
                    cellChildrens[3].style.width = "60%";
                    cellChildrens[3].style.height = "60%";
                    cellChildrens[3].style.bottom = "0";
                    break;
                case 4:
                    var img = piece("green",id);
                    cell.innerHTML += img;
                    cellChildrens[4].style.width = "60%";
                    cellChildrens[4].style.height = "60%";
                    cellChildrens[4].style.bottom = "20%";
                    cellChildrens[4].style.left = "20%";
                    break;
                case 5:
                    var img = piece("green",id);
                    cell.innerHTML += img;
                    cellChildrens[1].style.bottom = "20%";
                    cellChildrens[1].style.left = "0";
                    cellChildrens[1].style.removeProperty('right')
                    cellChildrens[2].style.bottom = "0";
                    cellChildrens[2].style.left = "0";
                    cellChildrens[2].style.removeProperty('right')
                    cellChildrens[3].style.right = "0";
                    cellChildrens[3].style.removeProperty('bottom')
                    cellChildrens[4].style.right = "0";
                    cellChildrens[4].style.removeProperty('left')
                    cellChildrens[5].style.width = "60%";
                    cellChildrens[5].style.height = "60%";
                    cellChildrens[5].style.bottom = "0";
                    cellChildrens[5].style.right = "0";
                    break;
            }
            break;
        case 'y':
            var cell = document.getElementById(yellowPlayOnBoard[id].toString());
            var cellChildrens = cell.children;
            switch(cellChildrens.length){
                case 1:
                    var img = piece("yellow",id);
                    cell.innerHTML += img;
                    cellChildrens[0].style.width = "60%";
                    cellChildrens[0].style.height = "60%";
                    cellChildrens[1].style.width = "60%";
                    cellChildrens[1].style.height = "60%";
                    cellChildrens[1].style.right = "0";
                    cellChildrens[1].style.bottom = "0";
                    break;
                case 2:
                    var img = piece("yellow",id);
                    cell.innerHTML += img;
                    cellChildrens[2].style.width = "60%";
                    cellChildrens[2].style.height = "60%";
                    cellChildrens[2].style.right = "0";
                    break;
                case 3:
                    var img = piece("yellow",id);
                    cell.innerHTML += img;
                    cellChildrens[3].style.width = "60%";
                    cellChildrens[3].style.height = "60%";
                    cellChildrens[3].style.bottom = "0";
                    break;
                case 4:
                    var img = piece("yellow",id);
                    cell.innerHTML += img;
                    cellChildrens[4].style.width = "60%";
                    cellChildrens[4].style.height = "60%";
                    cellChildrens[4].style.bottom = "20%";
                    cellChildrens[4].style.left = "20%";
                    break;
                case 5:
                    var img = piece("yellow",id);
                    cell.innerHTML += img;
                    cellChildrens[1].style.bottom = "20%";
                    cellChildrens[1].style.left = "0";
                    cellChildrens[1].style.removeProperty('right')
                    cellChildrens[2].style.bottom = "0";
                    cellChildrens[2].style.left = "0";
                    cellChildrens[2].style.removeProperty('right')
                    cellChildrens[3].style.right = "0";
                    cellChildrens[3].style.removeProperty('bottom')
                    cellChildrens[4].style.right = "0";
                    cellChildrens[4].style.removeProperty('left')
                    cellChildrens[5].style.width = "60%";
                    cellChildrens[5].style.height = "60%";
                    cellChildrens[5].style.bottom = "0";
                    cellChildrens[5].style.right = "0";
                    break;
            }
            break;
        case 'b':
            var cell = document.getElementById(bluePlayOnBoard[id].toString());
            var cellChildrens = cell.children;
            switch(cellChildrens.length){
                case 1:
                    var img = piece("blue",id);
                    cell.innerHTML += img;
                    cellChildrens[0].style.width = "60%";
                    cellChildrens[0].style.height = "60%";
                    cellChildrens[1].style.width = "60%";
                    cellChildrens[1].style.height = "60%";
                    cellChildrens[1].style.right = "0";
                    cellChildrens[1].style.bottom = "0";
                    break;
                case 2:
                    var img = piece("blue",id);
                    cell.innerHTML += img;
                    cellChildrens[2].style.width = "60%";
                    cellChildrens[2].style.height = "60%";
                    cellChildrens[2].style.right = "0";
                    break;
                case 3:
                    var img = piece("blue",id);
                    cell.innerHTML += img;
                    cellChildrens[3].style.width = "60%";
                    cellChildrens[3].style.height = "60%";
                    cellChildrens[3].style.bottom = "0";
                    break;
                case 4:
                    var img = piece("blue",id);
                    cell.innerHTML += img;
                    cellChildrens[4].style.width = "60%";
                    cellChildrens[4].style.height = "60%";
                    cellChildrens[4].style.bottom = "20%";
                    cellChildrens[4].style.left = "20%";
                    break;
                case 5:
                    var img = piece("blue",id);
                    cell.innerHTML += img;
                    cellChildrens[1].style.bottom = "20%";
                    cellChildrens[1].style.left = "0";
                    cellChildrens[1].style.removeProperty('right')
                    cellChildrens[2].style.bottom = "0";
                    cellChildrens[2].style.left = "0";
                    cellChildrens[2].style.removeProperty('right')
                    cellChildrens[3].style.right = "0";
                    cellChildrens[3].style.removeProperty('bottom')
                    cellChildrens[4].style.right = "0";
                    cellChildrens[4].style.removeProperty('left')
                    cellChildrens[5].style.width = "60%";
                    cellChildrens[5].style.height = "60%";
                    cellChildrens[5].style.bottom = "0";
                    cellChildrens[5].style.right = "0";
                    break;
            }
            break;
        case 'r':
            var cell = document.getElementById(redPlayOnBoard[id].toString());
            var cellChildrens = cell.children;
            switch(cellChildrens.length){
                case 1:
                    var img = piece("red",id);
                    cell.innerHTML += img;
                    cellChildrens[0].style.width = "60%";
                    cellChildrens[0].style.height = "60%";
                    cellChildrens[1].style.width = "60%";
                    cellChildrens[1].style.height = "60%";
                    cellChildrens[1].style.right = "0";
                    cellChildrens[1].style.bottom = "0";
                    break;
                case 2:
                    var img = piece("red",id);
                    cell.innerHTML += img;
                    cellChildrens[2].style.width = "60%";
                    cellChildrens[2].style.height = "60%";
                    cellChildrens[2].style.right = "0";
                    break;
                case 3:
                    var img = piece("red",id);
                    cell.innerHTML += img;
                    cellChildrens[3].style.width = "60%";
                    cellChildrens[3].style.height = "60%";
                    cellChildrens[3].style.bottom = "0";
                    break;
                case 4:
                    var img = piece("red",id);
                    cell.innerHTML += img;
                    cellChildrens[4].style.width = "60%";
                    cellChildrens[4].style.height = "60%";
                    cellChildrens[4].style.bottom = "20%";
                    cellChildrens[4].style.left = "20%";
                    break;
                case 5:
                    var img = piece("red",id);
                    cell.innerHTML += img;
                    cellChildrens[1].style.bottom = "20%";
                    cellChildrens[1].style.left = "0";
                    cellChildrens[1].style.removeProperty('right')
                    cellChildrens[2].style.bottom = "0";
                    cellChildrens[2].style.left = "0";
                    cellChildrens[2].style.removeProperty('right')
                    cellChildrens[3].style.right = "0";
                    cellChildrens[3].style.removeProperty('bottom')
                    cellChildrens[4].style.right = "0";
                    cellChildrens[4].style.removeProperty('left')
                    cellChildrens[5].style.width = "60%";
                    cellChildrens[5].style.height = "60%";
                    cellChildrens[5].style.bottom = "0";
                    cellChildrens[5].style.right = "0";
                    break;
            }
            break;
                                
    }
}else if(isItSafeCell(id) && !isSomeoneInside(id)){
    var temp = {g:"green",y:"yellow",b:"blue",r:"red"};
    var img = piece(temp[id.substr(0, 1)],id)
    var finalVal = (id.substr(0, 1)==="g")?greenPlay[id]:((id.substr(0, 1)==="y")?yellowPlayOnBoard[id]:((id.substr(0, 1)==="b")?bluePlayOnBoard[id]:redPlayOnBoard[id]))
    document.getElementById(finalVal.toString()).innerHTML = img;
}else if(!isItSafeCell(id) && !isSomeoneInside(id)){
    var temp = {g:"green",y:"yellow",b:"blue",r:"red"};
    var img = piece(temp[id.substr(0, 1)],id)
    var finalVal = (id.substr(0, 1)==="g")?greenPlay[id]:((id.substr(0, 1)==="y")?yellowPlayOnBoard[id]:((id.substr(0, 1)==="b")?bluePlayOnBoard[id]:redPlayOnBoard[id]))
    document.getElementById(finalVal.toString()).innerHTML = img;
}else if(!isItSafeCell(id) && isSomeoneInside(id)){
    if(isItMe){
        switch(id.substr(0, 1)){
            case 'g':
                var cell = document.getElementById(greenPlay[id].toString());
                var cellChildrens = cell.children;
                switch(cellChildrens.length){
                    case 1:
                        var img = piece("green",id);
                        cell.innerHTML += img;
                        cellChildrens[0].style.width = "60%";
                        cellChildrens[0].style.height = "60%";
                        cellChildrens[1].style.width = "60%";
                        cellChildrens[1].style.height = "60%";
                        cellChildrens[1].style.right = "0";
                        cellChildrens[1].style.bottom = "0";
                        break;
                    case 2:
                        var img = piece("green",id);
                        cell.innerHTML += img;
                        cellChildrens[2].style.width = "60%";
                        cellChildrens[2].style.height = "60%";
                        cellChildrens[2].style.right = "0";
                        break;
                    case 3:
                        var img = piece("green",id);
                        cell.innerHTML += img;
                        cellChildrens[3].style.width = "60%";
                        cellChildrens[3].style.height = "60%";
                        cellChildrens[3].style.bottom = "0";
                        break;
                }
                break;
            case 'y':
                var cell = document.getElementById(yellowPlayOnBoard[id].toString());
                var cellChildrens = cell.children;
                switch(cellChildrens.length){
                    case 1:
                        var img = piece("yellow",id);
                        cell.innerHTML += img;
                        cellChildrens[0].style.width = "60%";
                        cellChildrens[0].style.height = "60%";
                        cellChildrens[1].style.width = "60%";
                        cellChildrens[1].style.height = "60%";
                        cellChildrens[1].style.right = "0";
                        cellChildrens[1].style.bottom = "0";
                        break;
                    case 2:
                        var img = piece("yellow",id);
                        cell.innerHTML += img;
                        cellChildrens[2].style.width = "60%";
                        cellChildrens[2].style.height = "60%";
                        cellChildrens[2].style.right = "0";
                        break;
                    case 3:
                        var img = piece("yellow",id);
                        cell.innerHTML += img;
                        cellChildrens[3].style.width = "60%";
                        cellChildrens[3].style.height = "60%";
                        cellChildrens[3].style.bottom = "0";
                        break;
                }
                break;
            case 'b':
                var cell = document.getElementById(bluePlayOnBoard[id].toString());
                var cellChildrens = cell.children;
                switch(cellChildrens.length){
                    case 1:
                        var img = piece("blue",id);
                        cell.innerHTML += img;
                        cellChildrens[0].style.width = "60%";
                        cellChildrens[0].style.height = "60%";
                        cellChildrens[1].style.width = "60%";
                        cellChildrens[1].style.height = "60%";
                        cellChildrens[1].style.right = "0";
                        cellChildrens[1].style.bottom = "0";
                        break;
                    case 2:
                        var img = piece("blue",id);
                        cell.innerHTML += img;
                        cellChildrens[2].style.width = "60%";
                        cellChildrens[2].style.height = "60%";
                        cellChildrens[2].style.right = "0";
                        break;
                    case 3:
                        var img = piece("blue",id);
                        cell.innerHTML += img;
                        cellChildrens[3].style.width = "60%";
                        cellChildrens[3].style.height = "60%";
                        cellChildrens[3].style.bottom = "0";
                        break;
                }
                break;
            case 'r':
                var cell = document.getElementById(redPlayOnBoard[id].toString());
                var cellChildrens = cell.children;
                switch(cellChildrens.length){
                    case 1:
                        var img = piece("red",id);
                        cell.innerHTML += img;
                        cellChildrens[0].style.width = "60%";
                        cellChildrens[0].style.height = "60%";
                        cellChildrens[1].style.width = "60%";
                        cellChildrens[1].style.height = "60%";
                        cellChildrens[1].style.right = "0";
                        cellChildrens[1].style.bottom = "0";
                        break;
                    case 2:
                        var img = piece("red",id);
                        cell.innerHTML += img;
                        cellChildrens[2].style.width = "60%";
                        cellChildrens[2].style.height = "60%";
                        cellChildrens[2].style.right = "0";
                        break;
                    case 3:
                        var img = piece("red",id);
                        cell.innerHTML += img;
                        cellChildrens[3].style.width = "60%";
                        cellChildrens[3].style.height = "60%";
                        cellChildrens[3].style.bottom = "0";
                        break;
                }
                break;
        }
    }else{
        
    }
}