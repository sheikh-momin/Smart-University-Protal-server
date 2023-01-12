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

    app.get('/allUsers', async(req, res ) =>{
      const query ={};
      const users = await allUserCollection.find(query).toArray()
      res.send(users)
    })
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