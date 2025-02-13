import esClient from "../config/elasticsearch"

export const createCustomerIndex = async () => {
  const indexExist = await esClient.indices.exists({ index: "customers" })

  if (!indexExist) {
    await esClient.indices.create({
      index: "customers",
      body: {
        mappings: {
          properties: {
            name: { type: "text" },
            email: { type: "keyword" },
            address_line_1: { type: "text" },
            address_line_2: { type: "text" },
            city: { type: "keyword" },
            state: { type: "keyword" },
            country: { type: "keyword" },
            contact_number: { type: "keyword" },
            outstading_payment_amount: { type: "float" },
            payment_due_date: { type: "date" },
            payment_status: { type: "keyword" },
            agent: {
              properties: {
                _id: { type: "keyword" },
                name: { type: "text" },
              },
            },
            createdAt: { type: "date" },
            updatedAt: { type: "date" },
          },
        },
      },
    })
  }
}
