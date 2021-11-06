const {WebSocket} = require("ws");
const readline = require("readline");



var myArgs = process.argv.slice(2)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const readsend = ()=>{
    var d = new Date();
    rl.question(d.getTime().toString()+" ["+myArgs[1]+"-->]: ",function (answer) {
        client.send(answer);
        readsend();
    });
}

const client = new WebSocket("ws:"+myArgs[0]+":7071");
client.on('open', ()=>{console.log("Connected to NagyGép!")
    client.send(myArgs[1])
readsend()
});
client.on('close',()=>{console.log("\nDisconnecting from NagyGép!")});
client.on('message',(data)=>{
    var d = new Date();
    process.stdout.write("\r"+d.getTime().toString()+" "+data.toString()+"                                 \n");
    var d = new Date();
    process.stdout.write(d.getTime().toString()+" ["+myArgs[1]+"-->]: ");});



