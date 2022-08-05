<template>
  <div class="text-center">
    
    <!-- Header -->
    <div class="max-w-xl md:max-w-2xl mx-auto">
      <h1 class="text-4xl sm:text-5xl md:text-6xl">
        <span class="block xl:inline"><RiCompass class="relative top-2.5" />&nbsp;Trail Maps</span>
      </h1>
      <p class="lead px-4 mt-3 md:(mt-5 max-w-3xl)">
        Custom designed trail maps using a combination of manually collected GPS tracks and publicly available GIS data.
      </p>
    </div>
    
    <div class="mt-5 px-4 flex flex-col lg:(max-w-6xl mx-auto px-8 flex-row gap-4)">
      
      <!-- Manorville Hills -->
      <div class="card card-p-0 w-full">
        <div class="h-[200px]">
          <DirectusImg name="manorville-hills-hero" width="600" quality="100" class="rounded-t-md w-full max-h-[200px] object-cover object-top" />
        </div>
        <div class="px-4">
          <h2 class="mt-4">Manorville Hills</h2>
          <DirectusMarkdown :md="manorvilleHills ? manorvilleHills.description : undefined" />
        </div>
        <div class="flex flex-row justify-end mt-8 p-4 border-t border-gray-200 dark:(border-gray-600)">
          <NuxtLink v-if="manorvilleHills" :to="`/${manorvilleHills.tag.code}/${manorvilleHills.slug}/`" class="btn btn-large btn-primary-outline">
            View Maps
          </NuxtLink>
        </div>
      </div>
      
      <!-- Rogers Center -->
      <div class="card card-p-0 w-full">
        <div class="h-[200px]">
          <DirectusImg name="rogers-hero" width="600" quality="100" class="rounded-t-md w-full max-h-[200px] object-cover object-bottom" />
        </div>
        <div class="px-4">
          <h2 class="mt-4">Rogers Center</h2>
          <DirectusMarkdown :md="rogers ? rogers.description : undefined" />
        </div>
        <div class="flex flex-row justify-end mt-8 p-4 border-t border-gray-200 dark:(border-gray-600)">
          <NuxtLink v-if="rogers" :to="`/${rogers.tag.code}/${rogers.slug}/`" class="btn btn-large btn-primary-outline">
            View Maps
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import RiCompass from '~icons/ri/compass-3-fill';

  export default {
    components: { RiCompass },

    fetch: async function() {
      this.manorvilleHills = await this.$directus.fetchOne(`/items/pages?fields=description,tag.code,slug&filter[slug][_eq]=manorville-hills`);
      this.rogers = await this.$directus.fetchOne(`/items/pages?fields=description,tag.code,slug&filter[slug][_eq]=rogers`);
    },

    fetchKey: 'maps-hero',

    data: function() {
      return {
        manorvilleHills: undefined,
        rogers: undefined
      }
    }
  }
</script>