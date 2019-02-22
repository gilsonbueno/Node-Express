var db = require('../repository/index');

exports.post = (req, res, next) => {
  const name = req.body.name;
  const age = req.body.age;

  const dataToInsert = {
    NAME: name,
    AGE: age
  };

  const handler = (err, res) => {
    if (err != null) {
      res.json(err);
    } else {
      res.status(201).json({message: "Success"});
    }
  }

  db.register(dataToInsert, handler, res);
};

exports.put = (req, res, next) => {
  let id = req.params.id;
  const name = req.body.name;
  const age = req.body.age;
  const dataToUpdate = {
    ID: id,
    NAME: name,
    AGE: age
  };
  const handler = (err, res) => {
    if (err != null) {
      res.json(err);
    } else {
      res.status(200).json({message: "Success"});
    }
  }
  db.update(dataToUpdate, handler, res);
};

exports.delete = (req, res, next) => {
  let id = req.params.id;

  const handler = (err, res) => {
    if (err != null) {
      res.status(500).json(err);
    } else {
      res.status(200).json({message: "Success"});
    }
  }

  db.delete(id, handler, res);
};

exports.get = (req, res, next) => {
  const handler = (err, result, res) => {
    if (!err && result != null) {
      var jsonResult = [];
        result.forEach(function(item){
          jsonResult.push({
            id: item.ID,
            name: item.NAME,
            age: item.AGE
          });
        });
        res.json(jsonResult);
    } else if (err != null) {
      res.status(500).json(err);
    } else {
      res.status(404).json({message: "Not found"});
    }
  }

  db.findAll(handler, res);
};

exports.getById = (req, res, next) => {
  let id = req.params.id;
  const handler = (err, result, res) => {
    if (!err && result != null) {
        const jsonResult = {
          id: result.ID,
          name: result.NAME,
          age: result.AGE
        };
        res.json(jsonResult);
    } else if (err != null) {
      res.json(err);
    } else {
      res.status(404).json({message: "Register not found"});
    }
  }

  db.findById(id, handler, res);
};