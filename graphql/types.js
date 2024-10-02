module.exports = `

scalar Date
scalar DateTime

type User {
  id: Int
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
      id: Int
      chatName: String
      creator: String
      isGroupChat: Int
      latestMessage: Int
      groupAdmin: String
      createdAt: String
      updatedAt: String
      users: String
      user: [User]
      message: Message
}

type Message {
    id: Int
    sender: Int
    content: String
    chat: Int,
    readBy: String
    createdAt: Date
    updatedAt: DateTime
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
