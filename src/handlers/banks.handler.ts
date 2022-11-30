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
    //console.log(fetchedBanks)
    //console.log(fetchedCurrencies)
    //console.log(fetchedCountries)

    let foundBank = fetchedBanks.find((item) => item.id === id)
    if (!foundBank){
        return res.status(404).send({
            message: `Bank #${id} not found`
        })
    }
    //console.log(foundBank)

    let currenciesNames = foundBank.currencies.map((currencyId) => fetchedCurrencies.find((item) => item.id === currencyId).name)
    //console.log(currenciesNames)
    let countriesNames = foundBank.countries.map((countryId) => fetchedCountries.find((item) => item.id === countryId).name)
    //console.log(countriesNames)
    
    //console.log('Response sent.')
    return res.status(200).send({
        ...foundBank,
        countries: countriesNames,
        currencies: currenciesNames,
    })
}
async function fetchData(url:string){
    const response = await fetch(url)
    const data = response.json()
    return data
}
