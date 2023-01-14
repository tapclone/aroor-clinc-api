const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const session = require("express-session");
const asyncHandler = require("express-async-handler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const mongoClient = require("mongodb").MongoClient;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const collection = {
  GALLERY_COLLECTION: "gallery",
  BLOG_COLLECTION: "blog",
  DOCTORS_COLLECTION: "doctors",
};
const state = {
  db: null,
};
const connect = function (done) {
  //mongo url
  const url =
    "mongodb+srv://asifsaheer:asifsaheer@cluster0.znc9fec.mongodb.net/?retryWrites=true&w=majority";

  mongoClient.connect(url, (err, data) => {
    if (err) return done(err);

    //mongoDB name
    const dbname = "AroorClinic";
    state.db = data.db(dbname);
  });
  done();
};
const get = function () {
  return state.db;
};
app.use(session({ secret: "key", cookie: { maxAge: 6000000 } }));
app.use("/api/admin", router);
const PORT = process.env.PORT || 8000;
connect((err) => {
  if (err) {
    console.log("connection error" + err);
  } else { 
    console.log("database connected");
  }
});
const generateToken = (id) => {
  return jwt.sign({ id }, "asif", {
    expiresIn: "30d",
  });
};
function verifyToken(req, res, next) {
  let authHeader = req.headers["auth-token"];
  if (authHeader == undefined) {
    res.status(401).send({ erorr: "no token provided" });
  }
  let token = authHeader;
  Jwt.verify(token, "asif", (err, res) => {
    if (err) {
      console.log("Unautherized");
      //  res.status(500).send("Authentication Failed")
    } else {
      next();
    }
  });
}

const Login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (username == "thearoorclinic" && password == "thearoorclinic@123") {
    const token = generateToken(password);

    res.status(200).json(token);
  } else {
    res.status(401).json("Invalid Details");
  }
});

const AddBlog = asyncHandler(async (req, res) => {
  const blogData = req.body;
  const addBlog = await get()
    .collection(collection.BLOG_COLLECTION)
    .insertOne(blogData);
  if (addBlog) {
    res.status(200).json("Success");
  } else {
    res.status(500).json("Somthing Went Wrong");
  }
});

const DeleteBlog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleteBlog = await get()
    .collection(collection.BLOG_COLLECTION)
    .deleteOne({ _id: ObjectId(id) });
  if (deleteBlog) {
    res.status(200).json("Success");
  } else {
    res.status(500).json("Somthing Went Wrong");
  }
});
const viewAllBlog = asyncHandler(async (req, res) => {
  const viewAllBlog = await get()
    .collection(collection.BLOG_COLLECTION)
    .find()
    .toArray();

  if (viewAllBlog) {
    res.status(200).send(viewAllBlog);
  } else {
    res.status(500).json("Somthing Went wrong");
  }
});

const AddGallery = asyncHandler((req, res) => {
  const obj = req.body;

  const add = get().collection(GALLERY_COLLECTION).insertOne(obj);
  if (add) {
    res.status(200).json("Success");
  } else {
    res.status(500).json("Somthing Went Wrong");
  }
});
const viewAllGallery = asyncHandler(async (req, res) => {
  const AllGallery = await get()
    .collection(GALLERY_COLLECTION)
    .find()
    .toArray();
  if (AllGallery) {
    res.status(200).json(AllGallery);
  } else {
    res.status(201).json("Gallery Empty");
  }
});
const DeleteGallery = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleteGallery = await get()
    .collection(GALLERY_COLLECTION)
    .deleteOne({ _id: ObjectId(id) });
  if (deleteGallery) {
    res.status(200).json(deleteGallery);
  } else {
    res.status(500).json("Something Went Wrong ");
  }
});

const AddDoctors = asyncHandler((req, res) => {
  const obj = req.body;

  const add = get().collection(DOCTORS_COLLECTION).insertOne(obj);
  if (add) {
    res.status(200).json("Success");
  } else {
    res.status(500).json("Somthing Went Wrong");
  }
});
const ViewAllDoctors = asyncHandler(async (req, res) => {
  const AllDoctors = await get()
    .collection(DOCTORS_COLLECTION)
    .find()
    .toArray();
  if (AllDoctors) {
    res.status(200).json(AllDoctors);
  } else {
    res.status(201).json("Gallery Empty");
  }
});
const DeleteDoctors = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleteDoctors = await get()
    .collection(DOCTORS_COLLECTION)
    .deleteOne({ _id: ObjectId(id) });
  if (deleteDoctors) {
    res.status(200).json(deleteDoctors);
  } else {
    res.status(500).json("Something Went Wrong ");
  }
});

router.route("/login").post(Login);
router.route("/addBlog").post(verifyToken, AddBlog);
router.route("/deleteBlog/:id").delete(verifyToken, DeleteBlog);
router.route("/viewAllBlog").get(viewAllBlog);
router.route("/addGallery").post(verifyToken, AddGallery);
router.route("/viewAllGallery").get(viewAllGallery);
router.route("/deleteGallery/:id").delete(verifyToken, DeleteGallery);
router.route("/addDoctors").post(verifyToken, AddDoctors);
router.route("/deleteDoctors/:id").delete(verifyToken, DeleteDoctors);
router.route("/viewAllDoctors").get(ViewAllDoctors);
app.listen(PORT, console.log(`server started on PORT ${PORT}`));
