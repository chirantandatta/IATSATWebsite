const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const fs=require("fs");
const ejs=require("ejs");
const path=require("path");
const nodemailer=require("nodemailer")
const stripe = require('stripe')('sk_test_51J1bCkSEb2EikNpyoCDekU6kjQDtoUmqcmtXhpbZTOQCZcyco4f1KX5Nr5HPWh5svgolZdddKhBu7IyLr5uOtdBR00WU7Cl14u');
const app=express();
require('dotenv/config');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("assets"));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
var multer = require("multer");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });
mongoose.connect("mongodb+srv://chirantandatta:rohandatta123@cluster0.vkbr4.mongodb.net/IATSATDB",{useNewUrlParser:true,useUnifiedTopology:true});
var Schema = mongoose.Schema;
var schema = new Schema({
  registration:String,
  name:String,
  address:String,
  city:String,
  state:String,
  country:String,
  pin:String,
  phone:String,
  email:String,
  gender:String,
  date:String,
  class:String,
  school:String,
  year:String,
  college:String,
  image1: {data: Buffer, contentType: String},
  image2:  {data: Buffer, contentType: String}
});
var Studentschema=mongoose.Schema;
var studentschema=new Studentschema({
  userid:String,
  password:String
});
var Materialschema=mongoose.Schema;
var materialschema=new Materialschema({
  name:String,
  image:{data:Buffer,contentType:String}
});
var Schoolschema= mongoose.Schema;
var schoolschema=new Schoolschema({
  institute:String,
  name:String,
  designation:String,
  phone:String,
  email:String,
  image1: {data: Buffer, contentType: String},
  image2: {data: Buffer, contentType: String}
});
var Quizschema=mongoose.Schema;
var quizschema=new Quizschema({
  name:String,
  phone:String,
  email:String,
  qm:{
    q1:String,
    q2:String,
    q3:String,
    q4:String,
    q5:String,
    q6:String,
    q7:String,
    q8:String,
    q9:String,
    q10:String,
    q11:String,
    q12:String,
    q13:String,
    q14:String,
    q15:String,
    q16:String,
    q17:String,
    q18:String,
    q19:String,
    q20:String,
    q21:String,
    q22:String,
    q23:String,
    q24:String,
    q25:String,
    q26:String,
    q27:String,
    q28:String,
    q29:String
  },
qe:{
  q1:String,
  q2:String,
  q3:String,
  q4:String,
  q5:String,
  q6:String,
  q7:String,
  q8:String,
  q9:String,
  q10:String,
  q11:String,
  q12:String,
  q13:String,
  q14:String,
  q15:String,
  q16:String,
  q17:String,
  q18:String,
  q19:String,
  q20:String,
  q21:String,
  q22:String,
  q23:String,
  q24:String,
  q25:String,
  q26:String,
  q27:String,
  q28:String
},
qs:{
  q1:String,
  q2:String,
  q3:String,
  q4:String,
  q5:String,
  q6:String,
  q7:String,
  q8:String,
  q9:String,
  q10:String,
  q11:String,
  q12:String,
  q13:String,
  q14:String,
  q15:String,
  q16:String,
  q17:String,
  q18:String,
  q19:String,
  q20:String,
  q21:String,
  q22:String,
  q23:String,
  q24:String,
  q25:String,
  q26:String,
  q27:String,
  q28:String,
  q29:String,
  q30:String
},
qg:{
  q1:String,
  q2:String,
  q3:String,
  q4:String,
  q5:String,
  q6:String,
  q7:String,
  q8:String,
  q9:String,
  q10:String,
  q11:String,
  q12:String,
  q13:String,
  q14:String,
  q15:String,
  q16:String,
  q17:String,
  q18:String,
  q19:String,
  q20:String,
  q21:String,
  q22:String,
  q23:String,
  q24:String,
  q25:String,
  q26:String,
  q27:String,
  q28:String,
  q29:String,
  q30:String
},
qp:{
  q1:String,
  q2:String,
  q3:String,
  q4:String,
  q5:String,
  q6:String,
  q7:String,
  q8:String,
  q9:String,
  q10:String,
  q11:String,
  q12:String,
  q13:String,
  q14:String,
  q15:String,
  q16:String,
  q17:String,
  q18:String,
  q19:String,
  q20:String
}
});
var Subscribeschema=mongoose.Schema;
var subscribeschema=new Subscribeschema({
  email:String
});
const https = require("https");
const qs = require("querystring");
const checksum_lib = require("./Paytm/checksum");
const config = require("./Paytm/config");
const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });
var Model= new mongoose.model('Model', schema);
var Student=new mongoose.model('Student',studentschema);
var Material=new mongoose.model('Material',materialschema);
var School=new mongoose.model('School',schoolschema);
var Quiz=new mongoose.model('Quiz',quizschema);
var Subscribe=new mongoose.model('Subscribe',subscribeschema);
app.get("/",function(req,res){
  res.sendFile(__dirname+"/");
});
app.get("/mission",function(req,res){
  res.sendFile(__dirname+"/mission35.html");
});
app.get("/olympiad",function(req,res){
  res.sendFile(__dirname+"/olympiad.html");
});
app.get("/global",function(req,res){
  res.sendFile(__dirname+"/global.html");
});
app.get("/testpage",function(req,res){
  res.sendFile(__dirname+"/testpage.html");
});
app.get("/studentregistration",function(req,res){
  res.sendFile(__dirname+"/studentregistration.html");
});
app.get("/schoolregistration",function(req,res){
  res.sendFile(__dirname+"/schoolregistration.html");
})
app.post("/test",function(req,res){
  res.sendFile(__dirname+"/quiz.html");
});
app.post("/quizcomplete",function(req,res){
  res.redirect("/");
});
app.get("/login",function(req,res){
  res.sendFile(__dirname+"/login.html");
});
app.get("/uploadstudentmaterial",function(req,res){
  res.sendFile(__dirname+"/uploadmaterial.html")
})
app.post('/add',upload.fields([{
  name:"myfile1",maxCount:1
},{
  name:"myfile2",maxCount:1
}]
),(req,res,next)=>{
  var obj={
    registration:req.body.r2,
    name:req.body.name,
    address:req.body.address,
    city:req.body.city,
    state:req.body.state,
    country:req.body.country,
    pin:req.body.pin,
    phone:req.body.phone,
    email:req.body.email,
    gender:req.body.r1,
    date:req.body.date,
    class:req.body.class,
    school:req.body.school,
    year:req.body.year,
    college:req.body.college,
    image1:{
      data: fs.readFileSync(path.join(__dirname+'/uploads/'+req.files.myfile1[0].filename)),
      contentType: req.files.myfile1[0].filename.split('.').pop()
    },
    image2:{
      data: fs.readFileSync(path.join(__dirname+'/uploads/'+req.files.myfile2[0].filename)),
      contentType: req.files.myfile2[0].filename.split('.').pop()
    }
  }
  Model.create(obj,function(err,item){
    if(err){
      res.send(err);
    }else{
      res.sendFile(__dirname+"/confirm.html");
    }
  });
  });
