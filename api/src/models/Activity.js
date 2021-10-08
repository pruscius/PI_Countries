const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('activity', {
        name: {
            type: DataTypes.STRING,
            allowNull: false    
        },
        difficulty: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            },
            allowNull: false
        },
        duration: {
            type: DataTypes.FLOAT,
            allowNull: false
        }, 
        season: {
            type: DataTypes.ENUM('Summer', 'Spring', 'Fall', 'Winter'),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}