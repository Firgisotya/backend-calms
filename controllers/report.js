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

  // get trans_kalibrasi
  getTrans: async (req, res) => {
    try {
      let query;
      query = await sequelize.query(`
      SELECT a.id,a.id_trans,a.reg_or_recal,a.in_or_ex,
      a.no_dok,a.equipment_number,a.equipment_name,a.brand,
      a.serial_number,a.location_detail,a.tanggal_calibration,
      a.exp_calibration,a.tanggal_release_certificate,a.requestor,
      a.pic_input,a.model,a.kondisi_alat,a.acceptance_kriteria,a.isactive,
      b.category,c.sub_category,d.departement,e.area,f.sub_area,g.area,h.vendor
      FROM trans_kalibrasi a 
      LEFT JOIN mst_category b ON a.category = b.id
      LEFT JOIN mst_sub_category c ON a.sub_category = c.id
      LEFT JOIN mst_dept d ON a.departement = d.id
      LEFT JOIN mst_area e ON a.area = e.id
      LEFT JOIN mst_sub_area f ON a.sub_area = f.id
      LEFT JOIN mst_sub_detail g ON a.sub_area_detail = g.id
      LEFT JOIN mst_vendor h ON a.vendor_calibration = h.id
      WHERE a.isactive=1
      `);
      res.status(200).json({
        status: 200,
        message: "Success",
        data: query,
      });
    } catch (error) {
      console.log(error);
    }
  },

  // cetak
  cetak: async (req, res) => {
    try {
      const { id } = req.params;
      let query;
      query = await sequelize.query(`
      SELECT a.id,a.id_trans,a.reg_or_recal,a.in_or_ex,
      a.no_dok,a.equipment_number,a.equipment_name,a.brand,
      a.serial_number,a.location_detail,a.tanggal_calibration,
      a.exp_calibration,a.tanggal_release_certificate,a.requestor,
      a.pic_input,a.model,a.kondisi_alat,a.acceptance_kriteria,a.isactive,
      b.category,c.sub_category,d.departement,e.area,f.sub_area,g.area,h.vendor
      FROM trans_kalibrasi a 
      LEFT JOIN mst_category b ON a.category = b.id
      LEFT JOIN mst_sub_category c ON a.sub_category = c.id
      LEFT JOIN mst_dept d ON a.departement = d.id
      LEFT JOIN mst_area e ON a.area = e.id
      LEFT JOIN mst_sub_area f ON a.sub_area = f.id
      LEFT JOIN mst_sub_detail g ON a.sub_area_detail = g.id
      LEFT JOIN mst_vendor h ON a.vendor_calibration = h.id
      WHERE a.isactive=1 AND a.id = ${id}
      `);
      res.status(200).json({
        status: 200,
        message: "Success",
        data: query,
      });
    } catch (error) {
      console.log(error);
    }
  }

};
