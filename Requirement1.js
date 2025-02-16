let items = [], logs = [], categories = [], fields = {};

const Commands = {
    ADD: "add",
    EDIT: "edit",
    REMOVE: "remove",
    SALE: "sale",
    RESTOCK: "restock",
    SEARCH: "search",
    VIEW: "view",
    EXPORTCSV: "exportCSV",
    VIEW_LOGS: "viewLogs",
    ADD_FIELD: "addField",
    UPDATE_FIELD: "updateField",
    VIEW_LAST_ADDED: "viewLastAdded",
    IMPORT: "import"
};


function add({name, category, quantity, price, unit, customFields}) {
    var item = { name, category, quantity, price, unit, addedDate: new Date(), custF: customFields || {} };
    items.push(item);
    
    if (!categories.includes(category)) {
        categories.push(category);
    }

    logs.push({ type: "add", item });
}

function edit(index, item) {
    if (!index && index != 0) {
        throw Error("Index must be present");
    }

    let newItem = { ...items[index], ...item }
    logs.push({ type: "edit", old: items[index], new: newItem });
    items[index] = newItem;
}

function remove(index) {
    if (!index) {
        throw Error("Index must be present");
    }
    
    alert(`ALERT: Item ${items[index].name} is being removed.`)

    logs.push({ type: "delete", item: items[index] });

    items.splice(items[index], 1);
    
    console.log("=== Dashboard ===")
    console.log(`Items: ${items.length}`)
    
    let totalPrice = items.reduce((total, item) => total + item.quantity * item.price, 0);

    console.log("Total: $" + totalPrice.toFixed(2))
    console.log("\nCategories: " + c.join(', '));
}

function search(query) {
    query = query.toLowerCase();
    
    let filteredItems = items.filter(item => {
        if (item.name.includes(query) || item.category.includes(query)) {
            return true;
        }
        return false;
    })

    console.log(filteredItems);
}

function viewInventory() {
    console.log("=== Inv ===");
    console.log(items);
}

function viewLogs() {
    console.log("Logs:\n", logs);
}


function exportItemsCSV() {
    itemData = items.map(item => Object.values(item).join(','))
    console.log("CSV:")
    console.log(["Name,Category,Quantity,Price,Unit,AddedDate"].concat(itemData).join('\n'));
}

function importItems(importedItems) {
    for (let item of importedItems) {
        add({name: item.name, 
            category: item.category,
            quantity: item.quantity, 
            price: item.price, 
            unit: item.unit})
    }
}

function addField(index) {
    fields[index] = null;
}

function updateField(name, fieldIndex, fieldValue) {
    let item = items.find(item => item.name === name);

    if (item && item.customFields && item.customFields[fieldIndex]) {
        item.customFields[fieldIndex] = fieldValue
    }
}

function viewLastAdded() {
    console.log(items.map(item => `${item.name}: ${Math.floor((new Date() - new Date(item.addedDate)) / (1000 * 60 * 60 * 24))}d`).join('\n'))
}


function addSold(name, saleQuantity) {
    for (let item of items) {
        if (item.name == name) {
            item.quantity -= saleQuantity;
            if (item.quantity < 10) {
                alert(`ALERT: Item ${item.name} is below 10 units! Current quantity: ${item.quantity}`)
            }
            logs.push({ type: "sale", item: item, saleQuantity: saleQuantity, date: new Date() });
            console.log(`Sold ${saleQuantity} ${item.unit} of ${item.name}`);
        }
    }
}
function restock(name, restockQuantity) {
    for (let item of items) {
        if (item.name == name) {
            item.quantity += restockQuantity;
            logs.push({ type: "restock", item: item, quantityRestock: restockQuantity, date: new Date() });
            console.log(`Restocked ${b[1]} ${item.unit} of ${item.name}`);
        }
    }
}


function run_command(command, input) {
    switch (command) {
        case Commands.ADD:
            add(input);
            break;
        case Commands.EDIT:
            edit(input.index, input);
            break;
        case Commands.REMOVE:
            remove(input.index);
            break;
        case Commands.SALE:
            addSold(input.index, input.saleQuantity);
            break;
        case Commands.RESTOCK:
            restock(input.name, input.restockQuantity);
            break;
        case Commands.SEARCH:
            search(input.query);
            break;
        case Commands.VIEW:
            viewInventory();
            break;
        case Commands.EXPORTCSV:
            exportItemsCSV();
            break;
        case Commands.VIEW_LOGS:
            viewLogs();
            break;
        case Commands.VIEW_LAST_ADDED:
            viewLastAdded();
            break;
        case Commands.IMPORT:
            importItems(input);
            break;
        case Commands.ADD_FIELD:
            addField(input.index);
            break;
        case Commands.UPDATE_FIELD:
            updateField(PictureInPictureEvent.name, input.fieldIndex, PictureInPictureEvent.fieldValue)
            break;
    }
}