import {weapons} from './loot.mjs';

export const mobList = [
    {
        name: "goblin",
        hp: 6,
        dmgDie: 4,
        dmgDiceNo: 1,
        str: 8,
        dex: 12,
        int: 8,
        con: 8,
        loot: [],
        level: 1,
        weight: 10
        // init: function () {
        //     this.loot = //randomize weapon loot here. Maybe filter the loot list to only include light weapons. Make it a function at the top that all objects can reference.
        // }
    },
    {
        name: null,
        level: 0,
        weight: 10
    }
];