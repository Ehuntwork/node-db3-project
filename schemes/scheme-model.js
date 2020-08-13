const knex = require('knex');
 db = knex({
    client: 'sqlite3',
    connection: {
      filename: './data/schemes.db3'
    },
    useNullAsDefault: true
});

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes").where({ id }).first();
}

function findSteps(id) {
    return db("steps").where('scheme_id', id);
}

function add(schemes) {
    return (
        db("schemes")
            .insert(schemes)
            .returning("id")
            .then(ids => {
                const id = ids[0];

                return findById(id);
            })
    );
}

function update(changes, id) {
    return db("schemes")
        .where({ id })
        .update(changes)
        .then(() => {
            return findById(id);
        });
}

function remove(id) {
    return db("schemes").where({ id }).del();
}