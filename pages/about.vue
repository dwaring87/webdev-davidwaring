<script setup>
  import RiMapPin from '~icons/ri/map-pin-line';
  import RiInstagram from '~icons/ri/instagram-line';
  import RiGithub from '~icons/ri/github-line';
  import RiLink from '~icons/ri/link';
  import RiTrain from '~icons/ri/train-line';
  import RiMail from '~icons/ri/mail-line';
  import RiFileList2 from '~icons/ri/file-list-2-line';

  const about = await useAbout();
  const properties = await useProperties();

  useHead({
    title: 'About'
  });
</script>

<template>
  <div class="content mb-16">

  <div class="px-4 flex flex-col md:flex-row md:gap-12 md:max-w-5xl lg:gap-24">

      <!-- Basic Info -->
      <div class="space-y-4 whitespace-nowrap mb-12">
        <DirectusImg name="profile" class="max-w-[150px] sm:max-w-[250px] md:max-w-[150px] lg:max-w-[250px] lg:border-4 mx-auto rounded-full border-2 border-white shadow-strong" width="250" quality="100" />

        <h3 class="text-center">David Waring</h3>

        <div class="info text-center md:text-left">
          <a :href="properties['location-url']" target="_blank">
            <RiMapPin class="info-icon" />&nbsp;&nbsp;{{ properties['location'] }}
          </a>
          <a href="https://www.davidwaring.net" target="_blank">
            <RiLink class="info-icon" />&nbsp;&nbsp;davidwaring.net
          </a>
          <a href="https://www.righttrack.io" target="_blank">
            <RiTrain class="info-icon" />&nbsp;&nbsp;righttrack.io
          </a>
          <a :href="`mailto:${properties['contact']}`">
            <RiMail class="info-icon" />&nbsp;&nbsp;{{ properties['contact'] }}
          </a>
        </div>

        <div class="info text-center md:text-left">
          <a :href="`https://instagram.com/${properties['instagram']}`" target="_blank">
            <RiInstagram class="info-icon" />&nbsp;&nbsp;@dwaring87
          </a>
          <a :href="`https://github.com/${properties['github']}`" target="_blank">
            <RiGithub class="info-icon" />&nbsp;&nbsp;@dwaring87
          </a>
          <a :href="`https://github.com/${properties['github-right-track']}`" target="_blank">
            <RiGithub class="info-icon" />&nbsp;&nbsp;@right-track
          </a>
        </div>

        <div class="info text-center md:text-left">
          <a href="/resume">
            <RiFileList2 class="info-icon" />&nbsp;&nbsp;Resume
          </a>
        </div>
      </div>

      <!-- Bio -->
      <div class="flex-grow">
        <DirectusMarkdown v-if="about" :md="about.bio" />
      </div>

    </div>

  </div>
</template>

<style>
  .shadow-strong {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .info a {
    @apply block space-y-0 text-sm font-normal text-gray-400 text-base;
    @apply hover:text-gray-600;
    @apply dark:hover:text-gray-300;
  }
  .info-icon {
    @apply inline;
  }
</style>