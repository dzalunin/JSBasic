// Шаблон верстки компонента
<template>
  <div class="product-item">
    <img :src="itemData.img" :alt="itemData.name" class="product-img-top" />
    <p class="product-title">{{ itemData.name }}</p>
    <p class="product-text">{{ itemData.price }}</p>
    <button @click="addToCart" class="btn-primary">Добавить в корзину</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // Входные параметры, передаваемые из родительский компонент
  props: {
    // Идентификатор продукта
    id: Number,
  },

  // Методы, которые будут подмешаны к экземпляру Vue.
  methods: {
    addToCart() {
      this.$store.commit("cart/addToCart", this.itemData);
    },
  },

  // Вычисляемые свойства, которые будут подмешаны к экземпляру Vue.
  computed: {
    ...mapGetters("products", ["data"]),
    itemData() {
      return this.data[this.id];
    },
  },
};
</script>

