const ItemRepository = require('../repository/sequelize/ItemRepository');

exports.showItemList = (req, res, next) => {
    ItemRepository.getItems()
        .then(items => {
            res.render('itemList', {
                items: items,
                pageTitle: 'Przedmioty',
                navLocation: 'item',
                komunikat: false
            });
        });
}

exports.showItemDetails = (req, res, next) => {
    const itemId = req.params.itemId;
    ItemRepository.getItemById(itemId)
        .then(item => {
            res.render('itemDetails', {
                item: item,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły przedmiotu',
                formAction: '/items/edit/' + itemId,
                navLocation: 'item'
            });
        });
}

exports.addItemForm = (req, res, next) => {
    res.render('addItem', {
        item: {},
        pageTitle: 'Nowy przedmiot',
        formMode: 'createNew',
        btnLabel: 'Dodaj przedmiot',
        formAction: '/item/add',
        navLocation: 'item',
        validationErrors: {}
    });
}

exports.editItemForm = (req, res, next) => {
    const itemId = req.params.itemId;
    ItemRepository.getItemById(itemId)
        .then(item => {
            res.render('editItem', {
                item: item,
                formMode: 'edit',
                pageTitle: 'Edycja przedmiotu',
                btnLabel: 'Edytuj przedmiot',
                formAction: '/item/edit/' + itemId,
                navLocation: 'item',
                validationErrors: {}
            });
        });
}
exports.deleteItemButton = (req, res, next) => {
    const itemId = req.params.itemId;
    ItemRepository.deleteItem(itemId)
        .then(() => {
            res.redirect('/item');
        });
};

exports.addItem = (req, res, next) => {
    const item = {...req.body};
    ItemRepository.createItem(item)
        .then(() => {
            return ItemRepository.getItems()
        })
        .then(allItems => {
            res.render('itemList', {
                items: allItems,
                komunikat: true,
                komunikatTresc: 'Dodano przedmiot',
                navLocation: 'item',
                pageTitle: 'Przedmioty'
            })
        })
        .catch(err => {
            console.log(err.errors)
            res.render('addItem', {
                item: item,
                pageTitle: 'Nowy przedmiot',
                formMode: 'createNew',
                btnLabel: 'Dodaj przedmiot',
                formAction: '/item/add',
                navLocation: 'item',
                validationErrors: err.errors
            })
        });
};

exports.updateItem = (req, res, next) => {
    const itemId = req.body.id;
    const item = {...req.body};
    ItemRepository.updateItem(itemId, item)
        .then(() => {
            return ItemRepository.getItems()
        })
        .then(allItems => {
            res.render('itemList', {
                items: allItems,
                komunikat: true,
                komunikatTresc: 'Zaktualizowano przedmiot',
                navLocation: 'item',
                pageTitle: 'Przedmioty'
            })
        })
        .catch(err => {
            console.log(err.errors)
            res.render('editItem', {
                item: item,
                pageTitle: 'Edycja przedmiotu',
                formMode: 'edit',
                btnLabel: 'Edytuj przedmiot',
                formAction: '/item/edit/' + itemId,
                navLocation: 'item',
                validationErrors: err.errors
            })
        })
};

exports.deleteItem = (req, res, next) => {
    const itemId = req.params.itemId;
    ItemRepository.deleteItem(itemId)
        .then(() => {
            return ItemRepository.getItems()
        })
        .then(allItems => {
            res.render('itemList', {
                items: allItems,
                komunikat: true,
                komunikatTresc: 'Usunieto przedmiot',
                navLocation: 'item',
                pageTitle: 'Przedmioty'
            })
        })
};