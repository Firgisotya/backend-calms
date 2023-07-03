const { sequelize } = require('../models');

module.exports = {
    count_jenis_weekly: async (req, res) => {
        try {
            let query;
            query = await sequelize.query(`SELECT COUNT(*) AS total,
            CASE
                       WHEN in_or_ex = 1 THEN 'Internal'
                       WHEN in_or_ex = 2 THEN 'External'
                   END AS jenis
            FROM trans_kalibrasi
            WHERE tanggal_release_certificate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND tanggal_release_certificate <= CURDATE()
            GROUP BY in_or_ex`)
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
     },
     count_reg_weekly: async (req, res) => {
        try {
            let query;
            query = await sequelize.query(`SELECT COUNT(*) AS total,
            CASE
                       WHEN reg_or_recal = 1 THEN 'Registrasi'
                       WHEN reg_or_recal = 2 THEN 'Recalibrasi'
                   END AS jenis
            FROM trans_kalibrasi
            WHERE tanggal_release_certificate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND tanggal_release_certificate <= CURDATE()
            GROUP BY reg_or_recal`)
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
     },
     count_jenis_monthly: async (req, res) => {
        try {
            let query;
            query = await sequelize.query(`SELECT COUNT(*) AS total,
            CASE
                       WHEN in_or_ex = 1 THEN 'Internal'
                       WHEN in_or_ex = 2 THEN 'External'
                   END AS jenis
            FROM trans_kalibrasi
            WHERE tanggal_release_certificate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND tanggal_release_certificate <= CURDATE()
            GROUP BY in_or_ex`)
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
     },
     count_reg_monthly: async (req, res) => {
        try {
            let query;
            query = await sequelize.query(`SELECT COUNT(*) AS total,
            CASE
                       WHEN reg_or_recal = 1 THEN 'Registrasi'
                       WHEN reg_or_recal = 2 THEN 'Recalibrasi'
                   END AS jenis
            FROM trans_kalibrasi
            WHERE tanggal_release_certificate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND tanggal_release_certificate <= CURDATE()
            GROUP BY reg_or_recal`)
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
     },
}