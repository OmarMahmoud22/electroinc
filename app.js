require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose =require('mongoose')
const userRoutes = require("./Routs/UserRoutes")
const productRoutes = require("./Routs/ProductRoutes")
const cartRoutes = require("./Routs/CartRouters")
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


app.use('/',userRoutes);
app.use('/',productRoutes)
app.use('/api',cartRoutes)

app.listen(port,()=>{
    console.log(`connected with${port}`)
})