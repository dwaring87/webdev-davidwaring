<script setup>
  import RiMenu from '~icons/ri/menu-2-fill';
  import RiClose from '~icons/ri/close-fill';
  const route = useRoute();
  const tags = await useTags(true);

  // Check if the menu item is the active route
  const isActive = (tag) => route.path.startsWith(tag.path)

  // Flag for the Open/Close of the Mobile Menu
  const open = ref(false);
</script>

<template>
  <nav class="shadow text-primary-text bg-gradient-to-b from-primary-light to-primary">
    
    <!-- Main Row of the Toolabar -->
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex justify-between h-16">

        <!-- Mobile Menu Button -->
        <div class="flex items-center opacity-80 md:hidden hover:opacity-100">
          <button type="button" @click="open = !open" class="inline-flex items-center justify-center py-2 px-2 mr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <RiClose v-if="open" />
            <RiMenu v-else />
          </button>
        </div>

        <!-- Logo, Title, Menu Items -->
        <div class="flex-1 flex items-stretch justify-start">
          
          <!-- Logo / Title -->
          <div class="flex md:flex-grow items-center">
            <NuxtLink to='/'>
              <DirectusImg name="toolbar-logo" class="max-w-[36px] max-h-[36px] rounded-full shadow-md align-middle border-none" width="64" height="64" quality="100" />
            </NuxtLink>
            <NuxtLink to='/'>
              <span class="px-4"><strong>David Waring</strong></span>
            </NuxtLink>
          </div>

          <!-- Menu Items -->
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <span v-for="tag in tags" :key="tag.id" class="border-transparent inline-flex items-center px-1 pt-1 border-b-4 text-sm font-medium opacity-80 hover:opacity-100 hover:border-secondary" :class="{'border-secondary': isActive(tag)}">
              <NuxtLink :to="tag.path">
                {{ tag.name }}
              </NuxtLink>
            </span>
          </div>

        </div>

      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-if="open" class="md:hidden">
      <div class="pt-2 pb-4 space-y-1">
        <span v-for="tag in tags" :key="tag.id" class="border-transparent block pl-3 pr-4 py-2 border-l-4 text-base font-medium opacity-80 hover:opacity-100 hover:border-secondary" :class="{'border-secondary': isActive(tag)}">
          <NuxtLink :to="tag.path" @click="open = false">
            {{ tag.name }}
          </NuxtLink>
        </span>
      </div>
    </div>

  </nav>
</template>