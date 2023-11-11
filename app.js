const express = require('express');
const moment = require('moment');
const logger = require('morgan');
const fs = require('fs/promises');
const cors = require('cors');
require('dotenv').config()
const authRouter = require('./routes/api/auth')
const goodsRouter = require('./routes/api/goods');
const ordersRouter = require('./routes/api/orders');
const inProgressWood = require('./routes/api/inProgressWood');
const basket = require('./routes/api/basket');
const feedbackRouter = require('./routes/api/Feedback');



const app = express() // веб сервер
// шукає запит шлях поки не знайде 1 підходяще

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
// логер це спеціальна мідлвара щоб вивести в консоль інфу про запит
// для дебагінгу
app.use(cors())

// для обходу корсу щоб працював фронт і бек//

// app.use((req, res, next) => {
//   console.log(middleware);
// })
// якщо не задати 1 арг шлях то експрес буде виконувати цю функцію
// і завертуватиме свою роботу
// якщо викликати next то експерс продовжує свою роботу

app.use(express.json())
// метод use якщо немає маршруту, а йде одразу функція він підходть
// до будь якого маршруту експрес виконає цю функцію.

app.use(express.static("public"))

// якщо прийде запит за файли бери його з папки паблік

app.use('/api/auth', authRouter)
app.use('/api/goods', goodsRouter)
app.use('/api/orders/', ordersRouter)
app.use('/api/feedback', feedbackRouter)
app.use('/api/inProgressWood', inProgressWood)
app.use('/api/basket', basket)
// в юзі першим вказуєш шлях тоді для мідл вара цей запис буде стосуватися 
// маршруту тому в файлі вуд цей шлях є дефолтним
app.use(async(req, res, next) => {
    const { method, url } = req // метод та url беремо з реквесту
    const date = moment().format('DD-MM-YYYY_hh:mm:ss'); 
    const logData = `\n${method} ${url} ${date}`;
    //  \n щоб писало з нової строки
    await fs.appendFile('./public/server.log', logData);
    
    next() // щоб експерес продовжував далі працювати ставимо некст. 
})

// app.get('/', async(request, responce) => {
//   responce.send('<h1> home page </h1>')
// })


app.use((req, res) => {
    res.status(404).json({
        message: "Not found"
    })
})
app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message, })
})



module.exports = app



// avkpallet

// avkPalletSendGird2















// const { program } = require('commander');

// const woodModule = require('./WoodStorage');
// // const desks = require("./WoodStorage/desks");
// // const production = require("./WoodStorage/production");



// const invokeActionWood = async ({ action, diametr, name, amount, id }) => {
//     switch (action) {
//         case 'read':
//             const allWood = await woodModule.getAll();
//             return console.log(allWood);
//         case 'getById':
//             const woodItem = await woodModule.getById(id);
//             return console.log(woodItem);
//         case 'add':
//             const newWood = await woodModule.add({ diametr, name, amount});
//             return console.log(newWood);
//         case 'updateById':
//             const udatedWood = await woodModule.updateById(id, { diametr, name, amount })
//             return console.log(udatedWood)
//         case 'deleteById':
//             const deleteWood = await woodModule.deleteById(id)
//             return console.log(deleteWood);
//         default:
//             return console.log('Unknown action');
//     }
// }

// const actionIndex = process.argv.indexOf('--action');
// if (actionIndex !== -1) {
//     const action = process.argv[actionIndex + 1];
//     invokeActionWood({action})
// }

// program
//     .option('-a, --action, <type>')
//     .option('--diametr, <type>')
//     .option('--name, <type>')
//     .option('--amount, <type>')
//     .option('--id, <type>');
// program.parse();

// const options = program.opts();
// invokeActionWood(options)

// // console.log(process.argv);
// //node app --action read
// // глобальна змінна все що прописано в командній строці
// //    'C:\\Program Files\\nodejs\\node.exe',
// //   'C:\\Users\\Vlad\\Desktop\\react-48\\node\\app',
// //   '--action',
// //   'read'


// // invokeActionWood({ action: 'read' });
// // invokeActionWood({ action: 'getById', id:'4'})
// //  invokeActionWood({ action: 'add', diametr: 50, name: 'береза', amount: 30, id:'2'})
// //  invokeActionWood({ action: 'updateById', diametr: 70, id:'50', name: 'turbo береза', amount: 34, id:'80'})
// //  invokeActionWood({ action: 'deleteById', id:'80'})


