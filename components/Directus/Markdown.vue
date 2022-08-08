<script>
  import { DirectusImg, NuxtLink } from '#components';
  import MarkdownIt from 'markdown-it';
  import MarkdownItBracketedSpans from 'markdown-it-bracketed-spans';
  import MarkdownItAttrs from 'markdown-it-attrs';

  export default defineNuxtComponent({
    props: {
      md: {
        type: String,
        required: true
      }
    },

    render() {

      // Setup the Markdown Renderer
      const mdi = new MarkdownIt({
        html: true,
        xhtmlOut: true
      });
      mdi.use(MarkdownItBracketedSpans);
      mdi.use(MarkdownItAttrs);

      // Render the markdown into HTML
      // Replace image tags with DirctusImg tags
      let rendered = mdi.render(this.md);
      let re = new RegExp('<img +src=[\'"].*/assets/([a-f0-9\-]+)[\'"](.*) />', 'g');
      rendered = rendered.replace(re, "<DirectusImg hash='\$1' \$2 />");

      // Return the rendered html as the component template
      // Include any custom components to render
      return h({
        template: `<div class='directus-markdown'>${rendered}</div>`,
        components: {
          DirectusImg,
          NuxtLink
        }
      });

    }
  });
</script>