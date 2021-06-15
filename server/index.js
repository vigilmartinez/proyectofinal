const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
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



//-------------Registro y Login-------------

//-------------Registro-------------
app.post("/register", (req, res) => {
    let username = req.body.username;
    let password = bcrypt.hashSync(req.body.password, 10);
    let exist = false
    //Preguntar como hacer para que no se puedan registrar 2 con el mismo username
    //for (let i = 0; i < users.length; i++) {
    //if (username === users[i].username) {
    //res.send({ message: "User already registered" })
    //} else {
    db.collection("users")
        .find().toArray((err, arrayUser) => {
            if (err != null) {
                res.send(err);
            } else {
                for (let i = 0; i < arrayUser.length; i++) {
                    if (arrayUser[i].username === username) {
                        exist = true
                    }
                }
                if (exist === false) {
                    db.collection("users").insertOne(
                        { username: username, password: password },
                        (err, info) => {
                            if (err != null) {
                                res.send({ err, message: "Unable to Register" })
                            } else {
                                res.send({ message: "Registered Correctly" })
                            }
                        })
                } else {
                    res.send({ message: "Username exists" })
                }
            }
        })
});

//-------------Login-------------
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
                        res.send({ message: "Logged In", username: arrayUser[0], error: false })
                    } else {
                        res.send({ message: "Incorrect Password", error: true })
                    }
                } else {
                    res.send({ message: "User does not exist", error: true })
                }
            }
        })
});



//-------------Tienda-------------
//-------------rutas get-------------
app.get("/shop", (req, res) => {
    db.collection("shopItems").find().toArray(function (err, datos) {
        if (err != null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
});

app.get("/shop/:id", (req, res) => {
    let itemId = ObjectID(req.params.id);

    db.collection("shopItems").find({ _id: itemId }).toArray(function (err, datos) {
        if (err != null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    })
});

//-------------rutas post-------------
app.post("/shop", (req, res) => {
    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    const productPrize = req.body.productPrize;
    const productImg = req.body.productImg;
    const productStock = req.body.productStock;

    db.collection("shopItems").insertOne(
        { productName: productName, productDescription: productDescription, productPrize: productPrize, productImg: productImg, productStock: productStock },
        (err, info) => {
            if (err != null) {
                res.send({ err, message: "Unable to Save" })
            } else {
                res.send({ message: "Saved Correctly" })
            }
        })
});



//-------------Ventas-------------
//-------------rutas get-------------
app.get("/sales", (req, res) => {
    db.collection("sales").find().toArray(function (err, datos) {
        if (err != null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
});

//-------------rutas post-------------
app.post("/sales", (req, res) => {
    if (req.body.cart.length === 1) {
        db.collection("sales").insertOne(
            req.body.cart[0],
            (err, info) => {
                if (err != null) {
                    res.send({ err, message: "Unable to Save" })
                } else {
                    res.send({ message: "Saved Correctly" })
                }
            })
    } else {
        db.collection("sales").insertMany(
            req.body.cart,
            (err, info) => {
                if (err != null) {
                    res.send({ err, message: "Unable to Save" })
                } else {
                    res.send({ message: "Saved Correctly" })
                }
            })
    }
});

/* app.post("/sales/various", (req, res) => {

    db.collection("sales").insertMany(
        req.body.cart,
        (err, info) => {
            if (err != null) {
                res.send({ err, message: "Unable to Save" })
            } else {
                res.send({ message: "Saved Correctly" })
            }
        })
}); */



//-------------Lugares-------------
//-------------rutas get-------------
app.get("/placestogo", (req, res) => {
    db.collection("placestogo").find().toArray(function (err, datos) {
        if (err != null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
});

//-------------rutas post-------------
app.post("/placestogo", (req, res) => {
    const placeTitle = req.body.placeTitle;
    const placeDescription = req.body.placeDescription;
    const placeCoords = req.body.placeCoords;
    const placeImg = req.body.placeImg;

    db.collection("placestogo").insertOne(
        { placeTitle: placeTitle, placeDescription: placeDescription, placeCoords: placeCoords, placeImg: placeImg },
        (err, info) => {
            if (err != null) {
                res.send({ err, message: "Unable to Save" })
            } else {
                res.send({ message: "Saved Correctly" })
            }
        })
});


app.listen(3001);