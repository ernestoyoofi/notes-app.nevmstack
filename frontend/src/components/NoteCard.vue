<script setup>
import { useRouter } from 'vue-router';

const params = defineProps(["isLoading", "data", "datauid"])

const router = useRouter()

async function openEditorMenu() {
  router.push(`/app/${params.datauid}/edit`)
}
</script>

<template>
  <div class="w-full px-5 py-3.5 mb-2 bg-white border border-neutral-200 rounded-md cursor-pointer shadow-md shadow-neutral-300/50" @click="openEditorMenu">
    <p class="text-balance whitespace-pre-wrap break-words">{{ String(data.text).trim() }}</p>
    <small class="text-neutral-600 text-sm italic">{{ `${data.is_edited? "Edited • ":""}${(data.time).split("T")[0]}` }}</small>
  </div>
</template>