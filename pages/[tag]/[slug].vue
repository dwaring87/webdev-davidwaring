<script setup>
  const route = useRoute();
  const { getPage } = useCMS();

  const s = route.params.slug;
  const t = route.params.tag;
  const { data:page } = await useAsyncData(`page-${s}`, async () => await getPage(s, true));

  useHead({
    title: page && page.value ? page.value.title : ''
  });
</script>

<template>
  <div v-if="page" class="content">
    
    <!-- Title -->
    <h1 class="border mb-0">{{ page.title }}</h1>
    
    <div class="flex flex-col lg:flex-row lg:gap-4">
      
      <!-- Main Content -->
      <DirectusMarkdown class="items-stretch flex-grow max-w-[700px]" :md="page.contents" />

      <!-- Extras -->
      <div class="items-stretch w-full pb-8 space-y-8 lg:min-w-[35%] lg:max-w-[40%] lg:px-4 lg:bg-gray-100 lg:border-l-1 lg:border-gray-200 lg:dark:bg-black lg:dark:border-gray-600">

        <!-- Photos -->
        <div v-if="page.photos && page.photos.length > 0">
          <h2>Photos</h2>
          <div class="flex flex-row flex-wrap justify-evenly items-start">
            <div class="flex flex-col items-center" v-for="photo in page.photos" :key="photo.directus_files_id.id">
              <NuxtLink :to="`/photo/${photo.directus_files_id.id}`">
                <DirectusImg :src="photo.directus_files_id.id" class="cursor-pointer border-2 border-white rounded-md shadow-md m-4 max-w-[250px] dark:border-gray-600" width="250" />
              </NuxtLink>
              <p class="text-gray-400 text-sm max-w-[250px] lg:max-w-[300px]" style="margin-top: -5px; margin-bottom: 25px">{{ photo.directus_files_id.title }}</p>
            </div>
          </div>
        </div>

        <!-- Links -->
        <div v-if="page.links && page.links.length > 0">
          <h2>Links</h2>
          <LinkButton v-for="link in page.links" :link="link" :key="link.url" class="w-full sm:w-max sm:ml-4 lg:w-full lg:ml-0" />
        </div>

      </div>

    </div>
  </div>
</template>