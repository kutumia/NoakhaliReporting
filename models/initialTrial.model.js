module.exports = (sequelize, Sequelize) => {
    const initialTrial = sequelize.define("initialTrial", {
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
      present: {
        type: Sequelize.STRING
      },
      kphone: {
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