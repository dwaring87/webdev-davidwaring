<script setup>
  import RiAndroid from '~icons/ri/android-fill';
  import RiGithub from '~icons/ri/github-fill';
  import RiDownload from '~icons/ri/download-fill';
  import RiMap from '~icons/ri/map-2-fill';
  import RiExternalLink from '~icons/ri/external-link-fill';

  defineProps({
    link: {
      type: Object,
      required: true
    }
  });
</script>

<template>
  <a :href="link.url" target="_blank" class="btn btn-primary-outline">
    <span class="flex flex-row w-full">
      <span class="min-w-[32px] my-auto">
        <RiAndroid v-if="link.type === 'app-android'" />
        <RiGithub v-else-if="link.type === 'github'" />
        <RiDownload v-else-if="link.type === 'download'" />
        <RiMap v-else-if="link.type === 'map'" />
        <RiExternalLink v-else />        
      </span>
      <span class="flex-grow my-auto">{{ link.label }}</span>
    </span>
  </a>
</template>