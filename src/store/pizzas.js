import {
  defineStore
} from "pinia";

export const usePizzasStore = defineStore("pizzas", {
  state: () => ({
    items: [],
    isLoading: true,
    categories: [{
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
    sort: [{
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
        let result = await res.json();
        result.forEach(obj => {
          obj.amount = 0
          obj.totalPrice = 0
        })

        this.items = result
      }

      // Загрузка окончена
      this.isLoading = false;
    },
    addCart(item) {
      let index = this.items.findIndex(el => el.id === item.id)
      this.items[index].amount++
      item.totalPrice = item.amount * item.price
    },
    delCart(item) {
      let index = this.items.findIndex(el => el.id === item.id)
      this.items[index].amount--
      item.totalPrice = item.amount * item.price
    }
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

        return this.items.sort(selectedSortFunction);
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
  },
});