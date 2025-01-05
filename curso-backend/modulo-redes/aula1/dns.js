const dns = require('node:dns');

async function bootstrap() {
    const searchedUrl = 'www.google.com';

    try {
        console.time('Pesquisando URL por DNS padrão');
        const addresses = await dns.promises.resolve4(searchedUrl);
        console.timeEnd('Pesquisando URL por DNS padrão');
        console.log('Endereços encontrados (DNS padrão):', addresses);

        const nameServers = await dns.promises.resolveNs(searchedUrl);
        console.log('Name Servers encontrados:', nameServers);

        const ipNs = await dns.promises.resolve4(nameServers[1]);

        const resolver = new dns.Resolver();
        resolver.setServers(ipNs);

        console.time('Pesquisando URL por DNS específico');
        const addressesWithResolver = await new Promise((resolve, reject) => {
            resolver.resolve4(searchedUrl, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        console.timeEnd('Pesquisando URL por DNS específico');
        console.log('Endereços encontrados (DNS específico):', addressesWithResolver);
    } catch (error) {
        console.error('Erro ao resolver DNS:', error.message);
    }
}

bootstrap();
