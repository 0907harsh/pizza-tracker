/** @format */

const Menu = require("../../models/menu");

function homeController() {
    var locals = {
        title: "Homepage",
        active_home: "true",
        description: "this is the homepage",
    };
    return {
        async index(req, res) {
            var pizzas = await Menu.find();
            res.render("home", { locals, pizzas });
        },
    };
}

module.exports = homeController;
