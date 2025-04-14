import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname,__filename);

const PORT = process.env.PORT;
const server = http.createServer(async (req,res) => {
    try{
        if(req.method === 'GET'){
            let filepath;
            if(req.url == '/' && req.method == 'GET'){
                filepath = path.join(__dirname,'public','index.html');
            }
            else if(req.url === '/about'){
                filepath = path.join(__dirname,'public','about.html');
            }
            else{
                throw new Error('Not Found');
            }
            const data = await fs.readFile(filepath)
            res.writeHead(200,{'Content-type':'text/html'})
            res.write(data);
        }
        else{
            throw new Error('Not allowed');
        }
    }
    catch(err){
        res.writeHead(500,{'Content-type':'text/html'});
        res.write('Server Error');
        
    }
    
    res.end();
})

server.listen(PORT, ()=>{
    console.log(`port is running on ${PORT}`)
})