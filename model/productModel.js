let products = require('../data/products.json')
const { v4: uuidv4 } = require('uuid')
const {writeDataToFile, getPostData} = require('../utils')


function findAll() {
    return new Promise((resolve) => {
        resolve(products)
    })
}

function findById(id){
    return new Promise((resolve, _reject) => {
        const product = products.find((p) => p.id === id)
        resolve(product)
    })
}

function create(product){ 
    return new Promise((resolve, _reject) => {
        const newProduct = {id: uuidv4(), ...product}
        product.id = uuidv4();
        products.push(newProduct)
        writeDataToFile('./data/products.json', products)
        resolve(newProduct)
    })
}

function update(id, updatedProduct) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((product) => product.id === id);
        if (index === -1) {
            reject(new Error('Product not found'));
        } else {
            const product = products[index];
            const updatedProductData = { ...product, ...updatedProduct };
            products[index] = updatedProductData;
            writeDataToFile('./data/products.json', products);
            resolve(updatedProductData);
        }
    });
}

function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((product) => product.id === id);
        if (index === -1) {
            reject(new Error('Product not found'));
        } else {
            products.splice(index, 1);
            writeDataToFile('./data/products.json', products);
            resolve('Product deleted');
        }
    });
}

module.exports = {
    findAll, 
    findById,
    create,
    update,
    deleteProduct,
}