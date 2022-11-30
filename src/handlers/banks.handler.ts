import { Request, Response } from 'express'
import fetch from 'node-fetch'

const urlApi = 'http://localhost:6789'
export async function handler(req: Request, res: Response) {
    //console.log(`Request received from '${req.originalUrl}'.`)
    const id = parseInt(req.params['id'])

    let fetchedBanks, fetchedCountries, fetchedCurrencies
    await Promise.all([
        fetchData(`${urlApi}/banks`),
        fetchData(`${urlApi}/countries`),
        fetchData(`${urlApi}/currencies`)
    ]).then(values => {
        fetchedBanks = values[0];
        fetchedCountries = values[1];
        fetchedCurrencies = values[2];
    })

    let bank:any
    for(let fetchedBank of fetchedBanks){
        if(fetchedBank.id === id){
            bank = fetchedBank
            break
        }
    }
    if (!bank){
        return res.status(404).send({
            message: `Bank #${id} not found`
        })
    }

    let bankCurrencies = getNamesListById(bank.currencies, fetchedCurrencies)
    let bankCountries = getNamesListById(bank.countries, fetchedCountries)

    //console.log('Response sent.')
    return res.status(200).send({
        bankCurrencies,
        bankCountries
    })
}
async function fetchData(url:string){
    const response = await fetch(url)
    const data = response.json()
    return data
}
function getNamesListById(what:number[], where:any[]){
    let found: string[] = []
    for(let id of what){
        const object = where.find(item => item.id === id)
        if(object){
          found.push(object.name)
        }
    }
  
    return found
}
