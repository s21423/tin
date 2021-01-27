const EmployeeRepository = require('../repository/sequelize/KlientRepository');
const authUtil = require("../util/authUtils");


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    EmployeeRepository.findByEmail(email)
        .then(emp => {
            if(!emp) {
                res.render('index', {
                    navLocation: '',
                    komunikat: false,
                    pageTitle: 'Sklep internetowy',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if(authUtil.comparePasswords(password, emp.password) === true)  {
                req.session.loggedUser = emp;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    komunikat: false,
                    pageTitle: 'Sklep internetowy',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}

exports.registerForm = (req, res, next) => {
    res.render('addUser', {
        klient: {},
        pageTitle: 'Nowy klient',
        formMode: 'createNew',
        btnLabel: 'Dodaj klienta',
        formAction: '/register',
        navLocation: 'rejestracja',
        validationErrors: {}
    })
}

exports.register = (req, res, next) => {
    const klient = {...req.body};
    EmployeeRepository.createKlient(klient)
        .then(result => {
            res.render('index', {
                komunikat: true,
                kolorKomunikatu: 'green',
                komunikatTresc: 'Zarejestrowano! Proszę się zalogować',
                pageTitle: 'Sklep internetowy',
                navLocation: 'main'
            })
        })
        .catch(err => {
            console.log(err.errors)
            res.render('addUser', {
                klient: klient,
                pageTitle: 'Nowy klient',
                formMode: 'createNew',
                btnLabel: 'Dodaj klienta',
                formAction: '/register',
                navLocation: 'rejestracja',
                validationErrors: err.errors
            })
        });
};