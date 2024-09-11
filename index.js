
const express = require("express")
const app = express();
const port = 3000
const path = require("path")
const {v4:uuidv4} = require("uuid")
const methodOverride = require('method-override')


app.use(express.urlencoded({extended : true}))

app.use(methodOverride('_method'));

app.set("view engine" , "ejs")
app.set("views" , path.join(__dirname, "views"))
app.set(express.static(path.join(__dirname, "public")))


// dummy data create 

let posts = [
    {
        id : uuidv4(),
        username : "taruna " ,
        content : " i write code "
    } ,
    {
        id : uuidv4(),
        username : "gautam ",
        content : " topper child"
    },
    {
        id: uuidv4(),
        username : " manish",
        content : " elder brother"
    }
]

app.get("/" ,(req,res)=>{
    res.render("index.ejs" , {posts})
})
app.get("/new" , (req,res)=>{
    res.render("new.ejs" )
})
// create new post
app.post("/posts" ,(req,res)=>{
    let{username , content} = req.body
    let id = uuidv4();
    posts.push({id , username,content})
    res.redirect("/")
})

// show posts
app.get("/:id" , (req,res)=>{
    let {id } = req.params
    let post = posts.find((p)=> id === p.id )
    console.log(id , post , " matching")
    res.render("show.ejs" , {post})
})

// update post 
app.patch("/:id" , (req,res)=>{
    let {id }  = req.params ;
    let newContent = req.body.content
    let post = posts.find((p)=> id === p.id)
       post.content = newContent
       console.log(post)
       res.redirect("/")
    
})

// edit post
app.get("/:id/edit" ,(req,res)=>{
    let {id } = req.params
    let post = posts.find((p)=> id === p.id )
    console.log(id , post);
    res.render("edit.ejs", {post})
})

// delete post

app.delete("/:id"  , (req,res)=>{
    let {id} = req.params
    posts = posts.filter((p)=> id !== p.id)
    res.render("/")
})
app.listen(port , ()=>{
    console.log("server is working")
})
