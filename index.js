// console.log('hola mundo');
// node index.js

/* arguments */
// let names = process.argv[2];
// console.log(`Hello ${names}`);
// node index.js Gustavo


/* input data */
/* const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is your name?', (name)=>{
    console.log(`Hello ${name}`);
    rl.close();
}); */


/* add - read - copy */
const readline = require('readline');
const fs =  require('fs');
const { pipeline } = require('stream');
const file = 'demo-nodejs.txt';

const method = process.argv[2];
switch(method){
    case 'add': 
        // add();
        addStream();
        break;
    case 'read': 
        // read();
        readStream();
        break;  
    case 'copy': 
        // copy();
        copyPipeline();
        break;
    default: 
        console.log('Invalid input');
}

async function add(){
    let message = await getInput('Add here your message : ');
    fs.writeFileSync(file, message + '\n', { flag:'a+' }); 
}

async function addStream(){
    let message = await getInput('Add here your message : ');
    let ws = fs.createWriteStream(file, { flags : 'a' });

    ws.write(message + '\n');
    ws.end();
}

async function copy(){
    let dataToCopy = fs.readFileSync(file, { encoding:'utf-8' });
    let fileNameCopy = await getInput('Enter file name to copy : ');
    fs.writeFileSync(fileNameCopy, dataToCopy, {});
}

async function copyPipeline(){
    let fileNameCopy = await getInput('Enter file name to copy : ');
    let rs = fs.createReadStream(file, { encoding:'utf-8' } );
    let ws = fs.createWriteStream(fileNameCopy);

    pipeline(rs,ws, (err)=>{
        if(err) console.log(err);
        else console.log('File was copied successful!');
    })
}

function read(){
    let data = fs.readFileSync(file, { encoding:'utf-8' });
    console.log(data); 
}

async function readStream(){
    let fn = await getInput('Enter file name to read : ');
    let rs = fs.createReadStream(fn, { encoding:'utf-8' } );

    rs.on('data', console.log);

    rs.on('end', ()=>{
        rs.close();
    })
}

function getInput(instruction){
    const rl = readline.createInterface({
        input: process.stdin,
        output:process.stdout
    });

    return new Promise((res, rej)=>{
        rl.question(instruction, (message)=>{
            res(message);
            rl.close();
        });
    });
}

