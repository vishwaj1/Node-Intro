import {createServer} from 'http'

const PORT = process.env.PORT;

const  users= [
    {id:1,name:'Vishwanth'},
    {id:2,name:'Vishwa'},
    {id:3,name:'Vish'},
    {id:4,name:'Vi'}
];

const logger = (req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
}

const jsonmiddleware = (req,res,next)=>{
    res.setHeader('Content-Type','application/json');
    next();
}


//Route Handler for post request
const createUserHandler = (req,res)=>{
    let body = '';
    //Listen for data
    req.on('data',(chunk)=>{
        body+=chunk.toString();
    });
    req.on('end',()=>{
        const newUser = JSON.parse(body);
        users.push(newUser);
        res.statusCode = 201;
        res.write(JSON.stringify(newUser));
        
    })
}


const getusersHandler = (req,res)=>{
    res.write(JSON.stringify(users));
}

const getuserbyIdHandler = (req,res)=>{
        const id = req.url.split('/')[3];
        const user = users.find((user)=>user.id==parseInt(id))
        if(user){
            res.write(JSON.stringify(user));
        }
        else{
            res.statusCode = 404;
            res.write(JSON.stringify({message:'User Not found'}));
        }
}

const notfoundHandler = (req,res)=>{
    res.statusCode = 404;
    res.write(JSON.stringify({message:'Route Not found'}));
}


const server = createServer((req,res)=>{
    logger(req,res,()=>{
        jsonmiddleware(req,res,()=>{
            if(req.url === '/api/users' && req.method==='GET'){
                getusersHandler(req,res);
            }
            else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method==='GET'){
                getuserbyIdHandler(req,res)
            }
            else if(req.url === '/api/users' && req.method=="POST"){
                createUserHandler(req,res);
            }
            else{
                notfoundHandler(req,res);
            }
            res.end();
        });

    });
    
});

server.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})