var pool = require('./bd');


async function getInventario(){
    var query = 'select * from inventariodelibros';
    var rows = await pool.query(query);
    return rows;
}

async function insertlibro(obj) {
    try{
        var query = "insert into inventariodelibros set ?";
        var rows = await pool.query(query, [obj])
        return rows;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function borrarlibrobyId(id) {
    var query = 'delete from inventariodelibros where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getlibrobyId(id){
    var query = 'select * from inventariodelibros where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarlibrobyId(obj, id){
    try{
        var query = 'update inventariodelibros set ? where id=?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    }catch (error){
        throw error;
    }
}

module.exports = { getInventario, insertlibro, borrarlibrobyId, getlibrobyId, modificarlibrobyId }