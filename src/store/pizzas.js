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
    sort: [
      {
        id: 1,
        name: "популярности",
        isActive: true,
      },
      {
        id: 2,
        name: "цене",
        isActive: false,
      },
      {
        id: 3,
        name: "алфавиту",
        isActive: false,
      },
    ],
  }),
  actions: {
    async fetchProducts() {
      // Идёт загрузка
      this.isLoading = true;

      // Делаем fetch запрос
      let res = await fetch(
        "https://64de99a3825d19d9bfb2bcac.mockapi.io/vue-pizza"
      );

      // Если всё ок то меняем состояние в state "items: null" на то что мы получаем
      if (res.ok) {
        this.items = await res.json();
      }

      // Загрузка окончена
      this.isLoading = false;
    },
  },
  getters: {
    filterProduct() {
      const SORT_BY_RATING = 0;
      const SORT_BY_PRICE = 1;
      const SORT_BY_TITLE = 2;

      const sortFunctions = {
        [SORT_BY_RATING]: (a, b) => a.rating - b.rating,
        [SORT_BY_PRICE]: (a, b) => a.price - b.price,
        [SORT_BY_TITLE]: (a, b) => a.title.localeCompare(b.title),
      };

      // Получение индекса активной категории и индекса активной сортировки
      const indexCategory = this.categories.findIndex((el) => el.isActive);
      const indexSort = this.sort.findIndex((el) => el.isActive);

      // Если выбрана категория "Все" (индекс 0)
      if (indexCategory === 0) {
        // Выбор соответствующей функции сортировки или пустой функции
        const selectedSortFunction = sortFunctions[indexSort] || ((a, b) => 0);

        // Создание копии массива товаров, сортировка и возврат
        return this.items.slice().sort(selectedSortFunction);
      } else {
        // Фильтрация товаров по выбранной категории
        const filteredArray = this.items.filter(
          (el) => el.category === indexCategory
        );

        // Выбор соответствующей функции сортировки или пустой функции
        const selectedSortFunction = sortFunctions[indexSort] || ((a, b) => 0);

        // Сортировка отфильтрованного массива и возврат
        return filteredArray.sort(selectedSortFunction);
      }
    },

    // filterProduct() {
    //   // Сначала мы получаем индекс выбранной категории с помощью findIndex
    //   let indexCategoriy = this.categories.findIndex(
    //     (el) => el.isActive == true
    //   );
    //   // Также получаем index сортировки с помощью findIndex
    //   let indexSort = this.sort.findIndex((el) => el.isActive == true);
    //   // Если index === 0 то возврощаем массив со всеми товарами
    //   if (indexCategoriy === 0) {
    //     if (indexSort == 0) {
    //       return this.items.sort((a, b) => a.rating - b.rating);
    //     } else if (indexSort == 1) {
    //       return this.items.sort((a, b) => a.price - b.price);
    //     } else if (indexSort == 2) {
    //       return this.items.sort((a, b) => a.title.localeCompare(b.title));
    //     }
    //     return this.items;
    //   }
    //   // Если index != 0, то с помощью filter возвращаем все товары,
    //   // у которых значение ключа "category" совпадает с index
    //   else {
    //     let filteredArray = this.items.filter(
    //       (el) => el.category === indexCategoriy
    //     );
    //     if(indexSort == 0){
    //       return filteredArray.sort((a, b) => a.rating - b.rating)
    //     }else if(indexSort == 1){
    //       return filteredArray.sort((a, b) => a.price - b.price)
    //     }else if(indexSort == 2){
    //       return filteredArray.sort((a, b) => a.title.localeCompare(b.title))
    //     }
    //   }
    // },
  },
});
