module.exports = function (sequelize, DataTypes) {
    var Region = sequelize.define("Region", {
        region_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        posts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    });

    Region.associate = function (models) {

        Region.hasMany(models.Food, {
        });
    };

    return Region;
};