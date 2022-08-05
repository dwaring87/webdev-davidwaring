<template>
  <div class="pt-8 pb-20 px-4 flex flex-col md:px-24 lg:flex-row lg:px-0 lg:mx-auto lg:max-w-7xl">
    <div class="mx-auto w-full text-center pb-8 lg:pb-0 lg:text-left">
      <div class="sm:px-8">
        <div class="w-full">
          <DirectusImg name="rt-logo" class="mx-auto mb-8 max-w-[75px] md:max-w-[100px] lg:max-w-[150px]" width="150" />
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
          <span class="inline">Right Track</span>&nbsp;
          <span class="inline text-rt">Online</span>
        </h1>
        <p class="lead mt-3 max-w-md mx-auto md:mt-5 md:max-w-3xl">
          A Progressive Web App combining offline commuter train schedules with real-time status and track information.
        </p>
        <p class="lead mt-3 max-w-md mx-auto md:mt-5 md:max-w-3xl">
          <strong>Currently supporting:</strong>
        </p>
        <ul class="list-oustside">
          <li class="mt-4 text-rt-mnr font-semibold dark:text-gray-100">
            <DirectusImg name="rt-mnr-train" class="inline pr-4" width="50" />Metro North Railroad
          </li>
          <li class="mt-4 text-rt-lirr font-semibold dark:text-gray-100">
            <DirectusImg name="rt-lirr-train" class="inline pr-4" width="50" />Long Island Rail Road
          </li>
        </ul>
        <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
          <div class="">
            <a href="https://righttrack.io/" class="btn btn-large btn-primary w-full">
              Launch Right Track
            </a>
          </div>
          <div class="mt-3 sm:mt-0 sm:ml-3">
            <a href="/dev/right-track" class="btn btn-large btn-primary-outline w-full">
              More Info
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-full lg:my-auto lg:pr-8">
      <DirectusImg name="rt-hero" width="964" />
    </div>
  </div>
</template>