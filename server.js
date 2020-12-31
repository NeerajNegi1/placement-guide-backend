const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config();


const SliderImagesRoutes = require('./routes/SliderImagesRoutes')
const placedStudentsRoutes = require("./routes/PlacedStudentsRoutes")
const BlogRoutes = require("./routes/BlogRoutes")
const authRoutes = require("./routes/auth")
const ChangeImages = require("./routes/ChangeLogoRoutes")
const PreparationGuide = require("./routes/PreparationGuideRoutes")
const ContactUs = require("./routes/ContactUsRoutes")

// Importing middlewares
app.use(cors());
app.use(morgan('combined'));
app.use(bodyparser.json({
    parameterLimit: 100000,
    limit: '50mb'
}));

// routes
app.use('/', SliderImagesRoutes);
app.use('/', placedStudentsRoutes);
app.use('/', BlogRoutes);
app.use('/', authRoutes);
app.use('/', ChangeImages);
app.use('/', PreparationGuide);
app.use('/', ContactUs);


mongoose.connect("mongodb+srv://nbn0126:nbn0126NBN!@cluster0.jwoip.mongodb.net/PlacementGuide?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("connected to database")).catch(err => console.log(err));


// for 404 routes

app.use(function (req, res, next) {
    res.status(404).json({
        err: "page not found"
    })
});

//  Listening at port 8080

const port = 8080;
app.listen(process.env.PORT || port, () => {
    console.log(`listining at port ${port}`);
});

