const fs = require('fs/promises');
const path = require('path')
const { nanoid } = require('nanoid');


const woodsPath = path.join(__dirname,'wood.json');

// проставляє правильно слеши на різних ос.
// __dirname абсолютний шлях

const getAll = async () => {
    const data = await fs.readFile(woodsPath);
    return JSON.parse(data)
};

const getById = async (id) => {
    const wood = await getAll();
    const result = wood.find(item => item.id === id);
    return result || null;
};

const add = async (data) => {
    const wood = await getAll();
    const newWoodItem = {
        id: nanoid(),
        ...data,
    }
    wood.push(newWoodItem);
    await fs.writeFile(woodsPath, JSON.stringify(wood, null, 2));
    // null, 2 щоб не парсило в одну строку джейсон
    // null це символи заміни дрочня не користуватись
    // 2 це віступи
    return newWoodItem;
};
    
const updateById = async (id, data) => {
    const wood = await getAll();
    const index = wood.findIndex(item => item.id === id)
    if (index === -1) {
        return null;
    }
    wood[index] = { id, ...data };
    await fs.writeFile(woodsPath, JSON.stringify(wood, null, 2));
    return wood[index];
};
const deleteById = async (id) => {
    const wood = await getAll();
    const index = wood.findIndex(item => item.id === id)
    if (index === -1) {
        return null;
    }
    const [result] = wood.splice(index, 1);
    await fs.writeFile(woodsPath, JSON.stringify(wood, null, 2));
    return result;
}
module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
};


