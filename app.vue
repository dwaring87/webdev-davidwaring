<script setup lang="ts">
  const BASE_TITLE: string = "David Waring";
  useHead({
    titleTemplate: function(title: string) {
      return title && title.includes(BASE_TITLE) ? title : title ? `${BASE_TITLE} - ${title}` : BASE_TITLE;
    },
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'David Waring - sofware development and hiking trail map design.  Developer of Right Track, a commuter train app for Metro North and the Long Island Rail Road', hid: 'description' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'msapplication-TileColor', content: '#2d89ef' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=3' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png?v=3' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png?v=3' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png?v=3' },
      { rel: 'manifest', href: '/site.webmanifest?v=3' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg?v=3', color: '#036aa1' }
    ]
  });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
