import {createServer} from "node:http"
import {create, liste, find, verif} from "./blockchain.js";
import {NotFoundError} from "./errors.js";

createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const url = new URL(req.url, `http://${req.headers.host}`)
    const endpoint = `${req.method}:${url.pathname}`

    let results
    try {
        switch (endpoint) {
            case 'GET:/blockchain':
                results = await liste(req, res, url)
                break
            case 'POST:/blockchain':
                results = await create(req, res)
                break
            case 'GET:/blockchain/id':
                results = await find(req, res)
                break
            case 'GET:/blockchain/verify':
                results = await verif(req, res, url)
                break
            default:
                res.writeHead(404)
        }
        if (results) {
            res.write(JSON.stringify(results, null, 2))
        }
    } catch (error) {
        console.error("Erreur serveur :", error)
        res.writeHead(500)
    }
    res.end()
}).listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
});
