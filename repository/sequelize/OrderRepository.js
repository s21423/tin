const Sequelize = require('sequelize');

const Zakup = require('../../model/sequelize/Zakup');
const Klient = require('../../model/sequelize/Klient');
const Przedmiot = require('../../model/sequelize/Przedmiot');

exports.getOrders = () => {
    return Zakup.findAll(
        {include: [
                {
                    model: Klient,
                    as: 'klient'
                },
                {
                    model: Przedmiot,
                    as: 'przedmiot'
                }]
        });
};

exports.getOrderById = (employmentId) => {
    return Zakup.findByPk(employmentId, {include: [
            {
                model: Klient,
                as: 'klient'
            },
            {
                model: Przedmiot,
                as: 'przedmiot'
            }]
    });
};

exports.createOrder= (data) => {
    console.log(JSON.stringify(data));

    return Zakup.create({
        klient_id: data.klient_id,
        przedmiot_id: data.przedmiot_id,
        data_zamowienia: data.data_zamowienia,
        data_wysylki: data.data_wysylki,
        adres_wysylki: data.adres_wysylki
    });
};

exports.updateOrder = (orderId, data) => {
    return Zakup.update(data, {where: {id: orderId }});
}

exports.deleteOrder = (employmentId) => {
    return Zakup.destroy({
        where: { id: employmentId }
    });
}
