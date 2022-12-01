import { Request, Response } from 'express'
import fetch from 'node-fetch'

const urlApi = 'http://localhost:6789'
export async function handler(req: Request, res: Response) {
  const id = parseInt(req.params['id'])

  const [fetchedBanks, fetchedCountries, fetchedCurrencies] = await Promise.all(
    [
      fetchData(`${urlApi}/banks`),
      fetchData(`${urlApi}/countries`),
      fetchData(`${urlApi}/currencies`),
    ],
  )

  const foundBank = fetchedBanks.find((item: any) => item.id === id)
  if (!foundBank) {
    return res.status(404).send({
      message: `Bank #${id} not found`,
    })
  }

  const currencyNames = foundBank.currencies.map(
    (currencyId: number) =>
      fetchedCurrencies.find((item: any) => item.id === currencyId).name,
  )
  const countryNames = foundBank.countries.map(
    (countryId: number) =>
      fetchedCountries.find((item: any) => item.id === countryId).name,
  )

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
