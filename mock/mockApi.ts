import express from 'express'

import banks from './data/banks'
import countries from './data/countries'
import currencies from './data/currencies'

const app = express()


app.get('/', (_req: any, res: any) => {
  res.send('it works!!')
})

app.get('/banks', (_req: any, res: any) => {
  res.json(banks)
})

app.get('/currencies', (_req: any, res: any) => {
  res.json(currencies)
})

app.get('/countries', (_req: any, res: any) => {
  res.json(countries)
})

app.listen(6789)
