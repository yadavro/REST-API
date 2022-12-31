// jshint esversion:6
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const ejs=require("ejs");

const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-Rohit:octInHKlTVtetHwY@cluster0.wuzx9bp.mongodb.net/wikiDB");

// mongoose.connect("mongodb://0.0.0.0:27017/wikiDB");
mongoose.set("strictQuery",true);

// mongodb schema and model//

const noteSchema=new mongoose.Schema({
  title:String,
  content:String
});

const Article=mongoose.model("Article",noteSchema);

// CRUD operation on all the notes or articles //

app.route("/articles")

.get(function(req,res){
  Article.find({},function(err,foundArticles){
  if(err){
    res.send(err);
  }else{
    res.send(foundArticles);
    console.log(foundArticles);
  }
});
})

.post(function(req,res){
  console.log(req.body.title);
  console.log(req.body.content);
  const newData=new Article({
    title:req.body.title,
    content:req.body.content
  });
     newData.save(function(err){
     if(err){
       console.log(err);
       res.send(err);
     }
     else{
       res.send("successfully added a new article.");
     }
   });
})

.delete(function(req,res){
  Article.deleteMany({},function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("successfully deleted all items .");
    }
  });
});

// CRUD operations on specific item/notes //

app.route("/articles/:articleTitle")

.get(function(req,res){
  Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
    if(foundArticle){
      res.send(foundArticle);
    }else{
      res.send("No articles with that title name does not exist.");
    }
  });
})

.put(function(req,res){
  Article.update(
    {title:req.params.articleTitle},
    {title:req.body.title,content:req.body.content},
    // {overwrite:true},
    function(err){
      if(!err){
        res.send("successfully updated!");
      }else{
        console.log(err);
        res.send(err);
      }
    }
  );
})

.patch(function(req,res){
  Article.update(
    {title:req.params.articleTitle},
    {$set:req.body},
    function(err){
      if(!err){
          res.send("successfully updated!");
      }else{
        console.log(err);
        res.send(err);
      }
    }
  );
})

.delete(function(req,res){
  Article.deleteOne(
    {title:req.params.articleTitle},
    function(err){
      if(!err){
          res.send("successfully deleted one article");
      }else{
        console.log(err);
        res.send(err);
      }
    }
  );
});


app.listen(process.env.PORT || 3000 ,function(){
  console.log('server is running at port 3000');
});
