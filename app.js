require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT

const mongoose =require('mongoose')
app.use(express.json())

async function main() {
    try{
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("connected")
    }
    catch(error){
        console.log(error)
    }
}
main()

app.listen(port,()=>{
    console.log(`connected with${port}`)
})