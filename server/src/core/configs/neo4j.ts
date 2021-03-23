const URL = process.env.NEO4J_URL ? process.env.NEO4J_URL : 'localhost:7687'
const USERNAME = process.env.NEO4J_USERNAME
  ? process.env.NEO4J_USERNAME
  : 'neo4j'
const PASSWORD = process.env.NEO4J_PASSWORD
  ? process.env.NEO4J_PASSWORD
  : 'neo4j'

export { URL, USERNAME, PASSWORD }
