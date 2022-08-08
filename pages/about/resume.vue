<script setup>
  const { getResume } = useCMS();
  const { data } = useAsyncData('resume', async () => {
    return {
      resume: await getResume()
    }
  });
  
  useHead({
    title: 'Resume'
  });
</script>

<template>
  <div class="content mb-16">
    <div id="resume" class="max-w-2xl px-4 mx-auto">
      <DirectusMarkdown v-if="data?.resume?.content" :md="data.resume.content" />
    </div>
  </div>
</template>

<style>
  #resume h2 {
    @apply mt-8;
  }
  #resume h3 {
    @apply mt-4;
  }
  #resume p {
    @apply mb-6;  
  }
  #resume a {
    @apply text-primary-light hover:text-primary dark:text-secondary-light dark:hover:text-secondary;
  }
</style>