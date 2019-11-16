const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://latiTech:personal12@cluster0-yatzy.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "crocery-list";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "` on localhost 3000!");
    });
});


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('items').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {items: result})
  })
})

app.post('/items', (req, res) => {
  db.collection('items').save({name: req.body.name, price: req.body.price}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/items', (req, res) => {
  db.collection('items')
  .findOneAndUpdate({name: req.body.name}, {
    $set: {
      price: req.body.price
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/items', (req, res) => {
  db.collection('items').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Item Deleted')
  })
})
