<script setup>
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import MainRequest from '../../lib/request'
import { ref } from 'vue'

const router = useRouter()
const isLoading = ref(false)

async function submitFormCreate(e) {
  e.preventDefault()
  isLoading.value = true
  try {
    const formData = new FormData(e.target)
    const dataObject = Object.fromEntries(formData.entries())
    const postdata = await MainRequest("/api/v1/tasks/create", {
      method: "POST",
      data: dataObject
    })
    if(postdata.status !== 200) {
      toast.error(postdata?.data?.message||postdata?.statusText||"Unknowing")
      return;
    }
    const pathID = postdata.data?.data?.id
    if(!!pathID) {
      router.push(`/app?target=${pathID}`)
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
    }, 500)
  }
}
</script>

<template>
  <div class="w-full px-2.5 py-1">
    <h1 class="text-3xl font-bold mt-1">Create Note!</h1>
    <form class="w-full mt-4.5" @submit="submitFormCreate">
      <textarea
        required
        name="text"
        placeholder="Your note..."
        class="border border-neutral-100 rounded-xl w-full min-h-52 p-4.5 resize-y outline-blue-500/50"
      ></textarea>
      <button class="bg-blue-500 text-white px-3.5 py-2 rounded-xl cursor-pointer">
        <span>{{ isLoading? "Loading...":"Note!" }}</span>
      </button>
    </form>
  </div>
</template>