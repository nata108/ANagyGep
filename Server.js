const {WebSocketServer}=require("ws");

var myArgs = process.argv.slice(2)

const wss = new WebSocketServer({port: 7071, ip: myArgs[0]});
const router = new Map();


wss.on('connection', function connection(ws) {
    let gotname = false
    ws.on('message', function message(data) {
        let from = [...router.entries()]
            .filter(({1: v}) => v == ws)
            .map(([k]) => k);

        let pieces = data.toString().split(" ")
        let cimzett = pieces[0]
        if (!gotname) {
            router.set(cimzett, ws)
            gotname = true
            if(router.has(myArgs[1])){
                router.get(myArgs[1]).send("Name registered: "+cimzett)
            }
            console.log("Name registered: "+cimzett)
        } else {
            let names = cimzett.split(",")
            pieces.shift()
            let msg = pieces.join(" ")
            if (router.has(myArgs[1])) {
                router.get(myArgs[1]).send("[" + from + "-->" + cimzett + "]: " + msg)
            }
            console.log("[" + from + "-->" + cimzett + "]: " + msg);
            var sent = false
            for (let name of names) {
                if (router.has(name)) {
                    if(name != myArgs[1]) {
                        router.get(name).send("[" + from + "-->" + name + "]: " + msg);
                    }
                    sent = true;
                }
            }
            if (!sent) {
                ws.send("There was no valid target!")
            }
        }
    });

    ws.send('Requested connection active! Handheld terminal registered.');
});
