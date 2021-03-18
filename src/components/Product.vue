// Шаблон верстки компонента
<template>
  <div class="product-item">
    <img :src="itemData.img" :alt="itemData.name" class="product-img-top" />
    <p class="product-title">{{ itemData.name }}</p>
    <p class="product-text">{{ itemData.price }}</p>
    <button @click="buyProduct" class="btn-primary">Добавить в корзину</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  // Входные параметры, передаваемые из родительский компонент
  props: {
    // Идентификатор продукта
    id: Number,
  },

  // Методы, которые будут подмешаны к экземпляру Vue.
  methods: {
    ...mapActions("cart", ["addToCart"]),
    buyProduct() {
      this.addToCart(this.itemData);
      //   this.$store.commit("cart/addToCart", this.itemData);
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

