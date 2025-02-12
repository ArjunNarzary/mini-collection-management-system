import { Client } from "@elastic/elasticsearch"
import fs from "fs"

const esClient = new Client({
  node: process.env.ELASTIC_SEARCH_URL,
  auth: {
    username: process.env.ELASTIC_SEARCH_USERNAME || "elastic",
    password: process.env.ELASTIC_SEARCH_PASSWORD || "",
  },
  caFingerprint: process.env.ELASTIC_SEARCH_CERT_KEY,
  tls: {
    rejectUnauthorized: false,
  },
})

export default esClient
