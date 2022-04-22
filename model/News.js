const db = require("../model/db");

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
let getNewsById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM News WHERE `id`=?",[id], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
let updateNews = (Title,ImageUrl,Content,Author, id) => {
  return new Promise((resolve, reject) => {
    db.all(
      "UPDATE `News` SET `Title`=?, `ImageUrl`=? ,`Content`=?,`Author`=? WHERE `id`=?",
      [Title,ImageUrl,Content,Author, id],
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
    db.run("DELETE FROM category_new_id WHERE new_id=?", [id], (err, row) => {
      if (err) {
        reject(err.message);
      }
      db.run("DELETE FROM News WHERE id=?", [id], (err, row) => {
        if (err) {
          reject(err.message);
        }
        resolve(row);
      });

    });
  });
};
module.exports = {
  createNews,
  getNews,
  updateNews,
  deteleNews,
    getNewsById
};
