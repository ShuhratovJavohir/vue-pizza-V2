import {
  defineStore
} from "pinia";


export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
    totalPrice: null
  }),
  actions: {
    addToCart(item) {
      const find = this.cart.find(el => el.id === item.id)
      
      if (!find) {
        console.log('не было пришлось добавить');
        this.cart.push(item)
      }
    },
    delAll(){
      this.cart.forEach(el => {
        el.amount = 0
      })
      this.cart = [] 
    }
  }
})