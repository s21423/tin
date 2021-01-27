const Sequelize = require('sequelize');

const Zakup = require('../../model/sequelize/Zakup');
const Klient = require('../../model/sequelize/Klient');
const Przedmiot = require('../../model/sequelize/Przedmiot');

exports.getItems = () => {
    return Przedmiot.findAll();
};

exports.getItemById = (itemId) => {
    return Przedmiot.findByPk(itemId, {include: [
            {
                model: Zakup,
                as: 'zakupy',
                include: [{
                    model: Klient,
                    as: 'klient',
                }]
            }]
    });
};

exports.createItem = (newItem) => {
    console.log(JSON.stringify(newItem));
    return Przedmiot.create({
        nazwa: newItem.nazwa,
        typ: newItem.typ,
        cena: newItem.cena
    });
};

exports.updateItem = (itemId, itemData) => {
    const nazwa = itemData.name;
    const typ = itemData.type;
    const cena = itemData.price;
    return Przedmiot.update(itemData, {where: {id: itemId }});
};

exports.deleteItem = (itemId) => {
    return Przedmiot.destroy({
        where: { id: itemId }
    });

};