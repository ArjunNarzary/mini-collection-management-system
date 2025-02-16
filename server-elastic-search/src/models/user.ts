import esClient from "../config/elasticsearch"

export const createUserIndex = async () => {
  const indexExist = await esClient.indices.exists({ index: "users" })

  if (!indexExist) {
    await esClient.indices.create({
      index: "users",
      body: {
        mappings: {
          properties: {
            name: { type: "text" },
            email: { type: "keyword" },
            password: { type: "text" },
            role: { type: "keyword" },
            createdAt: { type: "date" },
            updatedAt: { type: "date" },
          },
        },
      },
    })
  }
}
