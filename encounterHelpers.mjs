import { getRandomInt } from "./spawnerHelpers.mjs";

//All rolls are made with the player as POV: true = player succeeds, false = player fails.

export function makeOpposingCheck(playerStat, opponentStat, getRandomInt, positiveModifier = 0, negativeModifier = 0) {
    const playerModifier = getStatModifier(playerStat);
    const opponentModifier = getStatModifier(opponentStat);

    const playerRoll = makeRoll(playerModifier, getRandomInt, positiveModifier = 0, negativeModifier = 0);
    const opponentRoll = makeRoll(opponentModifier, getRandomInt, positiveModifier = 0, negativeModifier = 0);
    console.log("playerRoll: ", playerRoll, "opponentRoll: ", opponentRoll);

    if(opponentRoll > playerRoll) return false;
    return true;
};

export function makeRoll(characterModifier,  getRandomInt, positiveModifier = 0, negativeModifier = 0) {
    const roll = getRandomInt(21, 1) + characterModifier + positiveModifier + negativeModifier;
    return roll < 0 ? 0 : roll; //If the roll is negative due to modifiers, we want to return 0.
};

export function getStatModifier (statPoint) {
    console.log("statPoint: ", statPoint)
    const modifierPoint = statPoint - 10;
    console.log("modifierPoint: ", modifierPoint)
    console.log("modifier: ", modifierPoint / 2);
    if(modifierPoint % 2 === 0) return modifierPoint / 2;
    const closestActiveStatPoint = modifierPoint - 1 //If the stat is odd, we subtract one to find the closest real modifier.
    console.log("closestStat: ", closestActiveStatPoint);
    getStatModifier(closestActiveStatPoint);
}

export function rollInitiative(playerDex, mobs) {
    let playerWins = true;
    const playerInitiative = makeRoll(playerDex, getRandomInt);
    mobs.forEach(mob => {
        if(makeRoll(mob.dex, getRandomInt) > playerInitiative) playerWins = false; 
    });

    return playerWins;

};

export function generateEncounterActions(check, mobs, player) {
    let encounterText = "";
    const singleMob = mobs.length < 2 ? true : false;
    if(check) {
        encounterText = `<p>${singleMob ? 'It has' : 'They have'} not noticed you. What do you do?</p>
                        <div class="action-buttons-wrapper"><button class="action-button" id="sneakButton">Sneak past</button><button class="action-button" id="attackButton">Attack</button></div>`;
    } else {
        const initiativeOrder = rollInitiative(player.dex, mobs);
        encounterText = `<p>${singleMob ? 'It has' : 'They have'} noticed you. ${singleMob ? 'It attacks!' : 'They attack!'}</p>
        <p>${initiativeOrder ? "You go " : `${singleMob ? "It goes " : "They go "}`}first</p>`
    };
    
    return encounterText;
}