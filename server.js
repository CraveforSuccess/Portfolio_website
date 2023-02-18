const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('strictQuery',true);

mongoose.connect("mongodb+srv://Admit-Karan:Iamphenomenol@cluster0.dhlpzib.mongodb.net/ContactInfo");

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');



const Info = {
    name:{type:String,
        required:true},
    Number: {type:Number,
    required:true,
    min:10,
    
    },
    Email:String
};

const Continfo = mongoose.model("Continfo",Info);

const Continfo1 = new Continfo ({
    name:"karan",
    Number:"7678126262",
    Email:"saprakarna001@gmail.com"
});
const Continfo2 = new Continfo ({
    name:"Kismat",
    Number:"8019290191",
    Email:"kismat001@gmail.com"
});

const defaultarr = [Continfo1,Continfo2];

app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.post('/',(req,res)=>{
    const Name = req.body.Name;
    const PhnNum = Number(req.body.PhnNum);
    console.log(typeof(PhnNum));
    const Email  = req.body.Email;
    const NewCont = new Continfo ({
        name: Name,
        Number:PhnNum,
        Email:Email
    })
    
   Continfo.insertMany(NewCont,(err,contact)=>{
    if(err){
        console.log(err)
    }else{
      console.log(contact);
      console.log("Success");
      res.redirect('/');
    }
   })

});

// Project section
app.get("/projects",(req,res)=>{
    res.render('project.ejs')
})

app.get('/About',(req,res)=>{
    res.render('About');
})

app.get('/contact',(req,res)=>{
    res.render('contact')
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("Running server")
})