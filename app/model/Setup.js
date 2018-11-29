module.exports = () => ({
  identity: 'Setup',
  tableName: 'Setup',
  datastore: 'default',
  schema: true,
  primaryKey: 'id',
  attributes: {
    id: {
      type: 'string',
      columnName: '_id',
    },
    completed: {
      type: 'boolean',
    },
  },
});
