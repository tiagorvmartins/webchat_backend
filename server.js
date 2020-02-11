const http = require('http');
const port = 10000;


const users = [];


http.createServer(async function(req, res){

    let body = null;

    if(req.method === 'POST' || req.method === 'PUT'){
        body = await getPostData(req);
    }

    if(req.method === 'POST'){
        if(req.url === '/register'){

            const bodyParsed = JSON.parse(body);

            const user = { username: bodyParsed.username, password: bodyParsed.password };
            users.push(user);


            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({
                status: 'success',
                data: null
            }, null, 3));
        }


        if(req.url === '/login'){

            const bodyParsed = JSON.parse(body);

            const foundUser = users.find((user) => user.username === bodyParsed.username && user.password === bodyParsed.password);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({
                status: foundUser ? 'success' : 'error',
                data: null
            }, null, 3));
        }
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');    
    res.end();

}).listen(port, () => console.log(`Listening on port ${port}`));


function getPostData(req){
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
 
            req.on('end', () => {                
                resolve(body);
            });
        }
        catch (e) {
            reject(e);
        }
     });
}