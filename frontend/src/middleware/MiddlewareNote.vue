<script setup>
import { BugIcon, ChevronLeftIcon, PlusIcon, Users2Icon } from "lucide-vue-next"
import MainRequest from "../../lib/request"
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { toast } from "vue-sonner"

const router = useRouter()
const route = useRoute()
const dataProfile = ref({ loading: true, data: {}, error: null })

async function FetchingProfile() {
  const getdata = await MainRequest("/api/v1/tasks/usermiddleware")
  dataProfile.value.loading = false
  if(getdata.data.redirect && getdata.data.status === 401) {
    setTimeout(() => {
      location.href = (getdata.data.redirect)
    }, 300)
    toast.error("You are not logged in!")
    return;
  }
  if(getdata.status !== 200) {
    toast.error(getdata?.data?.message||getdata?.statusText)
    dataProfile.value = {
      error: String(getdata?.data?.message||getdata?.statusText||"Unknowing")
    }
    return;
  }
  dataProfile.value = {
    data: {
      callname: String(getdata.data?.data?.name).split(" ")[0],
      name: getdata.data?.data?.name,
      picture: getdata.data?.data?.picture,
    }
  }
}
FetchingProfile()

function GoBackProfile() {
  if(route.path !== "/app") {
    router.push("/app")
  }
}
function RefreshThisPage() {
 window.location.reload()
}
</script>

<template>
  <div class="w-full">
    <div
      :style='!!dataProfile.error? "pointer-events: auto; opacity: 1; margin-top: 0px;":"pointer-events: none; opacity: 0; margin-top: -7px;"'
      class="fixed top-0 left-0 w-full h-dvh flex flex-col items-center justify-center bg-gradient-to-t from-white/90 to-white/60 backdrop-blur-xs z-50 duration-500 select-none"
    >
      <div class="bg-neutral-200 p-3.5 rounded-2xl">
        <BugIcon size="30"/>
      </div>
      <h3 class="max-w-md text-center text-2xl font-bold my-2 mt-3.5">Oh no, There's a problem!</h3>
      <p class="max-w-md text-center">{{ `Status displays error message: ${dataProfile.error}` }}</p>
      <button @click="RefreshThisPage" class="cursor-pointer bg-neutral-900 text-neutral-50 rounded-xl px-4.5 py-2 mt-5">
        <span>Refresh this page!</span>
      </button>
    </div>
    <header class="sticky top-0 left-0 w-full h-[66px] z-30 bg-white/60 backdrop-blur-xs">
      <div class="px-2.5 max-w-3xl w-full m-auto">
        <div class="w-full h-[66px] flex items-center justify-between">
          <div class="w-auto flex items-center">
            <div class="relative w-11 h-11 rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center">
              <div class="w-11 h-11 flex items-center justify-center duration-200" :style='route.path !== "/app"? "opacity: 1;":"opacity: 0; cursor: pointer;"'>
                <ChevronLeftIcon />
              </div>
              <img
                :src="dataProfile?.data?.picture||''"
                :alt="'Name of '+dataProfile?.data?.name||''"
                :style='route.path === "/app"? "opacity: 1;":"opacity: 0; cursor: pointer;"'
                class="absolute w-full h-full object-cover duration-200"
                v-if="!!dataProfile?.data?.picture"
                @click="GoBackProfile"
              />
            </div>
            <div class="ml-2 h-6 overflow-hidden">
              <b :style='route.path === "/app"? "margin-top: -24px;":"margin-top: 0px;"' class="block text-neutral-700 duration-300">Note App (Nevm)</b>
              <b class="block text-neutral-700 duration-300">{{ dataProfile?.data?.callname? `Hi, ${dataProfile?.data?.callname}`:"User" }}</b>
            </div>
          </div>
          <div class="w-auto flex items-center">
            <button :style='route.path === "/app"? "margin-top: 0px;":"margin-top: -120px;"' class="w-11 h-11 bg-neutral-100 rounded-full flex items-center justify-center cursor-pointer duration-300" @click='router.push("/app/new")'>
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
    <main class="w-full max-w-3xl m-auto">
      <router-view />
    </main>
  </div>
</template>