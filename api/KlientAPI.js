const KlientRepository = require('../repository/sequelize/KlientRepository');

exports.getKlients = (req, res, next) => {
    KlientRepository.getKlients()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getKlientById = (req, res, next) => {
    const empId = req.params.empId;
    KlientRepository.getKlientById(empId)
        .then(emp => {
            if(!emp) {
                res.status(404).json({
                    message: 'Employee with id: '+empId+' not found'
                })
            } else {
                res.status(200).json(emp);
            }
        });
};

exports.createKlient = (req, res, next) => {
    KlientRepository.createKlient(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateKlient = (req, res, next) => {
    const empId = req.params.empId;
    KlientRepository.updateKlient(empId, req.body)
        .then(result => {
            res.status(200).json({message: 'Employee updated!', emp: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteKlientById = (req, res, next) => {
    const empId = req.params.empId;
    KlientRepository.deleteKlient(empId)
        .then(result => {
            res.status(200).json({message: 'Removed employee', emp: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};