<script setup>
import NoteCard from '@/components/NoteCard.vue'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import MainRequest from '../../lib/request'
import { ref } from 'vue'
import { PaperclipIcon } from 'lucide-vue-next'

const dataList = ref([])
const dataNext = ref(false)
const isLoading = ref(false)

async function LoadingList({ page = 0 } = {}) {
  if(isLoading.value) return;
  isLoading.value = true;
  try {
    const getdata = await MainRequest("/api/v1/tasks/list?page="+page)
    if(getdata.status !== 200) {
      toast.error(getdata?.data?.message||getdata?.statusText||"Unknowing")
      return;
    }
    dataList.value = (getdata?.data?.data?.list||[])
    dataNext.value = Boolean(getdata?.data?.data?.is_next)
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
LoadingList({ page: 0 })
</script>

<template>
  <div class="w-full px-2.5 py-1">
    <h1 class="text-3xl font-bold mt-1">My Notes</h1>
    <div class="w-full mt-5">
      <div class="w-full bg-yellow-400 px-4 p-3 rounded-md mb-4.5" v-if="isLoading">
        <p>Loading...</p>
      </div>
      <div class="w-full h-[calc(100dvh-160px)] flex flex-col items-center justify-center" v-if="!dataList[0] && !isLoading">
        <div class="bg-neutral-200 p-3.5 rounded-2xl">
          <PaperclipIcon />
        </div>
        <h2 class="my-3.5 font-bold text-2xl">No note...</h2>
        <p class="text-neutral-800">Add your notes to the list now!</p>
      </div>
      <NoteCard v-for="items in dataList" :key="items.uid" :data="items" :datauid="items.uid"/>
    </div>
  </div>
</template>