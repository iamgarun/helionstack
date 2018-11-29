module.exports = () => ({
  identity: 'User',
  tableName: 'User',
  datastore: 'default',
  schema: true,
  primaryKey: 'id',
  dataEncryptionKeys: {
    default: 'C5QAkA46HD9pK0m7293V2CzEVlJeSUXgwmxBAQVj+xU=',
  },
  attributes: {
    id: {
      type: 'string',
      columnName: '_id',
    },
    authorizations: {
      collection: 'Authorization',
      via: 'user',
    },
  },
});
