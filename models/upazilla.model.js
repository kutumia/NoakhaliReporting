module.exports = (sequelize, Sequelize) => {
    const upazilla = sequelize.define("upazilla", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      uname: {
        type: Sequelize.STRING
      },
      upazilla: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      dd_id: {
        type: Sequelize.INTEGER
      },
      pd_id: {
        type: Sequelize.INTEGER
      }
      
      
    });
  
    return upazilla;
  };