const express = require ('express');
const router = express.Router();
const User = require('../models/users');
const multer = require ('multer');

//image upload 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({storage: storage}).single('file');

// inster into db routes

router.post('/add', upload, (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.file.filename
    });
    user.save(err =>{
        if(err){
            console.log(err);
            return;
        }
        else{
            console.log(req.session.body.message);
        }
        res.redirect('/users');
    })
       
});

router.get ('/users', (req, res) => {
    // res.send('Home Page');
    res.render('index',{
        title: 'Home Page'
    });
});

module.exports = router;