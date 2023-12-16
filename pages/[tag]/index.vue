<script setup>
  import RiRight from '~icons/ri/arrow-right-fill';
  const route = useRoute();
  const { getTag, getPagesByTag } = useCMS();
  
  // Get the tag for the route
  const t = route.params.tag;
  const { data:tag } = await useAsyncData(`tag-${t}`, async () => await getTag(t));
  const { data:pages } = await useAsyncData(`pages-tag-${t}`, async () => await getPagesByTag(t));

  useHead({
    title: tag && tag.value ? tag.value.name : ''
  });
</script>

<template>
  <div v-if="tag && pages" class="content mb-16">
    <h1 class="border mb-8">{{ tag.name }}</h1>

    <div v-for="page in pages" :key="page.id" class="card card-p-0">
      <div class="h-[200px]">
        <DirectusImg :src="page.image" class="rounded-t-md w-full max-h-[200px] object-cover object-top" width="1000" quality="100" />
      </div>
      <div class="px-4">
        <h3 class="mt-4">{{ page.title }}</h3>
        <DirectusMarkdown :md="page.description" />
      </div>
      <div class="flex flex-col md:flex-row md:gap-2 whitespace-nowrap mt-8 p-4 border-t border-gray-200 dark:border-gray-600">
        <template v-for="link in page.links">
          <LinkButton v-if="link.card" :link="link" :key="link.url" />
        </template>
        <div class="flex-grow"></div>
        <NuxtLink :to="`/${tag.code}/${page.slug}`" class="btn btn-primary">
          Read&nbsp;&nbsp;<RiRight />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>