const express = require("express")
const server = express()

//pegar o bd
const db = require("./database/db")

//conf pasta public
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da aplicação
//pagina inicial
//req: requisição
//res: resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "um titulo"})
})

server.get("/create-point", (req, res) => {

    //req.query: Query Strinngs da nossa url
    req.query

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body: o corpo do nosso formulário

    //inserir dados no banco de dados
    const query = `
    insert into places (
        image, name, adress, adress2, state, city, items
    ) values (?,?,?,?,?,?,?)`

    const values = [
       req.body.image,
       req.body.name,
       req.body.adress,
       req.body.adress2,
       req.body.state,
       req.body.city,
       req.body.items
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData )    
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }

    //pegar os dados do bd
    db.all(`select * from places where city like '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length

        console.log("Aqui estão os seus registros: ")
        console.log(rows)

        //mostrar a pagina html com os dados do bd
        return res.render("search-results.html", { places: rows, total: total })
    })

    
})

//ligar o servidor
server.listen(3000)