const express = require('express')
const cors=require('cors')
const app = express()
require('dotenv').config()

const port =process.env.PORT || 3000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pd9mpbl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World freelancers!')
})
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const taskCollection=client.db('taskDB').collection('task')
    const userCollection=client.db('taskDB').collection('users')

    app.get('/addtask', async(req,res)=>{
    const result=await taskCollection.find().toArray()
    res.send(result)
})
    app.get('/showtask', async(req,res)=>{
    const result=await taskCollection.find() .sort({ deadline: 1 }).limit(6).toArray()
    res.send(result)
})
  
    app.get('/addtask/:id', async(req,res)=>{
      const id=req.params.id;
      const query={_id: new ObjectId(id)}
    const result=await taskCollection.findOne(query)
    res.send(result)
})


    app.post('/addtask',async(req,res)=>{
    const newTask=req.body;
    const result=await taskCollection.insertOne(newTask)
    res.send(result)
})
    app.put('/addtask/:id',async(req,res)=>{
      const id=req.params.id;
      const filter={_id:new ObjectId(id)}
    const updateTask=req.body;
    const updateT={
      $set:updateTask
    }
    const result=await taskCollection.updateOne(filter, updateT)
    res.send(result)
})
    app.delete('/addtask/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)}
   
    const result=await taskCollection.deleteOne(query)
    res.send(result)
})




// users

app.get('/users', async(req,res)=>{
    const result=await userCollection.find().toArray()
    
    res.send(result)
})

app.post('/users', async(req,res)=>{
  const userProfile= req.body;
  const result=await userCollection.insertOne(userProfile);
 
  res.send(result)
})

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
