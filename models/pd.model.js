module.exports = (sequelize, Sequelize) => {
    const pd = sequelize.define("pd", {
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
    });
  
    return pd;
  };