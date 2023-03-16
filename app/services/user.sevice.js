
User.create = (newUser, result) => {
    sql.query("INSERT INTO Usuario SET ?", newUser, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, newUser );
    });
};



module.exports = User