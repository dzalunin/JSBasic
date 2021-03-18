// Шаблон верстки компонента
<template>
  <div class="cart-container">
    <div class="cart-list">
      <CartItem v-for="id in list" :id="id" :key="id" />
    </div>
    <br />
    <button @click="initCart" class="btn-primary">Очистить корзину</button>
  </div>
</template>

<script>
import CartItem from "./CartItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  // Используемые компоненты
  components: {
    CartItem,
  },

  // Методы, которые будут подмешаны к экземпляру Vue.
  methods: {
    ...mapActions("cart", ["getCart", "initCart"]),
  },

  // Вычисляемые свойства, которые будут подмешаны к экземпляру Vue.
  computed: {
    ...mapGetters("cart", ["list"]),
  },

  // Событие вызывается при создании компоненты
  created() {
    this.getCart();
  },
};
</script>

