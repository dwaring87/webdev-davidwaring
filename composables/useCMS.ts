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
 * Get the metadata for the pages (or requested page) stored in the database
 * @param slug Slug of a single page to return
 * @returns Page Metadata for all of the pages or the requested page
 */
export const usePages = async (slug?: string): Promise<Page|Page[]> => {
  const { getItems } = useDirectusItems();
  const pages: Page[] = await getItems({
    collection: 'pages', 
    params: {
      fields: ['id', 'title', 'description', 'slug', 'tag.code'],
      filter: {
        slug: slug
      }
    }
  });
  return slug && pages && pages.length === 1 ? pages[0] : pages;
}

/**
 * Get the key/value pairs of the requested property or properties
 * @param key The key or array of keys to get 
 * @returns The value for a single property or an object of property key/values
 */
export const useProperties = async (key: string | string[] | undefined): Promise<string|Properties> => {
  let single = false;
  if ( typeof key === 'string' ) {
    key = [key];
    single = true;
  }

  const { getItems } = useDirectusItems();
  const properties: Property[] = await getItems({
    collection: 'properties',
    params: {
      fields: ['key', 'value'],
      filter: {
        key: key ? { "_in": key } : undefined
      }
    }
  });

  if ( properties ) {
    if ( single && properties.length === 1 ) {
      return properties[0].value;
    }
    else {
      let rtn: Properties = {};
      properties.forEach((prop) => {
        rtn[prop.key] = prop.value;
      });
      return rtn;
    }
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
  tag: string
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