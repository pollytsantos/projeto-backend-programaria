const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response) {
    response.json({
        nome: "Greta Gill",
        imagem: "https://static.wikia.nocookie.net/a-league-of-their-own/images/8/85/Characterposter-Greta_Gill.JPG/revision/latest?cb=20220810135722",
        minibio: "Lésbica e jogadora de baseball"
    })
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get("/mulher", mostraMulher))
app.listen(porta, mostraPorta)