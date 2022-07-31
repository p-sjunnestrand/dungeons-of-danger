export const weapons = [
    {
        name: "shortsword",
        diceSides: 6,
        diceNo: 1,
        dmgTypes: ["slashing", "piercing"],
        weight: 10,
        size: "medium",
        special: []
    },
    {
        name: "dagger",
        diceSides: 4,
        diceNo: 1,
        dmgTypes: ["piercing"],
        weight: 10,
        size: "light",
        special: []
    },
    {
        name: "hatchet",
        diceSides: 6,
        diceNo: 1,
        dmgTypes: ["slashing", "bludgeoning"],
        weight: 10,
        size: "medium",
        special: []
    },
    {
        name: "club",
        diceSides: 4,
        diceNo: 1,
        dmgTypes: ["bludgeoning"],
        weight: 10,
        size: "light",
        special: []
    },
    {
        name: "mace",
        diceSides: 6,
        diceNo: 1,
        dmgTypes: ["bludgeoning"],
        weight: 10,
        size: "medium",
        special: []
    },
    {
        name: "quarterstaff",
        diceSides: 6,
        diceNo: 1,
        dmgTypes: ["bludgeoning"],
        weight: 10,
        size: "medium",
        special: ["spells"]
    },
    {
        name: "shortspear",
        diceSides: 6,
        diceNo: 1,
        dmgTypes: ["piercing"],
        weight: 10,
        size: "medium",
        special: []
    },
    {
        name: "longsword",
        diceSides: 8,
        diceNo: 1,
        dmgTypes: ["slashing"],
        weight: 10,
        size: "heavy",
        special: ["bastard"]
    },
    {
        name: "battleaxe",
        diceSides: 8,
        diceNo: 1,
        dmgTypes: ["bludgeoning"],
        weight: 10,
        size: "heavy",
        special: ["bastard"]
    },
    {
        name: "morningstar",
        diceSides: 8,
        diceNo: 1,
        dmgTypes: ["bludgeoning", "piercing"],
        weight: 10,
        size: "heavy",
        special: []
    },
    {
        name: "longspear",
        diceSides: 8,
        diceNo: 1,
        dmgTypes: ["piercing"],
        weight: 10,
        size: "heavy",
        special: ["bastard"]
    },
    {
        name: null,
        weight: 200
    }
];

export const armor = [
    {
        name: "buckler",
        armorValue: 1,
        weight: 10,
        size: "light",
        special: []
    },
    {
        name: "round shield",
        armorValue: 2,
        weight: 10,
        size: "medium",
        special: []
    },
    {
        name: "heater shield",
        armorValue: 2,
        weight: 10,
        size: "medium",
        special: []
    },
    {
        name: "aspis",
        armorValue: 3,
        weight: 10,
        size: "heavy",
        special: []
    },
    {
        name: "scutum",
        armorValue: 4,
        weight: 10,
        size: "heavy",
        special: []
    },
    {
        name: "leather armor",
        armorValue: 2,
        weight: 10,
        size: "light",
        special: []
    },
    {
        name: "studded leather",
        armorValue: 3,
        weight: 10,
        size: "medium",
        special: []
    },
    {
        name: "ring mail",
        armorValue: 4,
        weight: 10,
        size: "medium",
        special: []
    },
    {
        name: null,
        weight: 100
    }
];

export const treasure = [
    {
        name: "precious stone",
        weight: 1,
        size: "small",
        value: 100
    },
    {
        name: null,
        weight: 100
    }
];

// export const lootLists = ["weapons", "armor", "treasure"]