export default {
  name: 'exhibition',
  title: 'Exhibition',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title', // auto-generates from title
        maxLength: 96,
      },
    },
    { name: 'date', type: 'datetime', title: 'Date' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'image', type: 'image', title: 'Exhibition Image' },
  ],
}
