module.exports = (sequelize, Sequelize) => {
    const fieldDay = sequelize.define("fieldday", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      foshol: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      time: {
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
      batch: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return fieldDay;
  };