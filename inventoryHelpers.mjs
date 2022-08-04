export function displayInventory (inventory, room) {
    const windowOpen = document.querySelector('.inventory-screen');
    if(windowOpen) return;
    console.log(room)
    console.log(inventory)
    const inventoryDisplay = document.createElement('div');
    inventoryDisplay.classList.add('inventory-screen');
    const inventoryContents = `
    <h3>Inventory</h3>
    <ul class="inventory-list">
    </ul>
    <button id="closeInventoryButton">Close</button>
    `;
    inventoryDisplay.innerHTML = inventoryContents;
    
    
    document.getElementById('gameScreen').appendChild(inventoryDisplay);
    for(let i = 0; i < inventory.length; i++) {
        const inventoryItem = document.createElement('li');
        inventoryItem.innerText = inventory[i].name;
        const itemInfoButton = document.createElement('button');
        itemInfoButton.innerText = 'i';
        const dropItemButton = document.createElement('button');
        dropItemButton.innerText = 'drop';

        dropItemButton.addEventListener('click', () => {
            room.onFloor.push(inventory[i]);
            inventoryItem.remove();
            inventory.splice(inventory[i], 1);
            const lootOnFloor = document.querySelector('#lootOnFloorInfo');
            if(lootOnFloor) return;
            document.querySelector('.text-box').insertAdjacentHTML('beforeend', '</br><p>There is some loot on the floor.</p>')

        })
        inventoryItem.append(itemInfoButton, dropItemButton);
        document.querySelector('.inventory-list').appendChild(inventoryItem);
    }
    document.querySelector('#closeInventoryButton').addEventListener('click', () => {
        inventoryDisplay.remove();
    });
    // document.querySelector('.inventory').
}