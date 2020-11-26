const db=require('../models');
const pd = db.pd;
const dd = db.dd;
const ad = db.ad;       
const upazilla = db.upazilla;
const trainedFarmer = db.trainedFarmer;
const initialTrial = db.initialTrial;
const finalTrial = db.finalTrial;
const irrigation = db.irrigation;
const machinery = db.machinery;
const motivation = db.motivation;
const fieldDay = db.fieldDay;
const agriFair = db.agriFair;

const multer = require("multer");
const path = require("path");

const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');


module.exports.upazillalogin=async(req,res)=>{
    res.render('upazilla/login', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'' });
    res.send("log");
};

module.exports.upazillaloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        upazilla.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "upazilla";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/upazilla/dashboard');
                    }
                    else{
                        return res.status(200).render('upazilla/login', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('upazilla/login', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'Please provide a username and password' });
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

module.exports.upazillaDashboard = async(req,res) => {
    console.log("upazilladashboard",res.locals.type);
    res.render('upazilla/dashboard', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.upazillasignup=async(req,res)=>{
    await dd.findAll()
    .then(data => {
        console.log("inside");
        res.render('upazilla/signup', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'',records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/signup', { title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'',records: err });
    })
};
module.exports.upazillasignuppost=async(req,res)=>{
    try {
        const{dds,uname,password,confirmPassword}=req.body;
        const ddata=await dd.findAll();
        const data = await upazilla.findAll({ where: {uname: uname} });
        
        if(data.length > 0){
            res.render('upazilla/signup',{title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'ERROR: The upazilla is already enrolled!',records: ddata})
        }
        else if(password !== confirmPassword){
           res.render('upazilla/signup',{title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'ERROR: Passwords do not match!',records: ddata})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createupazilla = await upazilla.create({
                    uname: uname,
                    password:hashedPassword,
                    dd_id:dds,
                    pd_id:1
                    })
                res.render('upazilla/signup',{title: 'নোয়াখালী, ফেনী, লক্ষীপুর, চট্টগ্রাম ও চাঁদপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'upazilla Registered Successfully!',records: ddata})
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
    await trainedFarmer.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.trainedFarmerYear=async(req,res)=>{
    await trainedFarmer.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/trainedFarmer/trainedFarmerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/trainedFarmer/trainedFarmerYear', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })

};

module.exports.trainedFarmerForm=async(req,res)=>{
    res.render('upazilla/trainedFarmer/trainedFarmerForm', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.trainedFarmerFormPost=async(req,res)=>{
    var name= req.body.name;
    var vname= req.body.vname;
    var mnum= req.body.mnum;
    var nid= req.body.nid;
    var topic= req.body.topic;
    var date= req.body.date;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await trainedFarmer.create({
        name: name,
        vname:vname,
        mnum:mnum,
        nid:nid,
        topic:topic,
        date:date,
        year:year,
        upazilla_id:user_id
    });
    await initialTrial.create({
        name: name,
        vname:vname,
        mnum:mnum,
        year:year,
        upazilla_id:user_id
    });
    await finalTrial.create({
        name: name,
        vname:vname,
        mnum:mnum,
        year:year,
        upazilla_id:user_id
    })
    
        
        .then(data => {
            res.redirect('/upazilla/trainedFarmer');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.trainedFarmerEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('upazilla/trainedFarmer/trainedFarmerForm', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.trainedFarmerDelete=async(req,res)=>{
    var name= req.body.name;
    var fname= req.body.fname;
    var vname= req.body.vname;
    var nid= req.body.nid;
    var mnum= req.body.mnum;
    var ptype= req.body.ptype;
    var pname= req.body.pname;
    var date= req.body.date;
    var block= req.body.block;
    var saooname= req.body.saooname;
    var pnum= req.body.pnum;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await trainedFarmer.create({
        name: name,
        fname:fname,
        vname:vname,
        nid:nid,
        mnum:mnum,
        ptype:ptype,
        pname:pname,
        date:date,
        block:block,
        saooname:saooname,
        pnum:pnum,
        year:year,
        upazilla_id:user_id
    });
    await initialTrial.create({
        name: name,
        fname:fname,
        vname:vname,
        nid:nid,
        mnum:mnum,
        ptype:ptype,
        pname:pname,
        block:block,
        saooname:saooname,
        pnum:pnum,
        year:year,
        upazilla_id:user_id
    });
    await finalTrial.create({
        name: name,
        fname:fname,
        vname:vname,
        nid:nid,
        mnum:mnum,
        ptype:ptype,
        pname:pname,
        year:year,
        upazilla_id:user_id
    })
    
        
        .then(data => {
            res.redirect('/upazilla/trainedFarmer');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//trainedFarmer controller end

//initialTrial controller
module.exports.initialTrial=async(req,res)=>{
    await initialTrial.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/initialTrial/initialTrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/initialTrial/initialTrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.initialTrialYear=async(req,res)=>{
    await initialTrial.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/initialTrial/initialTrialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/initialTrial/initialTrialYear', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', records: err });
    })

};

module.exports.initialTrialForm=async(req,res)=>{
    res.render('upazilla/initialTrial/initialTrialForm', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.initialTrialFormPost=async(req,res)=>{
    var breedname= req.body.breedname;
    var trialdate= req.body.trialdate;
    var present= req.body.present;
    var kphone= req.body.kphone;

    await initialTrial.update(
        {
            breedname: breedname,
            trialdate:trialdate,
            present:present,
            kphone:kphone,
        },
        {
            where: {id: req.params.id}
        }
    );
    await finalTrial.update(
        {
            breedname: breedname,
            trialdate:trialdate,
        },
        {
            where: {id: req.params.id}
        }
    )
    
        
        .then(data => {
            res.redirect('/upazilla/initialTrial');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.initialTrialEdit=async(req,res)=>{
    await initialTrial.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('upazilla/initialTrial/initialTrialForm', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',msg:'' ,success:'',records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/initialTrial/initialTrialForm', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',msg:'' ,success:'', records: err });
    })
    
};
module.exports.initialTrialUpdate=async(req,res)=>{
    res.render('upazilla/initialTrial/initialTrialForm', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.initialTrialDelete=async(req,res)=>{
    var cdistribution= req.body.cdistribution;
    var pdistribution= req.body.pdistribution;
    var breedname= req.body.breedname;
    var source= req.body.source;
    var trialsize= req.body.trialsize;
    var trialdate= req.body.trialdate;

    await initialTrial.create({
        cdistribution: cdistribution,
        pdistribution:pdistribution,
        breedname:breedname,
        source:source,
        trialsize:trialsize,
        trialdate:trialdate,
    });
    await finalTrial.create({
        cdistribution: cdistribution,
        pdistribution:pdistribution,
        breedname:breedname,
        source:source,
        trialsize:trialsize,
        trialdate:trialdate,
    })
    
        
        .then(data => {
            res.redirect('/upazilla/initialTrial');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//initialTrial controller end

//finalTrial controller
module.exports.finalTrial=async(req,res)=>{
    await finalTrial.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/finalTrial/finalTrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/finalTrial/finalTrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.finalTrialYear=async(req,res)=>{
    await finalTrial.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/finalTrial/finalTrialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/finalTrial/finalTrialYear', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })

};

module.exports.finalTrialForm=async(req,res)=>{
    res.render('upazilla/finalTrial/finalTrialForm', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.finalTrialFormPost=async(req,res)=>{
    var cdate= req.body.cdate;
    var production= req.body.production;
    var fcomment= req.body.fcomment;
    var kcomment= req.body.kcomment;

    await finalTrial.update({
        cdate: cdate,
        production:production,
        fcomment:fcomment,
        kcomment:kcomment,
    },{
        where: {id: req.params.id}
    })
    
        
        .then(data => {
            res.redirect('/upazilla/finalTrial');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.finalTrialEdit=async(req,res)=>{
    await finalTrial.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('upazilla/finalTrial/finalTrialForm', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',msg:'' ,success:'',records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/finalTrial/finalTrialForm', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',msg:'' ,success:'', records: err });
    })
};

module.exports.finalTrialDelete=async(req,res)=>{
    var cdate= req.body.cdate;
    var production= req.body.production;
    var folon= req.body.folon;
    var bij= req.body.bij;
    var comment= req.body.comment;

    await finalTrial.create({
        cdate: cdate,
        production:production,
        folon:folon,
        bij:bij,
        comment:comment,
    })
    
        
        .then(data => {
            res.redirect('/upazilla/finalTrial');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//finalTrial controller end

//agriFair controller
module.exports.agriFair=async(req,res)=>{
    await agriFair.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/agriFair/agriFair', { title: 'কৃষি মেলা তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/agriFair/agriFair', { title: 'কৃষি মেলা তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.agriFairYear=async(req,res)=>{
    await agriFair.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/agriFair/agriFairTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/agriFair/agriFairYear', { title: 'কৃষি মেলার তথ্য',success:'', records: err });
    })

};

module.exports.agriFairForm=async(req,res)=>{
    res.render('upazilla/agriFair/agriFairForm', { title: 'কৃষি মেলার তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.agriFairFormPost=async(req,res)=>{
    var district= req.body.district;
    var upazilla= req.body.upazilla;
    var booth= req.body.booth;
    var technology= req.body.technology;
    var name= req.body.name;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await agriFair.create({
        district: district,
        upazilla:upazilla,
        booth:booth,
        technology:technology,
        name:name,
        comment:comment,
        year:year,
        upazilla_id:user_id
    })
    
        
        .then(data => {
            res.redirect('/upazilla/agriFair');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.agriFairEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('upazilla/agriFair/agriFairForm', { title: 'কৃষি মেলার তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.agriFairDelete=async(req,res)=>{
    var name= req.body.name;
    var fname= req.body.fname;
    var vname= req.body.vname;
    var nid= req.body.nid;
    var mnum= req.body.mnum;
    var ptype= req.body.ptype;
    var pname= req.body.pname;
    var date= req.body.date;
    var block= req.body.block;
    var saooname= req.body.saooname;
    var pnum= req.body.pnum;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await agriFair.create({
        name: name,
        fname:fname,
        vname:vname,
        nid:nid,
        mnum:mnum,
        ptype:ptype,
        pname:pname,
        date:date,
        block:block,
        saooname:saooname,
        pnum:pnum,
        year:year,
        upazilla_id:user_id
    })
        
        .then(data => {
            res.redirect('/upazilla/agriFair');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//agriFair controller end

//fieldDay controller
module.exports.fieldDay=async(req,res)=>{
    await fieldDay.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/fieldDay/fieldDay', { title: 'মাঠ দিবস তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/fieldDay/fieldDay', { title: 'মাঠ দিবস তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.fieldDayYear=async(req,res)=>{
    await fieldDay.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/fieldDay/fieldDayTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/fieldDay/fieldDayYear', { title: 'মাঠ দিবস তথ্য',success:'', records: err });
    })

};

module.exports.fieldDayForm=async(req,res)=>{
    res.render('upazilla/fieldDay/fieldDayForm', { title: 'মাঠ দিবস তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.fieldDayFormPost=async(req,res)=>{
    var name= req.body.name;
    var foshol= req.body.foshol;
    var date= req.body.date;
    var time= req.body.time;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await fieldDay.create({
        name: name,
        foshol:foshol,
        date:date,
        time:time,
        comment:comment,
        year:year,
        upazilla_id:user_id
    })
    
        
        .then(data => {
            res.redirect('/upazilla/fieldDay');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.fieldDayEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('upazilla/fieldDay/fieldDayForm', { title: 'মাঠ দিবস তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.fieldDayDelete=async(req,res)=>{
    var name= req.body.name;
    var fname= req.body.fname;
    var vname= req.body.vname;
    var nid= req.body.nid;
    var mnum= req.body.mnum;
    var ptype= req.body.ptype;
    var pname= req.body.pname;
    var date= req.body.date;
    var block= req.body.block;
    var saooname= req.body.saooname;
    var pnum= req.body.pnum;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await fieldDay.create({
        name: name,
        fname:fname,
        vname:vname,
        nid:nid,
        mnum:mnum,
        ptype:ptype,
        pname:pname,
        date:date,
        block:block,
        saooname:saooname,
        pnum:pnum,
        year:year,
        upazilla_id:user_id
    })
    
        
        .then(data => {
            res.redirect('/upazilla/fieldDay');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//fieldDay controller end

//irrigation controller
module.exports.irrigation=async(req,res)=>{
    await irrigation.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/irrigation/irrigation', { title: 'সেচ অবকাঠামো নির্মাণ তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/irrigation/irrigation', { title: 'সেচ অবকাঠামো নির্মাণ তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.irrigationYear=async(req,res)=>{
    await irrigation.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/irrigation/irrigationTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/irrigation/irrigationYear', { title: 'সেচ অবকাঠামো নির্মাণ তথ্য',success:'', records: err });
    })

};

module.exports.irrigationForm=async(req,res)=>{
    res.render('upazilla/irrigation/irrigationForm', { title: 'সেচ অবকাঠামো নির্মাণ তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.irrigationFormPost=async(req,res)=>{
    var district= req.body.district;
    var upazilla= req.body.upazilla;
    var pipe= req.body.pipe;
    var union= req.body.union;
    var jomi= req.body.jomi;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await irrigation.create({
        district: district,
        upazilla:upazilla,
        pipe:pipe,
        union:union,
        jomi:jomi,
        comment:comment,
        year:year,
        upazilla_id:user_id
    })
        .then(data => {
            res.redirect('/upazilla/irrigation');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.irrigationEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('upazilla/irrigation/irrigationForm', { title: 'সেচ অবকাঠামো নির্মাণ তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.irrigationDelete=async(req,res)=>{
    var name= req.body.name;
    var fname= req.body.fname;
    var vname= req.body.vname;
    var nid= req.body.nid;
    var mnum= req.body.mnum;
    var ptype= req.body.ptype;
    var pname= req.body.pname;
    var date= req.body.date;
    var block= req.body.block;
    var saooname= req.body.saooname;
    var pnum= req.body.pnum;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await irrigation.create({
        name: name,
        fname:fname,
        vname:vname,
        nid:nid,
        mnum:mnum,
        ptype:ptype,
        pname:pname,
        date:date,
        block:block,
        saooname:saooname,
        pnum:pnum,
        year:year,
        upazilla_id:user_id
    })
    
        
        .then(data => {
            res.redirect('/upazilla/trainedFarmer');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//irrigation controller end

//machinery controller
module.exports.machinery=async(req,res)=>{
    await machinery.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/machinery/machinery', { title: 'কৃষি যন্ত্রপাতি বিতরণ প্রতিবেদন তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/machinery/machinery', { title: 'কৃষি যন্ত্রপাতি বিতরণ প্রতিবেদন তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.machineryYear=async(req,res)=>{
    await machinery.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/machinery/machineryTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/machinery/machineryYear', { title: 'কৃষি যন্ত্রপাতি বিতরণ প্রতিবেদন',success:'', records: err });
    })

};

module.exports.machineryForm=async(req,res)=>{
    res.render('upazilla/machinery/machineryForm', { title: 'কৃষি যন্ত্রপাতি বিতরণ প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.machineryFormPost=async(req,res)=>{
    var district= req.body.district;
    var upazilla= req.body.upazilla;
    var machine= req.body.machine;
    var number= req.body.number;
    var farmer= req.body.farmer;
    var village= req.body.village;
    var mobile= req.body.mobile;
    var bitoron= req.body.bitoron;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await machinery.create({
        district: district,
        upazilla:upazilla,
        machine:machine,
        number:number,
        farmer:farmer,
        village:village,
        mobile:mobile,
        bitoron:bitoron,
        year:year,
        upazilla_id:user_id
    })
    
        
        .then(data => {
            res.redirect('/upazilla/machinery');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.machineryEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('upazilla/machinery/machineryForm', { title: 'কৃষি যন্ত্রপাতি বিতরণ প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.machineryDelete=async(req,res)=>{
    var name= req.body.name;
    var fname= req.body.fname;
    var vname= req.body.vname;
    var nid= req.body.nid;
    var mnum= req.body.mnum;
    var ptype= req.body.ptype;
    var pname= req.body.pname;
    var date= req.body.date;
    var block= req.body.block;
    var saooname= req.body.saooname;
    var pnum= req.body.pnum;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await machinery.create({
        name: name,
        fname:fname,
        vname:vname,
        nid:nid,
        mnum:mnum,
        ptype:ptype,
        pname:pname,
        date:date,
        block:block,
        saooname:saooname,
        pnum:pnum,
        year:year,
        upazilla_id:user_id
    })
        
        .then(data => {
            res.redirect('/upazilla/machinery');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//machinery controller end

//motivation controller
module.exports.motivation=async(req,res)=>{
    await motivation.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/motivation/motivation', { title: 'উদ্বুদ্ধকরণ ভ্রমণ তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/motivation/motivation', { title: 'উদ্বুদ্ধকরণ ভ্রমণ তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.motivationYear=async(req,res)=>{
    await motivation.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/motivation/motivationTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/motivation/motivationYear', { title: 'উদ্বুদ্ধকরণ ভ্রমণ তথ্য',success:'', records: err });
    })

};

module.exports.motivationForm=async(req,res)=>{
    res.render('upazilla/motivation/motivationForm', { title: 'উদ্বুদ্ধকরণ ভ্রমণ তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.motivationFormPost=async(req,res)=>{
    var district= req.body.district;
    var upazilla= req.body.upazilla;
    var name= req.body.name;
    var nid= req.body.nid;
    var village= req.body.village;
    var mobile= req.body.mobile;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await motivation.create({
        district: district,
        upazilla:upazilla,
        name:name,
        nid:nid,
        village:village,
        mobile:mobile,
        comment:comment,
        year:year,
        upazilla_id:user_id
    })
    
        
        .then(data => {
            res.redirect('/upazilla/motivation');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.motivationEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('upazilla/motivation/motivationForm', { title: 'উদ্বুদ্ধকরণ ভ্রমণ তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.motivationDelete=async(req,res)=>{
    var name= req.body.name;
    var fname= req.body.fname;
    var vname= req.body.vname;
    var nid= req.body.nid;
    var mnum= req.body.mnum;
    var ptype= req.body.ptype;
    var pname= req.body.pname;
    var date= req.body.date;
    var block= req.body.block;
    var saooname= req.body.saooname;
    var pnum= req.body.pnum;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await motivation.create({
        name: name,
        fname:fname,
        vname:vname,
        nid:nid,
        mnum:mnum,
        ptype:ptype,
        pname:pname,
        date:date,
        block:block,
        saooname:saooname,
        pnum:pnum,
        year:year,
        upazilla_id:user_id
    })
        
        .then(data => {
            res.redirect('/upazilla/motivation');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//motivation controller end