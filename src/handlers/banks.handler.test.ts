import supertest from 'supertest'
import app from '../app'

const request = supertest(app)
describe(`Testing endpoint: 'api/v1/banks/id'`, () => {
  it('Should return currency names and country names from Bank #0', async () => {
    const response = await request.get('/api/v1/banks/0')

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({
      id: 0,
      name: 'European bank',
      countries: ['Spain', 'Romania', 'Poland', 'Bulgaria'],
      currencies: ['EUR', 'RON', 'PLN'],
    })
  })

  it('Should return currency names and country names from Bank #1', async () => {
    const response = await request.get('/api/v1/banks/1')

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({
      id: 1,
      name: 'American bank',
      countries: ['United States', 'Mexico', 'Argentina'],
      currencies: ['USD', 'MXN', 'ARS'],
    })
  })

  it('Should return a "Not found" message', async () => {
    const response = await request.get('/api/v1/banks/2')

    expect(response.status).toBe(404)
    expect(response.body).toStrictEqual({
      message: 'Bank #2 not found',
    })
  })

  it('Should return a "#NaN not found" message', async () => {
    const response = await request.get('/api/v1/banks/thisBanksdoesntExists')

    expect(response.status).toBe(404)
    expect(response.body).toStrictEqual({
      message: 'Bank #NaN not found',
    })
  })
})
