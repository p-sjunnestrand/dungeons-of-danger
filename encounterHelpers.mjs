import { getRandomInt } from "./spawnerHelpers.mjs";
import { actions } from "./actionObject.js";

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
        console.log("mobDex", mob.dex)
        if(makeRoll(mob.dex, getRandomInt) > playerInitiative) playerWins = false; 
    });

    return playerWins;

};

export function generateInitialEncounterActions(check, mobs, player) {
    let encounterObject = {};
    const singleMob = mobs.length < 2;
    if(check) {
        encounterObject = generateUndetectedText(singleMob);
    } else {
        encounterObject = generateDetectedText(singleMob);
    };
    
    if(encounterObject.detected) {
        getInitialActionOrder(encounterObject, player, mobs, singleMob);
    } else {
        encounterObject.buttons = getUndetectedHtml();
    }
    
    return encounterObject;
};

export function generateUndetectedText(singleMob) {
    return {
        html: `<p>${singleMob ? 'It has' : 'They have'} not noticed you. What do you do?</p>`,
        detected: false
    };
}

export function generateDetectedText(singleMob) {
    return {
        html: `<p>${singleMob ? 'It has' : 'They have'} noticed you. ${singleMob ? 'It attacks!' : 'They attack!'}</p>`,
        detected: true
    }; 
    // let firstAttacker = noticed + getInitialActionOrder(player, mobs, singleMob);
    // return firstAttacker;
}

function getInitialActionOrder(obj, player, mobs, singleMob) {
    const initiativeOrder = rollInitiative(player.dex, mobs);
    if(initiativeOrder) {
        obj.html += "<p>You go first</p>";
        obj.playerFirst = true; 
    } 
    else {
        obj.html += `<p>${singleMob ? "It goes " : "They go "}first.</p>`,
        obj.playerFirst = false;
    }

}

function getUndetectedHtml() {
    return `<button class="action-button" id="sneakButton">Sneak past</button><button class="action-button" id="attackButton">Attack</button>`;
}

export function runBattle(playerFirst, player, mobs) {
    console.log("player first?", playerFirst)
    if(playerFirst) {
        const encounterBox = document.querySelector('.action-buttons-wrapper');
        console.log(encounterBox)
        const battleHtml = generateBattleHtml();
        encounterBox.insertAdjacentHTML('beforeend', battleHtml);
        bindActionButtons();
        // run player turn
    };
    // run mob turn
}

function generateBattleHtml() {
    return `<button class="action-button" id="healButton">Heal</button>
            <button class="action-button" id="attackButton">Attack</button>
            <button class="action-button" id="spellButton">Cast Spell</button>
            <button class="action-button" id="retreatButton">Retreat</button>`;
}

function bindActionButtons() {
    document.getElementById('healButton').addEventListener('click', actions.heal());
    document.getElementById('attackButton').addEventListener('click', actions.attack());
    document.getElementById('spellButton').addEventListener('click', actions.castSpell());
    document.getElementById('retreatButton').addEventListener('click', actions.retreat());
}