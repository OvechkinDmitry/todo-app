const PORT = 4000;
const dbPath = './db.json';

const { existsSync, readFileSync, writeFileSync } = require('fs');
const { parse } = require('url');
const createServer = require('http').createServer;

const readDb = () => {
    const data = existsSync(dbPath) ? readFileSync(dbPath) : '[]';
    return JSON.parse(data);
}

const writeDb = (data) => {
    writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

createServer(async (req, res) => {
    const { method, url } = req;
    const { pathname, query } = parse(url, true);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
        res.end();
        return;
    }

    if (method === 'GET' && pathname === '/') {
        const data = readDb();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
        return;
    }

    if (method === 'POST' && pathname === '/') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const data = readDb();
            const newRecord = JSON.parse(body);
            data.push(newRecord);
            writeDb(data);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(newRecord));
        });
        return;
    }

    if (method === 'DELETE' && pathname === '/data') {
        writeDb([]);
        res.end();
        return;
    }

    if (method === 'DELETE' && pathname === '/') {
        const id = Number(query.id);
        const data = readDb();
        writeDb(data.filter(el => el.id !== id));
        res.end();
        return;
    }

    if (method === 'PATCH' && pathname === '/') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const data = readDb();
            const {id} = JSON.parse(body);
            writeDb(data.map(el => {
                if(el.id === id)
                    return {...el, done: !el.done}
                return el
            }));
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(id));
        });
        return;
    }

    res.statusCode = 404;
    res.end('404');
}).listen(PORT);
