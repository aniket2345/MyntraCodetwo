var express = require('express');
var multer  = require('multer');
var path = require('path');

var router = express();

router.get('/',(req, res)=>{
    console.log("pinged here");
    let destination = path.join(__dirname, '/views/upload.hbs');
    res.render(destination);
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

router.use(express.static(__dirname + '/public'));
router.use('/uploads', express.static('uploads'));

router.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  console.log(JSON.stringify(req.file))
  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  response += `<img src="${req.file.path}" /><br>`
  return res.send(response)
})

module.exports = router;
