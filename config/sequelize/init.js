const sequelize = require('./sequelize');

const Klient = require('../../model/sequelize/Klient');
const Przedmiot = require('../../model/sequelize/Przedmiot');
const Zakup = require('../../model/sequelize/Zakup');

const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');

module.exports = () => {
    Klient.hasMany(Zakup, {as: 'zakupy', foreignKey: {name: 'klient_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Zakup.belongsTo(Klient, {as: 'klient', foreignKey: {name: 'klient_id', allowNull: false} } );
    Przedmiot.hasMany(Zakup, {as: 'zakupy', foreignKey: {name: 'przedmiot_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Zakup.belongsTo(Przedmiot, {as: 'przedmiot', foreignKey: {name: 'przedmiot_id', allowNull: false} });

    let allKlienci, allPrzedmioty;
    return sequelize
        .sync({force: true})//zeby po wylaczeniu aplikacji baza byla taka jak po modyfikacjach nalezy zmienic na false wpp na true
        .then( () => {
            return Klient.findAll();
        })
        .then(emps => {
            if( !emps || emps.length == 0 ) {
                return Klient.bulkCreate([
                    {imie: 'Jan', nazwisko: 'Kowalski', email: 'jan.kowalski@acme.com', password: passHash},
                    {imie: 'Piotr', nazwisko: 'Kowalski', email: 'piotr.kowalski@acme.com',password: passHash},
                    {imie: 'Adam', nazwisko: 'Kowalski', email: 'adam.kowalski@acme.com',password: passHash},

                ])
                    .then( () => {
                        return Klient.findAll();
                    });
            } else {
                return emps;
            }
        })
        .then( emps => {
            allKlienci = emps;
            return Przedmiot.findAll();
        })
        .then( depts => {
            if( !depts || depts.length == 0 ) {
                return Przedmiot.bulkCreate([
                    { nazwa: 'TV', typ: 'RTV', cena: 1000 },
                    { nazwa: 'Pralka', typ: 'AGD', cena: 1500 }
                ])
                    .then( () => {
                        return Przedmiot.findAll();
                    });
            } else {
                return depts;
            }
        })
        .then( depts => {
            allPrzedmioty = depts;
            return Zakup.findAll();
        })
        .then( empls => {
            if( !empls || empls.length == 0 ) {
                return Zakup.bulkCreate([
                    {klient_id: allKlienci[0].id, przedmiot_id: allPrzedmioty[1].id, data_zamowienia: '2001-01-01', data_wysylki: '2001-01-01', adres_wysylki: 'ul. Konwaliowa 12, 00-001 Warszawa'},
                    {klient_id: allKlienci[1].id, przedmiot_id: allPrzedmioty[0].id, data_zamowienia: '2001-01-01', data_wysylki: '2001-01-01', adres_wysylki: 'ul. Konwaliowa 12, 00-001 Warszawa'},
                    {klient_id: allKlienci[2].id, przedmiot_id: allPrzedmioty[0].id, data_zamowienia: '2001-01-01', data_wysylki: '2001-01-01', adres_wysylki: 'ul. Konwaliowa 12, 00-001 Warszawa'},
                    {klient_id: allKlienci[0].id, przedmiot_id: allPrzedmioty[0].id, data_zamowienia: '2001-01-01', data_wysylki: '2001-01-01', adres_wysylki: 'ul. Konwaliowa 12, 00-001 Warszawa'}
                ]);
            } else {
                return empls;
            }
        });
};