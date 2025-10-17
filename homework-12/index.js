// 2) შექმენით სერვერი რომელიც უპასუხებს შემდეგი ტიპის რექუესთებს: 
// GET  /about დააბრუნეთ რაიმე ტიპის ინფორმაცია მაგალითად, სახელი, გვარი, ჰობი და ა.შ

// GET /players უნდა დააბრუნოს მაისივი ფეხბურთელების რომელსაც წაიკითხავთ players.json დან fs მოდულით

// GET /players?nation=georgia უდნა დააბრუნოს მხოლოდ ქართველი ფეხბურთელები 

// GET /players?nation=germany მხოლოდ გერმანელი ფეხბურტელები და ა.შ

// POST /players უნდა გაატანოთ ფეხბურთელის ყველა მონაცემები ბექენდში დაადოთ ვალიდაცია და ჩაწეროთ players.json ში.

// DELETE /players/1 წაშლის კონკრეტულ ფეღბურთელს და განაახლებს players.json-ს

const http = require("http");
const url = require("url");
const fs = require("fs/promises");
const { parse } = require("path");

const server = http.createServer(async (req,res)=>{
    const method = req.method;
    const parsedUrl = await url.parse(req.url);
    if (parsedUrl.pathname === "/favicon.ico") {
        res.end("hello world");
        return;
    };
    const pathArr = parsedUrl.pathname.split("/");
    const query = parsedUrl.query?.split("&") || [];
    const queryObj = Object.fromEntries(query.map((item)=>item.toLowerCase().split("=")));
    if (method === "GET") {
        if (pathArr[1] === "about") {
            const user = {
                name : "irakli",
                surname : "sulaqvelidze",
                hobbie: "football"
            };
            res.writeHead(200, {"content-type": "application/json"});
            return res.end(JSON.stringify(user));
        }else if(pathArr[1] === "players"){
            if (queryObj["nation"]) {
                const players = await fs.readFile("./players.json","utf-8");
                const parsedPlayers = JSON.parse(players);
                const filteredPlayers = parsedPlayers.filter((item)=>{
                    return (item["nation"].toLowerCase() === queryObj["nation"]);
                });
                const data = await JSON.stringify(filteredPlayers.length ? filteredPlayers : {message : "There is no players with this nationality"});
                res.writeHead(200, {"content-type": "application/json"});
                return res.end(data);
            }else{
                const players = await fs.readFile("./players.json","utf-8");
                res.writeHead(200, {"content-type": "application/json"});
                return res.end(players);
            }

        }else{
            return res.end("hello world");
        }
    }else if (method === "POST" && pathArr[1] === "players") {
            let body = "";
            req.on("data", (chunk)=>{
                body += chunk.toString();
            });
            req.on("end", async ()=>{
                const parsedBody = JSON.parse(body);
                const message = {};
                if (!parsedBody.firstname) {
                    message["firstname"] = "input correct firstname";
                }
                if (!parsedBody.lastname) {
                    message["lastname"] = "input correct lastname";
                }
                if (!parsedBody.nation || parsedBody.nation.length < 3) {
                    message["nation"] = "input correct nationality";
                }
                if (message.hasOwnProperty("firstname") || message.hasOwnProperty("lastname") || message.hasOwnProperty("nation")) {
                    res.writeHead(400, {"content-type": "application/json"});
                    return res.end(await JSON.stringify(message));
                }
                const players = await fs.readFile("./players.json", "utf-8");
                const parsedPlayers = JSON.parse(players);
                let playerId = 0;
                while (parsedPlayers.find((item)=>item["id"] === playerId)) {
                    playerId++;
                }  
                const newPlayer = {
                    id : playerId,
                    firstname : parsedBody.firstname,
                    lastname : parsedBody.lastname,
                    nation : parsedBody.nation
                }
                parsedPlayers.push(newPlayer);
                await fs.writeFile("./players.json", JSON.stringify(parsedPlayers));
                res.writeHead(201, {"content-type": "application/json"});
                return res.end(await JSON.stringify({message : "player added succesfuly"}));
            });
    }else if (method === "DELETE" && pathArr[1] === "players") {
        const playerId = Number(pathArr[2]);
        const players = await fs.readFile("./players.json","utf-8");
        const parsedPlayers = JSON.parse(players);
        const filteredPlayers = parsedPlayers.filter((item)=>{
            return (item["id"] !== playerId);
        });
        const player = parsedPlayers.find((item)=>item["id"] === playerId);
        await fs.writeFile("./players.json", JSON.stringify(filteredPlayers));
        const response = await JSON.stringify({message: "Player deleted",
                                               player : player})
        res.writeHead(200, {"content-type": "application/json"});
        return res.end(player ? response : JSON.stringify({"message":"Player not found"}));

    }else{
        return res.end("hello world");
    }
});

server.listen(3000, ()=>{
    console.log("server is running on port 3000")
})