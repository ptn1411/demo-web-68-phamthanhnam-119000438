const db = require("../model/db");
db.run(
  "CREATE TABLE if not exists Comments (id INT,Author STRING,Content STRING,CreatedAt INT)"
);
db.run(
  "CREATE TABLE if not exists comment_new_id (id INTEGER PRIMARY KEY,new_id INT,ccomment_id INT)"
);
