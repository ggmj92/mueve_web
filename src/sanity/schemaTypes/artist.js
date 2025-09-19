export default {
    name: 'artist',
    title: 'Artist',
    type: 'document',
    fields: [
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'bio', type: 'text', title: 'Biography' },
        { name: 'portrait', type: 'image', title: 'Portrait' },
        {
            name: 'artworks',
            type: 'array',
            title: 'Artworks',
            of: [{ type: 'reference', to: [{ type: 'artwork' }] }]
        }
    ]
}