const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();
const {ddsignup,ddsignuppost,allupazilla,ddlogin,ddloginpost,ddDashboard,
    trainedFarmer,trainedFarmerFilter,initialTrial,initialTrialFilter,
    finalTrial,finalTrialFilter,agriFair,agriFairFilter,irrigation,irrigationFilter,machinery,machineryFilter,motivation,motivationFilter,fieldDay,fieldDayFilter} = require('../controllers/dd.controller');
router.get('/',allupazilla);
router.get('/login',ddlogin);
router.post('/logins',ddloginpost);
router.get('/dashboard',ddDashboard);


router.get('/signup',ddsignup);
router.post('/signups',ddsignuppost);

router.get('/trainedFarmer',trainedFarmer);
router.post('/trainedFarmerFilter',trainedFarmerFilter);

router.get('/initialTrial',initialTrial);
router.post('/initialTrialFilter',initialTrialFilter);

router.get('/finalTrial',finalTrial);
router.post('/finalTrialFilter',finalTrialFilter);

router.get('/agriFair',agriFair);
router.post('/agriFairFilter',agriFairFilter);

router.get('/irrigation',irrigation);
router.post('/irrigationFilter',irrigationFilter);

router.get('/machinery',machinery);
router.post('/machineryFilter',machineryFilter);

router.get('/motivation',motivation);
router.post('/motivationFilter',motivationFilter);

router.get('/fieldDay',fieldDay);
router.post('/fieldDayFilter',fieldDayFilter);






module.exports = router;