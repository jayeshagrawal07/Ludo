var winner = 1;
var gameIsActive = true;
var playerNo = [1,2,3,4];
var playerLength = playerNo.length;
var piecesInHome = {g:0, y:0, b:0, r:0};
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
var rollMe = document.getElementById("rollMe");
var threeSixCheck = [0,0,0];
var piece = (color,id) => {return `<img src="img/${color}.png" id="${id}" onclick="play(this.id)" style="width: 100%;height: 100%;position: absolute;" alt=""/>`}
var playerName = document.getElementById("playerName");
playerName.innerHTML = "Green";
var tempa = -1;
const playDice = () => {
    if(dice && gameIsActive){
        rollMe.style.visibility = "hidden";
        var counter = 1;
        const animFunction = () => {
            diceAnimation(counter);
            counter=(counter<6)?counter+1:1;
        }
        const anim = setInterval(animFunction,100);
        if(playerLength===playerNo.length && !(diceValue===6 || diceValue===7)){
            tempa = (tempa<3)?tempa+1:0;
        }else if((activePlayerNo === 4 || (activePlayerNo === 3 && playerNo.length===3)) && !(diceValue===6 || diceValue===7)){
            tempa=0;
        }
        playerLength = playerNo.length;
        // activePlayerNo = (diceValue===0)?1:((diceValue===6 || diceValue===7)?activePlayerNo:(((activePlayerNo+1)>4)?1:activePlayerNo+1));
        activePlayerNo = (diceValue===0)?1:((diceValue===6 || diceValue===7)?activePlayerNo:playerNo[tempa]);
        diceValue = Math.floor((Math.random()*6)+1)
        if(diceValue===6){
            if(activePlayerNo===threeSixCheck[0]){
                if(threeSixCheck[1]===6&&threeSixCheck[2]===6){
                    dice=true;
                    diceValue = 2;
                    changeName(activePlayerNo);
                    alert("You got three sixes in row");
                }else{
                    threeSixCheck[2] = diceValue;
                }
            }else{
                threeSixCheck[0] = activePlayerNo;
                threeSixCheck[1] = diceValue;
                threeSixCheck[2] = 0;
            }
        }else{
            threeSixCheck[0] = 0;
            threeSixCheck[1] = 0;
            threeSixCheck[2] = 0;
        }
        setTimeout(()=>{
            clearInterval(anim);
            var diceImg = document.getElementById("dice");
            diceImg.src = `img/dice${diceValue}.png`;
            checkAvailability();
            if(diceValue===6){
                switch(activePlayerNo){
                    case 1:
                        if(greenPlay.g1<0 && greenPlay.g2<0 && greenPlay.g3<0 && greenPlay.g4<0){
                            greenPlay.g1 = initial.g;
                            document.getElementById("g1").parentNode.removeChild(document.getElementById("g1"));
                            finalCheck("g1");
                            dice = true;
                        }
                        break;
                    case 2:
                        if(yellowPlay.y1<0 && yellowPlay.y2<0 && yellowPlay.y3<0 && yellowPlay.y4<0){
                            yellowPlay.y1 = 1;
                            yellowPlayOnBoard.y1 = initial.y;
                            document.getElementById("y1").parentNode.removeChild(document.getElementById("y1"));
                            finalCheck("y1");
                            dice = true;
                        }
                        break;
                    case 3:
                        if(bluePlay.b1<0 && bluePlay.b2<0 && bluePlay.b3<0 && bluePlay.b4<0){
                            bluePlay.b1 = 1;
                            bluePlayOnBoard.b1 = initial.b;
                            document.getElementById("b1").parentNode.removeChild(document.getElementById("b1"));
                            finalCheck("b1");
                            dice = true;
                        }
                        break;
                    case 4:
                        if(redPlay.r1<0 && redPlay.r2<0 && redPlay.r3<0 && redPlay.r4<0){
                            redPlay.r1 = 1;
                            redPlayOnBoard.r1 = initial.r;
                            document.getElementById("r1").parentNode.removeChild(document.getElementById("r1"));
                            finalCheck("r1");
                            dice = true;
                        }
                        break;
                }
            }
        },2000);
        dice = false;
    }
    
    console.log(activePlayerNo);
    console.log(diceValue);
    
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
                        finalCheck(elementID);
                        dice = true;
                    }else if(greenPlay[elementID]+diceValue<=final.g && greenPlay[elementID]>0){
                        greenPlay[elementID] += diceValue;
                        currentElement.parentNode.removeChild(currentElement);
                        finalCheck(elementID);
                        dice = true;
                    }else if(greenPlay[elementID]+diceValue>final.g && greenPlay[elementID] <= final.g){
                        var temp = greenPlay[elementID] + diceValue - final.g;
                        greenPlay[elementID] = 100+temp;
                        currentElement.parentNode.removeChild(currentElement);
                        finalCheck(elementID);
                        dice = true;
                    }else if(greenPlay[elementID]>100){
                        if(greenPlay[elementID]+diceValue <=106){
                            greenPlay[elementID] += diceValue;
                            if(greenPlay[elementID]<106){
                                currentElement.parentNode.removeChild(currentElement);
                                finalCheck(elementID);
                                dice = true;
                            }else{
                                var counter = 0;
                                const animFunction = () => {
                                    homeAnimation(counter,"green",elementID,currentElement,anim);
                                    counter++
                                }
                                const anim = setInterval(animFunction,500);
                                diceValue = 7;
                                piecesInHome.g++;
                                document.getElementById("player1Score").innerHTML = piecesInHome.g.toString();
                                if(piecesInHome.g===4){
                                    document.getElementById("player1Score").innerHTML = (winner===1)?"1st":((winner===2)?"2nd":((winner===3)?"3rd":"4th"));
                                    if(winner===3){
                                        var lastWinner = (piecesInHome.g<4)?"g1":((piecesInHome.y<4)?"y2":((piecesInHome.b<4)?"b3":"r4"));
                                        document.getElementById(`player${lastWinner.substr(1)}Score`).innerHTML = "4th";
                                        gameIsActive = false
                                    }else{
                                        winner++;
                                    }
                                }
                                if(gameIsActive){
                                    var winnerBeforeMe = (piecesInHome.g===4)?"g":((piecesInHome.y===4)?"y":((piecesInHome.b===4)?"b":((piecesInHome.r===4)?"r":"")))
                                    playerNo = (winner===2)?[2,3,4]:((winnerBeforeMe === "y")?[3,4]:((winnerBeforeMe === "b")?[2,4]:[2,3]));
                                    diceValue = 2;
                                }
                                dice = true;
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
                        finalCheck(elementID);
                        dice = true;
                    }else if(yellowPlay[elementID]+diceValue<=maxCell && yellowPlay[elementID]>0){
                        yellowPlay[elementID] += diceValue;   
                        const finalVal = (yellowPlay[elementID]>38)?yellowPlay[elementID]-38:14+yellowPlay[elementID];
                        yellowPlayOnBoard[elementID] = finalVal;
                        currentElement.parentNode.removeChild(currentElement);
                        finalCheck(elementID);
                        dice = true;
                    }else if(yellowPlay[elementID]+diceValue>maxCell && yellowPlay[elementID] <= maxCell){
                        var temp = yellowPlay[elementID] + diceValue - maxCell;
                        yellowPlay[elementID] = yellowPlay[elementID] + diceValue;
                        const finalVal = 200+temp;
                        yellowPlayOnBoard[elementID] = finalVal;
                        currentElement.parentNode.removeChild(currentElement);
                        finalCheck(elementID);
                        dice = true;
                    }else if(yellowPlay[elementID]>maxCell){
                        if(yellowPlay[elementID]+diceValue <=homeCell){
                            yellowPlay[elementID] += diceValue;
                            if(yellowPlay[elementID]<homeCell){
                                const finalVal = 200+(yellowPlay[elementID]-maxCell);
                                yellowPlayOnBoard[elementID] = finalVal;
                                currentElement.parentNode.removeChild(currentElement);
                                finalCheck(elementID);
                                dice = true;
                            }else{
                                var counter = 0;
                                const finalVal = 200+(yellowPlay[elementID]-maxCell);
                                yellowPlayOnBoard[elementID] = finalVal;
                                const animFunction = () => {
                                    homeAnimation(counter,"yellow",elementID,currentElement,anim);
                                    counter++
                                }
                                const anim = setInterval(animFunction,500);
                                diceValue = 7;
                                piecesInHome.y++;
                                document.getElementById("player2Score").innerHTML = piecesInHome.y.toString();
                                if(piecesInHome.y===4){
                                    document.getElementById("player2Score").innerHTML = (winner===1)?"1st":((winner===2)?"2nd":((winner===3)?"3rd":"4th"));
                                    if(winner===3){
                                        var lastWinner = (piecesInHome.g<4)?"g1":((piecesInHome.y<4)?"y2":((piecesInHome.b<4)?"b3":"r4"));
                                        document.getElementById(`player${lastWinner.substr(1)}Score`).innerHTML = "4th";
                                        gameIsActive = false
                                    }else{
                                        winner++;
                                    }
                                }
                                if(gameIsActive){
                                    var winnerBeforeMe = (piecesInHome.g===4)?"g":((piecesInHome.y===4)?"y":((piecesInHome.b===4)?"b":((piecesInHome.r===4)?"r":"")))
                                    playerNo = (winner===2)?[1,3,4]:((winnerBeforeMe === "g")?[3,4]:((winnerBeforeMe === "b")?[1,4]:[1,3]));
                                    diceValue = 2;
                                }
                                dice = true;
                            }
                        }else{
                            var temp = 0;
                            for(var i=1; i<5; i++){
                                if((yellowPlay[`y${i}`]<0 && diceValue===6) || (yellowPlay[`y${i}`]+diceValue<=maxCell && yellowPlay[`y${i}`]>0) || (yellowPlay[`y${i}`]+diceValue<=homeCell && yellowPlay[`y${i}`]>0)){
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
                        finalCheck(elementID);
                        dice = true;
                    }else if(bluePlay[elementID]+diceValue<=maxCell && bluePlay[elementID]>0){
                        bluePlay[elementID] += diceValue;
                        const finalVal = (bluePlay[elementID]>25)?bluePlay[elementID]-25:27+bluePlay[elementID];
                        bluePlayOnBoard[elementID] = finalVal;
                        currentElement.parentNode.removeChild(currentElement);
                        finalCheck(elementID);
                        dice = true;
                    }else if(bluePlay[elementID]+diceValue>maxCell && bluePlay[elementID] <= maxCell){
                        var temp = bluePlay[elementID] + diceValue - maxCell;
                        bluePlay[elementID] = bluePlay[elementID] + diceValue;
                        const finalVal = 300+temp;
                        bluePlayOnBoard[elementID] = finalVal;
                        currentElement.parentNode.removeChild(currentElement);
                        finalCheck(elementID);
                        dice = true;
                    }else if(bluePlay[elementID]>maxCell){
                        if(bluePlay[elementID]+diceValue <=homeCell){
                            bluePlay[elementID] += diceValue;
                            if(bluePlay[elementID]<homeCell){
                                const finalVal = 300+(bluePlay[elementID]-maxCell);
                                bluePlayOnBoard[elementID] = finalVal;
                                currentElement.parentNode.removeChild(currentElement);
                                finalCheck(elementID);
                                dice = true;
                            }else{
                                var counter = 0;
                                const finalVal = 300+(bluePlay[elementID]-maxCell);
                                bluePlayOnBoard[elementID] = finalVal;
                                const animFunction = () => {
                                    homeAnimation(counter,"blue",elementID,currentElement,anim);
                                    counter++
                                }
                                const anim = setInterval(animFunction,500);
                                diceValue = 7;
                                piecesInHome.b++;
                                document.getElementById("player3Score").innerHTML = piecesInHome.b.toString();
                                if(piecesInHome.b===4){
                                    document.getElementById("player3Score").innerHTML = (winner===1)?"1st":((winner===2)?"2nd":((winner===3)?"3rd":"4th"));
                                    if(winner===3){
                                        var lastWinner = (piecesInHome.g<4)?"g1":((piecesInHome.y<4)?"y2":((piecesInHome.b<4)?"b3":"r4"));
                                        document.getElementById(`player${lastWinner.substr(1)}Score`).innerHTML = "4th";
                                        gameIsActive = false
                                    }else{
                                        winner++;
                                    }
                                }
                                if(gameIsActive){
                                    var winnerBeforeMe = (piecesInHome.g===4)?"g":((piecesInHome.y===4)?"y":((piecesInHome.b===4)?"b":((piecesInHome.r===4)?"r":"")))
                                    playerNo = (winner===2)?[1,2,4]:((winnerBeforeMe === "g")?[2,4]:((winnerBeforeMe === "y")?[1,4]:[1,2]));
                                    diceValue = 2;
                                }
                                dice = true;
                            }
                        }else{
                            var temp = 0;
                            for(var i=1; i<5; i++){
                                if((bluePlay[`b${i}`]<0 && diceValue===6) || (bluePlay[`b${i}`]+diceValue<=maxCell && bluePlay[`b${i}`]>0) || (bluePlay[`b${i}`]+diceValue<=homeCell && bluePlay[`b${i}`]>0)){
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
                        finalCheck(elementID);
                        dice = true;
                    }else if(redPlay[elementID]+diceValue<=maxCell && redPlay[elementID]>0){
                        redPlay[elementID] += diceValue;
                        const finalVal = (redPlay[elementID]>12)?redPlay[elementID]-12:40+redPlay[elementID];
                        redPlayOnBoard[elementID] = finalVal;
                        currentElement.parentNode.removeChild(currentElement);
                        finalCheck(elementID);
                        dice = true;
                    }else if(redPlay[elementID]+diceValue>maxCell && redPlay[elementID] <= maxCell){
                        var temp = redPlay[elementID] + diceValue - maxCell;
                        redPlay[elementID] = redPlay[elementID] + diceValue;
                        const finalVal = 400+temp;
                        redPlayOnBoard[elementID] = finalVal;
                        currentElement.parentNode.removeChild(currentElement);
                        finalCheck(elementID);
                        dice = true;
                    }else if(redPlay[elementID]>maxCell){
                        if(redPlay[elementID]+diceValue <=homeCell){
                            redPlay[elementID] += diceValue;
                            if(redPlay[elementID]<homeCell){
                                const finalVal = 400+(redPlay[elementID]-maxCell);
                                redPlayOnBoard[elementID] = finalVal;
                                currentElement.parentNode.removeChild(currentElement);
                                finalCheck(elementID);
                                dice = true;
                            }else{
                                var counter = 0;
                                const finalVal = 400+(redPlay[elementID]-maxCell);
                                redPlayOnBoard[elementID] = finalVal;
                                const animFunction = () => {
                                    homeAnimation(counter,"red",elementID,currentElement,anim);
                                    counter++
                                }
                                const anim = setInterval(animFunction,500);
                                diceValue = 7;
                                piecesInHome.r++;
                                document.getElementById("player4Score").innerHTML = piecesInHome.r.toString();
                                if(piecesInHome.r===4){
                                    document.getElementById("player4Score").innerHTML = (winner===1)?"1st":((winner===2)?"2nd":((winner===3)?"3rd":"4th"));
                                    if(winner===3){
                                        var lastWinner = (piecesInHome.g<4)?"g1":((piecesInHome.y<4)?"y2":((piecesInHome.b<4)?"b3":"r4"));
                                        document.getElementById(`player${lastWinner.substr(1)}Score`).innerHTML = "4th";
                                        gameIsActive = false
                                    }else{
                                        winner++;
                                    }
                                }
                                if(gameIsActive){
                                    var winnerBeforeMe = (piecesInHome.g===4)?"g":((piecesInHome.y===4)?"y":((piecesInHome.b===4)?"b":((piecesInHome.r===4)?"r":"")))
                                    playerNo = (winner===2)?[1,2,3]:((winnerBeforeMe === "g")?[2,3]:((winnerBeforeMe === "y")?[1,3]:[1,2]));
                                    diceValue = 2;
                                }
                                dice = true;
                            }
                        }else{
                            var temp = 0;
                            for(var i=1; i<5; i++){
                                if((redPlay[`r${i}`]<0 && diceValue===6) || (redPlay[`r${i}`]+diceValue<=maxCell && redPlay[`r${i}`]>0) || (redPlay[`r${i}`]+diceValue<=homeCell && redPlay[`r${i}`]>0)){
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
    if(dice) changeName(activePlayerNo);
}

const isItSafeCell = (eId) => {
    switch(eId.substr(0, 1)){
        case 'g':
            for(var i=0; i<safeCells.length; i++) {
                if(greenPlay[eId]===safeCells[i]){
                    return true;
                } 
            };
            return false;
        case 'y':
            for(var i=0; i<safeCells.length; i++) {
                if(yellowPlayOnBoard[eId]===safeCells[i]){
                    return true;
                } 
            };
            return false;
        case 'b':
            for(var i=0; i<safeCells.length; i++) {
                if(bluePlayOnBoard[eId]===safeCells[i]){
                    return true;
                } 
            };
            return false;
        case 'r':
            for(var i=0; i<safeCells.length; i++) {
                if(redPlayOnBoard[eId]===safeCells[i]){
                    return true;
                } 
            };
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

const isItMe = (eId) => {
    switch(eId.substr(0, 1)){
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

const whoAndHowMany = (eId) => {
    var temp = {g:[],y:[],b:[],r:[]};
    switch(eId.substr(0, 1)){
        case "g":
            var counter = [0,0,0]
            for(var i=1; i<5; i++){
                if(greenPlay[eId]===yellowPlayOnBoard[`y${i}`]){
                    counter[0]++;
                }else if(greenPlay[eId]===bluePlayOnBoard[`b${i}`]){
                    counter[1]++;
                }else if(greenPlay[eId]===redPlayOnBoard[`r${i}`]){
                    counter[2]++;
                }
            };
            for(var i=0;i<3;i++){
                if(counter[i]!==0){
                    temp.g[0] = (i===0)?"y":((i===1)?"b":"r");
                    temp.g[1] = counter[i];
                }
            }
            break;
        case "y":
            var counter = [0,0,0]
            for(var i=1; i<5; i++){
                if(yellowPlayOnBoard[eId]===greenPlay[`g${i}`]){
                    counter[0]++;
                }else if(yellowPlayOnBoard[eId]===bluePlayOnBoard[`b${i}`]){
                    counter[1]++;
                }else if(yellowPlayOnBoard[eId]===redPlayOnBoard[`r${i}`]){
                    counter[2]++;
                }
            };
            for(var i=0;i<3;i++){
                if(counter[i]!==0){
                    temp.y[0] = (i===0)?"g":((i===1)?"b":"r");
                    temp.y[1] = counter[i];
                }
            }
            break;
        case "b":
            var counter = [0,0,0]
            for(var i=1; i<5; i++){
                if(bluePlayOnBoard[eId]===greenPlay[`g${i}`]){
                    counter[0]++;
                }else if(bluePlayOnBoard[eId]===yellowPlayOnBoard[`y${i}`]){
                    counter[1]++;
                }else if(bluePlayOnBoard[eId]===redPlayOnBoard[`r${i}`]){
                    counter[2]++;
                }
            };
            for(var i=0;i<3;i++){
                if(counter[i]!==0){
                    temp.b[0] = (i===0)?"g":((i===1)?"y":"r");
                    temp.b[1] = counter[i];
                }
            }
            break;
        case "r":
            var counter = [0,0,0]
            for(var i=1; i<5; i++){
                if(redPlayOnBoard[eId]===greenPlay[`g${i}`]){
                    counter[0]++;
                }else if(redPlayOnBoard[eId]===yellowPlayOnBoard[`y${i}`]){
                    counter[1]++;
                }else if(redPlayOnBoard[eId]===bluePlayOnBoard[`b${i}`]){
                    counter[2]++;
                }
            };
            for(var i=0;i<3;i++){
                if(counter[i]!==0){
                    temp.r[0] = (i===0)?"g":((i===1)?"y":"b");
                    temp.r[1] = counter[i];
                }
            }
            break;
    }
    return temp[eId.substr(0, 1)]
}

const position = (cell,cellChildrens,color,id) => {
    switch(cellChildrens.length){
        case 1:
            var img = piece(color,id);
            cell.innerHTML += img;
            cellChildrens[0].style.width = "60%";
            cellChildrens[0].style.height = "60%";
            cellChildrens[0].style.left = "0";
            cellChildrens[0].style.top = "0";
            cellChildrens[1].style.width = "60%";
            cellChildrens[1].style.height = "60%";
            cellChildrens[1].style.right = "0";
            cellChildrens[1].style.bottom = "0";
            break;
        case 2:
            var img = piece(color,id);
            cell.innerHTML += img;
            cellChildrens[0].style.width = "60%";
            cellChildrens[0].style.height = "60%";
            cellChildrens[0].style.left = "0";
            cellChildrens[0].style.top = "0";
            cellChildrens[1].style.width = "60%";
            cellChildrens[1].style.height = "60%";
            cellChildrens[1].style.right = "0";
            cellChildrens[1].style.bottom = "0";
            cellChildrens[2].style.width = "60%";
            cellChildrens[2].style.height = "60%";
            cellChildrens[2].style.right = "0";
            break;
        case 3:
            var img = piece(color,id);
            cell.innerHTML += img;
            cellChildrens[0].style.width = "60%";
            cellChildrens[0].style.height = "60%";
            cellChildrens[0].style.left = "0";
            cellChildrens[0].style.top = "0";
            cellChildrens[1].style.width = "60%";
            cellChildrens[1].style.height = "60%";
            cellChildrens[1].style.right = "0";
            cellChildrens[1].style.bottom = "0";
            cellChildrens[2].style.width = "60%";
            cellChildrens[2].style.height = "60%";
            cellChildrens[2].style.right = "0";
            cellChildrens[3].style.width = "60%";
            cellChildrens[3].style.height = "60%";
            cellChildrens[3].style.bottom = "0";
            break;
        case 4:
            var img = piece(color,id);
            cell.innerHTML += img;
            cellChildrens[0].style.width = "60%";
            cellChildrens[0].style.height = "60%";
            cellChildrens[0].style.left = "0";
            cellChildrens[0].style.top = "0";
            cellChildrens[1].style.width = "60%";
            cellChildrens[1].style.height = "60%";
            cellChildrens[1].style.right = "0";
            cellChildrens[1].style.bottom = "0";
            cellChildrens[2].style.width = "60%";
            cellChildrens[2].style.height = "60%";
            cellChildrens[2].style.right = "0";
            cellChildrens[3].style.width = "60%";
            cellChildrens[3].style.height = "60%";
            cellChildrens[3].style.bottom = "0";
            cellChildrens[4].style.width = "60%";
            cellChildrens[4].style.height = "60%";
            cellChildrens[4].style.bottom = "20%";
            cellChildrens[4].style.left = "20%";
            break;
        case 5:
            var img = piece(color,id);
            cell.innerHTML += img;
            cellChildrens[0].style.width = "60%";
            cellChildrens[0].style.height = "60%";
            cellChildrens[0].style.left = "0";
            cellChildrens[0].style.top = "0";
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
}

const changeName = (player) => {
    if(diceValue<6){
        switch((player==4)?1:player+1){
            case 1:
                playerName.innerHTML = "Green";
                break;
            case 2:
                playerName.innerHTML = "Yellow";
                break;
            case 3:
                playerName.innerHTML = "Blue";
                break;
            case 4:
                playerName.innerHTML = "Red";
                break;
        }
    }
    rollMe.style.visibility = "visible";
}

const homeAnimation = (counter,color,elementID,currentElement,anim) => {
    switch(counter){
        case 0:
            document.getElementById("home").style.borderLeft = "10px solid #008A47";
            document.getElementById("home").style.borderTop = "10px solid #FFD511";
            document.getElementById("home").style.borderRight = "10px solid #1CA3FF";
            document.getElementById("home").style.borderBottom = "10px solid #FB3021";
            break;
        case 1:
            currentElement.parentNode.removeChild(currentElement);
            var img = piece(color,elementID)
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
}

const diceAnimation = (counter) => {
    var diceImg = document.getElementById("dice");
    switch(counter){
        case 1:
            diceImg.src = "img/dice1.png"
            break;
        case 2:
        diceImg.src = "img/dice2.png"
            break;
        case 3:
        diceImg.src = "img/dice3.png"
            break;
        case 4:
        diceImg.src = "img/dice4.png"
            break;
        case 5:
        diceImg.src = "img/dice5.png"
            break;
        case 6:
        diceImg.src = "img/dice6.png"
            break;
    }
}

const finalCheck = (id) =>{
    if(isItSafeCell(id) && isSomeoneInside(id)){
        switch(id.substr(0, 1)){
            case 'g':
                var cell = document.getElementById(greenPlay[id].toString());
                var cellChildrens = cell.children;
                position(cell,cellChildrens,"green",id);
                break;
            case 'y':
                var cell = document.getElementById(yellowPlayOnBoard[id].toString());
                var cellChildrens = cell.children;
                position(cell,cellChildrens,"yellow",id);
                break;
            case 'b':
                var cell = document.getElementById(bluePlayOnBoard[id].toString());
                var cellChildrens = cell.children;
                position(cell,cellChildrens,"blue",id);
                break;
            case 'r':
                var cell = document.getElementById(redPlayOnBoard[id].toString());
                var cellChildrens = cell.children;
                position(cell,cellChildrens,"red",id);
                break;                  
        }
        changeName(activePlayerNo);
    }else if(isItSafeCell(id) && !isSomeoneInside(id)){
        var temp = {g:"green",y:"yellow",b:"blue",r:"red"};
        var img = piece(temp[id.substr(0, 1)],id)
        var finalVal = (id.substr(0, 1)==="g")?greenPlay[id]:((id.substr(0, 1)==="y")?yellowPlayOnBoard[id]:((id.substr(0, 1)==="b")?bluePlayOnBoard[id]:redPlayOnBoard[id]))
        document.getElementById(finalVal.toString()).innerHTML = img;
        changeName(activePlayerNo);
    }else if(!isItSafeCell(id) && !isSomeoneInside(id)){
        var temp = {g:"green",y:"yellow",b:"blue",r:"red"};
        var img = piece(temp[id.substr(0, 1)],id)
        var finalVal = (id.substr(0, 1)==="g")?greenPlay[id]:((id.substr(0, 1)==="y")?yellowPlayOnBoard[id]:((id.substr(0, 1)==="b")?bluePlayOnBoard[id]:redPlayOnBoard[id]))
        document.getElementById(finalVal.toString()).innerHTML = img;
        changeName(activePlayerNo);
    }else if(!isItSafeCell(id) && isSomeoneInside(id)){
        if(isItMe(id)){
            switch(id.substr(0, 1)){
                case 'g':
                    var cell = document.getElementById(greenPlay[id].toString());
                    var cellChildrens = cell.children;
                    position(cell,cellChildrens,"green",id);
                    break;
                case 'y':
                    var cell = document.getElementById(yellowPlayOnBoard[id].toString());
                    var cellChildrens = cell.children;
                    position(cell,cellChildrens,"yellow",id);
                    break;
                case 'b':
                    var cell = document.getElementById(bluePlayOnBoard[id].toString());
                    var cellChildrens = cell.children;
                    position(cell,cellChildrens,"blue",id);
                    break;
                case 'r':
                    var cell = document.getElementById(redPlayOnBoard[id].toString());
                    var cellChildrens = cell.children;
                    position(cell,cellChildrens,"red",id);
                    break;
            }
        }else{
            var whoIsInside = whoAndHowMany(id);
            if(whoIsInside[1]===1){
                var currentCellVel = 0;
                var temp = {g:"green",y:"yellow",b:"blue",r:"red"};
                var deadPieceId = "";
                switch(id.substr(0, 1)){
                    case "g":
                        currentCellVel = greenPlay[id].toString();
                        var cell = document.getElementById(currentCellVel);
                        var cellChildrens = cell.children;
                        deadPieceId = cellChildrens[0].id;
                        break;
                    case "y":
                        currentCellVel = yellowPlayOnBoard[id].toString();
                        var cell = document.getElementById(currentCellVel);
                        var cellChildrens = cell.children;
                        deadPieceId = cellChildrens[0].id;
                        break;
                    case "b":
                        currentCellVel = bluePlayOnBoard[id].toString();
                        var cell = document.getElementById(currentCellVel);
                        var cellChildrens = cell.children;
                        deadPieceId = cellChildrens[0].id;
                        break;
                    case "r":
                        currentCellVel = redPlayOnBoard[id].toString();
                        var cell = document.getElementById(currentCellVel);
                        var cellChildrens = cell.children;
                        deadPieceId = cellChildrens[0].id;
                        break;
                }
                switch(deadPieceId.substr(0, 1)){
                    case "g":
                        greenPlay[deadPieceId] = -1;
                        break;
                    case "y":
                        yellowPlayOnBoard[deadPieceId] = -1;
                        yellowPlay[deadPieceId] = -1
                        break;
                    case "b":
                        bluePlayOnBoard[deadPieceId] = -1;
                        bluePlay[deadPieceId] = -1
                        break;
                    case "r":
                        redPlayOnBoard[deadPieceId] = -1;
                        redPlay[deadPieceId] = -1
                        break;
                }
                var deadImg = piece(temp[deadPieceId.substr(0, 1)],deadPieceId);
                var housePosition = document.getElementById(`${deadPieceId.substr(0, 1)}h${deadPieceId.substr(1)}`)
                housePosition.innerHTML = deadImg;
                var img = piece(temp[id.substr(0, 1)],id);
                document.getElementById(currentCellVel).innerHTML = img;
                diceValue = 7;

            }else if(whoIsInside[1]>1 && whoIsInside[1]===2){
                var temp = {g:"green",y:"yellow",b:"blue",r:"red"};
                var img = piece(temp[id.substr(0, 1)],id)
                var finalVal = (id.substr(0, 1)==="g")?greenPlay[id]:((id.substr(0, 1)==="y")?yellowPlayOnBoard[id]:((id.substr(0, 1)==="b")?bluePlayOnBoard[id]:redPlayOnBoard[id]))
                var cell = document.getElementById(finalVal.toString());
                cell.innerHTML += img;
                var cellChildrens = cell.children;
                cellChildrens[2].style.width = "60%";
                cellChildrens[2].style.height = "60%";
                cellChildrens[2].style.right = "0";
            }else if(whoIsInside[1]>2 && whoIsInside[1]===3){
                var temp = {g:"green",y:"yellow",b:"blue",r:"red"};
                var img = piece(temp[id.substr(0, 1)],id)
                var finalVal = (id.substr(0, 1)==="g")?greenPlay[id]:((id.substr(0, 1)==="y")?yellowPlayOnBoard[id]:((id.substr(0, 1)==="b")?bluePlayOnBoard[id]:redPlayOnBoard[id]))
                var cell = document.getElementById(finalVal.toString());
                cell.innerHTML += img;
                var cellChildrens = cell.children;
                cellChildrens[3].style.width = "60%";
                cellChildrens[3].style.height = "60%";
                cellChildrens[3].style.bottom = "0";
            }else if(whoIsInside[1]>3 && whoIsInside[1]===4){
                var temp = {g:"green",y:"yellow",b:"blue",r:"red"};
                var img = piece(temp[id.substr(0, 1)],id)
                var finalVal = (id.substr(0, 1)==="g")?greenPlay[id]:((id.substr(0, 1)==="y")?yellowPlayOnBoard[id]:((id.substr(0, 1)==="b")?bluePlayOnBoard[id]:redPlayOnBoard[id]))
                var cell = document.getElementById(finalVal.toString());
                cell.innerHTML += img;
                var cellChildrens = cell.children;
                cellChildrens[4].style.width = "60%";
                cellChildrens[4].style.height = "60%";
                cellChildrens[4].style.bottom = "20%";
                cellChildrens[4].style.left = "20%";
            }
        }
        changeName(activePlayerNo);
    }
}