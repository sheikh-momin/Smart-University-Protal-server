const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000


const app =express();

// Middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v3avrd5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
  try{
    const allUserCollection = client.db('smartUniversityPortal').collection('allUsers')
    const applyOnline = client.db('smartUniversityPortal').collection('applyOnline')

    app.post('/allUsers', async(req, res ) =>{
      const user = req.body;
      const result = await allUserCollection.insertOne(user);
      res.send(result);
    })
    app.get('/allUsers/:email', async(req, res ) =>{
      const email = req.params.email;
      const query = { email };
      const result = await allUserCollection.findOne(query);
      res.send(result);
    })


    app.post('/applyOnline', async (req, res) => {
      const user = req.body;
      const result = await applyOnline.insertOne(user);
      res.send(result);
    });
  }
  finally{
  }
}
run().catch(console.log)



app.get('/', async(req, res) =>{
  res.send('Smart University Portal Server is running')
})



app.listen(port, () =>{
  console.log(`smart University Portal Running On ${port}`);
})