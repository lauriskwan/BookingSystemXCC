class UserProfileService {
    constructor(knex) {
        this.knex = knex;
    }

    display (user_id) {
        return this.knex("users")
        .select("*")
        .where("id", user_id);
    }

    updateUser (user_id, user_email, user_phone) {
        return this.knex("users")
        .where("id", user_id)
        .update({email: user_email,
        phone_number: user_phone})
    }
}

module.exports = UserProfileService