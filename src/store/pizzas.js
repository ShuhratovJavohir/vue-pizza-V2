import { defineStore } from "pinia";

export const usePizzasStore = defineStore("pizzas", {
  state: () => ({
    items: [],
    isLoading: true,
    categories: [
      {
        id: 0,
        name: "Все",
        isActive: true,
      },
      {
        id: 1,
        name: "Мясные",
        isActive: false,
      },
      {
        id: 2,
        name: "Вегетарианская",
        isActive: false,
      },
      {
        id: 3,
        name: "Гриль",
        isActive: false,
      },
      {
        id: 4,
        name: "Острые",
        isActive: false,
      },
      {
        id: 5,
        name: "Закрытые",
        isActive: false,
      },
    ],
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
    getters: {
      // filterProduct() {
      //   // Сначала мы получаем индекс выбранной категории с помощью findIndex
      //   let index = this.categories.findIndex((el) => el.isActive == true);
      //   // Если index === 0 то возврощаем массив со всеми товарами
      //   if (index === 0) {
      //     return this.items;
      //   }
      //   // Если index != 0, то с помощью filter возвращаем все товары,
      //   // у которых значение ключа "category" совпадает с index
      //   else {
      //     let filteredArray = this.items.filter((el) => el.category === index);
      //     return filteredArray;
      //   }
      // },

      filterProduct() {
        // Находим индекс активной категории
        const activeCategoryIndex = this.categories.findIndex(
          (el) => el.isActive
        );

        // Фильтруем товары в зависимости от активной категории
        const filteredArray =
          activeCategoryIndex === 0
            ? this.items
            : this.items.filter((el) => el.category === activeCategoryIndex);

        return filteredArray;
      },
    },
  },
});
