class Promotion {
    constructor(promotion) {
        this.id_promotion = promotion.id_promotion;
        this.name = promotion.name;
        this.id_user = promotion.id_user;
        this.description = promotion.description;
        this.url_image = promotion.url_image;
        this.role = promotion.role;
        this.promotion_date = promotion.promotion_date
    }
}

module.exports = Promotion