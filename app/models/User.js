
class User {

    constructor(user) {
        this.id_user = user.id_user
        this.name = user.name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.password = user.password;
        this.url_image = user.url_image;
        this.google = user.google;
        this.cellphone = user.cellphone;
        this.current = user.current;
        this.creation_date = user.creation_date;
        this.connection = user.connection;
        this.location = user.location
    }
}


module.exports = User;
