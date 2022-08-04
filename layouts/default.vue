<template>
  <div class="layout">
    <Toolbar class="toolbar" />
    <main class="main">
      <slot />
    </main>
    <Footer class="footer" />
  </div>
</template>

<style src="@/assets/default.css"></style>
<style>
  .layout {
    @apply flex flex-col w-full min-h-screen;
  }
  .toolbar {
    @apply fixed top-0 left-0 w-full z-30;
  }
  .main {
    @apply pt-16;
  }
  .footer {
    @apply mt-auto;
  }
</style>