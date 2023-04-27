const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome: "Greta Gill",
        imagem: "https://static.wikia.nocookie.net/a-league-of-their-own/images/8/85/Characterposter-Greta_Gill.JPG/revision/latest?cb=20220810135722",
        minibio: "Lésbica e jogadora de baseball"   
    },
    {
        nome: "Carson Shaw",
        imagem: "https://static.wikia.nocookie.net/a-league-of-their-own/images/4/42/Characterposter-Carson.JPG/revision/latest?cb=20220810135722",
        minibio: "Capitã time de baseball"
    },
    {
        nome: "Lupe García",
        imagem: "https://static.wikia.nocookie.net/a-league-of-their-own/images/d/d9/Characterposter-Lupe_Garcia.JPG/revision/latest?cb=20220810135723",
        minibio: "Pitcher principal"
    }
]

function mostraMulheres(request, response) {
    response.json(mulheres)
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get("/mulheres", mostraMulheres))
app.listen(porta, mostraPorta)