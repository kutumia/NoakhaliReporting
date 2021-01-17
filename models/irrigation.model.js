module.exports = (sequelize, Sequelize) => {
    const irrigation = sequelize.define("irrigation", {
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
      pipe: {
        type: Sequelize.STRING
      },
      union: {
        type: Sequelize.STRING
      },
      jomi: {
        type: Sequelize.STRING
      },
      comment: {
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
  
    return irrigation;
  };