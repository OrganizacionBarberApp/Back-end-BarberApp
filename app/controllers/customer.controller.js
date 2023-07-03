const Customer = require('../models/Customer');
const customerService = require('../services/customer.service');



const create = async (req, res) => {

    let body = req.body;

    // Validar solicitud
    if (!body) {
        return res.status(400).send({
            mensaje: "Content cannot be empty"
        });
    }

    // Crear un nuevo usuario
    const customer = new Customer({
        name: body.name,
        id_user: body.id_user,
        last_name: body.name,
        email: body.email,
        url_image: body.url_image,
        city: body.city,
        google: body.google,
        cellphone: body.cellphone,
        current: body.current,
        creation_date: new Date(),
        connection: new Date(),
    });

    // Guardar usuario en la bd
    await customerService.create(customer, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Email must be unique",
                errors: err
            });
        } else {
            res.status(201).json({
                ok: true,
                usuario: customer,
            });
        }
    });
};

const update = async (req, res) => {

    let body = req.body;
    const id_customer = req.params.id_customer;

    const customer = new Customer({
        name: body.name,
        id_user: body.id_user,
        last_name: body.name,
        email: body.email,
        url_image: body.url_image,
        city: body.city,
        google: body.google,
        cellphone: body.cellphone,
        current: body.current,
        creation_date: new Date(),
        connection: new Date(),
    });

    if (!req.body) {
        res.status(400).send({
            mensaje: "It cant be empty!"
        });
    }

    await customerService.updateById(customer, id_customer, (err, customer) => {
        if (err) {
            if (err) {

                return res.status(400).send({
                    ok: false,
                    errors: { message: 'There is already a customer with that email' },
                    err: err
                });
            }
        }

        res.status(200).json({
            ok: true,
            usuario: customer
        });

    });
};

const consult = async (req, res) => {

    await customerService.consultAllCustomer((err, customer) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error loading customers',
                errors: err
            });
        } else {

            res.status(200).json({
                ok: true,
                usuarios: customer
            });
        }
    })
}

const consultCustomerByEmailOrId = async (req, res) => {

    let value = req.params.value;

    if (!isNaN(parseInt(value))) {

        const customer = await customerService.consultCustomerId(value, 1);

        if (customer) {
            return res.status(200).json(customer);
        }
        return res.status(404).json({ msg: 'No customer found with that id' });

    } else {

        const customer = await customerService.consultCustomerByEmail(value, 1);

        if (customer) {
            return res.status(200).json(customer);
        }
        return res.status(404).json({ msg: 'No customer found with that email' });

    }

}

const deleteCustomer = async (req, res) => {

    const id_customer = req.params.id_customer;

    if (!id_customer) {
        res.status(400).send({
            mensaje: "It cant be empty!"
        });
    }

    await customerService.deleteCustomer(id_customer, (err, customer) => {
        if (err) {
            if (err) {
                return res.status(400).send({
                    ok: false,
                    errors: { message: 'There is no customer with that email' }
                });
            }
        }

        res.status(200).json({
            ok: true,
            usuario: "customer deleted successfully"
        });

    });

}

module.exports = {
    create,
    update,
    consult,
    deleteCustomer,
    consultCustomerByEmailOrId
}
