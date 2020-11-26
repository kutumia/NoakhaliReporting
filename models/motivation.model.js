module.exports = (sequelize, Sequelize) => {
    const motivation = sequelize.define("motivation", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      district: {
        type: Sequelize.STRING
      },
      upazilla: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      nid: {
        type: Sequelize.STRING
      },
      village: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return motivation;
  };