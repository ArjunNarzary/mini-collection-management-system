import { createCustomerIndex, createUserIndex } from "./models"

async function initializeES() {
  await createUserIndex()
  await createCustomerIndex()
}

export default initializeES
