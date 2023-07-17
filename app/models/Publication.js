class Publication {
    constructor(publication) {
        this.id_publication = publication.id_publication;
        this.name = publication.name;
        this.id_user = publication.id_user;
        this.description = publication.description;
        this.url_image = publication.url_image;
        this.role = publication.role;
        this.publication_date = publication.publication_date
    }
}

module.exports = Publication