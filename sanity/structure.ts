import type { StructureResolver } from 'sanity/structure'
import { PackageIcon, ShoppingBag, Tag } from 'lucide-react'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Products')
        .icon(ShoppingBag)
        .child(S.documentTypeList('product').title('Products')),
      S.listItem()
        .title('Categories')
        .icon(Tag)
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Collections')
        .icon(PackageIcon)
        .child(S.documentTypeList('collection').title('Collections')),
      ...S.documentTypeListItems().filter(
        (listItem) => !['product', 'category', 'collection'].includes(listItem.getId() ?? ''),
      ),
    ])