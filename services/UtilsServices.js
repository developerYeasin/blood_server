exports.sqlDateTimeFormat = function (date) {
    return date.toISOString().slice(0, 19).replace("T", " ");
};