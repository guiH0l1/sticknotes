/**
 * Modulo de conexão com o banco de dados
 * Uso de framework mongoose
 */

// importação do mongoose
const mongoose = require('mongoose')

// configuração do banco de dados
// ip/link do servidor, autenticação , nome do banco
const url = 'mongodb+srv://admin:123Senac@cluster0.s4sxi.mongodb.net/dbnodes'

//validação (evitar a abertura de varias conexões)
let conectado = false

// metodo para conectar com o banco de dados
const conectar = async () => {
    // se não estiver conectado
    if (!conectado) {
        // conectar com o banco de dados
        try {
            await mongoose.connect(url)
            conectado = true
            console.log("MondoDB Conectado")
        } catch (error) {
            console.log(error)
        }
    }
}

// metodo para desconectar o banco de dados
const desconectar = async () => {
    // se estiver conectado 
    if (conectado) {
        // desconectar
        try {
            await mongoose.disconnect(url) // desconectar
            conectado = false
            console.log("MongoDB Desconectado")
        } catch (error) {
            console.log(error)
        }
    }
}

//importação de modelos de daods
// Exportar para o main os metodos conectar e desconectar
module.exports = { conectar, desconectar }