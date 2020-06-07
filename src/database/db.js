//importar a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose()

//criar o objeto que irá fazer operaçoes no bd
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//utilizar o obj do bd, para nossas operações

/*
db.serialize(() => {
    //com comandos SQL eu vou:

    //1-criar uma tabela 
  /*   db.run(`
        create table if not exists places(
            id integer primary key autoincrement,
            image text,
            name text,
            adress text,
            adress2 text,
            state text,
            city text,
            items text
        );
    `) */
    
    //2-inserir dados na tabela
    /* const query = `
    insert into places (
        image, name, adress, adress2, state, city, items
    ) values (?,?,?,?,?,?,?)`

    const values = [
        "https://images.unsplash.com/photo-1558583082-409143c794ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
        "Paperside",
        "Guilherme Gemballa, Jardim américa",
        "Nº260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData ) */

    //3-consultar os dados na tabela
   /*  db.all(`select * from places`, function(err, rows){
        if(err){
            return console.log(err)
        }

        console.log("Aqui estão os seus registros: ")
        console.log(rows)
    }) */



    //4-deletar um dado na tabela
   /*  db.run(`delete from places where id = ?`, [5], function(err){
        if(err){
            return console.log(err)
        }

        console.log("Registro deletado com sucesso! ")
    })  */
//}) 

