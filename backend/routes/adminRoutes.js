const express = require("express");
const router = express.Router();
const {verifyToken}=require("../middelware/jwtToken")
const { Login, AddBlog, DeleteBlog, viewAllBlog, AddGallery,viewAllGallery ,DeleteGallery,AddDoctors,ViewAllDoctors,DeleteDoctors} = require("../controls/adminControls");

router.route("/login").post(Login);
router.route('/addBlog').post(verifyToken,AddBlog)
router.route('/deleteBlog/:id').delete(verifyToken,DeleteBlog)
router.route('/viewAllBlog').get(viewAllBlog)
router.route("/addGallery").post(verifyToken,AddGallery)
router.route("/viewAllGallery").get(viewAllGallery)
router.route("/deleteGallery/:id").delete(verifyToken,DeleteGallery)
router.route('/addDoctors').post(verifyToken,AddDoctors)
router.route('/deleteDoctors/:id').delete(verifyToken,DeleteDoctors)
router.route('/viewAllDoctors').get(ViewAllDoctors)

module.exports = router;
