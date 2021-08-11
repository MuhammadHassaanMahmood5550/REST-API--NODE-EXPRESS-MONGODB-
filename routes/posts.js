const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

//Routes

//we do not need to add /posts in route bcz in app.js we made middleware which says whenever e go to /posts run see in app.js
// router.get('/', (req,res)=>{
//     res.send("we are on posts");
// });
//----the above was normal way but now getting our posts from database 
router.get('/', async (req,res)=>{
    try{
        //this is mongodb way to find post
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
     res.json({message: err})
    }
});

// router.post('/', (req,res)=>{
//console.log(req.body);
//--whatever we will post though post method in postman we will get in req.body
  //--again as we know we cant directly post we need postman
  //--and npm install body-parser
  //--below Post is above imported post
  //---req.title the title we are getting from postman
//   const post = new Post({
//       title: req.body.title,
//       description: req.body.description
//   });
  
  
  //----to save in our database
  //---this will return promice
//   post.save()
//   .then(data => {
//       res.json(data);
//   })
//   .catch(err => {
//    res.json({message: err});
//   });

//  });

 //---------same above submit posts using async await-------------
 router.post('/', async (req,res)=>{
  const post = new Post({
      title: req.body.title,
      description: req.body.description
  });
  try{
  const savedPost = await post.save();
  res.json(savedPost);
  }catch(err){
      res.json({message: err});
  }
 });

 //specific post
 router.get('/:postId', async (req,res)=>{
    //--console.log(req.params.postId);
   try{
       const post = await Post.findById(req.params.postId);
       res.json(post);
   }catch(err){
     res.json({message: err});
   }
 })
//---delete specific post
router.delete('/:postId', async (req, res)=>{
    try{
 const removedPost  = await Post.remove({_id: req.params.postId})
 //-- _id bcz in database take a look id generates id like _id: "...." 
 res.json(removedPost);
    }catch(err){
    res.json({message: err});
    }  
})

//---update a post
router.patch('/:postId', async (req, res)=>{
    try{
 const updatedPost = await Post.updateOne({_id: req.params.postId}, { $set: { title: req.body.title }}
);
 res.json(updatedPost);
    }catch(err){
        res.json({message: err});
    }
});

////--how to use this all in forexample our react website
//very simple as same i have used apis of "tdm movie", "recipe" using useEffect then fetch('api..') .... same way we can use this api and perform operation but internet block using any other website api so we have to allow by installing npm install cors then import it then app.use(cors()); so that any time any reqest happen its get invoked

//-- anything we add after post will be postid i.e localhost:3000/posts/postid... that id will be see by using req.params

//to run on browser write /posts/specific bcz by default /post is added
// router.get('/specific', (req,res)=>{
//     res.send("we are on specific posts");
// });
module.exports = router;