app.get('/:id/image', function(req, res, next) {
  var modelId = req.params.id;
  Model.findById(modelId, function (err, model) {
    res.contentType(model.image1.contentType);
    res.send(model.image1.data);
  });
});
app.get('/image/:id', function(req, res, next) {
  var modelId = req.params.id;
  Model.findById(modelId, function (err, model) {
    res.contentType(model.image2.contentType);
    res.send(model.image2.data);
  });
});
app.post("/addschool",upload.fields([{
  name:"myfile1",maxCount:1
},{
  name:"myfile2",maxCount:1
}]
),(req,res,next)=>{
  var obj={
    institute:req.body.school,
    name:req.body.name,
    designation:req.body.designation,
    phone:req.body.phone,
    email:req.body.email,
    image1:{
      data: fs.readFileSync(path.join(__dirname+'/uploads/'+req.files.myfile1[0].filename)),
      contentType: req.files.myfile1[0].filename.split('.').pop()
    },
    image2:{
      data: fs.readFileSync(path.join(__dirname+'/uploads/'+req.files.myfile2[0].filename)),
      contentType: req.files.myfile2[0].filename.split('.').pop()
    }
  }
  School.create(obj,function(err,item){
    if(err){
      res.send(err);
    }else{
      res.sendFile(__dirname+"/confirm.html");
    }
  });
});
app.get('/:id/school', function(req, res, next) {
  var modelId = req.params.id;
  School.findById(modelId, function (err, model) {
    res.contentType(model.image1.contentType);
    res.send(model.image1.data);
  });
});
app.get('/school/:id', function(req, res, next) {
  var modelId = req.params.id;
  School.findById(modelId, function (err, model) {
    res.contentType(model.image2.contentType);
    res.send(model.image2.data);
  });
});
app.get("/studentdetailsviewschema",function(req,res){
  Model.find({},function(err,found){
    if(err){
      res.send(err)
    } else{
    res.render("details",{found:found});
  }
  })
});
app.get("/detailschool",function(req,res){
  School.find({},function(err,found){
    if(err){
      res.send(err)
    } else{
    res.render("detailschool",{found:found});
  }
  })
});
app.post("/sendmail",function(req,res){
  var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'pr.iatsat@gmail.com',
      pass:'mission2035',
    }
  });
  var mailoptions={
    from:"pr.iatsat@gmail.com",
    to:req.body.email,
    subject:"Registration Confirmed",
    text:"Student,your registration has been confirmed.Your username is "+req.body.email+" and your password is "+req.body.date+". Thank you for registering."
  };
  var student=new Student({
    userid:req.body.email,
    password:req.body.date
  });
  student.save(function(err){
    if(err){
      res.send(err)
    }else{
      transporter.sendMail(mailoptions,function(err,info){
        if(err){
          res.send(err);
        }else{
          console.log("Email Sent: "+info.response);
          res.redirect("/studentdetailsviewschema");
        }
      });
    }
  });
});
app.post("/sendmailschool",function(req,res){
  var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'pr.iatsat@gmail.com',
      pass:'mission2035',
    }
  });
  var mailoptions={
    from:"pr.iatsat@gmail.com",
    to:req.body.email,
    subject:"Registration Confirmed",
    text:"Dear contact person,registraion of all the students have been confirmed.The username is "+req.body.email+" and the password is "+req.body.phone+".Share the userid and password with the registered students of School/Institute.Thank you for registering."
  };
  var student=new Student({
    userid:req.body.email,
    password:req.body.phone
  });
  student.save(function(err){
    if(err){
      res.send(err)
    }else{
      transporter.sendMail(mailoptions,function(err,info){
        if(err){
          res.send(err);
        }else{
          console.log("Email Sent: "+info.response);
          res.redirect("/studentdetailsviewschema");
        }
      });
    }
  });
});
app.post("/upload",upload.single('myfile'),(req,res)=>{
  var obj = {
      name: req.body.name,
      image: {
          data: fs.readFileSync(path.join(__dirname+'/uploads/'+req.file.filename)),
          contentType: req.file.filename.split('.').pop()
      }
    }
      Material.create(obj, (err, item) => {
          if (err) {
              res.send(err);
          }
          else {
              res.redirect("/uploadstudentmaterial");
          }
   });
 });
 app.get("/upload/:id",(req,res)=>{
   var modelId = req.params.id;
   Material.findById(modelId, function (err, model) {
     res.contentType(model.image.contentType);
     res.send(model.image.data);
   });
 });
 app.post("/login",function(req,res){
   Student.findOne({userid:req.body.username},function(err,found){
        if(err){
          res.send(err);
        }else if(found){
          if(found.password==req.body.password){
            Material.find({},function(err,founds){
              if(err){
                res.send(err);
              }else{
                res.render("course",{found:founds});
              }
            });
          } else{
            res.redirect("/login");
          }
        }else{
          res.redirect("/login");
        }
   });
 });
