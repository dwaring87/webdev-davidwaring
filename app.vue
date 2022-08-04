<script setup lang="ts">
  const BASE_TITLE: string = "David Waring";
  useHead({
    titleTemplate: function(title: string) {
      return title.includes(BASE_TITLE) ? title : title ? `${BASE_TITLE} - ${title}` : BASE_TITLE;
    },
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
      { name: 'description', content: 'David Waring - software development and hiking trail maps' }
    ]
  });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
