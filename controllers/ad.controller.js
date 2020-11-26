const db=require('../models');
const pd = db.pd;
const dd = db.dd;
const ad = db.ad;
const upazilla = db.upazilla;
const trainedFarmer = db.trainedFarmer;
const initialTrial = db.initialTrial;
const finalTrial = db.finalTrial;

const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');

module.exports.upazillatable=async(req,res)=>{
    res.json({ message: "hello upazilla" });
};

module.exports.allupazilla=async(req,res)=>{
    res.json({ message: "hello upazilla" });
};


module.exports.adlogin=async(req,res)=>{
    res.render('ad/login', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'' });
    res.send("log");
};

module.exports.adloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        ad.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "ad";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/ad/dashboard');
                    }
                    else{
                        return res.status(200).render('ad/login', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('ad/login', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'Please provide a username and password' });
            }
        })
        .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving tutorials."
              });
            });
        // upazilla.findAll({ where: {uname: uname} })
        // .then(data => {
        //     if(data.length > 0){
        //         bcrypt.compareSync(password , upazilla.password, function(err, result) {
        //             if(result== true){
        //                 res.redirect('/upazilla/dashboard');
        //             }
        //             else{
        //                 res.redirect('/upazilla/dashboard');
        //             }
        //         });
        //     }else{
        //         return res.status(200).render('upazilla/login', { title: 'Horticulture Wing Central Management Software',msg:'Please provide a username and password' });
        //     }
        // })
        // .catch(err => {
        //   res.status(500).send({
        //     message:
        //       err.message || "Some error occurred while retrieving tutorials."
        //   });
        // });

        
    }
    catch(error){
        console.log(error);
    } 
};

module.exports.adDashboard = async(req,res) => {
    console.log("addashboard",res.locals.type);
    res.render('ad/dashboard', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.adsignup=async(req,res)=>{
    res.render('ad/signup', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'' });
    res.send("log");
};
module.exports.adsignuppost=async(req,res)=>{
    try {
        const{uname,password,confirmPassword}=req.body;

        const data = await ad.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('ad/signup',{title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'ERROR: The ad is already enrolled!'})
        }
        else if(password !== confirmPassword){
            return res.render('ad/signup',{title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'ERROR: Passwords do not match!'})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createad = await ad.create({
                    uname: uname,
                    password:hashedPassword,
                    pd_id:1
                    })
                res.render('ad/signup',{title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'ad Registered Successfully!'})
            }
            catch (err) {
                console.log(err);
            }
            
        }
    }
    catch(error){
        console.log(error);
    } 
};
//signUp controller end

//trainedFarmer controller
module.exports.trainedFarmer=async(req,res)=>{
    try{
        var districts=await dd.findAll({where: {ad_id: req.session.user_id}});
        console.log("inside");
        res.render('ad/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('ad/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:''});
    }
     
    //  records:result

};

module.exports.trainedFarmerFilter=async(req,res)=>{
    await trainedFarmer.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/trainedFarmer/trainedFarmerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/trainedFarmer/trainedFarmerYear', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })

};

module.exports.trainedFarmerDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('ad/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', upazillas:err });
    }
     

};
//trainedFarmer controller end

//initialTrial controller
module.exports.initialTrial=async(req,res)=>{
    try{
        var districts=await dd.findAll({where: {ad_id: req.session.user_id}});
        console.log("inside");
        res.render('ad/initialTrial/initialTrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('ad/initialTrial/initialTrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:''});
    }
     
    //  records:result

};

module.exports.initialTrialFilter=async(req,res)=>{
    await initialTrial.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('ad/initialTrial/initialTrialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('ad/initialTrial/initialTrialYear', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', records: err });
    })

};
module.exports.initialTrialDistrictFilter=async(req,res)=>{
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('ad/initialTrial/initialTrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', upazillas:err });
    }
     

};
//initialTrial controller end

//finalTrial controller
module.exports.finalTrial=async(req,res)=>{
    try{
        var districts=await dd.findAll({where: {ad_id: req.session.user_id}});
        console.log("inside");
        res.render('ad/finalTrial/finalTrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('ad/finalTrial/finalTrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:''});
    }
    //  records:result

};

module.exports.finalTrialFilter=async(req,res)=>{
    await finalTrial.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('ad/finalTrial/finalTrialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('ad/finalTrial/finalTrialYear', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })

};
module.exports.finalTrialDistrictFilter=async(req,res)=>{
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('ad/finalTrial/finalTrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', upazillas:err });
    }
     

};
//finalTrial controller end

