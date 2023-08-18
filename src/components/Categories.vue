<script setup>
import { usePizzasStore } from "@/store/pizzas.js";
import { computed } from "vue";

// Global State
const pizzasStore = usePizzasStore();

// Likal State
const getCategories = computed(() => pizzasStore.categories);

// Methods
const onClickCategories = (item) => {
  getCategories.value.forEach((el) => {
    el.isActive = false;     
  });
  item.isActive = true
};
</script>


<template>
  <div class="categories">
    <ul>
      <li
        v-for="item in getCategories"
        :key="item.id"
        @click="onClickCategories(item)"
        :class="item.isActive == true ? 'active' : ''"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

