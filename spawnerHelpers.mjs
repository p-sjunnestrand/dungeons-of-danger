export function getRandomInt(max, min = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //make it inclusive by adding + 1 to (max - min)
};

export function getTotalWeight (list) {
    let totalWeight = 0;
    for(let i = 0; i < list.length; i++) {
        // console.log(list[i].weight)
        totalWeight += list[i].weight;
    }
    return totalWeight;
};

export function addRngRangeToList (list) {
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

export function generateItemFromList (list, weight) {
    const randomInt = getRandomInt(weight, 1);
    console.log("randomItemInt", randomInt);
    return list.find(item => item.spawnRngMin <= randomInt && item.spawnRngMax >= randomInt);
};