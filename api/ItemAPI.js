const ItemRepository = require('../repository/sequelize/ItemRepository');

exports.getItems = (req, res, next) => {
    ItemRepository.getItems()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getItemById = (req, res, next) => {
    const empId = req.params.empId;
    ItemRepository.getItemById(empId)
        .then(emp => {
            if(!emp) {
                res.status(404).json({
                    message: 'Item with id: '+empId+' not found'
                })
            } else {
                res.status(200).json(emp);
            }
        });
};

exports.createItem = (req, res, next) => {
    ItemRepository.createItem(req.body)
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

exports.updateItem = (req, res, next) => {
    const empId = req.params.empId;
    ItemRepository.updateItem(empId, req.body)
        .then(result => {
            res.status(200).json({message: 'Item updated!', emp: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteItemById = (req, res, next) => {
    const empId = req.params.empId;
    ItemRepository.deleteItem(empId)
        .then(result => {
            res.status(200).json({message: 'Removed item', emp: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
