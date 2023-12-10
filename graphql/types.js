module.exports = `
type User {
  id: ID!
  name: String
  username: String
  email: String
  number: String
  contact_nubmer: String
  blood_group: String
  last_blood_donate: String
  next_blood_donate: String
  profile: String
  cover: String
  password: String
  role: String
  status: Int
  verify: Int
  createdAt: String
  updatedAt: String
  photo: String
}

type Chat {
  id: ID!
  chatName: String
  creator: String
      isGroupChat: Int
      latestMessage: String
      groupAdmin: String
      createdAt: String
      updatedAt: String
      users: String
      user: [User]
}

type Query {
  getUsers: [User]
  getUser(id: ID!): User
  getAllChat: [Chat]
}

type Mutation {
  postUser(name: String!, username: String!): User
}
`;
