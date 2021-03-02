require("dotenv-safe").config();

const cors = require("cors");
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(
    `App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`
  );
});

app.get("/dashboard", verifyJWT, (req, res, next) => {
  pool.query(`select count(id) from users`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.get("/users", (req, res) => {
  const { table } = req.query;

  pool.query(`select * from users`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.post("/user", (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const { login, password, name } = req.body;

  const bcrypt = require("bcrypt");
  const saltRound = 10;
  const salt = bcrypt.genSaltSync(saltRound);
  const hash = bcrypt.hashSync(password, salt);

  pool.query(
    `insert into users set name='${name}', login = '${login}', password = '${hash}'`,
    (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.send(results);
      }
    }
  );
});

app.post("/login", (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const { login, password } = req.body;

  pool.query(
    `select * from users where login = '${login}' limit 1`,
    (err, results) => {
      if (err) {
        res.status(500).json({ message: "Ocorreu um erro!" });
      } else {
        if (results.length) {
          const bcrypt = require("bcrypt");
          const salt = bcrypt.genSaltSync(10);

          if (bcrypt.compare(password, results[0].password)) {
            const id = results.id;
            const token = jwt.sign({ id }, process.env.SECRET, {
              expiresIn: 3600, // expires in 15min
            });

            return res.json({ auth: true, token: token });
          }
        }

        res.status(404).send({
          message: `Not found User`,
        });
      }
    }
  );
});

app.get("/logout", (req, res) => {
  res.json({ auth: false, token: null });
});

function verifyJWT(req, res, next) {
  const bearer = req.headers["authorization"];
  if (!bearer)
    return res.status(401).json({ auth: false, message: "No token provided." });

  const token = bearer.split(" ")[1];

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });
    }

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}
