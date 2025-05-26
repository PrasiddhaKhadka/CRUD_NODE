const express = require("express");
const app = express();
const moongoose = require("mongoose");
const Product = require("./models/product_model.js");


//for middleware to handle json response 
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get("/", (req, res) => {
    res.send("Hello from Node Api");
});

//app routes
// app.use("/api/products", product.route);

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.get("/api/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json({product});
    }
    catch (error) {
        res.status(500).json({error: error.message});
}
}); 

app.post("/api/products",async (req, res) => {
    // console.log(req.body);
//    res.send(req.body); 

try {
  const product =  await Product.create(req.body);
    res.status(200).json({message: "Product created successfully", product});
    
} catch (error) {
    res.status(500).json({error: error.message});
}
});

app.put("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            res.status(404).json({error: "Product not found"});
        }
        res.status(200).json({message: "Product updated successfully", product});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.delete("/api/products/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete({_id: id});
        if (!product) {
            res.status(404).json({error: "Product not found"});
        }
        res.status(200).json({message: "Product deleted successfully", product});
    } catch (error) {
        res.statusCode(500).json({error: error.message});
    }
})

// console.log(app);

moongoose.connect("mongodb://mongo:27017/node_crud",{
    useNewUrlParser: true,
    useUnifiedTopology: true
} ).then(() => {
    app.listen(3000, () => {
    console.log("Server is running on port 4000");
});
    console.log("Database connected");
    
}).catch((err) => {
    console.log(err);
});