const express = require('express');
const fs = require('fs');

const favouritesRouter = express.Router();

const favouritesDbFile = `${__dirname}/../../db/favouriteItems.json`;

const setFavouriteItem = (itemId, favourite) => {
    let favourites = [];
    try {
        favourites = JSON.parse(fs.readFileSync(favouritesDbFile, 'utf8'));
    } catch (exception) { }

    idIndex = favourites.indexOf(itemId);
    if (idIndex === -1 && favourite) {
        favourites.push(itemId);
    } else if (idIndex !== -1 && !favourite) {
        favourites.splice(idIndex, 1);
    }
    json = JSON.stringify(favourites);
    fs.writeFileSync(favouritesDbFile, json, 'utf8');
}

favouritesRouter.post('/set/:id/:favourite', (req, res) => {
    const id = req.params.id;
    const favourite = req.params.favourite === 'true';
    setFavouriteItem(id, favourite);
    res.status(200).json(favourite);
});

favouritesRouter.get('', (req, res) => {
    let json = [];
    try {
        json = JSON.parse(fs.readFileSync(favouritesDbFile, 'utf8'));
    } catch (exception) { }
    res.status(200).json(json);
});

favouritesRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const favourites = JSON.parse(fs.readFileSync(favouritesDbFile, 'utf8'));

    res.status(200).json(favourites.indexOf(id) !== -1);
});

module.exports = favouritesRouter;
