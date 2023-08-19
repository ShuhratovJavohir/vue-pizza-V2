<script setup>
import Header from "@/components/Header.vue";
</script>
<template>
  <div class="wrapper">
    <Header />
    <div class="content">
      <div class="container">
				<RouterView/>
      </div>
    </div>
  </div>
</template>