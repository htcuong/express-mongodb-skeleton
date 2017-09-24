var express = require('express');
var router = express.Router();
const restaurants = require("../controllers/Restaurants");

// var restaurants = new Restaurants();

/* GET home page. */
router.get('/restaurants', restaurants.list);

router.get('/restaurants/add', restaurants.add);

router.get('/restaurants/info/:id', restaurants.info);

router.get('/restaurants/edit/:id', restaurants.edit);

router.get('/restaurants/remove/:id', restaurants.remove);

module.exports = router;
