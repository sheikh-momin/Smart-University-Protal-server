const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const multer = require("multer");

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v3avrd5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const allUserCollection = client
      .db("smartUniversityPortal")
      .collection("allUsers");
    const applyOnline = client
      .db("smartUniversityPortal")
      .collection("applyOnline");
    const registeredCourseList = client
      .db("smartUniversityPortal")
      .collection("registeredCourseList");
    const clearance = client
      .db("smartUniversityPortal")
      .collection("clearance");
    const payment = client.db("smartUniversityPortal").collection("payment");
    const StudentDetails = client
      .db("smartUniversityPortal")
      .collection("studentDetails");
    const AlumniDetails = client
      .db("smartUniversityPortal")
      .collection("alumniDetails");
    const TeacherDetails = client
      .db("smartUniversityPortal")
      .collection("teacherDetails");
    const EmployeeDetails = client
      .db("smartUniversityPortal")
      .collection("employeeDetails");

    const semesterDrop = client.db("smartUniversityPortal").collection("drop");
    const registeredDetails = client
      .db("smartUniversityPortal")
      .collection("registeredDetails");

    // User;
    app.get("/jwt", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user) {
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
          expiresIn: "20d",
        });
        return res.send({ accessToken: token });
      }
      res.status(403).send({ accessToken: "" });
    });

    app.post("/allUsers", async (req, res) => {
      const user = req.body;
      const result = await allUserCollection.insertOne(user);
      res.send(result);
    });

    app.get("/allUsers/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await allUserCollection.findOne(query);
      res.send(result);
    });

    // Apply Online
    app.post("/applyOnline", async (req, res) => {
      const user = req.body;
      const result = await applyOnline.insertOne(user);
      res.send(result);
    });

    // Live result publish
    app.post("/liveResult", async (req, res) => {
      const data = req.body;
      const result = await liveResult.insertOne(data);
      res.send(result);
    });

    app.get("/liveResult/:semester", async (req, res) => {
      const semester = req.params.semester;
      const query = { semester };
      const result = await liveResult.findOne(query);
      res.send(result);
    });
    // Live result publish

    // Registered Course List
    app.get("/registeredCourseList/:semester", async (req, res) => {
      const semester = req.params.semester;
      const query = { semester };
      const result = await registeredCourseList.findOne(query);
      res.send(result);
    });

    app.post("/registeredCourseList", async (req, res) => {
      const data = req.body;
      const result = await registeredCourseList.insertOne(data);
      res.send(result);
    });

    app.delete('/registeredCourseList/:semester', async (req, res) => {
      const semester = req.params.semester;
      const query = { semester };
      const result = await reportedItemsCollection.deleteOne(query);
      res.send(result);
    });

    // Clearance
    app.get("/clearance/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await clearance.find(query).toArray();
      res.send(result);
    });

    app.post("/clearance", async (req, res) => {
      const user = req.body;
      const result = await clearance.insertOne(user);
      res.send(result);
    });

    //student details
    app.post("/studentDetails", async (req, res) => {
      const user = req.body;
      const result = await StudentDetails.insertOne(user);
      res.send(result);
    });

    app.get("/studentDetails", async (req, res) => {
      const query = {};
      const options = await StudentDetails.find(query).toArray();
      res.send(options);
    });
    // teacherDashboard Registered Details

    app.post("/registeredDetails", async (req, res) => {
      const user = req.body;
      const result = await registeredDetails.insertOne(user);
      res.send(result);
    });

    app.get("/registeredDetails", async (req, res) => {
      const query = {};
      const options = await registeredDetails.find(query).toArray();
      res.send(options);
    });

    //Teachers details
    app.post("/teacherDetails", async (req, res) => {
      const user = req.body;
      const result = await TeacherDetails.insertOne(user);
      res.send(result);
    });

    app.get("/teacherDetails", async (req, res) => {
      const query = {};
      const options = await TeacherDetails.find(query).toArray();
      res.send(options);
    });
    //Employee Details
    app.post("/employeeDetails", async (req, res) => {
      const user = req.body;
      const result = await EmployeeDetails.insertOne(user);
      res.send(result);
    });

    app.get("/employeeDetails", async (req, res) => {
      const query = {};
      const options = await EmployeeDetails.find(query).toArray();
      res.send(options);
    });

    //alumni details
    app.post("/alumniDetails", async (req, res) => {
      const user = req.body;
      const result = await AlumniDetails.insertOne(user);
      res.send(result);
    });

    app.get("/alumniDetails", async (req, res) => {
      const query = {};
      const options = await AlumniDetails.find(query).toArray();
      res.send(options);
    });

    //payment
    app.get("/payment/:semester", async (req, res) => {
      const semester = req.params.semester;
      const query = { semester };
      const result = await payment.findOne(query);
      res.send(result);
    });

    //semesterDrop
    app.post("/drop", async (req, res) => {
      const user = req.body;
      const result = await semesterDrop.insertOne(user);
      res.send(result);
    });

    app.get("/drop", async (req, res) => {
      const query = { };
      const result = await semesterDrop.find(query).toArray();
      res.send(result);
    });

    app.get("/drop/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await semesterDrop.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.log);

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
  res.sendFile(__dirname + "http://localhost:3000/pages/jobplacement/index.js");
});
app.post("/resume", upload.single("pdf"), async (req, res) => {
  res.send("File Uploaded");
});

app.get("/", async (req, res) => {
  res.send("Smart University Portal Server is running");
});

app.listen(port, () => {
  console.log(`smart University Portal Running On ${port}`);
});
