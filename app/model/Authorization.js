module.exports = () => ({
  identity: 'Authorization',
  tableName: 'Authorization',
  datastore: 'default',
  schema: true,
  primaryKey: 'id',
  dataEncryptionKeys: {
    default: 'tVdQbq2JptoPp4oXGT94kKqF72iV0VKY/cnp7SjL7Ik=',
  },
  attributes: {
    id: {
      type: 'string',
      columnName: '_id',
    },
    provider: {
      type: 'string',
      required: true,
    },
    userId: {
      type: 'string',
      required: true,
    },
    username: {
      type: 'string',
      required: true,
    },
    profilePic: {
      type: 'string',
    },
    accessToken: {
      type: 'string',
      required: true,
    },
    displayName: {
      type: 'string',
      required: true,
    },
    profile: {
      type: 'json',
    },
    user: {
      collection: 'User',
    },
  },
});
