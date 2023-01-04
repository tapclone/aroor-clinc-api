const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const collection = require("../config/collection");
const generateToken = require("../utils/jwtToken");
const { ObjectId } = require("mongodb");
const { GALLERY_COLLECTION } = require("../config/collection");
const {DOCTORS_COLLECTION} =require('../config/collection')

const Login = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (username == "thearoorclinic" && password == "thearoorclinic@123") {
    const token = generateToken(password);

    res.status(200).json(token);
  } else {
    res.status(401).json("Invalid Details");
  }
});


const AddBlog = asyncHandler(async (req, res) => {
  console.log(req.body);
  const blogData = req.body;
  const addBlog = await db
    .get()
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
  const deleteBlog = await db
    .get()
    .collection(collection.BLOG_COLLECTION)
    .deleteOne({ _id: ObjectId(id) });
  if (deleteBlog) {
    res.status(200).json("Success");
  } else {
    res.status(500).json("Somthing Went Wrong");
  }
});
const viewAllBlog = asyncHandler(async (req, res) => {
  const viewAllBlog = await db
    .get()
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

  const obj = req.body
  console.log(obj);
  const add = db.get().collection(GALLERY_COLLECTION).insertOne(obj)
  if (add) {
    res.status(200).json("Success")   
  } else {
    res.status(500).json("Somthing Went Wrong")
  }     
})
const viewAllGallery = asyncHandler(async (req, res) => {
  const AllGallery = await db.get().collection(GALLERY_COLLECTION).find().toArray()
  if (AllGallery) {
    res.status(200).json(AllGallery)
  } else {
    res.status(201).json("Gallery Empty")
  }
})
const DeleteGallery=asyncHandler(async(req,res)=>{
  const id=req.params.id
  const deleteGallery=await db.get().collection(GALLERY_COLLECTION).deleteOne({_id:ObjectId(id)})
 if(deleteGallery){
  res.status(200).json(deleteGallery)
 }else{
  res.status(500).json("Something Went Wrong ")
 }
})

const AddDoctors = asyncHandler((req, res) => {

  const obj = req.body
  console.log(obj);
  const add = db.get().collection(DOCTORS_COLLECTION).insertOne(obj)
  if (add) {
    res.status(200).json("Success")
  } else {
    res.status(500).json("Somthing Went Wrong")
  }
})
const ViewAllDoctors = asyncHandler(async (req, res) => {
  const AllDoctors = await db.get().collection(DOCTORS_COLLECTION).find().toArray()
  if (AllDoctors) {
    res.status(200).json(AllDoctors)
  } else {
    res.status(201).json("Gallery Empty")
  }
})
const DeleteDoctors=asyncHandler(async(req,res)=>{
  const id=req.params.id
  const deleteDoctors=await db.get().collection(DOCTORS_COLLECTION).deleteOne({_id:ObjectId(id)})
 if(deleteDoctors){
  res.status(200).json(deleteDoctors)
 }else{
  res.status(500).json("Something Went Wrong ")
 }
})

module.exports = { Login, AddBlog, DeleteBlog, viewAllBlog, AddGallery,viewAllGallery ,DeleteGallery,AddDoctors,ViewAllDoctors,DeleteDoctors};
