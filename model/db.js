var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./News.db");
db.run("CREATE TABLE if not exists `Categorys` (`id` INTEGER PRIMARY KEY  AUTOINCREMENT,`name` TEXT)");
db.run(
    "CREATE TABLE if not exists `News` (`id` INTEGER PRIMARY KEY AUTOINCREMENT,`Title` STRING,`ImageUrl` STRING,`Content` TEXT,`Author` STRING,`CreatedAt` INT)"
);
db.run(
    "CREATE TABLE if not exists `category_new_id` (`id` INTEGER PRIMARY KEY AUTOINCREMENT,`new_id` INT,`category_id` INT)"
);
db.run(
    "CREATE TABLE if not exists `Comments` (`id` INTEGER PRIMARY KEY AUTOINCREMENT,`Author` STRING,`Content` STRING,`CreatedAt` INT)"
);
db.run(
    "CREATE TABLE if not exists `comment_new_id` (`id` INTEGER PRIMARY KEY AUTOINCREMENT,`new_id` INT,`comment_id` INT)"
);

module.exports = db;

