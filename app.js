const express=require("express")
const mongoose=require('mongoose')
const User =require('./model/user')
const app=express();
const PORT=5040;
const path=require('path')
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.get('/',(req,res)=>{
    res.render('index');
})
app.post('/create',async(req,res)=>{
    let {name, email,image}=req.body;
let data=await User.create({
   name,email,image
 })
    res.redirect('/read')
})
app.get('/read',async(req,res)=>{
   let users=await User.find()
    res.render('read',{users})
})

app.get('/edit/:userid', async (req, res) => {
    try {
        const user = await User.findById(req.params.userid);
        if (user) {
            res.render('edit', { user });
        } else {
            res.redirect('/read');
        }
    } catch (err) {
        console.error(err);
        res.redirect('/read');
    }
});

app.post('/update/:userid', async (req, res) => {
    try {
        const { name, email ,image} = req.body;
        await User.findByIdAndUpdate(req.params.userid, { name, email ,image}, { new: true });
        res.redirect('/read');
    } catch (err) {
        console.error(err);
        res.redirect('/read');
    }
});


app.get('/delete/:id',async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
   res.redirect("/read")
})
// mongoose.connect(`mongodb://localhost:27017/monogopractice`)
// const userschema=new mongoose.Schema({

// })

// const users = mongoose.model('user',userschema)
app.listen(PORT,()=>{
    console.log("successful")
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               