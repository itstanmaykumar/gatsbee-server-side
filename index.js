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