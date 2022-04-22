const db = require("../model/db");
db.run("CREATE TABLE if not exists Categorys (id INT KEY,name TEXT)");
let createCategory = (name) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO Categorys(id, name) VALUES(?, ?)",
      [Date.now(), name],
      (err, row) => {
        if (err) {
          reject(err.message);
        }
        resolve(row);
      }
    );
  });
};
let getCategory = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Categorys", (err, rows) => {
      if (err) reject(err);
      const list = [];
      rows.forEach(function (row) {
        list.push(row);
      });
      resolve(list);
    });
  });
};
let updateCategory = (name, id) => {
  return new Promise((resolve, reject) => {
    db.all(
      "UPDATE `Categorys` SET `name`=? WHERE `id`=?",
      [name, id],
      (err, row) => {
        if (err) {
          reject(err.message);
        }
        resolve(row);
      }
    );
  });
};
let deteleCategory = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM Categorys WHERE id=?", [id], (err, row) => {
      if (err) {
        reject(err.message);
      }
      resolve(row);
    });
  });
};
module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deteleCategory,
};
