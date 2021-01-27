const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passPlain) => {
    const passHashed = bcrypt.hashSync(passPlain, salt);
    return passHashed;
}

exports.comparePasswords = (passPlain, passHash) => {
    const res = bcrypt.compareSync(passPlain, passHash);
    return res;
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if(loggedUser) {
        next();
    } else {
        res.render('index', {
            komunikat: true,
            komunikatTresc: 'Brak dostępu! Zaloguj się',
            kolorKomunikatu: 'red',
            pageTitle: 'Sklep internetowy',
            navLocation: 'main'
        })
        throw new Error('unauthorized access');
    }
}