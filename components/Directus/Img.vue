<script setup>
  const { getImage, getImageURL } = useCMS();

  // Set the props
  // Name or Hash required
  //  name is the key of an image in the images collection
  //  hash is the uuid of the image file
  const props = defineProps({
    name: String,
    hash: String,
    position: String,
    width: [String, Number],
    height: [String, Number],
    fit: {
      type: String,
      default: 'cover'
    },
    format: {
      type: String,
      default: 'png'
    },
    quality: {
      type: [String, Number],
      default: 100
    }
  });

  // Define the image file id (uuid of file on Directus)
  const fileId = ref(null);
  if ( props.name ) {
    const i = await getImage(props.name);
    fileId.value = i?.image;
  }
  else if ( props.hash ) {
    fileId.value = props.hash
  }
  else {
    console.error("ERROR: DirectusImg does not have 'name' or 'hash' prop defined!");
  }

  // Compute the URL
  const url = computed(() => {
    return getImageURL(fileId.value, {
      width: props.width ? parseFloat(props.width) : undefined,
      height: props.height ? parseFloat(props.height) : undefined,
      fit: props.fit,
      format: props.format,
      quality: props.quality ? parseFloat(props.quality) : undefined
    });
  });

</script>

<template>
  <img v-if="fileId" :src="url" 
    :class="{'img-left': position === 'left', 'img-right': position === 'right', 'img-center': position ==='center'}" />
</template>
