export default {
    name: 'exhibition',
    title: 'Exhibition',
    type: 'document',
    fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'date', type: 'datetime', title: 'Date' },
        { name: 'description', type: 'text', title: 'Description' },
        { name: 'image', type: 'image', title: 'Exhibition Image' }
    ]
}