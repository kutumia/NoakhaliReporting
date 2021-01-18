module.exports = (sequelize, Sequelize) => {
    const finalTrial = sequelize.define("finaltrial", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      vname: {
        type: Sequelize.STRING
      },
      mnum: {
        type: Sequelize.STRING
      },
      breedname: {
        type: Sequelize.STRING
      },
      trialdate: {
        type: Sequelize.STRING
      },
      cdate: {
        type: Sequelize.STRING
      },
      production: {
        type: Sequelize.STRING
      },
      bij: {
        type: Sequelize.STRING
      },
      fcomment: {
        type: Sequelize.STRING
      },
      kcomment: {
        type: Sequelize.STRING
      },
      ddComment: {
        type: Sequelize.STRING
      },
      pdComment: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return finalTrial;
  };