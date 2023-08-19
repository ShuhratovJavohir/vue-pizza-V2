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
    },
    delInCart(item){
      let delItem = this.cart.findIndex(el => el.id === item.id)
      this.cart.splice(delItem, 1)
    }
  },
  getters: {
    totalAmount(){
      return this.cart.reduce((sum, el) => sum + el.amount, 0)
    },
    totalPrice(){
      return this.cart.reduce((sum, el) => sum + el.totalPrice, 0)
    }
  }
})