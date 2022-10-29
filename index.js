const express = require("express")

const app = express()

const registerRoutes = require("./routes/registerRoute")
const loginRoutes = require("./routes/loginRoute")
const employeeRoute = require("./routes/employeeRoute")
const productRoute = require("./routes/productRoute")


app.use("/register", registerRoutes)
app.use("/login", loginRoutes)
app.use("/employee",employeeRoute)
app.use("/products", productRoute)


app.get("/", (req, res)=>{
    res.send("Hello")
})

app.listen(8080, ()=>{
    console.log("Server is up on Port 8080")
})