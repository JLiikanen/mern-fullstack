import http from 'http';

const port = 8000;

// Middleware
const mongodbauth = 'y7roLWEMEot1PJPi';

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} ${res.statusCode}`);
    next(); // Call the next middleware
};




const serveri = http.createServer(async (req, res) => {
    logger(req, res, () => { 
    try {   
        if (req.url === '/') {
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.end('<h1>Hello World</h1>');
        } else if (req.url === '/mongodb') {
            const { MongoClient } = await import('mongodb');
            const uri = "mongodb://localhost:27017";
            const client = new MongoClient(uri);
            
            try {
                await client.connect();
                const database = client.db("test");
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Connected to MongoDB successfully!');
            } catch (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Failed to connect to MongoDB');
            } finally {
                await client.close();
            }
        } else
            throw new Error('Page not found');
            res.writeHead(404, { 'Content-Type': 'text/html' });
            req.on
    } catch (error) {
        console.log(error);
    }


    });
});

serveri.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
}
);

