import app from './src/app'

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running at 'http://localhost:${PORT}'`)
})
