# Back-End Challenge

## Instructions

### 1. Clone this repository in your local environment and run 'docker-compose up'

This will start a mock api with 3 endpoints, where each one retrieves a list
of entities.

#### 1. Retrieve banks

Endpoint: http://localhost:6789/banks

Bank interface:
```javascript
{
  id: number
  name: string
  countries: number[]
  currencies: number[]
}
```

The numbers in `countries` represent the `id`s of the countries where the bank
operates, while the numbers in `currencies` represent the `id`s of the curriencies
the bank operates with.

#### 2. Retrieve countries

Endpoint: http://localhost:6789/countries

#### 3. Retrieve currencies

Endpoint: http://localhost:6789/currencies

### 2. Code an API with the following requirements:

1. Implement an endpoint in http://localhost:8080/bank/:bank-id, where `:bank-id` represents the `id` of the bank, which returns the list of countries and currencies with `name`s instead of `id`s.
2. Implement a unit test for that endpoint
