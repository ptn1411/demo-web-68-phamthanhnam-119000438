const db = require("../model/db");
db.run(
  "CREATE TABLE if not exists News (id INTEGER PRIMARY KEY,Title STRING,ImageUrl STRING,Content TEXT,Author STRING,CreatedAt INT)"
);
db.run(
  "CREATE TABLE if not exists category_new_id (id INTEGER PRIMARY KEY,new_id INT,category_id INT)"
);

let createNews = (Title, ImageUrl, Content, Author, category_id) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO `News` (Title,ImageUrl,Content,Author,CreatedAt) VALUES(?, ?,?,?,?)",
      [Title, ImageUrl, Content, Author, Date.now()],
      (err) => {
        if (err) {
          reject(err.message);
        }
        db.get(
          "SELECT * FROM `News` ORDER BY id DESC LIMIT 1",
          (err2, row2) => {
            console.log(
              "Row was added to the table: " + JSON.stringify(row2.id)
            );
            db.run(
              "INSERT INTO `category_new_id` (new_id,category_id) VALUES(?, ?)",
              [row2.id, category_id],
              (err3) => {
                if (err3) {
                  reject(err3.message);
                }
                resolve(row2);
              }
            );
          }
        );
      }
    );
  });
};
let getNews = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM News", (err, rows) => {
      if (err) reject(err);
      const list = [];
      rows.forEach(function (row) {
        list.push(row);
      });
      resolve(list);
    });
  });
};
let updateNews = (name, id) => {
  return new Promise((resolve, reject) => {
    db.all(
      "UPDATE `News` SET `name`=? WHERE `id`=?",
      [name, id],
      (err, row) => {
        if (err) {
          console.log(err);
          reject(err.message);
        }
        resolve(row);
      }
    );
  });
};
let deteleNews = (id) => {
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
  createNews,
  getNews,
  updateNews,
  deteleNews,
};
