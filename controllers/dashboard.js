const { sequelize } = require('../models');

module.exports = {
    count_tr_in_ex: async (req, res) => {
        try {
            let query;
            query = await sequelize.query(
                "SELECT in_or_ex AS jenis, COUNT(in_or_ex) AS in_or_ex FROM trans_kalibrasi GROUP BY in_or_ex",
                { type: sequelize.QueryTypes.SELECT }
            );
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
    count_tr_by_year: async (req, res) => {
        try {
            let query;
            query = await sequelize.query(
                "SELECT COUNT(*) AS total_data,DATE_FORMAT(tanggal_calibration, '%Y') AS tahun,DATE_FORMAT(tanggal_calibration, '%Y-%M') AS bulan_tahun,DATE_FORMAT(tanggal_calibration, '%M') AS bulan FROM trans_kalibrasi GROUP BY tahun ORDER BY tahun DESC"
            );
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
    count_tr_by_month: async (req, res) => {
        try {
            let query;
            const { year } = req.body;
            if(year != undefined || year != null){
                query = await sequelize.query(
                    `SELECT COUNT(*) AS total_data,DATE_FORMAT(tanggal_calibration, '%Y') AS tahun,DATE_FORMAT(tanggal_calibration, '%Y-%M') AS bulan_tahun,DATE_FORMAT(tanggal_calibration, '%M') AS bulan FROM trans_kalibrasi WHERE DATE_FORMAT(tanggal_calibration, '%Y') = ${year} GROUP BY bulan_tahun ORDER BY MONTH(tanggal_calibration) ASC`
                )
            } else if(year == undefined || year == null) {
                query = await sequelize.query(
                    `SELECT COUNT(*) AS total_data,DATE_FORMAT(tanggal_calibration, '%Y') AS tahun,DATE_FORMAT(tanggal_calibration, '%Y-%M') AS bulan_tahun,DATE_FORMAT(tanggal_calibration, '%M') AS bulan FROM trans_kalibrasi WHERE DATE_FORMAT(tanggal_calibration, '%Y') = YEAR(NOW()) GROUP BY bulan_tahun ORDER BY MONTH(tanggal_calibration) ASC`
                )
            }
            
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
    remainding: async (req, res) => {
        try {
            let query;
            query = await sequelize.query(`SELECT equipment_name, evidance, DATEDIFF(exp_calibration, CURDATE()) AS sisa_hari FROM trans_kalibrasi WHERE exp_calibration
            BETWEEN NOW() AND (DATE_ADD(NOW(), INTERVAL 2 MONTH)) AND isactive = 1 ORDER BY sisa_hari ASC`)
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
    remamaindingExp: async (req, res) => {
        try {
            let query;
            query = await sequelize.query(`SELECT equipment_name, evidance, DATEDIFF(CURDATE(), exp_calibration) AS lebih_hari FROM trans_kalibrasi WHERE exp_calibration
            < CURDATE() AND isactive = 1 ORDER BY lebih_hari ASC`)
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
    count_temp: async (req, res) => {
        try {
            let query;
            query = await sequelize.query(`SELECT * FROM trans_kalibrasi WHERE category = 6`)
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
    count_press: async (req, res) => {
        try {
            let query;
            query = await sequelize.query("SELECT * FROM trans_kalibrasi WHERE category = 7")
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
    count_mass: async (req, res) => {
        try {
            let query;
            query = await sequelize.query("SELECT * FROM trans_kalibrasi WHERE category = 8")
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
    count_ph: async (req, res) => {
        try {
            let query;
            query = await sequelize.query("SELECT * FROM trans_kalibrasi WHERE category = 5")
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
    count_conduct: async (req, res) => {
        try {
            let query;
            query = await sequelize.query("SELECT * FROM trans_kalibrasi WHERE category = 4")
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
    count_dimensi: async (req, res) => {
        try {
            let query;
            query = await sequelize.query("SELECT * FROM trans_kalibrasi WHERE category = 10")
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
    count_refracto: async (req, res) => {
        try {
            let query;
            query = await sequelize.query("SELECT * FROM trans_kalibrasi WHERE category = 3")
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
    count_enclosure: async (req, res) => {
        try {
            let query;
            query = await sequelize.query("SELECT * FROM trans_kalibrasi WHERE category = 12")
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
    count_thermohygro: async (req, res) => {
        try {
            let query;
            query = await sequelize.query("SELECT * FROM trans_kalibrasi WHERE sub_category = 5")
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
    trans_by_status: async (req, res) => {
        try {
            let query;
            query = await sequelize.query("SELECT COALESCE(b.hasil, 'Empty') AS status, COUNT(*) AS total FROM trans_kalibrasi a JOIN tr_ver_spv b ON a.id_trans = b.id_pengajuan GROUP BY status")
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
    trans_by_category: async (req, res) => {
        try {
            let query;
            query = await sequelize.query("SELECT b.category, COUNT(*) AS category_count FROM trans_kalibrasi a JOIN mst_category b ON a.category = b.id GROUP BY a.category")
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },
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
            res.status(200).json({
                status: 200,
                message: "Success",
                data: query
            });
        } catch (error) {
            console.log(error);
        }
    },

    filter_trans_month: async (req, res) => {
        try {
            let query;
            const { month } = req.body;
            if(month != undefined || month != null){
                query = await sequelize.query(
                    `SELECT b.category, COUNT(*) AS total_data,
                    DATE_FORMAT(tanggal_calibration, '%Y-%M') AS bulan_tahun,
                    DATE_FORMAT(tanggal_calibration, '%c') AS bulan 
                    FROM trans_kalibrasi a
                    JOIN mst_category b ON a.category = b.id
                    WHERE DATE_FORMAT(tanggal_calibration, '%Y') = DATE_FORMAT(NOW(), '%Y')
                    AND DATE_FORMAT(tanggal_calibration, '%c') = ${month}
                    GROUP BY b.category`
                )
            }else{
                query = await sequelize.query(
                    `SELECT b.category, COUNT(*) AS total_data,
                    DATE_FORMAT(tanggal_calibration, '%Y-%M') AS bulan_tahun,
                    DATE_FORMAT(tanggal_calibration, '%c') AS bulan 
                    FROM trans_kalibrasi a
                    JOIN mst_category b ON a.category = b.id
                    WHERE DATE_FORMAT(tanggal_calibration, '%Y') = DATE_FORMAT(NOW(), '%Y')
                    AND DATE_FORMAT(tanggal_calibration, '%c') = DATE_FORMAT(NOW(), '%c')
                    GROUP BY b.category`
                )
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

};