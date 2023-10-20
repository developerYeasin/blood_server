module.exports = (sequelize, DataTypes) => {
    const Cms = sequelize.define("Cms", {
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