<script setup>
import Pizza from "@/components/Pizza.vue";
import { usePizzasStore } from "@/store/pizzas.js";
import { computed, onMounted, ref } from "vue";
import Skeleton from "@/components/Skeleton.vue";
import Categories from "@/components/Categories.vue";
import Sort from "@/components/Sort.vue";

// Global State
const pizzasStore = usePizzasStore();

const categoriesName = ref("Все");

// Lokal State
const productInPages = ref(4);
const activePage = ref(1);

const totalPage = computed(() =>
  Math.ceil(getProducts.value.length / productInPages.value)
);

const paginatedProducts = computed(() => {
  const from = (activePage.value - 1) * productInPages.value; // Вычисляем начальный индекс для текущей страницы.
  const to = from + productInPages.value; // Вычисляем конечный индекс для текущей страницы.
  return getProducts.value.slice(from, to); // Получаем подмножество отсортированных продуктов для текущей страницы.
});

function pageClick(page) {
  activePage.value = page;
}

// Через computed получаем все товары и записываем в getProducts
const getProducts = computed(() => {
  // if (pizzasStore.search.length == 0) {
    return pizzasStore.filterProduct;
  // } else {
  // return pizzasStore.filterProduct.filter((el) => {
  //   el.title.includes(pizzasStore.search);
  // });
  // }
});


// До загрузка страницы проверяем. Если в 'Global State itmes' что то есть, не делаем запрос на получение товаров
// Таким оброзом товары будм получать только тогда когда товары ещё не пришли и когда первый раз заходим на сайт
onMounted(() => {
  if (!pizzasStore.items.length) {
    pizzasStore.fetchProducts();
  } else {
    console.log("уже есть");
  }
});
</script>

<template>
  <div class="content__top">
    <Categories />
    <Sort />
  </div>
  <h2 v-if="pizzasStore.search.length == 0" class="content__title">
    {{ pizzasStore?.activeCategoriyName }} 
    {{ pizzasStore?.activeCategoriyName === 'Все' ? 'пиццы' : ''}}
  </h2>
  <h2 v-else class="content__title">Поиск пиццы: {{ pizzasStore.search }}</h2>
  <div class="content__items" v-if="pizzasStore.isLoading == false">
    <Pizza
      v-for="product in paginatedProducts"
      :key="product.id"
      :product="product"
    />
  </div>
  <div class="content__items" v-else>
    <Skeleton v-for="item in 4" :key="item" />
  </div>
  <div class="paggination">
    <div
      class="page"
      :class="activePage == page ? 'active' : ''"
      @click="pageClick(page)"
      v-for="(page, index) in totalPage"
      :key="index"
    >
      {{ page }}
    </div>
  </div>
</template>
