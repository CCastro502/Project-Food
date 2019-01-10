module.exports = function (sequelize, DataTypes) {
    var Region = sequelize.define("Region", {
        formal_region_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url_region_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        posts: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    });

    Region.associate = function (models) {

        Region.hasMany(models.Food, {
        });
    };

    return Region;
};