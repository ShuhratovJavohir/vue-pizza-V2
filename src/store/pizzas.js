import { defineStore } from "pinia";

export const usePizzasStore = defineStore("pizzas", {
  state: () => ({
    items: [],
    isLoading: true,
  }),
  actions: {
    async fetchProducts() {
      // Идёт загрузка
      this.isLoading = true;

      // Делаем fetch запрос
      let res = await fetch("http://localhost:3000/pizzas");

      // Если всё ок то меняем состояние в state "items: null" на то что мы получаем
      if (res.ok) {
        this.items = await res.json();
      }

      // Загрузка окончена
      this.isLoading = false;
    },
  },
});
