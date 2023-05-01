const express = require("express") //iniciando o pacote express
const router = express.Router() //configurando a primeira parte da rota
const cors = require("cors") //trazendo o pacote cors que permite consumir essa api no frot-end

const conectaBancoDeDados = require("./bancoDeDados.js") //ligando ao arquivo bancoDeDados
conectaBancoDeDados() //chamando a função que conecta o banco de dados

const Mulher = require("./mulherModel.js") // exportando o model (modelo/regra) do banco de dados e salvando na const Mulher

const app = express() //iniciando o app
app.use(express.json()) //dados que vão trafegar a partir das requisições também estarão no formato json
app.use(cors()) // chamado a função cors permitindo o aplicativo a usá-la, liberando a api a ser usada a partir o fron-t end

const porta = 3333 //criando a porta


//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }   
}

//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save()

        response.status(201).json(mulherCriada)

    } catch (erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }

        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }

        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }

        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }
        
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

        response.json(mulherAtualizadaNoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({messagem: "Mulher deletada com sucesso!"})
    } catch (erro) {
        console.log(erro)
    }
}

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get("/mulheres", mostraMulheres)) //configurei rota GET /mulheres
app.use(router.post("/mulheres", criaMulher)) //configurei rota POST /mulheres
app.use(router.patch("/mulheres/:id", corrigeMulher)) //configurei rota PATCH /mulheres/:id
app.use(router.delete("/mulheres/:id", deletaMulher)) //configurei rota DELETE /mulheres/:id
app.listen(porta, mostraPorta) //servidor ouvindo a porta