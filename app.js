var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
require("dotenv").config();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

const cron = require('node-cron');
const { sequelize } = require('./models');
const TelegramBot = require('node-telegram-bot-api');

// Telegram bot configuration
const botToken = '6045995694:AAExypFpfL1isMjoQ1BLK7KU0REs-OTT-v0';
const chatId = '-985347458';

// Create Telegram bot
const bot = new TelegramBot(botToken, { polling: true });

// Fungsi untuk menjalankan query dan mengirim pesan Telegram

cron.schedule('0 10 * * 1,4', () => {
  const result = sequelize.query(`SELECT a.id,a.id_trans,a.reg_or_recal,a.in_or_ex,
  a.no_dok,a.equipment_number,a.equipment_name,a.brand,
  a.serial_number,a.location_detail,a.tanggal_calibration,
  a.exp_calibration,a.tanggal_release_certificate,a.requestor,
  a.pic_input,a.model,a.kondisi_alat,a.acceptance_kriteria,a.isactive,
  b.category,c.sub_category,d.departement,e.area,f.sub_area,g.area,h.vendor
  FROM trans_kalibrasi a 
  JOIN mst_category b ON a.category = b.id
  JOIN mst_sub_category c ON a.sub_category = c.id
  LEFT JOIN mst_dept d ON a.departement = d.id
  JOIN mst_area e ON a.area = e.id
  JOIN mst_sub_area f ON a.sub_area = f.id
  LEFT JOIN mst_sub_detail g ON a.sub_area_detail = g.id
  LEFT JOIN mst_vendor h ON a.vendor_calibration = h.id
  WHERE a.exp_calibration between (DATE_ADD(NOW(), INTERVAL -2 MONTH)) AND
  (DATE_ADD(NOW(), INTERVAL 6 MONTH)) AND a.isactive=1`);

  result.then((data) => {
    const rows = data[0];
    let message = '';
    if (rows.length > 0) {
      message = 'Ada ' + rows.length + ' data yang akan habis masa berlakunya dalam 2 bulan kedepan. Berikut detailnya:\n\n';
      rows.forEach((row, index) => {
        message += (index + 1) + '. ' + 'Nama Alat : ' + row.equipment_name + ' (' + row.serial_number + ')\n';
        message += '    No Dokumen : ' + row.no_dok + '\n';
        message += '    Tanggal Kalibrasi: ' + row.tanggal_calibration + '\n';
        message += '    Tanggal Expired: ' + row.exp_calibration + '\n\n';
      });
    } else {
      message = 'Tidak ada data yang akan habis masa berlakunya dalam 2 bulan kedepan.';
    }
    bot.sendMessage(chatId, message);
  });
  
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
