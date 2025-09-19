export default {
    name: 'artist',
    title: 'Artist',
    type: 'document',
    fields: [
        { name: 'name', type: 'string', title: 'Name', validation: Rule => Rule.required() },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
                source: 'name', // auto-generates slug from name
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        },
        { name: 'bio', type: 'text', title: 'Biography' },
        { name: 'portrait', type: 'image', title: 'Portrait' },
        {
            name: 'artworks',
            type: 'array',
            title: 'Artworks',
            of: [{ type: 'reference', to: [{ type: 'artwork' }] }],
        },
    ],
}
