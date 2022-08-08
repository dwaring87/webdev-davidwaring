<script setup>
  import RiArrowLeft from '~icons/ri/arrow-left-circle-line';
  const route = useRoute();
  const router = useRouter();
  const { getFile } = useCMS();
  
  const hash = route.params.hash;
  const { data } = await useAsyncData(`photo-${hash}`, async () => {
    return {
      photo: await getFile(hash)
    }
  });

  const caption_displayed = ref(true);
  const goBack = () => {
    router.back();
  }

  definePageMeta({
    layout: "photo",
  });
</script>

<template>
  <div class="bg-black">
    <div @click="caption_displayed = !caption_displayed">
      <DirectusImg class="w-screen h-screen mx-auto my-auto object-contain" :hash="hash" />
    </div>
    <transition name="slide">
      <div v-if="caption_displayed" class="fixed bottom-0 w-full bg-white bg-opacity-80 p-4 dark:bg-black dark:bg-opacity-60">
        <div class="flex flex-row gap-4 items-center">
          <a href="#" @click="goBack">
            <RiArrowLeft class="text-primary-light hover:text-primary text-3xl dark:text-secondary-light dark:hover:text-secondary" />
          </a>
          <p class="text-gray-700 dark:text-gray-200">{{ data?.photo?.title }}</p> 
        </div>
      </div>
    </transition>
  </div>
</template>