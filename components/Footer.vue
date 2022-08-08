<script setup>
  import RiInstagram from '~icons/ri/instagram-line';
  import RiGithub from '~icons/ri/github-line';
  import RiLink from '~icons/ri/link';
  import RiTrain from '~icons/ri/train-line';
  import RiMail from '~icons/ri/mail-line';
  const { getProperties, getTags, getPagesByTag } = useCMS();

  // Get Data from the CMS
  const { data } = await useAsyncData('footer', async () => {
    return { 
      properties: await getProperties(), 
      tags: await getTags(), 
      pages: await getPagesByTag() 
    };
  });
</script>

<template>
  <footer class="w-full p-4 bg-gray-200 border-t border-gray-400 dark:bg-black dark:border-gray-600">
    <div class="max-w-7xl mx-auto py-8 px-4 lg:py-12">

      <!-- Site Info / Pages -->
      <div class="grid-cols-4 lg:grid lg:gap-8">
        
        <!-- Site Info -->
        <div class="space-y-4">

          <!-- Info Title -->
          <div>
            <p class="inline-block text-lg font-bold text-primary tracking-wider uppercase border-b-2 border-b-secondary dark:text-secondary dark:border-b-primary">
              David Waring
            </p>
          </div>

          <!-- Info Links -->
          <div class="footer-info">
            <a href="https://www.davidwaring.net" target="_blank">
              <RiLink class="footer-info-icon" />&nbsp;&nbsp;davidwaring.net
            </a>
            <a href="https://www.righttrack.io" target="_blank">
              <RiTrain class="footer-info-icon" />&nbsp;&nbsp;righttrack.io
            </a>
            <a :href="`mailto:${data.properties['contact']}`">
              <RiMail class="footer-info-icon" />&nbsp;&nbsp;{{ data.properties['contact'] }}
            </a>
          </div>

          <!-- Social Links -->
          <div class="footer-info">
            <a :href="`https://instagram.com/${data.properties['instagram']}`" target="_blank">
              <RiInstagram class="footer-info-icon" />&nbsp;&nbsp;@dwaring87
            </a>
            <a :href="`https://github.com/${data.properties['github']}`" target="_blank">
              <RiGithub class="footer-info-icon" />&nbsp;&nbsp;@dwaring87
            </a>
            <a :href="`https://github.com/${data.properties['github-right-track']}`" target="_blank">
              <RiGithub class="footer-info-icon" />&nbsp;&nbsp;@right-track
            </a>
          </div>

        </div>

        <!-- Site Tags / Pages -->
        <div class="mt-0 grid sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:col-span-3">
            
          <!-- Pages -->
          <div v-for="tag in data.tags" :key="tag.id">

            <!-- Tag Name -->
            <h3 class="footer-tag">
              {{ tag.name }}
            </h3>

            <!-- Page Links -->
            <ul role="list" class="footer-page-list">
              <li v-for="page in data.pages[tag.code]" :key="page.id">
                <NuxtLink :to="`/${tag.code}/${page.slug}`" class="footer-page">
                  {{ page.title }}
                </NuxtLink>
              </li>
            </ul>
            
          </div>

          <!-- About Section -->
          <div>
            <h3 class="footer-tag">About</h3>
            <ul role="list" class="footer-page-list">
              <li><NuxtLink to="/about/" class="footer-page">Bio</NuxtLink></li>
              <li><NuxtLink to="/about/resume" class="footer-page">Resume</NuxtLink></li>
            </ul>
          </div>
          
        </div>

      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-gray-300 dark:border-gray-600">
        <p class="text-center text-gray-400 dark:text-gray-600">
          &copy; {{ new Date().getFullYear() }} David Waring<br />
          All Rights Reserved
        </p>
      </div>

    </div>
  </footer>
</template>

<style>
  .footer-info a {
    @apply block space-y-0 text-sm font-normal text-gray-400 text-base;
    @apply hover:text-gray-600;
    @apply dark:hover:text-gray-300;
  }
  .footer-info-icon {
    @apply inline;
  }
  .footer-tag {
    @apply mt-8 text-sm font-semibold text-gray-600 tracking-wider uppercase;
    @apply lg:mt-0;
    @apply dark:text-gray-300;
  }
  .footer-page-list {
    @apply mt-4 space-y-2;
  }
  .footer-page {
    @apply text-base text-gray-400;
    @apply hover:text-gray-600;
    @apply dark:hover:text-gray-300;
  }
</style>