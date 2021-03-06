const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@gatsbee.wbrar.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log("Gatsbee DB Connected!");

        const database = client.db('GatsbeeDB');
        const burgersCollection = database.collection('burgers');


        // getting all burgers
        app.get('/burgers', async (req, res) => {
            const cursor = burgersCollection.find({});
            const burgers = await cursor.toArray();
            res.send(burgers);
        });
        // getting single burger
        app.get('/burgers/:burgerId', async (req, res) => {
            const id = req.params.burgerId;
            const query = { _id: ObjectId(id) };
            const singleBurger = await burgersCollection.findOne(query);
            res.send(singleBurger);
        });
        // updating single burger
        app.put("/burgers/:burgerId", async (req, res) => {
            const id = req.params.burgerId;
            const newRemain = req.body.current;
            const query = { _id: ObjectId(id) };
            console.log(newRemain);
            const updateDoc = {
                $set: {
                    remain: newRemain,
                },
            };
            await burgersCollection.updateOne(query, updateDoc);
        });


    }
    finally {
        // finally lorem :p
    }
}


run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello Bohemian!')
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})