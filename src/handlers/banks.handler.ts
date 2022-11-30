import { Request, Response } from 'express'
import fetch from 'node-fetch'

const urlApi = 'http://localhost:6789'
export async function handler(req: Request, res: Response) {
  const id = parseInt(req.params['id'])

  let [fetchedBanks, fetchedCountries, fetchedCurrencies] = await Promise.all([
    fetchData(`${urlApi}/banks`),
    fetchData(`${urlApi}/countries`),
    fetchData(`${urlApi}/currencies`),
  ])

  let foundBank = fetchedBanks.find((item: any) => item.id === id)
  if (!foundBank) {
    return res.status(404).send({
      message: `Bank #${id} not found`,
    })
  }

  let currencyNames = foundBank.currencies.map((currencyId) => {
    fetchedCurrencies.find((item: any) => item.id === currencyId).name
  })
  let countryNames = foundBank.countries.map((countryId) => {
    fetchedCountries.find((item: any) => item.id === countryId).name
  })

  return res.status(200).send({
    ...foundBank,
    countries: countryNames,
    currencies: currencyNames,
  })
}
async function fetchData(url: string) {
  const response = await fetch(url)
  const data = response.json()
  return data
}
