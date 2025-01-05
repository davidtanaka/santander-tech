const path = require('node:path');
const fs = require('node:fs')

const filePath = path.join(process.cwd(), 'curso-backend', 'aula2', 'texto.txt')
const fileOutPath = path.join(process.cwd(), 'curso-backend', 'aula2', 'texto-com-linhas.txt')
console.log(filePath);

fs.readFile(filePath, {}, (erro, dados) => {
    if (erro) {
        console.log(`Erro na leitura do arquivo no caminho ${filePath}`)
        return
    }
    const texto = dados.toString()
    const linhas = texto.split('\n')

    const linhasAjustadas = linhas.map((linha, index) => `${index + 1} - ${linha}`)

    console.log(dados.toString())

    fs.writeFile(fileOutPath, linhasAjustadas.join('\n'), {}, (erro) => {
        if (erro) {
            console.log(`Erro na leitura do arquivo no caminho ${filePath}`)
            return
        }
    })
})

