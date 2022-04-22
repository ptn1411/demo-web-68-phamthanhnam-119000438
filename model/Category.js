const db = require("../model/db");

let createCategory = (name) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO Categorys(name) VALUES( ?)",
      [name],
      (err, row) => {
        if (err) {
          reject(err.message);
        }
        resolve(row);
      }
    );
  });
};
let getCategoryByNewId = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM `category_new_id` WHERE new_id = ?",
      [id],
      (err, row) => {
        if (err) {
          reject(err.message);
        }
        db.get(
          "SELECT * FROM `categorys` WHERE id = ?",
          [row.category_id],
          (err, row) => {
            if (err) {
              reject(err.message);
            }
            resolve(row);
          }
        );
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
  getCategoryByNewId
};
