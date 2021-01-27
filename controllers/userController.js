const KlientRepository = require('../repository/sequelize/KlientRepository');
const authUtil = require("../util/authUtils");


exports.showUserList = (req, res, next) => {
    KlientRepository.getKlients()
        .then(klienci => {
            res.render('userList', {
                komunikat: false,
                klienci: klienci,
                navLocation: 'klient',
                pageTitle: 'Klienci'
            });
        });
}
exports.showAddUserForm = (req, res, next) => {
    res.render('addUser', {
        klient: {},
        pageTitle: 'Nowy klient',
        formMode: 'createNew',
        btnLabel: 'Dodaj klienta',
        formAction: '/user/add',
        navLocation: 'klient',
        validationErrors: {}
    })
}
exports.showEditKlientForm = (req, res, next) => {
    const klientId = req.params.klientId;
    KlientRepository.getKlientById(klientId)
        .then(klient => {
            res.render('userEdit', {
                klient: klient,
                formMode: 'edit',
                pageTitle: 'Edycja klienta',
                btnLabel: 'Edytuj klienta',
                formAction: '/user/edit/' + klientId,
                navLocation: 'klient',
                validationErrors: {}
            });
        });
};

exports.showKlientDetails = (req, res, next) => {
    const klientId = req.params.klientId;
    KlientRepository.getKlientById(klientId)
        .then(klient => {
            res.render('userDetails', {
                klient: klient,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły klienta',
                formAction: '/user/edit/' + klientId,
                navLocation: 'klient',
            });
        });
}
exports.addUser = (req, res, next) => {
    const klient = {...req.body};
    KlientRepository.createKlient(klient)
        .then(() => {
            return KlientRepository.getKlients()
        })
        .then(allKlients => {
            res.render('userList', {
                komunikat: true,
                klienci: allKlients,
                komunikatTresc: 'Dodano klienta',
                pageTitle: 'Klienci',
                navLocation: 'klient'
            })
        })
        .catch(err => {
            console.log(err.errors)
            res.render('addUser', {
                klient: klient,
                pageTitle: 'Nowy klient',
                formMode: 'createNew',
                btnLabel: 'Dodaj klienta',
                formAction: '/user/add',
                navLocation: 'klient',
                validationErrors: err.errors
            })
        });
};

exports.updateUser = (req, res, next) => {
    const klientId = req.body.id;
    var klient = {...req.body}
    KlientRepository.updateKlient(klientId, klient)
        .then(() => {
            return KlientRepository.getKlients()
        })
        .then(allKlients => {
            res.render('userList', {
                komunikat: true,
                klienci: allKlients,
                komunikatTresc: 'Zaktualizowano klienta',
                pageTitle: 'Klienci',
                navLocation: 'klient'
            })
        })
        .catch(err => {
            console.log(err.errors)
            res.render('userEdit', {
                klient: klient,
                formMode: 'edit',
                pageTitle: 'Edycja klienta',
                btnLabel: 'Edytuj klienta',
                formAction: '/user/edit/' + klientId,
                navLocation: 'klient',
                validationErrors: err.errors
            })
        });

};


exports.deleteUser = (req, res, next) => {
    const klientId = req.params.klientId;
    KlientRepository.deleteKlient(klientId)
        .then(() => {
            return KlientRepository.getKlients()
        })
        .then(allKlients => {
            res.render('userList', {
                komunikat: true,
                klienci: allKlients,
                komunikatTresc: 'Usunieto klienta',
                pageTitle: 'Klienci',
                navLocation: 'klient'
            })
        })
};