/**
 * preload.js - Usado no framework electron para aumentar a segurança e o desempenho
 */

// importação dos recursos do framework electron
// ipcRenderer permite estabelecer uma comucação entre os processos (IPC) main.js <-> renderer.js 
// contextBridge: permissões de comunicação entre o processos usando a api do electron
const {ipcRenderer, contextBridge} = require('electron')

//Enviar uma mensagem para o main.js estabelecer uma conexão com o banco de dados quando iniciar a aplicação
//send (enviar)
//dbConnect (rotulo para identificar a mensagem)

// permissões para estabelecer a comunicação entre processos
contextBridge.exposeInMainWorld('api', {
    dbConnect: () => ipcRenderer.send('db-connect'),
    dbstatus: (message) => ipcRenderer.on('db-status', message),
    aboutExit: () => ipcRenderer.send('about-exit'),
    createNote: (stickyNote) => ipcRenderer.send('create-note', stickyNote),
    resetForm: (args) => ipcRenderer.on('reset-form', args),
    listNotes: () => ipcRenderer.send('list-notes'),
    renderNotes: (notes) => ipcRenderer.on('render-notes', notes),
    updateList: () => ipcRenderer.send('update-list'),
    mainReload: (args) => ipcRenderer.on('main-reload', args),
    deleteNote: (id) => ipcRenderer.send('delete-note', id)
})