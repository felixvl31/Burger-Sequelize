var db = require("../models");

module.exports = function(app) {
  
  // Create all our routes and set up logic within those routes where required.
  app.get("/", function(req, res) {
    db.Burger.findAll({
    }).then(function(dbBurger) {
      res.render("index", {burgers:dbBurger});
    });
  });

  app.post("/api/burgers", function(req, res) {
    db.Burger.create({
      name:req.body.name
    }).then(function(dbBurger) {
      res.json({ id: dbBurger.insertId });
    });
  });

  app.put("/api/burgers/:id", function(req, res) {
    var devoured = ( req.body.devoured ? 1 : 0 );
    db.Burger.update(
      {devoured:devoured},
      {
        where: {
          id: req.params.id
        }
      }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  app.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });


}
