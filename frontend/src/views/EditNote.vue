<script setup>
import { toast } from 'vue-sonner'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import MainRequest from '../../lib/request'
import { CakeSliceIcon } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const isLoading = ref(false)
const isLock = ref(true)
const isFound = ref(true)
const isWantDelete = ref(false)
const dataNote = ref("")

async function submitFormUpdate(e) {
  if(isLock.value) return;
  e.preventDefault()
  isLoading.value = true
  isLock.value = true
  try {
    const uid = String(route.params?.uid||"")
    const formData = new FormData(e.target)
    const dataObject = Object.fromEntries(formData.entries())
    const updatedata = await MainRequest(`/api/v1/tasks/edit/${uid}`, {
      method: "PUT",
      data: dataObject
    })
    if(updatedata.status !== 200) {
      toast.error(updatedata?.data?.message||updatedata?.statusText||"Unknowing")
      return;
    }
    if(updatedata?.data?.data?.success) {
      toast.success("Success to save updated!")
      router.push(`/app?target=${uid}&type=update`)
      return;
    }
    toast.error("Unknowing issues!")
  } catch(e) {
    console.error("[ClientError]:", e.stack, "\n\nYou found this issues, please send to the developer!")
    toast.error("[ClientError]: The logical function is error", {
      description: String(e?.message)
    })
  } finally {
    setTimeout(() => {
      isLoading.value = false
      isLock.value = false
    }, 500)
  }
}
async function noteDelete() {
  if(isLock.value) return;
  cancelAlertDeleteNote()
  toast.info("Removeing the note...")
  isLoading.value = true
  isLock.value = true
  try {
    const uid = String(route.params?.uid||"")
    const deletedata = await MainRequest(`/api/v1/tasks/del/${uid}`, { method: "DELETE" })
    if(deletedata.status !== 200) {
      toast.error(deletedata?.data?.message||deletedata?.statusText||"Unknowing")
      return;
    }
    if(deletedata?.data?.data?.success) {
      toast.success("The note has been deleted.")
      router.push(`/app?target=${uid}&type=update`)
      return;
    }
    toast.error("Unknowing issues!")
  } catch(e) {
    console.error("[ClientError]:", e.stack, "\n\nYou found this issues, please send to the developer!")
    toast.error("[ClientError]: The logical function is error", {
      description: String(e?.message)
    })
  } finally {
    setTimeout(() => {
      isLoading.value = false
      isLock.value = false
    }, 500)
  }
}
async function noteRead() {
  try {
    const slug = String(route.params?.uid||"")
    const getdata = await MainRequest("/api/v1/tasks/read/"+slug)
    if(getdata.status === 404) {
      isFound.value = false
    }
    if(getdata.status !== 200) {
      toast.error(getdata?.data?.message||getdata?.statusText||"Unknowing")
      return;
    }
    dataNote.value = String(getdata?.data?.data?.text||"")
    isLock.value = false
  } catch(e) {
    console.error("[ClientError]:", e.stack, "\n\nYou found this issues, please send to the developer!")
    toast.error("[ClientError]: The logical function is error", {
      description: String(e?.message)
    })
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}
noteRead()
async function alertDeleteNote() {
  isWantDelete.value = true
}
async function cancelAlertDeleteNote() {
  isWantDelete.value = false
}
function GoBackToApp() {
  router.push("/app")
}
</script>

<template>
  <div class="w-full px-2.5 py-1">
    <div
      :style='!isFound? "pointer-events: auto; opacity: 1; margin-top: 0px;":"pointer-events: none; opacity: 0; margin-top: -7px;"'
      class="fixed top-0 left-0 w-full h-dvh flex flex-col items-center justify-center bg-gradient-to-t from-white/90 to-white/60 backdrop-blur-xs z-50 duration-500 select-none"
    >
      <div class="bg-neutral-200 p-3.5 rounded-2xl">
        <CakeSliceIcon size="30"/>
      </div>
      <h3 class="max-w-md text-center text-2xl font-bold my-2 mt-3.5">Note not found!</h3>
      <p class="max-w-md text-center">Perhaps your note has been deleted or the note does not exist.</p>
      <button @click="GoBackToApp" class="cursor-pointer bg-neutral-900 text-neutral-50 rounded-xl px-4.5 py-2 mt-5">
        <span>Back To Home</span>
      </button>
    </div>
    <div
      v-if="isWantDelete"
      class="fixed w-full h-dvh top-0 left-0 right-0 bottom-0 bg-black/40 flex justify-center items-center backdrop-blur-xs z-50"
    >
      <div class="w-full max-w-md bg-white p-4 rounded-xl border border-neutral-300 shadow-xl shadow-neutral-500/90">
        <h2 class="text-xl font-bold">Are you sure?</h2>
        <p class="my-2 mb-3.5">Do you really want to delete this note?</p>
        <div class="w-full flex justify-end text-sm">
          <button type="button" @click="noteDelete" class="cursor-pointer bg-red-500 text-white px-3.5 py-1.5 rounded-md ml-1.5">
            <span class="font-bold">Yes</span>
          </button>
          <button type="button" @click="cancelAlertDeleteNote" class="cursor-pointer bg-neutral-500 text-white px-3.5 py-1.5 rounded-md ml-1.5">
            <span>Not now</span>
          </button>
        </div>
      </div>
    </div>
    <h1 class="text-3xl font-bold mt-2.5">Edit Or Delete Note</h1>
    <form class="w-full mt-4.5" @submit="submitFormUpdate">
      <textarea
        :disabled="isLock"
        v-model="dataNote"
        required
        name="text"
        placeholder="Your note..."
        class="border border-neutral-100 rounded-xl w-full min-h-52 p-4.5 resize-y outline-blue-500/50"
      ></textarea>
      <button :disabled="isLock" class="disabled:bg-neutral-400 bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer">
        <span>{{ isLoading? "Loading...":"Edit Note!" }}</span>
      </button>
      <button @click="alertDeleteNote" :disabled="isLock" type="button" class="ml-1 disabled:bg-neutral-400 bg-red-500 text-white px-4 py-2 rounded-xl cursor-pointer">
        <span>Delete</span>
      </button>
    </form>
  </div>
</template>