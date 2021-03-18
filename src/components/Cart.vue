// Шаблон верстки компонента
<template>
  <div class="cart-list">
    <CartItem v-for="id in list" :id="id" :key="id" />
  </div>
</template>

<script>
import CartItem from "./CartItem.vue";
import { mapGetters } from "vuex";

export default {
  // Используемые компоненты
  components: {
    CartItem,
  },

  // Вычисляемые свойства, которые будут подмешаны к экземпляру Vue.
  computed: {
    ...mapGetters("cart", ["list"]),
  },
};
</script>

