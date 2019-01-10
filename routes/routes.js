var db = require("../models");

module.exports = function (app) {
    // 
    // HTML
    // 

    app.get("/", function (req, res) {
        db.Region.findAll({
        }).then(function (result) {
            res.render("index", { regions: result });
        })
    });

    app.get("/northamerica", function (req, res) {
        db.Foods.findAll({
            where: {
                region_name: "North America"
            }
        }).then(function (result) {
            res.render('', { data: result });
        })
    });

    app.get("/southamerica", function (req, res) {
        db.Foods.findAll({
            where: {
                region_name: "South America"
            }
        }).then(function (result) {
            res.render('', { data: result });
        })
    });

    app.get("/europe", function (req, res) {
        db.Foods.findAll({
            where: {
                region_name: "Europe"
            }
        }).then(function (result) {
            res.render('', { data: result });
        })
    });

    app.get("/asia", function (req, res) {
        db.Foods.findAll({
            where: {
                region_name: "Asia"
            }
        }).then(function (result) {
            res.render('', { data: result });
        })
    });

    app.get("/africa", function (req, res) {
        db.Foods.findAll({
            where: {
                region_name: "Africa"
            }
        }).then(function (result) {
            res.render('', { data: result });
        })
    });

    app.get("/australia", function (req, res) {
        db.Foods.findAll({
            where: {
                region_name: "Australia"
            }
        }).then(function (result) {
            res.render('', { data: result });
        })
    });

    // 
    // API
    // 

    app.get("/api/foods", function (req, res) {
        db.Foods.findAll({}).then(function (result) {
            res.render('index', { data: result })
        })
    });

    app.get("/api/:region", function (req, res) {
        db.Region.findAll({
            where: {
                region_name: req.params.region
            }
        }).then(function (result) {
            res.json(result);
        })
    });

    app.get("/api/foods/id/:id", function (req, res) {
        db.Foods.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            res.json(result);
        })
    });

    app.get("/api/foods/name/:name", function (req, res) {
        db.Foods.findOne({
            where: {
                food_name: req.params.name
            }
        }).then(function (result) {
            res.json(result);
        })
    });

    app.get("/api/foods/country/:country", function (req, res) {
        db.Foods.findAll({
            where: {
                country: req.params.country
            }
        }).then(function (result) {
            res.json(result);
        })
    });

    app.get("/api/foods/upvotes/:upvotes", function (req, res) {
        db.Foods.findAll({
            where: {
                upvotes: {
                    $gte: req.params.upvotes
                }
            }
        })
    });

    app.post("/api/foods", function (req, res) {
        if (req.body.length > 0) {
            db.Foods.create(req.body).then(function (result) {
                res.json(result);
            })
        }
    });

    app.put("api/:region", function (req, res) {
        db.Region.update({
            posts: sequelize.literal('posts + 1')
        }, {
                where: {
                    region_name: req.params.region
                }
            }
        );
    })

    app.put("api/foods/id/:id/upvotes", function (req, res) {
        db.Foods.update({
            upvotes: sequelize.literal('upvotes + 1')
        }, {
                where: {
                    id: req.params.id
                }
            })
    })
}