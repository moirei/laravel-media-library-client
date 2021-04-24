export default [
  {
    field: 'location',
    type: 'string',
    description: 'The location to upload the file',
  },
  {
    field: 'name',
    type: 'string',
    description: 'The upload file\'s resource name. Defaults to the filename',
  },
  {
    field: 'description',
    type: 'string',
    description: 'The file\'s resource description',
  },
  {
    field: 'private',
    type: 'boolean',
    description: 'The file privacy. Defaults to its folder or backend config',
  },
  {
    field: 'disk',
    type: 'string',
    description: 'The file stroage disk',
  },
]