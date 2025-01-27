import {createBlock, findBlock, findBlocks, verifBlocks} from "./blockchainStorage.js";
import {json} from "node:stream/consumers"

export async function liste(req, res, url) {
    console.log("Récupération des blocs...");
    return findBlocks()
}

export async function create(req, res) {
    console.log("Création d'un nouveau bloc...");
    return createBlock(await json(req))
}

export async function find(req, res) {
    console.log("Recherche d'un bloc...");
    return findBlock(await json(req))
}

export async function verif(req, res){
    console.log("Vérification de l'intégrité de la blockchain...");
    return verifBlocks()
}