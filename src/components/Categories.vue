<script setup>
import { usePizzasStore } from "@/store/pizzas.js";
import { computed } from "vue";

// Global State
const pizzasStore = usePizzasStore();

// Likal State
const categories = computed(() => pizzasStore.categories);

// Methods
const onClickCategories = (item) => {
  categories.value.forEach((el) => {
    el.isActive = false;
  });
  item.isActive = true
};
</script>


<template>
  <div class="categories">
    <ul>
      <li
        v-for="item in categories"
        :key="item.id"
        @click="onClickCategories(item)"
        :class="item.isActive == true ? 'active' : ''"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

