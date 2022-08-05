<script setup>
  import RiLeft from '~icons/ri/arrow-left-line';
</script>

<template>
  <div class="py-20">
    <div class="text-center">
      <p class="text-sm font-semibold text-primary uppercase tracking-wide dark:text-secondary">404 error</p>
      <h1 class="text-4xl md:text-5xl lg:text-6xl">Page not found.</h1>
      <p class="mt-4 lead">Sorry, the page you're looking for does not exist</p>
      <div class="mt-8">
        <NuxtLink to="/" class="text-base font-medium text-primary-light hover:text-primary dark:text-secondary-light dark:hover:text-secondary">
          <RiLeft class="inline" />&nbsp;Go back home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>