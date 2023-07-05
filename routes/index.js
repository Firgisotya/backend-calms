var express = require('express');
const { 
    count_tr_in_ex, 
    count_tr_by_year, 
    count_tr_by_month, 
    remainding, 
    count_temp, 
    count_press, 
    count_mass, 
    count_ph, 
    count_conduct, 
    count_dimensi,
    count_refracto,
    count_enclosure,
    count_thermohygro,
    remamaindingExp,
    trans_by_status,
    trans_by_category,
    table_pending,
    filter_trans_month
} = require('../controllers/dashboard');
const { count_jenis_weekly, count_reg_weekly, count_jenis_monthly, count_jenis_yearly, count_reg_yearly, month_trans, year_trans } = require('../controllers/report');
var router = express.Router();


router.get('/jenis', count_tr_in_ex);
router.get('/tahun', count_tr_by_year);
router.post('/bulan', count_tr_by_month);
router.get('/remainding', remainding);
router.get('/remaindingExp', remamaindingExp);
router.get('/count_temp', count_temp);
router.get('/count_press', count_press);
router.get('/count_mass', count_mass);
router.get('/count_ph', count_ph);
router.get('/count_conduct', count_conduct);
router.get('/count_dimensi', count_dimensi);
router.get('/count_refracto', count_refracto);
router.get('/count_enclosure', count_enclosure);
router.get('/count_thermohygro', count_thermohygro);
router.get('/trans_by_status', trans_by_status);
router.get('/trans_by_category', trans_by_category);
router.get('/table_pending', table_pending);
router.post('/filter_trans_month', filter_trans_month);

// report
router.get('/count_jenis_weekly', count_jenis_weekly);
router.get('/count_reg_weekly', count_reg_weekly);
router.get('/count_jenis_monthly', count_jenis_monthly);
router.get('/count_reg_monthly', count_jenis_monthly);
router.get('/count_jenis_yearly', count_jenis_yearly);
router.get('/count_reg_yearly', count_reg_yearly);
router.get('/report_month', month_trans);
router.get('/report_year', year_trans);

module.exports = router;
