class UserProfileService {
    constructor(knex) {
        this.knex = knex;
    }

    display (user_id) {
        return this.knex("users")
        .select("*")
        .where("id", user_id);
    }
}

module.exports = UserProfileService