module.exports = (sequelize, DataTypes) => {
    const Cms = sequelize.define("User", {
        content_key: {
            type: DataTypes.STRING,
        },
        content_type: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        content_value: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        page: {
            type: DataTypes.STRING,
            // allowNull: false
        },
    }, {
        tableName: 'cms'
    });
    return Cms;
}