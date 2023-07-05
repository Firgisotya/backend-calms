const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

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
            GROUP BY in_or_ex`);
      res.status(200).json({
        status: 200,
        message: "Success",
        data: query,
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
            GROUP BY reg_or_recal`);
      res.status(200).json({
        status: 200,
        message: "Success",
        data: query,
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
            GROUP BY in_or_ex`);
      res.status(200).json({
        status: 200,
        message: "Success",
        data: query,
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
            GROUP BY reg_or_recal`);
      res.status(200).json({
        status: 200,
        message: "Success",
        data: query,
      });
    } catch (error) {
      console.log(error);
    }
  },

  count_jenis_yearly: async (req, res) => {
    try {
      let query;
      query = await sequelize.query(`SELECT COUNT(*) AS total,
            CASE
                       WHEN in_or_ex = 1 THEN 'Registrasi'
                       WHEN in_or_ex = 2 THEN 'Recalibrasi'
                   END AS jenis
            FROM trans_kalibrasi
            WHERE tanggal_release_certificate >= DATE_SUB(CURDATE(), INTERVAL 360 DAY) AND tanggal_release_certificate <= CURDATE()
            GROUP BY in_or_ex`);
      res.status(200).json({
        status: 200,
        message: "Success",
        data: query,
      });
    } catch (error) {
      console.log(error);
    }
  },

  count_reg_yearly: async (req, res) => {
    try {
      let query;
      query = await sequelize.query(`SELECT COUNT(*) AS total,
            CASE
                       WHEN reg_or_recal = 1 THEN 'Registrasi'
                       WHEN reg_or_recal = 2 THEN 'Recalibrasi'
                   END AS jenis
            FROM trans_kalibrasi
            WHERE tanggal_release_certificate >= DATE_SUB(CURDATE(), INTERVAL 360 DAY) AND tanggal_release_certificate <= CURDATE()
            GROUP BY reg_or_recal`);
      res.status(200).json({
        status: 200,
        message: "Success",
        data: query,
      });
    } catch (error) {
      console.log(error);
    }
  },

  month_trans: async (req, res) => {
    try {
      let in_ex;
      let reg_rec;
      in_ex = await sequelize.query(
        `SELECT COUNT(*) AS total, 
        CASE in_or_ex
            WHEN 1 THEN 'Internal'
            WHEN 2 THEN 'External'
            WHEN 3 THEN 'Verification'
        END AS jenis
 FROM trans_kalibrasi
 WHERE tanggal_release_certificate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND tanggal_release_certificate <= CURDATE()
 GROUP BY in_or_ex`,
        {
          type: QueryTypes.SELECT,
        }
      );

      reg_rec = await sequelize.query(
        `SELECT COUNT(*) AS total, 
        CASE reg_or_recal
            WHEN 1 THEN 'Register'
            WHEN 2 THEN 'Recalibrasi'
        END AS jenis
 FROM trans_kalibrasi
 WHERE tanggal_release_certificate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND tanggal_release_certificate <= CURDATE()
 GROUP BY reg_or_recal`,
        {
          type: QueryTypes.SELECT,
        }
      );

      let graf = [];
      in_ex.forEach((item) => {
        graf.push(item);
      });

      reg_rec.forEach((item) => {
        graf.push(item);
      });

      res.status(200).json({
        status: 200,
        message: "Success",
        data: graf,
      });
    } catch (error) {
      console.log(error);
    }
  },

  year_trans: async (req, res) => {
    try {
      let in_ex;
      let reg_rec;
      in_ex = await sequelize.query(
        `SELECT COUNT(*) AS total, 
        CASE in_or_ex
            WHEN 1 THEN 'Internal'
            WHEN 2 THEN 'External'
            WHEN 3 THEN 'Verification'
        END AS jenis
 FROM trans_kalibrasi
 WHERE tanggal_release_certificate >= DATE_SUB(CURDATE(), INTERVAL 360 DAY) AND tanggal_release_certificate <= CURDATE()
 GROUP BY in_or_ex`,
        {
          type: QueryTypes.SELECT,
        }
      );

      reg_rec = await sequelize.query(
        `SELECT COUNT(*) AS total, 
        CASE reg_or_recal
            WHEN 1 THEN 'Register'
            WHEN 2 THEN 'Recalibrasi'
        END AS jenis
 FROM trans_kalibrasi
 WHERE tanggal_release_certificate >= DATE_SUB(CURDATE(), INTERVAL 360 DAY) AND tanggal_release_certificate <= CURDATE()
 GROUP BY reg_or_recal`,
        {
          type: QueryTypes.SELECT,
        }
      );

      let graf = [];
      in_ex.forEach((item) => {
        graf.push(item);
      });

      reg_rec.forEach((item) => {
        graf.push(item);
      });

      res.status(200).json({
        status: 200,
        message: "Success",
        data: graf,
      });
    } catch (error) {
      console.log(error);
    }
  },

};
