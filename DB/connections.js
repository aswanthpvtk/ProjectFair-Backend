const mongoose = require('mongoose')

const connectionString = process.env.DATABASE;

mongoose.connect(connectionString).then((res) => {
    console.log("mongo db connect successfully");

})
    .catch((err) => {
        console.log("mongo connection faild");
        console.log(err);


    })