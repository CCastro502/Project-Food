var db = require("../models");

module.exports = function (app) {

    // 
    // API Routes
    // 
    app.get("/api/foods", function (req, res) {
        db.Food.findAll({}).then(function (result) {
            return res.json(result);
        })
    });

    app.get("/api/:region", function (req, res) {
        db.Region.findAll({
            where: {
                region_name: req.params.region
            }
        }).then(function (result) {
            return res.json(result);
        })
    });

    app.get("/api/foods/id/:id", function (req, res) {
        db.Food.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            return res.json(result);
        })
    });

    app.get("/api/foods/name/:name", function (req, res) {
        db.Food.findOne({
            where: {
                food_name: req.params.name
            }
        }).then(function (result) {
            return res.json(result);
        })
    });

    app.get("/api/foods/country/:country", function (req, res) {
        db.Food.findAll({
            where: {
                country: req.params.country
            }
        }).then(function (result) {
            return res.json(result);
        })
    });

    app.get("/api/foods/upvotes/:upvotes", function (req, res) {
        db.Food.findAll({
            where: {
                upvotes: {
                    $gte: req.params.upvotes
                }
            }
        }).then(function (result) {
            return res.json(result);
        })
    });

    app.post("/api/:region", function (req, res) {
        console.log("Length", req.body.length);
        db.Food.create(req.body).then(function (result) {
           // console.log("The food table create", result);
            db.Region.increment(['posts'], { where: { url_region_name: req.params.region } }).then(function (results) {
                console.log({ foods: result, regions: results });
                res.json({ foods: result });
            });
        });
    });

    app.put("/api/foods/id/:id/upvotes", function (req, res) {
        db.Food.update({
            upvotes: sequelize.literal('upvotes + 1')
        }, {
                where: {
                    id: req.params.id
                }
            }).then(function (result) {
                return res.json(result);
            })
    })

    // 
    // HTML Routes
    // 

    app.get("/", function (req, res) {
        db.Region.findAll({}).then(function (result) {
            if (result.length === 0) {
                db.Region.bulkCreate([
                    { formal_region_name: 'North America', url_region_name: "northamerica" },
                    { formal_region_name: 'South America', url_region_name: "southamerica" },
                    { formal_region_name: 'Europe', url_region_name: "europe" },
                    { formal_region_name: 'Asia', url_region_name: "asia" },
                    { formal_region_name: 'Africa', url_region_name: "africa" },
                    { formal_region_name: 'Australia', url_region_name: "australia" }
                ]).then(function () {
                    return res.render("index", { regions: result });
                })
            } else {
                return res.render("index", { regions: result });
            }
        })
    });

    app.get("/create", function (req, res) {
        return res.render("create");
    });

    app.get("/:region", function (req, res) {
        db.Food.findAll({
            where: {
                region_name: req.params.region
            }
        }).then(function (result) {
            return res.render("table", { foods: result });
        })
    });

    app.get("/:region/:id", function (req, res) {
        db.Food.findAll({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            return res.render("item", { foods: result });
        })
    });
}