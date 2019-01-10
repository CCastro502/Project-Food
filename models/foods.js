module.exports = function (sequelize, DataTypes) {
    var Food = sequelize.define("Food", {
        author_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        food_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        ingredients: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        directions: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        region_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        video_url: {
            type: DataTypes.TEXT,
        },
        country: {
            type: DataTypes.STRING,
        },
        upvotes: {
            type: DataTypes.SMALLINT,
            defaultValue: 1
        }
    });

    Food.associate = function (models) {
       
        Food.belongsTo(models.Region, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Food;
};
