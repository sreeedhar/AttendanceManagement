module.exports = (sequelize, DataTypes) => {
    const Courses = sequelize.define("Courses", {
        dept: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        faculty: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Courses;
}