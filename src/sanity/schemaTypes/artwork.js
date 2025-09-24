export default {
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'year', type: 'string', title: 'Year' },
    { name: 'technique', type: 'string', title: 'Technique' },
    { name: 'dimensions', type: 'string', title: 'Dimensions' },
    { name: 'about', type: 'text', title: 'About' },
    { name: 'image', type: 'image', title: 'Artwork Image' },
  ],
}
