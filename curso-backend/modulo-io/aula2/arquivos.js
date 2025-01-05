const path = require('node:path');
const fs = require('node:fs')
const dotenv = require('dotenv')
dotenv.config()

console.log(process.env.NODE_ENV)

const filePath = path.join(process.cwd(), 'curso-backend', 'modulo-io', 'aula2', 'texto.txt')
const fileOutPath = path.join(process.cwd(), 'curso-backend', 'modulo-io', 'aula2', 'texto-com-linhas.txt')
console.log(filePath);

console.time('Manipular arquivos')
fs.readFile(filePath, {}, (erro, dados) => {
    if (erro) {
        console.error(`Erro na leitura do arquivo no caminho ${filePath}`)
        return
    }
    const texto = dados.toString()
    const linhas = texto.split('\n')

    const linhasAjustadas = linhas.map((linha, index) => `${index + 1} - ${linha}`)

    console.log(dados.toString())

    fs.writeFile(fileOutPath, linhasAjustadas.join('\n'), {}, (erro) => {
        if (erro) {
            console.error(`Erro na leitura do arquivo no caminho ${filePath}`)
            return
        }
        console.log(`Arquivo salvo no bucker ${process.env.S3_BUCKET}`)
    console.timeEnd('Manipular arquivos')
    })
})

