module.exports = (sequelize, Sequelize) => {
    const machinery = sequelize.define("machinery", {
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
      machine: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING
      },
      shongothon: {
        type: Sequelize.STRING
      },
      farmer: {
        type: Sequelize.STRING
      },
      village: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      bitoron: {
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
  
    return machinery;
  };