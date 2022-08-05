/**
 * Get the tags stored in the database
 * @param addAbout Flag to manually add an 'about' tag
 * @returns Tags stored in the database
 */
export const useTags = async (addAbout?: boolean): Promise<Tag[]> => {
  const { getItems } = useDirectusItems();
  const items: Tag[] = [];
  const tags: Tag[] = await getItems({ collection: 'tags' });
  tags.forEach((tag) => {
    items.push({
      id: tag.id,
      code: tag.code,
      name: tag.name,
      path: `/${tag.code}/`
    });
  });
  if ( addAbout ) {
    items.push({
      id: "about",
      code: "about",
      name: "About",
      path: "/about"
    });
  }
  return items;
}

/**
 * Get the specified tag stored in the database
 * @param code Tag code to filter by
 * @returns Specified tag stored in the database
 */
export const useTag = async (code: string): Promise<Tag> => {
  const { getItems } = useDirectusItems();
  const tags: Tag[] = await getItems({
    collection: 'tags',
    params: {
      filter: { code: code }
    }
  });
  const item: Tag = {
    id: tags[0].id,
    code: tags[0].code,
    name: tags[0].name,
    path: `/${tags[0].code}/`
  };
  return item;
}

/**
 * Get the metadata for the pages stored in the database
 * @returns Page Metadata for all of the pages
 */
export const usePages = async (): Promise<Page[]> => {
  const { getItems } = useDirectusItems();
  const pages: Page[] = await getItems({
    collection: 'pages', 
    params: {
      fields: ['id', 'title', 'description', 'slug', 'tag.code', 'image', 'links']
    }
  });
  return pages;
}

/**
 * Get the metadata for the pages stored in the database, 
 * associated with the specified Tag
 * @param tag Tag Code
 * @returns Page Metadata for pages associated with the specified Tag
 */
export const usePagesByTag = async (tag: string): Promise<Page[]> => {
  // TODO: This would be better if the query could filter by the tag code
  // instead of pulling out the matches from all of the pages, but the 
  // nested filter doesn't seem to be working....
  const pages = await usePages();
  let rtn: Page[] = [];
  pages.forEach((page) => {
    if ( page.tag.code === tag ) {
      rtn.push(page);
    }
  });
  return rtn;
}

/**
 * Get the metadata for the requested page stored in the database
 * @param slug Page Slug
 * @returns Page Metadata for the requested page
 */
export const usePage = async (slug: string): Promise<Page> => {
  const { getItems } = useDirectusItems();
  const pages: Page[] = await getItems({
    collection: 'pages',
    params: {
      fields: ['id', 'title', 'description', 'slug', 'tag.code', 'image', 'links'],
      filter: { slug: slug }
    }
  });
  return pages[0];
}

/**
 * Get the key/value pairs of the requested properties
 * @param keys The array of keys to get (return all properties, if not defined)
 * @returns The value for a single property or an object of property key/values
 */
export const useProperties = async (keys?: string[]): Promise<string|Properties> => {
  const { getItems } = useDirectusItems();
  const properties: Property[] = await getItems({
    collection: 'properties',
    params: {
      fields: ['key', 'value'],
      filter: {
        key: keys ? { "_in": keys } : undefined
      }
    }
  });

  if ( properties ) {
    let rtn: Properties = {};
    properties.forEach((prop) => {
      rtn[prop.key] = prop.value;
    });
    return rtn;
  }
  else {
    return {};
  }
}

/**
 * Get about information from the Database
 * @returns About information
 */
export const useAbout = async (): Promise<About> => {
  const { getSingletonItem } = useDirectusItems();
  return await getSingletonItem({ 
    collection: 'about',
    params: {
      fields: ['bio']
    }
  });
}

/**
 * Get resume information from the Database
 * @returns Resume information
 */
export const useResume = async (): Promise<Resume> => {
  const { getSingletonItem } = useDirectusItems();
  return await getSingletonItem({
    collection: 'resume',
    params: {
      fields: ['content']
    }
  });
}

/**
 * Type of a Tag used in the website
 */
type Tag = {
  id: string | number,
  code: string,
  name: string,
  path?: string
}

/**
 * Type of a Page (metadata)
 */
type Page = {
  id: string | number,
  title: string,
  description: string,
  slug: string,
  tag: {
    code: string
  },
  image: string,
  links: Object[]
}

/**
 * Type of a key/value property from the database
 */
type Property = {
  key: string,
  value: string
}

/**
 * Type of a collection of properties from the database
 */
type Properties = {
  [key: string]: string | undefined
}

/**
 * Type of the About info
 */
type About = {
  bio: string
}

/**
 * Type of Resume info
 */
type Resume = {
  content: string
}