module.exports = (sequelize, Sequelize) => {
    const initialTrial = sequelize.define("initialtrial", {
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
      germinationRate: {
        type: Sequelize.STRING
      },
      trialdate: {
        type: Sequelize.STRING
      },
      present: {
        type: Sequelize.STRING
      },
      kphone: {
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
  
    return initialTrial;
  };