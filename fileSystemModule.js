import fs from "fs";
import fsp from "fs/promises";

//readFile() - callback
fs.readFile('./test.txt','utf-8',(err,data)=>{
    if(err){throw new Error(err)}
    console.log(data);
})

//readFileSync() - synchronous version
const data = fs.readFileSync('./test.txt','utf-8')
console.log(data);

//readFile() = promise version
fsp.readFile('./test.txt','utf-8').
    then((data)=> console.log(data))
    .catch((err)=>console.log(err));


//readFile() - async
const readfile = async ()=>{
    try{
        const data = await fsp.readFile('./test.txt','utf-8');
        console.log(data)
    }
    catch(err){
        console.log(err);
    }
}

//writefile()
const writeFile = async ()=>{
    try{
        await fsp.writeFile('./test.txt','Writing');

    }
    catch(err){

    }
}
const appendfile = async ()=>{
    try{await fsp.appendFile('./test.txt','\nAppend');}
    catch(err){}
}

writeFile();
appendfile();
readfile();