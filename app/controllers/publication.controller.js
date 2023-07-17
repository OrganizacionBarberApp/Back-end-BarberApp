const Publication = require('../models/Publication');
const publicationService = require('../services/publication.service');


const create = async (req, res) => {

    let body = req.body;

    // Validar solicitud
    if (!body) {
        return res.status(400).send({
            mensaje: "Content cannot be empty"
        });
    }

    // Crear un nuevo usuario
    const publication = new Publication({
        name: body.name,
        id_user: body.id_user,
        description: body.name,
        url_image: body.email,
        role: body.url_image,
        publication_date: new Date(),
    });

    // Guardar usuario en la bd
    await publicationService.create(publication, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Email must be unique",
                errors: err
            });
        } else {
            res.status(201).json({
                ok: true,
                publicacion: publication,
            });
        }
    });
};

const update = async (req, res) => {

    let body = req.body;
    const id_publication = req.params.id_publication;

    const publication = new Publication({
        name: body.name,
        id_user: body.id_user,
        description: body.name,
        url_image: body.email,
        role: body.url_image,
        publication_date: new Date(),
    });

    if (!req.body) {
        res.status(400).send({
            mensaje: "It cant be empty!"
        });
    }

    await publicationService.updateById(publication, id_publication, (err, publication) => {
        if (err) {
            if (err) {

                return res.status(400).send({
                    ok: false,
                    errors: { message: 'There is already a publication with that email' },
                    err: err
                });
            }
        }

        res.status(200).json({
            ok: true,
            usuario: publication
        });

    });
};

const consult = async (req, res) => {

    await publicationService.consultAllPublication((err, publication) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error loading publications',
                errors: err
            });
        } else {

            res.status(200).json({
                ok: true,
                publicaciones: publication
            });
        }
    })
}

const deletePublication = async (req, res) => {

    const id_publication = req.params.id_publication;

    if (!id_publication) {
        res.status(400).send({
            mensaje: "It cant be empty!"
        });
    }

    await publicationService.deletePublication(id_publication, (err, publication) => {
        if (err) {
            if (err) {
                return res.status(400).send({
                    ok: false,
                    errors: { message: 'There is no publication with that email' }
                });
            }
        }

        res.status(200).json({
            ok: true,
            usuario: "publication deleted successfully"
        });

    });

}

module.exports = {
    create,
    update,
    consult,
    deletePublication
}
