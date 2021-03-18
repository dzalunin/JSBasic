// Шаблон верстки компонента
<template>
  <div class="product-list">
    <Product v-for="id in itemsOnPage" :id="id" :key="id" />
  </div>
</template>

<script>
import Product from "./Product.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  // Используемые компоненты
  components: {
    Product,
  },

  // Методы, которые будут подмешаны к экземпляру Vue.
  methods: {
    ...mapActions("products", ["getPage"]),
  },

  // Вычисляемые свойства, которые будут подмешаны к экземпляру Vue.
  computed: {
    ...mapGetters("products", ["itemsOnPage"]),
  },

  // Событие вызывается при создании компоненты
  created() {
    this.getPage(1);
  },
};
</script>

