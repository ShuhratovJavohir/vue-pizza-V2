<script setup>
import Pizza from "@/components/Pizza.vue";
import { usePizzasStore } from "@/store/pizzas.js";
import { computed, onMounted } from "vue";
import Skeleton from "@/components/Skeleton.vue";

// Global State
const pizzasStore = usePizzasStore();

// Через computed получаем все товары и записываем в getProducts
const getProducts = computed(() => pizzasStore.filterProduct);

// До загрузка страницы проверяем. Если в 'Global State itmes' что то есть, не делаем запрос на получение товаров
// Таким оброзом товары будм получать только тогда когда товары ещё не пришли и когда первый раз заходим на сайт
onMounted(() => {
  if (!pizzasStore.items.length) {
    setTimeout(() => {
      pizzasStore.fetchProducts();
    }, 1000);
  } else {
    console.log("уже есть");
  }
});
</script>

<template>
  <h2 class="content__title">Все пиццы</h2>
  <div class="content__items" v-if="!pizzasStore.isLoading">
    <Pizza
      v-for="product in getProducts"
      :key="product.id"
      :product="product"
    />
  </div>
  <div class="content__items" v-else>
    <Skeleton v-for="item in 10" :key="item" />
  </div>
</template>