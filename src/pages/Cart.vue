<script setup>
import { usePizzasStore } from "../store/pizzas";
import { computed } from "vue";
import { useCartStore } from "@/store/cart";

// Global State
const cartStore = useCartStore();
const pizzasStore = usePizzasStore();

// Для добовления товара
const onClickAdd = (item) => {
  pizzasStore.addCart(item);
};

// Для удоления товара
const onClickDel = (item) => {
  pizzasStore.delCart(item);
  if (item.amount === 0) {
    cartStore.delInCart(item);
  }
};

// Для полностью удоления товара из корзины
const delItem = (item) => {
  item.amount = 0
  cartStore.delInCart(item)
};

// Для удоления всех товаров из корзины
const onClickDelAll = () => {
  cartStore.delAll();
};

// Для получения товаров из корзины
const getProduct = computed(() => cartStore.cart);
</script>

<template>
  <div class="cart" v-if="getProduct.length">
    <div class="cart__top">
      <div class="cart__top-right">
        <img src="@/assets/img/icon/cart-icon.svg" alt="cart icon" />
        <h2>Корзина</h2>
      </div>
      <div @click="onClickDelAll" class="cart__top-left">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 5H4.16667H17.5"
            stroke="#B6B6B6"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
            stroke="#B6B6B6"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.33337 9.16667V14.1667"
            stroke="#B6B6B6"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.6666 9.16667V14.1667"
            stroke="#B6B6B6"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h2>Очистить корзину</h2>
      </div>
    </div>
    <div class="cart__content">
      <div
        class="cart__product"
        v-for="product in getProduct"
        :key="product.id"
      >
        <div class="cart__product-left">
          <img
            :src="product.imageUrl"
            :alt="product.title"
            class="cart__product-img"
          />
          <div class="cart__product-info">
            <h2 class="cart__product-title">{{ product.title }}</h2>
            <p>тонкое тесто, 26 см.</p>
          </div>
        </div>
        <div class="cart__product-right">
          <div class="cart__product-amount">
            <div @click="onClickDel(product)" class="cart__product-minus">
              <img src="@/assets/img/icon/minus-icon.svg" alt="minus" />
            </div>
            <span>{{ product.amount }}</span>
            <div @click="onClickAdd(product)" class="cart__product-plus">
              <img src="@/assets/img/icon/plus-icon.svg" alt="plus" />
            </div>
          </div>
          <h2 class="cart__product-totalPrice">{{product.totalPrice}} ₽</h2>
          <div @click="delItem(product)" class="cart__product-del">
            <img src="@/assets/img/icon/del-icon.svg" alt="del" />
          </div>
        </div>
      </div>
    </div>
    <div class="cart__bottom">
      <div class="cart__bottom-left">
        <h2>
          Всего пицц: <span>{{ cartStore.totalAmount }} шт.</span>
        </h2>
        <div class="btn">
          <router-link to="/" class="router">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
            >
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Вернуться назад</span>
          </router-link>
        </div>
      </div>
      <div class="cart__bottom-right">
        <h2>Сумма заказа: <span>{{cartStore.totalPrice}} ₽</span></h2>
        <button>Оплатить сейчас</button>
      </div>
    </div>
  </div>
  <div class="not-cart" v-else>
    <div class="not-cart__top">
      <h2>Корзина пустая</h2>
      <img src="@/assets/img/emoji.png" alt="" />
    </div>
    <p class="not-cart-subtitle">
      Вероятней всего, вы не заказывали ещё пиццу.<br />
      Для того, чтобы заказать пиццу, перейди на главную страницу.
    </p>
    <img src="@/assets/img/not-cart-img.png" alt="" class="not-cart-img" />
    <div class="not-cart-btn">
      <router-link to="/" class="not-cart-link"> Вернуться назад </router-link>
    </div>
  </div>
</template>
