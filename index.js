const gameScreen = document.getElementById('gameScreen');

const playButton = document.getElementById("playButton");
// const main = document.createElement('div');
// main.id = 'mainGame';


playButton.addEventListener('click', () => {
    playButton.remove();
    const textBox = document.createElement('div');
    textBox.classList.add('text-box');

    gameScreen.appendChild(textBox);
    runGame();

    // const roomDescription = 
    // `<p>
    //     The entrance to the dungeons consists of a single room covered in crude masonry on walls and floor. The roof is covered in dirty plaster and held up by two intersecting arches forming a cross in the middle of the room.
    //     It is damp and smells of mold and dust. There is nothing of interest here.
    //     There are three doors: one in the south wall, one in the west wall and one in the east wall.
    // </p>`;

    // textBox.innerHTML = roomDescription;
});



function runGame () {

    //Dungeons vars
    let currentLevel = 0;
    let roomsRemaining = 0;
    let dungeonMap;
    let startingRow;
    let startingCell;
    let endingRow;
    let endingCell;

    //Player vars
    let playerPosition = [];
    console.log("player: ", playerPosition)

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    
    function ramdomizeRoomPosition (i, j) {
        if(roomsRemaining === 0) return 0;
        const room = getRandomInt(2);
        console.log("room: ", room)
        if(room === 1) {
            roomsRemaining--
            console.log("remaining: ", roomsRemaining);
            // console.log("i,j: ", i, j)
            return "r";
        } 
        return 0 ;
    }

    
    
    

    function generateDungeon () {
    
        const possibleCells = currentLevel + 3;
        dungeonMap = Array(possibleCells).fill().map(() => Array(possibleCells).fill(0));
        roomsRemaining = possibleCells;
        let rooms = [];
        let roomId = 0;

        function generateStartingPoint () {
            startingRow = getRandomInt(3);
            do {
                startingCell = getRandomInt(3);
                console.log("startingRow: ", startingRow);
                console.log("startingCell: ", startingCell);
            } while ((startingRow != 0 && startingRow != dungeonMap.length -1) && (startingCell != 0 && startingCell != dungeonMap[0].length - 1));
        
            dungeonMap[startingRow][startingCell] = "e";

            const newRoom = {
                id: ++roomId,
                row: startingRow,
                column: startingCell,
                doors: [],
                type: "entrance"
            }

            rooms.push(newRoom)
            playerPosition.push(startingRow, startingCell);
        }

        function generateEndingPoint() {
            do {
                endingRow = getRandomInt(possibleCells);
                endingCell = getRandomInt(possibleCells);
                console.log(dungeonMap[endingRow][endingCell])
            } while (dungeonMap[endingRow][endingCell] === "r" || dungeonMap[endingRow][endingCell] === "e");
            dungeonMap[endingRow][endingCell] = "s";
            console.log(endingRow, endingCell);
            console.log(dungeonMap);
        }

        function generateRoom () {
            doors = [];
    
            function getDoors () {
                const validRooms = /[ers]/g
                const playerRow = playerPosition[0];
                const playerColumn = playerPosition[1];
                // console.log("lastCell: ", possibleCells - 1)
                switch (playerRow) {
                    case 0:
                        if(dungeonMap[playerRow + 1][playerColumn] === "e" || dungeonMap[playerRow + 1][playerColumn] === "r" || dungeonMap[playerRow + 1][playerColumn] === "s") {doors.push("south")}
                        break;
                    case possibleCells - 1:
                        if(dungeonMap[playerRow - 1][playerColumn] === "e" || dungeonMap[playerRow - 1][playerColumn] === "r" || dungeonMap[playerRow - 1][playerColumn] === "s") {doors.push("north")}
                        break;
                    default: {
                        if(dungeonMap[playerRow - 1][playerColumn] === "e" || dungeonMap[playerRow - 1][playerColumn] === "r" || dungeonMap[playerRow - 1][playerColumn] === "s") {doors.push("north")}
                        if(dungeonMap[playerRow + 1][playerColumn] === "e" || dungeonMap[playerRow + 1][playerColumn] === "r" || dungeonMap[playerRow + 1][playerColumn] === "s") {doors.push("south")}
                        break;
                    }
                }
                switch (playerColumn) {
                    case 0:
                        if(dungeonMap[playerRow][playerColumn + 1] === "e" || dungeonMap[playerRow][playerColumn + 1] === "r" || dungeonMap[playerRow][playerColumn + 1] === "s") {doors.push("east")}
                        break;
                    case possibleCells - 1:
                        if(dungeonMap[playerRow][playerColumn - 1] === "e" || dungeonMap[playerRow][playerColumn - 1] === "r" || dungeonMap[playerRow][playerColumn - 1] === "s") {doors.push("west")}
                        break;
                    default: {
                        if(dungeonMap[playerRow][playerColumn + 1] === "e" || dungeonMap[playerRow][playerColumn + 1] === "r" || dungeonMap[playerRow][playerColumn + 1] === "s") {doors.push("east")}
                        if(dungeonMap[playerRow][playerColumn - 1] === "e" || dungeonMap[playerRow][playerColumn - 1] === "r" || dungeonMap[playerRow][playerColumn - 1] === "s") {doors.push("west")}
                        break;
                    }
                }
            }
            function getRoomSize () {
                const roomSize = getRandomInt(5);
        
                switch (roomSize) {
                    case 0:
                        return "small";
                    case 1:
                        return "somewhat small";
                    case 2:
                        return "quite spacious";
                    case 3:
                        return "large";
                    case 4:
                        return "very large";
                }
            }
            
            function describeDoors (numberOfDoors) {
                
                let nodInText;
                if(numberOfDoors === 1) return "is a single door";
                switch (numberOfDoors) {
                    case 2:
                        nodInText = `two`;
                        break;
                    case 3:
                        nodInText = `three`;
                        break;
                    case 4:
                        nodInText = `four`;
                        break;
                }
                return `are ${nodInText} doors`;
            }
        
            function generateRoomDescription () {
                let describedRoom = "The room";
                if(playerPosition[0] === startingRow && playerPosition[1] === startingCell) describedRoom = "The entrance to the dunegon";
                const numberOfDoors = doors.length;
                console.log(numberOfDoors)
                
                let roomDescription = 
                `<p>
                    ${describedRoom} is ${getRoomSize()}. </br>
                    There ${describeDoors(numberOfDoors)} in the room. 
                `;
                for(let i = 0; i < doors.length; i++) {
                    console.log(doors[i])
                    if(numberOfDoors === 1) {
                        roomDescription += `It is to the ${doors[i]}.`
                        continue;
                    }
                    if(i === 0) {
                        roomDescription += `One to the ${doors[i]}, `;
                    } else if (i === doors.length - 1) {
                        roomDescription += `and one to the ${doors[i]}.`;
                    } 
                    else {
                        roomDescription += `one to the ${doors[i]}, `;
                    }
                }
                roomDescription += `</p>`
                return roomDescription;
            }
            getDoors();
            console.log(doors);
            document.querySelector('.text-box').innerHTML = generateRoomDescription();
        }
        //The new improved room generation
    function generateRooms () {
        const validRooms = /[ers]/;
        // let newDungeonMap = Array(possibleCells).fill().map(() => Array(possibleCells).fill(0));
        // console.log("newDungeon: ", newDungeonMap)
        dungeonMap[startingRow][startingCell] = "e";
        roomsRemaining = possibleCells;
        console.log("rooms remaining: ", roomsRemaining);
        let currentRow = startingRow;
        let currentColumn = startingCell;
        
        
        while (roomsRemaining > 0) {
            console.log("current room: ", currentRow, currentColumn)
            let legalAreas = [];
            if(currentRow === 0) {
                //There must be a way to do this with regex!
                if(dungeonMap[currentRow + 1][currentColumn] !== "r" && dungeonMap[currentRow + 1][currentColumn] !== "e" && dungeonMap[currentRow + 1][currentColumn] !== "s") legalAreas.push([currentRow + 1, currentColumn]);
            }
            else if(currentRow === possibleCells - 1) {
                if(dungeonMap[currentRow - 1][currentColumn] !== "r" && dungeonMap[currentRow - 1][currentColumn] !== "e" && dungeonMap[currentRow - 1][currentColumn] !== "s") legalAreas.push([currentRow - 1, currentColumn])
            }
            else {
                if(dungeonMap[currentRow + 1][currentColumn] !== "r" && dungeonMap[currentRow + 1][currentColumn] !== "e" && dungeonMap[currentRow + 1][currentColumn] !== "s") legalAreas.push([currentRow + 1, currentColumn]);
                if(dungeonMap[currentRow - 1][currentColumn] !== "r" && dungeonMap[currentRow - 1][currentColumn] !== "e" && dungeonMap[currentRow - 1][currentColumn] !== "s") legalAreas.push([currentRow - 1, currentColumn]);
            }
            if(currentColumn === 0) {
                if(dungeonMap[currentRow][currentColumn + 1] !== "r" && dungeonMap[currentRow][currentColumn + 1] !== "e" && dungeonMap[currentRow][currentColumn + 1] !== "s") legalAreas.push([currentRow, currentColumn + 1]);
            }
            else if(currentColumn === possibleCells - 1) {
                if(dungeonMap[currentRow][currentColumn - 1] !== "r" && dungeonMap[currentRow][currentColumn - 1] !== "e" && dungeonMap[currentRow][currentColumn - 1] !== "s") legalAreas.push([currentRow, currentColumn - 1]);
            } 
            else {
                if(dungeonMap[currentRow][currentColumn + 1] !== "r" && dungeonMap[currentRow][currentColumn + 1] !== "e" && dungeonMap[currentRow][currentColumn + 1] !== "s") legalAreas.push([currentRow, currentColumn + 1]);
                if(dungeonMap[currentRow][currentColumn - 1] !== "r" && dungeonMap[currentRow][currentColumn - 1] !== "e" && dungeonMap[currentRow][currentColumn - 1] !== "s") legalAreas.push([currentRow, currentColumn - 1]);
            }
            console.log("legalAreas: ", legalAreas);

            const nextRoom = legalAreas[getRandomInt(legalAreas.length)];
            console.log("nextRoom: ", nextRoom);
            dungeonMap[nextRoom[0]][nextRoom[1]] = "r";

            const newRoom = {
                id: ++roomId,
                row: nextRoom[0],
                column: nextRoom[1],
                doors: [],
                type: "room"
            }

            rooms.push(newRoom);
            roomsRemaining--;
            currentRow = nextRoom[0];
            currentColumn = nextRoom[1];
            //Continue by creating objects out of each room. Add a door key with values referencing all adjacent rooms. Create array that contains all rooms in dungeon.
        }
        console.log("newDungeonMap: ", dungeonMap)
        
        for(let i = 0; i < rooms.length; i++) {
            const roomDoors = rooms.filter(room => (room.row === rooms[i].row + 1 && room.column === rooms[i].column) || (room.row === rooms[i].row - 1 && room.column === rooms[i].column) || (room.row === rooms[i].row && room.column === rooms[i].column + 1) || (room.row === rooms[i].row && room.column === rooms[i].column - 1)).map(roomObj => [roomObj.row, roomObj.column]);
            rooms[i].doors = roomDoors;
        }
        
        console.log("rooms: ", rooms);
    }
        generateStartingPoint();
        
        console.log("length: ", dungeonMap.length - 1);
    
        console.log(dungeonMap[startingRow][startingCell]);
        
        generateRooms();
        
        generateEndingPoint();

        // generateRoom();
    }
    generateDungeon();
}

// const room = generateRoomPosition();
// console.log(room)
// Room contents
// - Doors
// - Mobs
// - Loot
// - Containers
// - Light sources
// - Decorations
// - Special items

//[0,0][0,1][0,2]

