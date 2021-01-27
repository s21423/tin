const Sequelize = require('sequelize');

const Zakup = require('../../model/sequelize/Zakup');
const Klient = require('../../model/sequelize/Klient');
const Przedmiot = require('../../model/sequelize/Przedmiot');
const authUtil = require("../../util/authUtils");

exports.getKlients = () => {
    return Klient.findAll();
};

exports.getKlientById = (klientId) => {
    return Klient.findByPk(klientId, {include: [
            {
                model: Zakup,
                as: 'zakupy',
                include: [{
                    model: Przedmiot,
                    as: 'przedmiot',
                }]
            }]
    });
};

exports.createKlient = (data) => {
    console.log(JSON.stringify(data));

    return Klient.create({
        imie: data.imie,
        nazwisko: data.nazwisko,
        email: data.email,
        password: authUtil.hashPassword(data.password)
        }
    );
};

exports.updateKlient = (klientId, data) => {

    data.password = authUtil.hashPassword(data.password)

    return Klient.update(data, {where: {id: klientId }});
}

exports.deleteKlient = (klientId) => {
    return Klient.destroy({
        where: { id: klientId }
    });
}

exports.deleteManyKlients = (employmentIds) => {
    return Zakup.find({ id: { [Sequelize.Op.in]: employmentIds }})
}

exports.findByEmail = (email) => {
    return Klient.findOne({
        where: {email: email}
    });
}