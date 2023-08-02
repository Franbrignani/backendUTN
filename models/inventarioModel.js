var pool = require('./bd');


async function getinventario(){
    var query = 'select * from inventario';
    var rows = await pool.query(query);
    return rows;
}

module.exports = { getinventario }