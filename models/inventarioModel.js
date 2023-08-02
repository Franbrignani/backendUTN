var pool = require('./bd');


async function getInventario(){
    var query = 'select * from inventariodelibros';
    var rows = await pool.query(query);
    return rows;
}

async function insertlibro(obj) {
    try{
        var query = "insert into inventario set ?";
        var rows = await pool.query(query, [obj])
        return rows;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getInventario, insertlibro }