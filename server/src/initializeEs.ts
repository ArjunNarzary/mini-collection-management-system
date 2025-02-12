import { createUserIndex } from "./models/user"

async function initializeES() {
  await createUserIndex()
}

export default initializeES
