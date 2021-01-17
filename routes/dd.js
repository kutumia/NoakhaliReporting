const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();
const {ddsignup,ddsignuppost,allupazilla,ddlogin,ddloginpost,ddDashboard,irrigationEdit,irrigationEditPost,machineryEdit,machineryEditPost,motivationEdit,motivationEditPost,fieldDayEdit,fieldDayEditPost
    ,initialTrialEdit,initialTrialEditPost,finalTrialEdit,finalTrialEditPost,agriFairEdit,agriFairEditPost,
    trainedFarmer,trainedFarmerFilter,initialTrial,initialTrialFilter,trainedFarmerEditPost,trainedFarmerEdit,
    finalTrial,finalTrialFilter,agriFair,agriFairFilter,irrigation,irrigationFilter,machinery,machineryFilter,motivation,motivationFilter,fieldDay,fieldDayFilter} = require('../controllers/dd.controller');
router.get('/',allupazilla);
router.get('/login',ddlogin);
router.post('/logins',ddloginpost);
router.get('/dashboard',ddDashboard);

router.get('/signup',ddsignup);
router.post('/signups',ddsignuppost);

router.get('/trainedFarmer',trainedFarmer);
router.post('/trainedFarmerFilter',trainedFarmerFilter);
router.get('/trainedFarmerEdit/:id',trainedFarmerEdit);
router.post('/trainedFarmerEditPost/:id',trainedFarmerEditPost);

router.get('/initialTrial',initialTrial);
router.post('/initialTrialFilter',initialTrialFilter);
router.get('/initialTrialEdit/:id',initialTrialEdit);
router.post('/initialTrialEditPost/:id',initialTrialEditPost);

router.get('/finalTrial',finalTrial);
router.post('/finalTrialFilter',finalTrialFilter);
router.get('/finalTrialEdit/:id',finalTrialEdit);
router.post('/finalTrialEditPost/:id',finalTrialEditPost);

router.get('/agriFair',agriFair);
router.post('/agriFairFilter',agriFairFilter);
router.get('/agriFairEdit/:id',agriFairEdit);
router.post('/agriFairEditPost/:id',agriFairEditPost);

router.get('/irrigation',irrigation);
router.post('/irrigationFilter',irrigationFilter);
router.get('/irrigationEdit/:id',irrigationEdit);
router.post('/irrigationEditPost/:id',irrigationEditPost);

router.get('/machinery',machinery);
router.post('/machineryFilter',machineryFilter);
router.get('/machineryEdit/:id',machineryEdit);
router.post('/machineryEditPost/:id',machineryEditPost);

router.get('/motivation',motivation);
router.post('/motivationFilter',motivationFilter);
router.get('/motivationEdit/:id',motivationEdit);
router.post('/motivationEditPost/:id',motivationEditPost);

router.get('/fieldDay',fieldDay);
router.post('/fieldDayFilter',fieldDayFilter);
router.get('/fieldDayEdit/:id',fieldDayEdit);
router.post('/fieldDayEditPost/:id',fieldDayEditPost);






module.exports = router;