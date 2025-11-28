<script setup>
import { CakeSliceIcon } from "lucide-vue-next";
import { useRouter } from "vue-router"

const router = useRouter()

function GoBackToApp() {
  router.push("/app")
}
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-dvh flex flex-col items-center justify-center bg-gradient-to-t from-white/90 to-white/60 backdrop-blur-xs z-50 duration-500 select-none">
    <div class="bg-neutral-200 p-3.5 rounded-2xl">
      <CakeSliceIcon size="30"/>
    </div>
    <h3 class="max-w-md text-center text-2xl font-bold my-2 mt-3.5">Would you like some cake?</h3>
    <p class="max-w-md text-center">Perhaps your page has been deleted or the page does not exist. Please check the URL again. </p>
    <button @click="GoBackToApp" class="cursor-pointer bg-neutral-900 text-neutral-50 rounded-xl px-4.5 py-2 mt-5">
      <span>Go Back To App</span>
    </button>
  </div>
</template>