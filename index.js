const express = require('express')
const app = express()
const {productRouter} = require('./controller/productController')


app.use(express.json())
app.use((req, _res, next) => {
    console.log(`${req.method}:${req.path}`)
    next()
})


app.get('/', 
    (req, res, next) => {
        console.log(req.path)
    },

    (req, res) => {
        res.send('Hello World')
    }    
)

app.use('/api/', productRouter)

app.listen(4000)






//const http = require('http')
//const { getProduct, getProduto, createProduct } = require('./controller/productController')

// const server = http.createServer((request, response) => {
//     if(request.url === "/" && request.method == "GET"){
//         response.end("Hello World")
//     }
//     else if(request.url === '/api/products' && request.method === 'GET'){
//         getProduct(request,response)
//     }
//     else if (request.url.match(/\/api\/product\/\w+/) && request.method === 'GET'){
//         const id = request.url.split('/')[3]
//         getProduto(request, response, id)
//     }
//     else if (request.url === '/api/product' && request.method === 'POST'){
//         createProduct(request, response)
//     }
//     else {
//         response.writeHead(404, {'Contet-Type': 'application/json'})
//         response.end(
//             JSON.stringify( {
//                 message: 'Route Not Found: Please use the pai/products endpoint'
//             })
//         )
//     }
// })

// server.listen(4000, () => {console.log("Starting Server in Port 4000")})