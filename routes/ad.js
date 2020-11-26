const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {adsignup,adsignuppost,allupazilla,adlogin,adloginpost,adDashboard,
    trainedFarmer,trainedFarmerFilter,initialTrial,initialTrialFilter,
    finalTrial,finalTrialFilter,trainedFarmerDistrictFilter,finalTrialDistrictFilter,initialTrialDistrictFilter,} = require('../controllers/ad.controller');
router.get('/',allupazilla);
router.get('/login',adlogin);
router.post('/logins',adloginpost);
router.get('/dashboard',adDashboard);


router.get('/signup',adsignup);
router.post('/signups',adsignuppost);

router.get('/trainedFarmer',trainedFarmer);
router.post('/trainedFarmerFilter',trainedFarmerFilter);
router.post('/trainedFarmerDistrictFilter',trainedFarmerDistrictFilter);


router.get('/initialTrial',initialTrial);
router.post('/initialTrialFilter',initialTrialFilter);
router.post('/initialTrialDistrictFilter',initialTrialDistrictFilter);

router.get('/finalTrial',finalTrial);
router.post('/finalTrialFilter',finalTrialFilter);
router.post('/finalTrialDistrictFilter',finalTrialDistrictFilter);



module.exports = router;