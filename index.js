const csv = require('csv-parser');
const fs = require('fs');
const results = [];
const  MongoClient  = require('mongodb').MongoClient
const assert = require('assert')
var url = 'mongodb://localhost:27017/db';


    
fs.createReadStream('ip.csv')
.pipe(csv())
.on('data', (data) =>{    
    results.push(data)
})
.on('end', () => {
    MongoClient.connect(url, function(error,client) { 
        assert.equal(null, error);
        console.log("Connected successfully to server");
        const collection = client.collection('crawl');
        collection.insert(results,function (err,res) {
            if (err) throw err;
            console.log('Them thanh cong');
        });
        
    })
    
});

