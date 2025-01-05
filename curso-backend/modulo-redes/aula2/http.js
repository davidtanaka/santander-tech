const http = require('http');

const sports = ['soccer', 'volley', 'basketball'];
const server = http.createServer(async (request, response) => {
    const bodyPromise = new Promise((resolve, reject) => {
        let body

        request.on('data', data => {
            body = JSON.parse(data)
        })

        request.on('end', data => {
            resolve(body)
        })
    })
    
    const { url, method } = request;

    // Rota principal
    if (url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end('<div><h1>Hello, world!</h1><p>from node</p></div>');
    
    // Rota para a lista de esportes
    } else if (url === '/api/sports') {

        // Verifica se o método é GET
        if (method === 'GET') {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(sports));
        } 

        if (method === 'POST') {
           const body = await bodyPromise

            const { name } = body

            sports.push(name)

            response.write(name)
            response.end()
            
        }
        
    } else {
        // Página não encontrada
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Page not found');
    }

    // Em caso de erro, enviar código 404 e mensagem
    response.statusCode = 404;
    response.write('Página não encontrada');
});

server.listen(3000, 'localhost', () => {
    console.log('Server running on http://localhost:3000');
});
