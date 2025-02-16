import "dotenv/config"
import app from "./app"
import initializeES from "./initializeEs"

const PORT = process.env.PORT || 8000

initializeES()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(console.error)
