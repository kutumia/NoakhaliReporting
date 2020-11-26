const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {pdsignup,pdsignuppost,pdlogin,pdloginpost,pdDashboard,
    trainedFarmer,trainedFarmerFilter,initialTrial,initialTrialFilter,
    finalTrial,finalTrialFilter,trainedFarmerDistrictFilter,finalTrialDistrictFilter,initialTrialDistrictFilter,
    agriFair,agriFairFilter,irrigation,irrigationFilter,machinery,machineryFilter,motivation,motivationFilter,fieldDay,fieldDayFilter,
    agriFairDistrictFilter,irrigationDistrictFilter,machineryDistrictFilter,motivationDistrictFilter,fieldDayDistrictFilter
} = require('../controllers/pd.controller');
router.get('/login',pdlogin);
router.post('/logins',pdloginpost);
router.get('/dashboard',pdDashboard);


router.get('/signup',pdsignup);
router.post('/signups',pdsignuppost);

router.get('/trainedFarmer',trainedFarmer);
router.post('/trainedFarmerFilter',trainedFarmerFilter);
router.post('/trainedFarmerDistrictFilter',trainedFarmerDistrictFilter);


router.get('/initialTrial',initialTrial);
router.post('/initialTrialFilter',initialTrialFilter);
router.post('/initialTrialDistrictFilter',initialTrialDistrictFilter);

router.get('/finalTrial',finalTrial);
router.post('/finalTrialFilter',finalTrialFilter);
router.post('/finalTrialDistrictFilter',finalTrialDistrictFilter);

router.get('/agriFair',agriFair);
router.post('/agriFairFilter',agriFairFilter);
router.post('/agriFairDistrictFilter',agriFairDistrictFilter);

router.get('/irrigation',irrigation);
router.post('/irrigationFilter',irrigationFilter);
router.post('/irrigationDistrictFilter',irrigationDistrictFilter);


router.get('/machinery',machinery);
router.post('/machineryFilter',machineryFilter);
router.post('/machineryDistrictFilter',machineryDistrictFilter);


router.get('/motivation',motivation);
router.post('/motivationFilter',motivationFilter);
router.post('/motivationDistrictFilter',motivationDistrictFilter);

router.get('/fieldDay',fieldDay);
router.post('/fieldDayFilter',fieldDayFilter);
router.post('/fieldDayDistrictFilter',fieldDayDistrictFilter);



module.exports = router;