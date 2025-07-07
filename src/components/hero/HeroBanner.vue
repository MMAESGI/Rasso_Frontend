<template>
  <div
    class="w-full h-[400px] md:h-[500px] relative flex flex-col items-center justify-center text-white overflow-hidden"
  >
    <video
      class="absolute top-0 left-0 w-full h-full object-cover video-background"
      src="../../assets/24hMans.mp4"
      autoplay
      muted
      loop
      playsinline
    ></video>
  </div>
</template>

<style scoped>
.video-background {
  pointer-events: none;
}
</style>
