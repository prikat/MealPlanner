var db = require("../models");

module.exports = function(app) {
    app.get("/api/chef", function(req, res) {
        db.User.findAll({
            include: [db.Chef]
        }).then(function(chefGetResults) {
            res.json(chefGetResults)
        })
    })

    app.get("/api/chef/:id", function(req, res) {
        db.Chef.findAll({
            where: {
                UserId: req.params.id
            }
        }).then(function(chefGetResults) {
            res.json(chefGetResults)
        })
    })
    
    app.post("/api/chef", function(req, res) {
        db.Chef.create(req.body).then(function(chefCreateResult) {
            res.json(chefCreateResult)
        })
    })

    
}