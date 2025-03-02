import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import category from './category'
import collection from './collection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, collection],
}