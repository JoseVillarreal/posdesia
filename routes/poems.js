const Client = require('pg');

const client = new Client();
await client.connect(); 

let createPoem = function (req, res) {
    let query = {
        text: "INSERT INTO poems(name, text) VALUES ($1, $2) returning *",
        values: [req.params.username, req.params.poem]
    }

    client.query(query, (req, res) => {
        if (err) {
            console.log(err.stack)
          } else {
            res.send(200);
          }
    });
};

let loadAllPoems = function (req, res) {
    let query = {
        text: "SELECT * FROM poems"
    };

    client.query(query, (db_req, db_res) => {
        if (err) {
            console.log(err.stack);
        } else {
            res.json(db_res);
        }
    })
};

let loadPoemById = function (req, res) {
    let query = {
        text: "SELECT * FROM poems WHERE poem_id=$1",
        values: [req.params.poemId]
    };

    client.query(query, (req, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            return res.rows[0];
        }
    })
};

let addCommentToPoem = function (req, res) {
    
};

let poems = {
    addPoem: createPoem,
    loadSinglePoem: loadPoemById,
    addComment: addCommentToPoem
};

module.exports = poems;