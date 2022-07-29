import {containers} from './containers.mjs'


const gameScreen = document.getElementById('gameScreen');

const playButton = document.getElementById("playButton");
// const main = document.createElement('div');
// main.id = 'mainGame';


playButton.addEventListener('click', () => {
    playButton.remove();
    const textBox = document.createElement('div');
    textBox.classList.add('text-box');

    gameScreen.appendChild(textBox);
    const orientationBox = document.createElement('div');
    gameScreen.appendChild(orientationBox);
    orientationBox.classList.add('orientation-box');

    const mapBox = document.createElement('div');
    mapBox.classList.add('map-box');
    gameScreen.appendChild(mapBox);
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

    //Dungeon vars
    let currentLevel = 0;
    let roomsRemaining = 0;
    let dungeonMap;
    let startingRow;
    let startingCell;
    let endingRow;
    let endingCell;
    let currentRoomDoors = [];
    

    //Player vars
    let playerPosition = [];
    let currentRoom;
    console.log("player: ", playerPosition)

    // function getRandomInt(max) {
    //     return Math.floor(Math.random() * max);
    // }
    // function getRandomArbitrary(max, min = 0) {
    //     return Math.random() * (max - min) + min;
    // }
    function getRandomInt(max, min = 0) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //make it inclusive by adding + 1 to (max - min)
    }
      

    function generateDungeon () {
    
        const possibleCells = currentLevel + 3;
        dungeonMap = Array(possibleCells).fill().map(() => Array(possibleCells).fill(0));
        roomsRemaining = possibleCells;
        let rooms = [];
        let roomId = 0;
        const mapBox = document.querySelector('.map-box');
            for(let i = 0; i < dungeonMap.length; i++) {
                for(let j = 0; j < dungeonMap[i].length; j++) {
                    const mapArea = document.createElement('div')
                    mapArea.id = `area-${i}${j}`
                    mapBox.appendChild(mapArea);
                }
            }

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
                type: "entrance",
                description: [getRoomSize()]
            }

            rooms.push(newRoom)
            playerPosition.push(startingRow, startingCell);
        }

        function generateEndingPoint() { //This function will take rooms with no doors. Needs to be changed! Easiest way to do it is to increase room count by one and then change it to stairs.
            do {
                endingRow = getRandomInt(possibleCells);
                endingCell = getRandomInt(possibleCells);
                console.log(dungeonMap[endingRow][endingCell])
            } while (dungeonMap[endingRow][endingCell] === "r" || dungeonMap[endingRow][endingCell] === "e");
            dungeonMap[endingRow][endingCell] = "s";
            const endingRoom = {
                id: ++roomId,
                row: endingRow,
                column: endingCell,
                doors: [],
                type: "stairs",
                description: [getRoomSize()]
            }
            rooms.push(endingRoom);
            console.log(endingRow, endingCell);
            console.log(dungeonMap);
            console.log(rooms);
        }

        function generateDoors () {
            for(let i = 0; i < rooms.length; i++) {
                const roomDoors = rooms.filter(room => (room.row === rooms[i].row + 1 && room.column === rooms[i].column) || (room.row === rooms[i].row - 1 && room.column === rooms[i].column) || (room.row === rooms[i].row && room.column === rooms[i].column + 1) || (room.row === rooms[i].row && room.column === rooms[i].column - 1)).map(roomObj => [roomObj.row, roomObj.column]);
                rooms[i].doors = roomDoors;
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
        // function generateRoom () {
        //     doors = [];
    
            function getCurrentRoomDoors (door) {
                if(door[0] === currentRoom.row && door[1] === currentRoom.column + 1) return "east";
                if(door[0] === currentRoom.row && door[1] === currentRoom.column - 1) return "west";
                if(door[0] === currentRoom.row + 1 && door[1] === currentRoom.column) return "south";
                if(door[0] === currentRoom.row - 1 && door[1] === currentRoom.column) return "north";
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


            };

            function addNullValue (list, probabilityOfNull) { //With this function, the higest probability of null is 50%. It doesn't work though
                let listWithNull = [...list];
                const totalListWeight = getTotalWeight(list);
                // const totalListWeight = 100
                console.log(totalListWeight);
                listWithNull.push({name: null, weight: totalListWeight * (probabilityOfNull/50)});
                return listWithNull;
            };

            function getTotalWeight (list) {
                let totalWeight = 0;
                for(let i = 0; i < list.length; i++) {
                    console.log(list[i].weight)
                    totalWeight += list[i].weight;
                }
                return totalWeight;
            };

            function addRngRangeToList (list) {
                // let totalWeight = 0;
                // for(let i = 0; i < list.length; i++) {
                //     console.log(list[i].weight)
                //     totalWeight += list[i].weight;
                // }
                // console.log(totalWeight);
                let weightLimit = 1;
                const generatedList = list.map(item => {
                    const modifiedItem = {...item, spawnRngMin: weightLimit, spawnRngMax: weightLimit + item.weight - 1};
                    weightLimit += item.weight;
                    return modifiedItem;
                });
                // console.log(generatedList);
                return generatedList;
            };
        
            function generateItemFromList (list, weight) {
                const randomInt = getRandomInt(weight, 1);
                console.log(randomInt);
                return list.find(item => item.spawnRngMin <= randomInt && item.spawnRngMax >= randomInt);
            };

            function spawnContainers (dungeonRooms, list) {
                // let containersRemaining = currentLevel + 3;
                const listWeight = getTotalWeight(list);
                
                for(let i = 0; i < dungeonRooms.length; i++) {
                    console.log(dungeonRooms[i])
                    let currentRoomContainers = [];
                    for(let j = 0; j < 3; j++) {
                        // if(containersRemaining > 0) {
                            const generatedContainer = generateItemFromList(list, listWeight);
                            if(generatedContainer.name !== null) {
                                currentRoomContainers.push(generatedContainer);
                                // containersRemaining--;
                                // console.log("containersRemaining: ", containersRemaining);

                            };
                        // };
                    };
                    dungeonRooms[i].containers = currentRoomContainers;
                };
            };

            function getContainerDescriptions (containers) {
                if(containers.length === 1) return `is a ${containers[0].size} ${containers[0].name}`;
                if(containers[0].name === containers[1].name) {
                    if(containers[0].size === containers[1].size) return `are two ${containers[0].size} ${containers[0].name}${containers[0].plural ? containers[0].plural : "s"}`;
                    return `is a ${containers[0].size} and a ${containers[1].size} ${containers[0].name}`
                };
                return `is a ${containers[0].size} ${containers[0].name} and a ${containers[1].size} ${containers[1].name}`;
            }

            function getContainerNames (container) {
                return 
            }

            function generateRoomDescription () {
                currentRoom = rooms.find(room => room.row === playerPosition[0] && room.column === playerPosition[1]);
                console.log(currentRoom.doors);
                
                for(let i = 0; i < currentRoom.doors.length; i++) {
                    const doorByName = getCurrentRoomDoors(currentRoom.doors[i]);
                    console.log(doorByName);
                    currentRoomDoors.push(doorByName)
                }
                console.log(currentRoomDoors)
                let describedRoom = "The room";
                if(playerPosition[0] === startingRow && playerPosition[1] === startingCell) describedRoom = "The entrance to the dunegon";
                const numberOfDoors = currentRoom.doors.length;
                console.log(numberOfDoors)
                
                let roomDescription = 
                `<p>
                    ${describedRoom} is ${getRoomSize()}. </br>
                    There ${describeDoors(numberOfDoors)} in the room. 
                `;
                for(let i = 0; i < currentRoomDoors.length; i++) {
                    if(numberOfDoors === 1) {
                        roomDescription += `It is to the ${currentRoomDoors[i]}.`
                        continue;
                    }
                    if(i === 0) {
                        roomDescription += `One to the ${currentRoomDoors[i]}, `;
                    } else if (i === currentRoomDoors.length - 1) {
                        roomDescription += `and one to the ${currentRoomDoors[i]}.`;
                    } 
                    else {
                        roomDescription += `one to the ${currentRoomDoors[i]}, `;
                    }
                }
                const numberOfContainers = currentRoom.containers.length;
                if(numberOfContainers > 0) {
                    roomDescription += `</br>There ${getContainerDescriptions(currentRoom.containers)} in the room.`;
                }
                if(currentRoom.type === "stairs") {
                    roomDescription += `</br>There are a set of stairs in the room, leading to the next level.`;
                }
                roomDescription += `</p>`
                return roomDescription;
            }
            
        function generateRooms () {
            // dungeonMap[startingRow][startingCell] = "e";
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
                    type: "room",
                    description: [getRoomSize()],
                    // containers: []
                }

                rooms.push(newRoom);
                roomsRemaining--;
                currentRow = nextRoom[0];
                currentColumn = nextRoom[1];
            }
            console.log("newDungeonMap: ", dungeonMap);
            
            // function spawnContainers(list) {
            //     const returnedContainers = [];
            //     for(let i = 0; i < 3; i++) {
            //         if(containersRemaining > 0) {
            //             const generatedContainer = generateItemFromList(list);
            //             if(generatedContainer.name !== null) returnedContainers.push(generatedContainer); 
            //         }
            //     }
            //     return returnedContainers;
            // }
            
        }

        function displayRoom () {
            const orientationBox = document.querySelector('.orientation-box');
            orientationBox.innerHTML = '';
            const compassRose = document.createElement('div');
            compassRose.innerText = "+";
            compassRose.classList.add('compassRose');
            orientationBox.appendChild(compassRose);
            
            const currentMapRoom = document.getElementById(`area-${currentRoom.row}${currentRoom.column}`);
            console.log("currentMapRoom: ", currentMapRoom);
            currentMapRoom.classList.add('current-room', 'visited-room');
            for(let i = 0; i < currentRoom.doors.length; i++) {
                const adjacentRoom = document.getElementById(`area-${currentRoom.doors[i][0]}${currentRoom.doors[i][1]}`);
                adjacentRoom.classList.add('adjacent-room');
                switch (currentRoom.type) {
                    case "entrance":
                        currentMapRoom.innerText = "E";
                        break;
                    case "stairs":
                        currentMapRoom.innerText = "S"
                }
            }

            for(let i = 0; i < currentRoomDoors.length; i++) {
                const directionalButton = document.createElement('button');
                directionalButton.innerText = currentRoomDoors[i][0].toUpperCase();
                directionalButton.classList.add('directional-button');
                directionalButton.id = `button-${currentRoomDoors[i]}`
                orientationBox.appendChild(directionalButton);

                

                directionalButton.addEventListener('click', () => {
                    currentMapRoom.classList.remove('current-room')
                    playerPosition = [currentRoom.doors[i][0], currentRoom.doors[i][1]];
                    currentRoomDoors = [];
                    document.querySelector('.text-box').innerHTML = generateRoomDescription();

                    displayRoom();
                });
            }  
        }
        generateStartingPoint();
        
        console.log("length: ", dungeonMap.length - 1);
    
        console.log(dungeonMap[startingRow][startingCell]);
        
        generateRooms();
        
        generateEndingPoint();

        generateDoors();
        // generateRoom();
        const modifiedContainerList = addRngRangeToList(containers);
        spawnContainers(rooms, modifiedContainerList);
        document.querySelector('.text-box').innerHTML = generateRoomDescription();
        

        displayRoom();
        console.log("rooms: ", rooms);
        // generateItemsFromList(addNullValue(containers, 25));
        console.log(rooms);
        // console.log(generateItemFromList(modifiedContainerList));

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

