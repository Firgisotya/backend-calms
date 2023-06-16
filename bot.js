const { sequelize } = require('./models');

const TelegramBot = require('node-telegram-bot-api');
const token = '6045995694:AAExypFpfL1isMjoQ1BLK7KU0REs-OTT-v0'; // Replace with your Telegram Bot API token
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const message = 'Hello! I am your notification bot.';
  bot.sendMessage(chatId, message);
});

// Example: Sending a notification
function sendNotification(chatId, message) {
  bot.sendMessage(chatId, message);
}

// Example: Sending a notification to multiple users
// const user1ChatId = '1252209321';

// sendNotification(user1ChatId, 'Hello from your notification bot!');

// You can add more functionality to handle various commands and scenarios.

console.log('Telegram bot started!');


module.exports = {
  table_pending: async (req, res) => {
    try {
        let query;
        query = await sequelize.query(`SELECT a.id,a.id_trans,a.reg_or_recal,a.in_or_ex,
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
        (DATE_ADD(NOW(), INTERVAL 6 MONTH)) AND a.isactive=1`)

        if(query[0].length > 0){
            for(let i = 0; i < query[0].length; i++){
                // let chatId = query[0][i].pic_input;
                let chatId = '1252209321';
                let message = `Equipment Number ${query[0][i].equipment_number} akan habis masa berlakunya pada tanggal ${query[0][i].exp_calibration}`;
                sendNotification(chatId, message);
            }
        }


        res.status(200).json({
            status: 200,
            message: "Success",
            data: query
        });
    } catch (error) {
        console.log(error);
    }
}
}
