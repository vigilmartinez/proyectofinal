const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");

const app = express();
let db;


MongoClient.connect(("mongodb://localhost:27017"), (err, client) => {
    if (err != null) {
        console.log(err)
    } else {
        db = client.db("proyectoFinal")
    }
})

app.use(express.json());


app.post("/register", (req, res) => {
    let username = req.body.username;
    let password = bcrypt.hashSync(req.body.password, 10);
    //Preguntar como hacer para que no se puedan registrar 2 con el mismo username
    //for (let i = 0; i < users.length; i++) {
    //if (username === users[i].username) {
    //res.send({ message: "User already registered" })
    //} else {
    db.collection("users").insertOne(
        { username: username, password: password },
        (err, info) => {
            if (err != null) {
                res.send({ err, message: "Unable to Register" })
            } else {
                res.send({ message: "Registered Correctly" })
            }
        })
    //}
    //}
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.collection("users")
        .find({ username: username })
        .toArray((err, arrayUser) => {
            if (err != null) {
                res.send(err);
            } else {
                if (arrayUser.length > 0) {
                    if (bcrypt.compareSync(password, arrayUser[0].password)) {
                        res.send({ message: "Logged In", username: arrayUser[0] })
                    } else {
                        res.send({ message: "Incorrect Password" })
                    }
                } else {
                    res.send({ message: "User does not exist" })
                }
            }
        })
});



app.get("/shop", (req, res) => {
    db.collection("shopItems")
})

app.post("/shop", (req, res) => {
    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    const productPrize = req.body.productPrize;
    const productImg = req.body.productImg;
    db.collection("shopItems").insertOne(
        { productName: productName, productDescription: productDescription, productPrize: productPrize, productImg: productImg },
        (err, info) => {
            if (err != null) {
                res.send({ err, message: "Unable to Register" })
            } else {
                res.send({ message: "Saved Correctly" })
            }
        })
});


app.listen(3001);