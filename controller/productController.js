const Product = require('../model/productModel')
const {writeDataToFile, getPostData} = require('../utils')
const {Router} = require('express')
const router = Router()
 
async function getProducts(req, res){
    try {
        const product = await Product.findAll()
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(product))
    } catch (error) {
        console.log(error)
    }
}

async function getProduct(req, res, id){
    try {
        const product = await Product.findById(id)
        if(!product)        {
            res.writeHead(404, { 'Content-Type': 'appplication/json' })
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            res.writeHead(200, { 'Content-Type': 'appplication/json' })
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

async function createProduct(req, res){
    try {
        //const body = await getPostData(req)
        const body = req.body
        const { name, description, price } = body   //JSON.parse(body)
        const product = {
            name,
            description,
            price
        }
        const newProduct = await Product.create(product)
        res.writeHead(201, { 'Contect-Type': 'application/json' })
        return res.end(JSON.stringify(newProduct))
    } catch (error){
        console.log(error)
    }
}

async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found' }));
        } else {
            await Product.remove(id);
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end();
        }
    } catch (error) {
        console.log(error);
    }
}

async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found' }));
        } else {
            const body = req.body;
            const { name, description, price } = body;
            const updatedProduct = {
                name,
                description,
                price
            };
            await Product.update(id, updatedProduct);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedProduct));
        }
    } catch (error) {
        console.log(error);
    }
}

router.get('/products', (req,res) => {getProducts(req, res)})
router.get('/product/:id', 
    (req,res) =>{
        const {id} = req.params
        getProduct(req,res,id)
})

router.post('/product',
    (req, res) => {
        createProduct(req, res)
    }
)

// Rotas correspondentes
router.delete('/product/:id', (req, res) => {
    const { id } = req.params;
    deleteProduct(req, res, id);
});

router.put('/product/:id', (req, res) => {
    const { id } = req.params;
    updateProduct(req, res, id);
});



module.exports = {
    getProduct, 
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    productRouter: router
}