/**
 * processo de renderização index.html
 */

console.log("Processo de renderização")

// estrategia para renderizar(desenhar) as notas adesivas:
// usar uma lista para preencher de forma dinamica os itens(notas)

// vetor global para manipular os dados do banco
let arrayNotes = []

//captura do id da list <ul> do documento index.html
const list = document.getElementById('listNotes')

// inserção da data no rodapé
function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', options)
}

document.getElementById('dataAtual').innerHTML = obterData()

//troca do ícone do banco de dados (status da conexão)
// uso do api do preload.js
api.dbstatus((event, message) => {
    //Teste de recebimento da mensagem
    console.log(message)
    if (message === "conectado") {
        document.getElementById('iconeDB').src = "../public/img/dbon.png"
    } else {
        document.getElementById('iconeDB').src = "../public/img/dboff.png"
    }
})

// enviar ao main ium pedido para conectar o banco de dados quando a janela principal for inicializada
api.dbConnect()

// ===============================================================================
// == CRUD Read ==================================================================

// Passo 1: Enviar ao main um pedido para listar as notas
api.listNotes()

// Passo 5: Recebimento de notas via IPC e renderização(desenho) das notas no documento index.html
api.renderNotes((event, notes) => {
    // JSON.parse converte string para JSAON
    const renderNotes = JSON.parse(notes)
    console.log(renderNotes) // teste de recebimento do passo 5
    // renderizar no index.html o conteudo do array
    arrayNotes = renderNotes // atribuir ao vetor o JSON recebido
    // uso do laço forEach para percorrer o vetor e extrair os dados
    arrayNotes.forEach((n) => {
        // adicionar de tgas <li> no documento index.html
        // var(--${n.cor}) aplica a cor definida nas variaveis CSS. Atenção! É necessário usar o  mesmo nome armazenado no banco das variaveis no CSS
        list.innerHTML += `
        <li class = "card" style="background-color:var(--${n.cor});">
            <p onclick = "deleteNote('${n._id}')" id ="x">X</p>
            <p id ="code">${n._id}</p>
            <p>${n.texto}</p>
            <p id ="color">${n.cor}</p>
        </li>
        `
    })
})

// =====================================================================================
// == Fim - CRUD Read ==================================================================


// =====================================================================================
// == Atualização das notas ============================================================

api.mainReload((args) => {
    location.reload()
})

// == Fim - atualização das notas ======================================================
// =====================================================================================

function deleteNote(id) {
    console.log(id) // Passo 1: receber o id da nota a ser excluida
    api.deleteNote(id) // Passo 2: Enviar o id na nota ao main
}
