const mongoose = require("mongoose");

const app = require("./app");

const { NEW_DB_HOST, PORT = 3001 } = process.env;

// const { NEW_DB_HOST, PORT = 3001 } = process.env;
// prcess.env змынне оточення console.log(process.env)

mongoose.set("strictQuery", true);

mongoose
  .connect(NEW_DB_HOST)
  // .connect(NEW_DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// 2 арг коллбек щоб бачити що сервер запущено, не обовязкова херня
