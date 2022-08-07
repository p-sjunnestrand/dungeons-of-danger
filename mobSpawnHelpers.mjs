import {mobList} from './mobs.mjs'
import {getRandomInt, getTotalWeight, addRngRangeToList, generateItemFromList} from './spawnerHelpers.mjs';


export function spawnMobs (level, rooms) {
    const maxMobPool = (level + 1) * 2;
    console.log("maxpool: ", maxMobPool);
    const minMobPool = level + 1; //There needs to be at least this many mob lvls on each dungeon lvl.
    console.log("minpool: ", minMobPool);
    let currentMobPool = 0;
    const maxMobLvl = level + 1;
    console.log("maxlvl: ", maxMobLvl);
    let maxMobLvlPerRoom = level + 2;

    const suitableMonsters = mobList.filter(mob => mob.level <= maxMobLvl);
    const totalMonsterWeight = getTotalWeight(suitableMonsters);
    const monstersWithRngRange = addRngRangeToList(suitableMonsters);

//Each dungeon lvl has a mob pool (maxMobPool) that determines how many total monster levels can be on each level. If a level has a maxMobPool of 5, it means that it can be inhabited by monsters whose levels combined makes 5.
//Each level also has a max mob level. So a maxMobPool of 4 and a maxMobLvl of 2 results in either, two lvl 2 monsters, four lvl 1 monsters or one lvl 2 monster and two lvl 1 monsters.
    while(currentMobPool < minMobPool) {
        for(let i = 0; i < rooms.length; i++) {
            if(currentMobPool === maxMobPool) return;
            if(rooms[i].type === "entrance" || rooms[i].mobLvls >= maxMobLvlPerRoom) { //A function that prevents too many monsters to spawn in the same room is needed. Based on maxMobLvlPerRoom.
                continue;
            }
            const spawnedMonster = generateItemFromList(monstersWithRngRange, totalMonsterWeight);
            console.log(spawnedMonster);
            if(spawnedMonster.name === null) continue;
            rooms[i].mobs.push(spawnedMonster);
            rooms[i].mobLvls += spawnedMonster.level;
            currentMobPool += spawnedMonster.level;
            maxMobLvlPerRoom += spawnedMonster.level;
        }
    }
}
