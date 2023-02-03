const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const multer = require("multer");

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
    const registeredCourseList = client.db('smartUniversityPortal').collection('registeredCourseList')
    const clearance = client.db('smartUniversityPortal').collection('clearance')
    const payment = client.db('smartUniversityPortal').collection('payment')
    const semesterDrop = client.db('smartUniversityPortal').collection('semesterDrop')

    // User
    app.get('/jwt', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user) {
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '20d' });
        return res.send({ accessToken: token });
      }
      res.status(403).send({ accessToken: '' });
    });

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

    
    // Apply Online
    app.post('/applyOnline', async (req, res) => {
      const user = req.body;
      const result = await applyOnline.insertOne(user);
      res.send(result);
    });


    // Registered Course List
    app.get('/registeredCourseList/:semester', async (req, res) => {
      const semester = req.params.semester;
      const query = { semester };
      const result = await registeredCourseList.findOne(query);
      res.send(result);
    })


    // Clearance
    app.get('/clearance/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await clearance.find(query).toArray();
      res.send(result);
    })


    // payment
    app.get('/payment/:semester', async (req, res) => {
      const semester = req.params.semester;
      const query = { semester };
      const result = await payment.findOne(query);
      res.send(result);
    })

    // Drop Semester
    app.post('/semesterDrop', async (req, res) => {
      const user = req.body;
      const result = await semesterDrop.insertOne(user);
      res.send(result);
    })

    app.get('/semesterDrop/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await clearance.find(query).toArray();
      res.send(result);
    })
  }
  finally{
  }
}
run().catch(console.log)

 const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, "uploads/");
   },
   filename: function (req, file, cb) {
     const fileName = Date.now() + "_" + file.originalname;
     cb(null, fileName);
   },
 });

 const upload = multer({ storage: storage });

 app.get("/resume", async (req, res) => {
   res.sendFile(
     __dirname +
       "http://localhost:3000/pages/jobplacement/index.js"
   );
 });
 app.post("/resume", upload.single("pdf"), async (req, res) => {
   res.send("File Uploaded");
 });

app.get('/', async(req, res) =>{
  res.send('Smart University Portal Server is running')
})



app.listen(port, () =>{
  console.log(`smart University Portal Running On ${port}`);
})