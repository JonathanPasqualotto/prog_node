const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf-8',
        (err) => {
            if(err) {
                console.log(err)
            }
        })
}

function getPostData(req) {
    return new Promise((resolve, rejects) => {
        try {
            let body = ''
            req.on('data',(chunk) => {
                body += chunk.toString()
            })
            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            console.log(error)
        }
    })
}

function updateDataInFile(filename, id, newData) {
    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            try {
                const parsedData = JSON.parse(data);
                const index = parsedData.findIndex((item) => item.id === id);
                if (index !== -1) {
                    parsedData[index] = { ...parsedData[index], ...newData };
                    writeDataToFile(filename, parsedData);
                }
            } catch (error) {
                console.log(error);
            }
        }
    });
}

function deleteDataFromFile(filename, id) {
    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            try {
                const parsedData = JSON.parse(data);
                const filteredData = parsedData.filter((item) => item.id !== id);
                writeDataToFile(filename, filteredData);
            } catch (error) {
                console.log(error);
            }
        }
    });
}

module.exports = { writeDataToFile, getPostData, updateDataInFile, deleteDataFromFile }