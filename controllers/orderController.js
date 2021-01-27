const OrderRepository = require('../repository/sequelize/OrderRepository');
const KlientRepository = require('../repository/sequelize/KlientRepository');
const ItemRepository = require('../repository/sequelize/ItemRepository');

exports.showOrderList = (req, res, next) => {
    OrderRepository.getOrders()
        .then(orders => {
            res.render('orderList', {
                orders: orders,
                komunikat: false,
                navLocation: 'order',
                pageTitle: 'Zamówienia'

            });
        });
}

exports.showOrderDetails = (req, res, next) => {
    const orderId = req.params.orderId;
    OrderRepository.getOrderById(orderId)
        .then(order => {
            res.render('orderDetails', {
                order: order,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły zamówienia',
                formAction: '',
                navLocation: 'order'
            });
        });
}

exports.addOrderForm = (req, res, next) => {
    let allKlients, allPrzedmioty;
    KlientRepository.getKlients()
        .then(klienci => {
            allKlients = klienci;
            return ItemRepository.getItems();
        })
        .then(przedmioty => {
            allPrzedmioty = przedmioty;
            res.render('addOrder', {
                order: {},
                formMode: 'createNew',
                allKlients: allKlients,
                allPrzedmioty: allPrzedmioty,
                pageTitle: 'Nowe zamówienie',
                btnLabel: 'Dodaj zamówienie',
                formAction: '/order/add',
                navLocation: 'order',
                validationErrors: {}
            });
        });
}

exports.editOrderForm = (req, res, next) => {
    const orderId = req.params.orderId;
    let orderEdit
    let allKlients, allPrzedmioty;
    OrderRepository.getOrderById(orderId)
        .then(order => {
            orderEdit = order;
            return ItemRepository.getItems();
        })
        .then(przedmioty => {
            allPrzedmioty = przedmioty;
            return KlientRepository.getKlients();
        })
        .then(klienci => {
            allKlients = klienci;
            res.render('orderEdit', {
                formMode: 'edit',
                orderData: {},
                orderEdit: orderEdit,
                allKlients: allKlients,
                allPrzedmioty: allPrzedmioty,
                pageTitle: 'Edytuj zamówienie',
                btnLabel: 'Edytuj zamówienie',
                formAction: '/order/edit/' + orderId,
                navLocation: 'order',
                validationErrors: {}
            });
        })
}

exports.addOrder = (req, res, next) => {
    const order = {...req.body};
    OrderRepository.createOrder(order)
        .then(() => {
            return OrderRepository.getOrders()
        })
        .then(allZamowienia => {
            res.render('orderList', {
                komunikat: true,
                orders: allZamowienia,
                komunikatTresc: 'Dodano zamówienie',
                pageTitle: 'Zamówienia',
                navLocation: 'order'
            })
        })
        .catch(err => {
            console.log(err.errors)
            let allKlients, allPrzedmioty;
            KlientRepository.getKlients()
                .then(klienci => {
                    allKlients = klienci;
                    return ItemRepository.getItems();
                })
                .then(przedmioty => {
                    allPrzedmioty = przedmioty;
                    console.log(order);
                    res.render('addOrder', {
                        order: order,
                        formMode: 'createNew',
                        allKlients: allKlients,
                        allPrzedmioty: allPrzedmioty,
                        pageTitle: 'Nowe zamówienie',
                        btnLabel: 'Dodaj zamówienie',
                        formAction: '/order/add',
                        navLocation: 'order',
                        validationErrors: err.errors
                    })
                })
        })
};

exports.updateOrder = (req, res, next) => {
    const orderId = req.body.id;
    const orderData = {...req.body};
    OrderRepository.updateOrder(orderId, orderData)
        .then(() => {
            return OrderRepository.getOrders()
        })
        .then(allZamowienia => {
            res.render('orderList', {
                komunikat: true,
                orders: allZamowienia,
                komunikatTresc: 'Zaktualizowano zamówienie',
                pageTitle: 'Zamówienia',
                navLocation: 'order'
            })
        })
        .catch(err => {
            console.log(err.errors)
            let orderEdit
            let allKlients, allPrzedmioty;
            OrderRepository.getOrderById(orderId)
                .then(order => {
                    orderEdit = order;
                    return ItemRepository.getItems();
                })
                .then(przedmioty => {
                    allPrzedmioty = przedmioty;
                    return KlientRepository.getKlients();
                })
                .then(klienci => {
                    allKlients = klienci;
                    console.log('tu' + orderData)
                    res.render('orderEdit', {
                        formMode: 'edit',
                        orderData: orderData,
                        orderEdit: orderEdit,
                        allKlients: allKlients,
                        allPrzedmioty: allPrzedmioty,
                        pageTitle: 'Edytuj zamówienie',
                        btnLabel: 'Edytuj zamówienie',
                        formAction: '/order/edit/' + orderId,
                        navLocation: 'order',
                        validationErrors: err.errors
                    });
                })
        });
};

exports.deleteOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    OrderRepository.deleteOrder(orderId)
        .then(() => {
            return OrderRepository.getOrders()
        })
        .then(allZamowienia => {
            res.render('orderList', {
                komunikat: true,
                orders: allZamowienia,
                komunikatTresc: 'Usunieto zamówienie',
                pageTitle: 'Zamówienia',
                navLocation: 'order'
            })
        })
};