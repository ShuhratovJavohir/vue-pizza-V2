<script setup>
import { ContentLoader } from "vue-content-loader";
</script>

<template>
  <content-loader
    viewBox="0 0 300 500"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <circle cx="140" cy="136" r="130" />
    <rect x="4" y="291" rx="0" ry="0" width="282" height="25" />
    <rect x="2" y="335" rx="0" ry="0" width="282" height="85" />
    <rect x="4" y="432" rx="0" ry="0" width="130" height="39" />
    <rect x="156" y="431" rx="0" ry="0" width="130" height="39" />
  </content-loader>
</template>
