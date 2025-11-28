<script setup>
import { Users2Icon } from "lucide-vue-next"
import apiServer from "../../lib/api-server"
import MainRequest from "../../lib/request"
import { ref } from "vue"
import { toast } from "vue-sonner"
import { useRouter } from "vue-router"

const loadingPage = ref(true)
const router = useRouter()

async function isLoginViaMiddleware() {
  const getdata = await MainRequest("/api/v1/tasks/usermiddleware")
  if(!!getdata?.data?.data?.name) {
    toast.info("You have logged in before, now go to the main page.")
    router.push("/app")
  }
  if(getdata.status > 499) {
    toast.error("There seems to be a problem on the server side.")
  }
  if(getdata.status === -30) {
    toast.error(getdata.statusText)
  }
  setTimeout(() => {
    if(!!loadingPage?.value) {
      loadingPage.value = false
    }
  }, 500)
}
isLoginViaMiddleware()

function LoginURI() {
  location.href = (`${apiServer}/api/v1/oauth`)
}
</script>

<template>
  <div>
    <div :style='loadingPage? "margin-top: 0px;" : "margin-top: -90px;" ' class="fixed top-0 left-0 w-full bg-yellow-500 px-3 py-1.5 text-sm text-white duration-300">
      <span class="w-full block text-center">Loading...</span>
    </div>
    <div class="w-full h-dvh min-h-96 flex items-center justify-center">
      <div class="w-full max-w-96">
        <h1 class="font-bold text-2xl text-center">Login to the App!</h1>
        <p class="w-full block my-5 text-neutral-700">Sign in to the app with your Google account so your notes won't be lost. This way, you can access your notes as long as you use the same account.</p>
        <button class="w-full flex items-center justify-center px-3 py-2.5 rounded-md border border-neutral-200 text-neutral-800 cursor-pointer" :onclick="LoginURI">
          <Users2Icon size="18" class="mr-3"/>
          <span class="font-semibold">Login with Google</span>
        </button>
      </div>
    </div>
  </div>
</template>