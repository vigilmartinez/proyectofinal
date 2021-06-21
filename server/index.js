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
                    res.send({ message: "Username exists", duplicate: true })
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
    const cart = req.body.cart
    const aux = [];                                                         //Creamos un array vacío, donde meteremos tantos false como elementos haya en la cesta

    db.collection("sales").find().toArray(function (err, sales) {
        if (err != null) {
            res.send(err);
        } else {
            if (sales.length === 0 && cart.length > 1) {
                db.collection("sales").insertMany(cart, (err, info) => {
                    if (err != null) {
                        res.send(err)
                    } else {
                        res.send(info)
                    }
                })
            } else if (sales.length === 0 && cart.length === 1) {
                db.collection("sales").insertOne(cart[0], (err, info) => {
                    if (err != null) {
                        res.send(err)
                    } else {
                        res.send(info)
                    }
                })
            } else {
                console.log(cart)
                for (let i = 0; i < cart.length; i++) {                         //recorremos el array de la cesta para meter tantos false en el array aux como elementos haya en el array cesta
                    aux.push(false);
                }
                for (let i = 0; i < sales.length; i++) {                        //el primer bucle recorre el array de la base de datos
                    for (let j = 0; j < cart.length; j++) {                     //el segundo la cesta
                        if (sales[i].productName === cart[j].productName) {     //si el nombre del elemento del array de la base de datos es igual que el del elemento del array de la cesta
                            sales[i].cantidad += cart[j].cantidad;          //le sumamos la cantidad del array2 al array1
                            aux[j] = true;                                      //cambiamos el elemento del array aux a true (con el indice j que nos ha dado true el if)
                        }
                    }
                }
                for (let i = 0; i < aux.length; i++) {                          //una vez hemos sumado los que ya existian y hemos puesto el valor true a sus indices en aux, recorremos el array aux
                    if (aux[i] === false) {                                     //si el indice en el que nos encontramos es false significa que no existe en el array de la base de datos, por lo tanto hay que hacer un push
                        sales.push(cart[i]);                                    //se hace el push de ese indice del array 2 al array1
                    }
                }
                db.collection("sales").remove((err, info)=> {
                    if(err!= null){
                        res.send(err)
                    }else{
                        db.collection("sales").insertMany(sales, (err, info) => {
                            if (err != null) {
                                res.send(err)
                            } else {
                                res.send(info)
                            }
                        })
                    }
                })
            }
        }
    });
});



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