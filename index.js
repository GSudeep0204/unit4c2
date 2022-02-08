const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const connect = ()=>{
    return mongoose.connect("mongodb+srv://sudeep:1234@cluster0.jlg2f.mongodb.net/eval?retryWrites=true&w=majority");
}
// - User
//     - firstName (required)
//     - middleName (optional)
//     - lastName (required)
//     - age (required)
//     - email (required )
//     - address ( required )
//     - gender ( optional and should default to Female )
//     - type (optional and it can take value of customer or employee and if not provided then default to customer )
//     - createdAt (required)
//     - updatedAt (required)

const userSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    middle_name:{type:String,required:false},
    last_name:{type:String,required:true},
    age:{type:Number,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    gender:{type:String,required:false,default:"female"},
    type:{type:String,required:false,default:"customer"}
    

},
{
   versionKey:false,
   timestamps:true, 
})

const User =  mongoose.model("user",userSchema);

app.post("/user",async(req,res)=>{
    try{
        const data = await User.create(req.body);
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})

app.get("/user",async(req,res)=>{
    try{
        const data = await User.find().lean().exec();
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})
app.get("/user/:id",async(req,res)=>{
    try{
        const data = await User.findById(req.params.id).lean().exec();
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})

app.patch("/user/:id",async()=>{
    try{
        const data = await User.findByIdAndUpdate(req.params.id).lean().exec();
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})

app.delete("/user/:id",async()=>{
    try{
        const data = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})


// - BranchDetail
// - name (required)
// - address (required)
// - IFSC (required and string)
// - MICR (required and number )
// - createdAt (required)
// - updatedAt (required)

 const branchSchema = new mongoose.Schema({
     name:{type:String,required:true},
     address:{type:String,required:true},
     IFSC:{type:String,required:true},
     MICR:{type:Number,required:true},
 },
 {
    versionKey:false,
    timestamps:true, 
 })

 const Branch = mongoose.model("branch",branchSchema);

  app.post("/branch",async(req,res)=>{
    
        try{
            const data = await Branch.create(req.body);
            return res.status(201).send(data);
        }
        catch(e){
            console.log('e:', e)
        }
 })
  

  app.get("/branch",async(req,res)=>{
    try{
        const data = await Branch.find().lean().exec();
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})
app.get("/branch/:id",async(req,res)=>{
    try{
        const data = await Branch.findById(req.params.id).lean().exec();
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})

app.patch("/branch/:id",async()=>{
    try{
        const data = await Branch.findByIdAndUpdate(req.params.id).lean().exec();
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})

app.delete("/branch/:id",async()=>{
    try{
        const data = await Branch.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})

// - MasterAccount
//     - balance (required) This is the total balance that the person has in the bank
//     - createdAt (required)
//     - updatedAt (required)


const masterSchema = new mongoose.Schema({
    balance:{type:Number,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,required:true,unique:true,ref:"user"},
    branch:{type:mongoose.Schema.Types.ObjectId,required:true,unique:true,ref:"branch"}
},
{
    versionKey:false,
    timestamps:true, 
 })

 const Master = mongoose.model("master",masterSchema)
 app.post("/master",async(req,res)=>{
    
    try{
        const data = await Master.create(req.body);
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})


app.get("/master",async(req,res)=>{
try{
    const data = await Master.find().lean().exec();
    return res.status(201).send(data);
}
catch(e){
    console.log('e:', e)
}
})
app.get("/master/:id",async(req,res)=>{
try{
    const data = await Master.findById(req.params.id).lean().exec();
    return res.status(201).send(data);
}
catch(e){
    console.log('e:', e)
}
})

app.patch("/master/:id",async()=>{
    try{
        const data = await Master.findByIdAndUpdate(req.params.id).lean().exec();
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})

app.delete("/master/:id",async()=>{
    try{
        const data = await Master.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})


// - SavingsAccount
//     - account_number ( required and should be unique)
//     - balance ( required )
//     - interestRate ( required )
//     - createdAt (required)
//     - updatedAt (required)

const savingSchema=new mongoose.Schema({
   account_number:{type:Number,required:true,unique:true},
   balance:{type:Number,required:true},
   interest_rate:{type:Number,required:true},
   user_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"user"}
},{
    versionKey:false,
    timestamps:true, 
 }
)

const Saving = mongoose.model("saving",savingSchema);

app.post("/saving",async(req,res)=>{
    
    try{
        const data = await Saving.create(req.body);
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})


app.get("/saving",async(req,res)=>{
try{
    const data = await Saving.find().populate().lean().exec();
    return res.status(201).send(data);
}
catch(e){
    console.log('e:', e)
}
})
app.get("/saving/:id",async(req,res)=>{
try{
    const data = await Saving.findById(req.params.id).lean().exec();
    return res.status(201).send(data);
}
catch(e){
    console.log('e:', e)
}
})

app.patch("/saving/:id",async()=>{
    try{
        const data = await Saving.findByIdAndUpdate(req.params.id).lean().exec();
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})

app.delete("/saving/:id",async()=>{
    try{
        const data = await Saving.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})


// FixedAccount
// - account_number ( required and should be unique)
// - balance ( required )
// - interestRate ( required )
// - startDate ( required )
// - maturityDate (required )
// - createdAt (required)
// - updatedAt (required)

const fixedSchema = new mongoose.Schema({
    account_number:{type:Number,required:true},
   balance:{type:Number,required:true},
   interest_rate:{type:Number,required:true},
   startdate:{type:String,required:true},
   maturitydate:{type:String,required:true},
   user_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"user"}

},
{
    versionKey:false,
    timestamps:true, 
 })

 const Fixed = mongoose.model("fixed",fixedSchema);

 app.post("/fixed",async(req,res)=>{
    
    try{
        const data = await Fixed.create(req.body);
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})


app.get("/fixed",async(req,res)=>{
try{
    const data = await Fixed.find().lean().exec();
    return res.status(201).send(data);
}
catch(e){
    console.log('e:', e)
}
})
app.get("/fixed/:id",async(req,res)=>{
try{
    const data = await Fixed.findById().lean().exec();
    return res.status(201).send(data);
}
catch(e){
    console.log('e:', e)
}
})

app.patch("/fixed/:id",async()=>{
    try{
        const data = await Fixed.findByIdAndUpdate(req.params.id).lean().exec();
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})

app.delete("/fixed/:id",async()=>{
    try{
        const data = await Fixed.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(data);
    }
    catch(e){
        console.log('e:', e)
    }
})

app.listen(2023,async()=>{
    try{
        connect();
        console.log("port listening on 2023")
       
    }catch(e){
        console.log('e:', e)
    }  
})