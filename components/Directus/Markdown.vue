<script setup>
  import MarkdownIt from 'markdown-it';
  import MarkdownItBracketedSpans from 'markdown-it-bracketed-spans';
  import MarkdownItAttrs from 'markdown-it-attrs';

  const props = defineProps({
    md: {
      type: String,
      required: true
    }
  });

  const mdi = new MarkdownIt({
    html: true,
    xhtmlOut: true
  });
  mdi.use(MarkdownItBracketedSpans);
  mdi.use(MarkdownItAttrs);
  
  /**
   * Render the markdown as HTML
   * and replace img tags with DirectusImg tags
   */
  const html = computed(() => {
    let html = mdi.render(props.md);
    let re = new RegExp('<img +src=[\'"].*/assets/([a-f0-9\-]+)[\'"](.*) />', 'g');
    html = html.replace(re, "<DirectusImg hash='\$1' \$2 />");
    return html;
  });
</script>

<template>
  <div class="inline" v-if="md" v-html="html"></div>
</template>