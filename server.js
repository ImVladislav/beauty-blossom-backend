require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 5000 } = process.env;

// const { NEW_DB_HOST, PORT = 3001 } = process.env;
// prcess.env змынне оточення console.log(process.env)

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  // .connect(NEW_DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to connect to the database: ${error.message}`);
    process.exit(1);
  });

// 2 арг коллбек щоб бачити що сервер запущено, не обовязкова херня
