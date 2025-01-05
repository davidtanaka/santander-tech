const http = require('http');

const server = http.createServer((request, response) => {
    const { url } = request;
    const sports = ['soccer', 'volley', 'basketball'];

    if (url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Hello, world! from node');
    } else if (url === '/api/sports') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(sports)); // Corrigido para enviar o array como JSON
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Page not found');
    }

    response.statusCode = 404;
    response.write('Página não encontrada')
});

server.listen(3000, 'localhost', () => {
    console.log('Server running on http://localhost:3000');
});
