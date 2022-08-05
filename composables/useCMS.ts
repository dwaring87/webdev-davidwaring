/**
 * Get the tags stored in the database
 * @param addAbout Flag to manually add an 'about' tag
 * @returns Tags stored in the database
 */
export const useTags = async (addAbout: boolean): Promise<Tag[]> => {
  const { getItems } = useDirectusItems();
  const items: Tag[] = [];
  const tags: DirectusTag[] = await getItems({collection: 'tags'});
  tags.forEach((tag) => {
    items.push({
      id: tag.id,
      name: tag.name,
      path: `/${tag.code}/`
    });
  });
  if ( addAbout ) {
    items.push({
      id: "about",
      name: "About",
      path: "/about"
    });
  }
  return items;
}


/** 
 * Type of a Tag stored in the database 
 */
 type DirectusTag = {
  id: string | number,
  name: string,
  code: string
}

/**
 * Type of a Tag used in the website
 */
type Tag = {
  id: string | number,
  name: string,
  path: string
}