const express = require("express");

const router = express.Router();

module.exports = router;

const {registration, user, login, checkAuth } = require("../controllers/auth")
const {payment, getAllTransaction, updatePayment, getTransactionById} = require("../controllers/payment")
const {addArtist, addSong, getSongs, getArtists} = require("../controllers/music")


// Middleware

const {uploadFile} = require('../middleware/upload');
const {auth} = require('../middleware/auth')


// user

router.post("/register", registration);
router.post("/login", login);
router.get("/user", user);
router.get("/check-auth", auth, checkAuth);

// payment
// upload("imageFile"),
router.post("/payment", auth, uploadFile("imageFile"),  payment);
router.get("/allpayment", getAllTransaction);
router.patch("/payment/:id", auth, updatePayment )
router.get("/payment/:id", auth, getTransactionById )

// add Artist Musics 
router.post("/artist", auth, addArtist);
router.post("/song", uploadFile("imageFile", "audioFile"),  addSong);
router.get("/song", getSongs);
router.get("/artists", getArtists);







