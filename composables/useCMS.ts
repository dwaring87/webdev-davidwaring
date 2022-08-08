import { DirectusThumbnailFit, DirectusThumbnailFormat } from "nuxt-directus/dist/runtime/types";

export const useCMS = () => {
  const { getItems, getSingletonItem } = useDirectusItems();
  const { getThumbnail } = useDirectusFiles();

  /**
   * Get the tags stored in the database and 
   * add the path to the index page for each tag
   * @param addAbout Flag to manually add an 'about' tag
   * @returns Tags stored in the database
   */
  const getTags = async (addAbout?: boolean): Promise<Tag[]> => {
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
  const getTag = async (code: string): Promise<Tag> => {
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
  const getPages = async (): Promise<Page[]> => {
    return await getItems({
      collection: 'pages', 
      params: {
        fields: ['id', 'title', 'description', 'slug', 'tag.code', 'image', 'links']
      }
    });
  }

  /**
   * Get all of the pages associted with the specified tag, or if not
   * specified, group the pages by tag code
   * @param tag Tag code to filter by
   * @returns 
   */
  const getPagesByTag = async (tag: string): Promise<Page[]|PagesByTag> => {
    let pages: Page[] = await getItems({
      collection: 'pages',
      params: {
        fields: ['id', 'title', 'description', 'slug', 'tag.code', 'image', 'links'],
        filter: { 
          tag: tag ? { code: tag } : undefined
        }
      }
    });

    if ( tag ) {
      return pages;
    }
    else {
      let rtn: PagesByTag = {};
      pages.forEach((page) => {
        if ( !rtn.hasOwnProperty(page.tag.code) ) rtn[page.tag.code] = [];
        rtn[page.tag.code].push(page);
      });
      return rtn;
    }
  }

  /**
   * Get the metadata for the requested page stored in the database
   * @param slug Page Slug
   * @returns Page Metadata for the requested page
   */
  const getPage = async (slug: string): Promise<Page> => {
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
  const getProperties = async (keys?: string[]): Promise<string|Properties> => {
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
  const getAbout = async (): Promise<About> => {
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
  const getResume = async (): Promise<Resume> => {
    return await getSingletonItem({
      collection: 'resume',
      params: {
        fields: ['content']
      }
    });
  }

  /**
   * Get the information of named Images from the Database
   * @param key name/key of the image
   * @returns 
   */
  const getImage = async (key: string): Promise<Image> => {
    let images: Image[] = await getItems({
      collection: 'images',
      params: {
        fields: ['image', 'key'],
        filter: { key: key }
      }
    });
    return images[0];
  }

  /**
   * Get a URL to an image with the specified properties from the Database
   * @param hash Image Hash / File ID
   * @param props Image Properties
   * @returns URL to the image
   */
  const getImageURL = (hash: string, props?: ImageProperties ): string => {
    return getThumbnail(hash, {
      width: props?.width,
      height: props?.height,
      fit: props?.fit,
      format: props?.format,
      quality: props?.quality
    });
  }

  return {
    getTags,
    getTag,
    getPages,
    getPagesByTag,
    getPage,
    getProperties,
    getAbout,
    getResume,
    getImage,
    getImageURL
  }

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
 * Collection of Pages grouped by Tag code
 */
type PagesByTag = {
  [key: string]: Page[]
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

/**
 * Type of a named Image
 */
type Image = { 
  key: string,
  fileId: string
}

/**
 * Properties of an Image for generating a URL
 */
type ImageProperties = {
  width?: number,
  height?: number,
  fit?: DirectusThumbnailFit,
  format?: DirectusThumbnailFormat,
  quality?: number
}