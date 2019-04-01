var db = require("../models");

module.exports = function(app) {
  
  // Create all our routes and set up logic within those routes where required.
  app.get("/", function (req, res) {
    db.Burger.findAll({
      include: [
        { model: db.Customer }
      ],
    }).then(function (dbBurger) {
      db.Customer.findOne({
        order: [['createdAt', 'DESC']]
      }).then(function (dbCustomer) {
        res.render("index", { burgers: dbBurger, customers: dbCustomer });
      });

    });
  });

  app.post("/api/burgers", function(req, res) {
    db.Burger.create(
     req.body
    ).then(function(dbBurger) {
      res.json({ id: dbBurger.insertId });
    });
  });
  
  app.post("/api/customers", function(req, res) {
    db.Customer.create({
      name:req.body.name
    }).then(function(dbCustomer) {
      res.json({ id: dbCustomer.insertId });
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

  //FIND LAST CLIENT
  app.get("/api/lastCustomer", function(req, res) {
    db.Customer.findOne({
     order: [ [ 'createdAt', 'DESC' ]]
    }).then(function(dbCustomer) {
      res.json(dbCustomer);
    });
  });

  //Find Customers
  app.get("/api/customers", function(req, res) {
    db.Customer.findAll({ 
    }).then(function(dbCustomer) {
      res.json(dbCustomer);
    });
  });


}
