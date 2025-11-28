<script setup>
  import "vue-sonner/style.css"
  import { Toaster } from "vue-sonner"
</script>

<template>
  <Toaster richColors position="top-left" :expand="true"/>
  <router-view />
</template>
