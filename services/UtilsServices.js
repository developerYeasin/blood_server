exports.sqlDateTimeFormat = function (date) {
    return date.toISOString().slice(0, 19).replace("T", " ");
};
exports.sqlDateFormat = function (date) {
    const newDate = new Date(date)
    return newDate.toISOString().split("T")[0];
};
exports.sqlLastDateFormat = function (date) {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() + 3)
    return newDate.toISOString().split("T")[0];
};