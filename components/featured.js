export default {
  name: 'featured',
  title: 'Featured Dishes',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Feaatured Category name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      type: "array",
      title: "Restaurants",
      of: [{type: "reference", to: [{type: "restaurant"}] }],
    }
    
  ],
  
}
