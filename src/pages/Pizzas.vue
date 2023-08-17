<script setup>
import Pizza from "@/components/Pizza.vue";
import { usePizzasStore } from "@/store/pizzas.js";
import { computed, onMounted } from "vue";

// Global State
const pizzasStore = usePizzasStore()

// Через computed получаем все товары и записываем в getProducts
const getProducts = computed(() => pizzasStore.filterProduct)

// До загрузка страницы проверяем. Если в 'Global State itmes' что то есть, не делаем запрос на получение товаров
// Таким оброзом товары будм получать только тогда когда товары ещё не пришли и когда первый раз заходим на сайт
onMounted(() => {
  if(!pizzasStore.items.length){
    pizzasStore.fetchProducts()
  }else{
    console.log('уже есть');
  }
})
</script>

<template>
  <h2 class="content__title">Все пиццы</h2>
  <div class="content__items" v-if="getProducts">
    <Pizza v-for="product in getProducts" :key="product.id" :product="product" />
  </div>
  <h2 v-else>Идёт загруска...</h2>
</template>