class Customer {
    constructor(customer) {
        this.id_customer = customer.id_customer;
        this.id_user = customer.id_user;
        this.name = customer.name;
        this.last_name = customer.last_name;
        this.email = customer.email;
        this.url_image = customer.url_image;
        this.city = customer.city;
        this.google = customer.google;
        this.cellphone = customer.cellphone;
        this.current = customer.current;
        this.creation_date = customer.creation_date;
        this.connection = customer.connection;
    }

}


module.exports = Customer

