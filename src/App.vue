<script setup>
import Header from "@/components/Header.vue";
import Categories from "@/components/Categories.vue";
import Sort from "@/components/Sort.vue";
import Pizzas from "@/pages/Pizzas.vue";
</script>
<template>
  <div class="wrapper">
    <Header />
    <div class="content">
      <div class="container">
        <div class="content__top">
          <Categories />
          <Sort />
        </div>
				<RouterView/>
      </div>
    </div>
  </div>
</template>
