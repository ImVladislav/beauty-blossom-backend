const mongoose = require('mongoose')

const app = require('./app')

const { DB_HOST } = process.env

// prcess.env змынне оточення console.log(process.env)

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
    .then(() => {
        app.listen(3001, () => {
            console.log("Server running. Use our API on port: 3000")

        })
    })
    .catch(error => {
        console.log(error.message);
        process.exit(1);
        
    }
    )


// 2 арг коллбек щоб бачити що сервер запущено, не обовязкова херня

  
   
