import {mobList} from './mobs.mjs'
import {getRandomInt, getTotalWeight, addRngRangeToList, generateItemFromList} from './spawnerHelpers.mjs';


function spawnMobs (level, rooms) {
    const maxMobPool = (level + 1) * 2;
    const minMobPool = level + 1; //There needs to be at least this many mob lvls on each dungeon lvl.
    let mobNo = 0;
    const maxMobLvl = level + 1;

    const suitableMonsters = mobList.filter(mob => mob.level <= maxMobLvl);
    const totalMonsterWeight = getTotalWeight(suitableMonsters);
    const monstersWithRngRange = addRngRangeToList(suitableMonsters);

//Each dungeon lvl has a mob pool (maxMobPool) that determines how many total monster levels can be on each level. If a level has a maxMobPool of 5, it means that it can be inhabited by monsters whose levels combined makes 5.
//Each level also has a max mob level. So a maxMobPool of 4 and a maxMobLvl of 2 results in either, two lvl 2 monsters, four lvl 1 monsters or one lvl 2 monster and two lvl 1 monsters.
    while(mobNo < minMobs) {
        for(let i = 0; i < rooms.length; i++) {
            if(rooms[i].type === "entrance") {
                continue;
            }
            
        }
    }
}

spawnMobs(0, 0)