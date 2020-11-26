module.exports = (sequelize, Sequelize) => {
    const ad = sequelize.define("ad", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      uname: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      pd_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return ad;
  };