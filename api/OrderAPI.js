const OrderRepository = require('../repository/sequelize/OrderRepository');

exports.showOrderList = (req, res, next) => {
    OrderRepository.getOrders()
        .then(orders => {
            res.status(200).json(orders);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.showOrderDetails = (req, res, next) => {
    const orderId = req.params.orderId;
    OrderRepository.getOrderById(orderId)
        .then(order => {
            if(!order) {
                res.status(404).json({
                    message: 'Order with id: '+orderId+' not found'
                })
            } else {
                res.status(200).json(order);
            }
        });
}

exports.addOrder = (req, res, next) => {
    OrderRepository.createOrder(req.body)
            .then(newObj => {
                res.status(201).json(newObj);
            })
            .catch(err => {
                console.log(err);
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
}

exports.editOrder = (req, res, next) => {
        const orderId = req.params.orderId;
        OrderRepository.updateOrder(orderId, req.body)
            .then(result => {
                res.status(200).json({message: 'Order updated!', order: result});
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
}

exports.deleteOrderById = (req, res, next) => {
    const orderId = req.params.orderId;
    OrderRepository.deleteOrder(orderId)
        .then(result => {
            res.status(200).json({message: 'Removed order', emp: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};