app.post("/submitquiz",function(req,res){
  var quiz=new Quiz({
    name:req.body.name,
    phone:req.body.phone,
    email:req.body.email,
    qm:{
      q1:req.body.r1,
      q2:req.body.r2,
      q3:req.body.r3,
      q4:req.body.r4,
      q5:req.body.r5,
      q6:req.body.r6,
      q7:req.body.r7,
      q8:req.body.r8,
      q9:req.body.r9,
      q10:req.body.r10,
      q11:req.body.r11,
      q12:req.body.r12,
      q13:req.body.r13,
      q14:req.body.r14,
      q15:req.body.r15,
      q16:req.body.r16,
      q17:req.body.r17,
      q18:req.body.r18,
      q19:req.body.r19,
      q20:req.body.r20,
      q21:req.body.r21,
      q22:req.body.r22,
      q23:req.body.r23,
      q24:req.body.r24,
      q25:req.body.r25,
      q26:req.body.r26,
      q27:req.body.r27,
      q28:req.body.r28,
      q29:req.body.r29
    },
  qe:{
    q1:req.body.rb1,
    q2:req.body.rb2,
    q3:req.body.rb3,
    q4:req.body.rb4,
    q5:req.body.rb5,
    q6:req.body.rb6,
    q7:req.body.rb7,
    q8:req.body.rb8,
    q9:req.body.rb9,
    q10:req.body.rb10,
    q11:req.body.rb11,
    q12:req.body.rb12,
    q13:req.body.rb13,
    q14:req.body.rb14,
    q15:req.body.rb15,
    q16:req.body.rb16,
    q17:req.body.rb17,
    q18:req.body.rb18,
    q19:req.body.rb19,
    q20:req.body.rb20,
    q21:req.body.rb21,
    q22:req.body.rb22,
    q23:req.body.rb23,
    q24:req.body.rb24,
    q25:req.body.rb25,
    q26:req.body.rb26,
    q27:req.body.rb27,
    q28:req.body.rb28
  },
  qs:{
    q1:req.body.rc1,
    q2:req.body.rc2,
    q3:req.body.rc3,
    q4:req.body.rc4,
    q5:req.body.rc5,
    q6:req.body.rc6,
    q7:req.body.rc7,
    q8:req.body.rc8,
    q9:req.body.rc9,
    q10:req.body.rc10,
    q11:req.body.rc11,
    q12:req.body.rc12,
    q13:req.body.rc13,
    q14:req.body.rc14,
    q15:req.body.rc15,
    q16:req.body.rc16,
    q17:req.body.rc17,
    q18:req.body.rc18,
    q19:req.body.rc19,
    q20:req.body.rc20,
    q21:req.body.rc21,
    q22:req.body.rc22,
    q23:req.body.rc23,
    q24:req.body.rc24,
    q25:req.body.rc25,
    q26:req.body.rc26,
    q27:req.body.rc27,
    q28:req.body.rc28,
    q29:req.body.rc29,
    q30:req.body.rc30
  },
  qg:{
    q1:req.body.rd1,
    q2:req.body.rd2,
    q3:req.body.rd3,
    q4:req.body.rd4,
    q5:req.body.rd5,
    q6:req.body.rd6,
    q7:req.body.rd7,
    q8:req.body.rd8,
    q9:req.body.rd9,
    q10:req.body.rd10,
    q11:req.body.rd11,
    q12:req.body.rd12,
    q13:req.body.rd13,
    q14:req.body.rd14,
    q15:req.body.rd15,
    q16:req.body.rd16,
    q17:req.body.rd17,
    q18:req.body.rd18,
    q19:req.body.rd19,
    q20:req.body.rd20,
    q21:req.body.rd21,
    q22:req.body.rd22,
    q23:req.body.rd23,
    q24:req.body.rd24,
    q25:req.body.rd25,
    q26:req.body.rd26,
    q27:req.body.rd27,
    q28:req.body.rd28,
    q29:req.body.rd29,
    q30:req.body.rd30
  },
  qp:{
    q1:req.body.re1,
    q2:req.body.re2,
    q3:req.body.re3,
    q4:req.body.re4,
    q5:req.body.re5,
    q6:req.body.re6,
    q7:req.body.re7,
    q8:req.body.re8,
    q9:req.body.re9,
    q10:req.body.re10,
    q11:req.body.re11,
    q12:req.body.re12,
    q13:req.body.re13,
    q14:req.body.re14,
    q15:req.body.re15,
    q16:req.body.re16,
    q17:req.body.re17,
    q18:req.body.re18,
    q19:req.body.re19,
    q20:req.body.re20
  }
  });
  quiz.save(function(err){
    if(err){
      res.send(err)
    }else{
      res.sendFile(__dirname+"/quizconfirm.html");
    }
  })
});
app.get("/quizresponsestudent",function(req,res){
  Quiz.find({},function(err,found){
    res.render("quizresponse",{found:found});
  })
});
app.post("/sendmailquiz",function(req,res){
  var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'pr.iatsat@gmail.com',
      pass:'mission2035',
    }
  });
  var mailoptions={
    from:"pr.iatsat@gmail.com",
    to:req.body.email,
    subject:"Score of demo test",
    text:"Student your have scored"+req.body.score+" out of 140 in the demo olympiad.Thank you for appearing in the test"
  };
  transporter.sendMail(mailoptions,function(err,info){
    if(err){
      res.send(err);
    }else{
      console.log("Email Sent: "+info.response);
      res.redirect("/quizresponsestudent");
    }
  });
});
app.post("/subscribe",function(req,res){
  var subscribe=new Subscribe({
    email:req.body.email
  });
subscribe.save(function(err){
  if(err){
    res.send(err);
  }else{
    res.redirect("/");
  }
});
});
app.get("/subscriberlist",function(req,res){
  Subscribe.find({},function(err,found){
    res.render("subscriber",{found:found});
  });
});

app.listen(process.env.PORT||3000);
