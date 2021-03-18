// Шаблон верстки компонента
<template>
  <div class="container">
    <p><b>'Корзина'</b></p>
    <Cart />
    <br /><br /><br /><br />
    <p><b>'Каталог'</b></p>
    <ProductList />
  </div>
</template>

// Стили компонента
<style module>
</style>

<script>
import Cart from "./components/Cart.vue";
import ProductList from "./components/ProductList.vue";

export default {
  // Объект с данными экземпляра Vue. Vue рекурсивно преобразует его свойства в геттеры/сеттеры, чтобы сделать их «реактивными».
  data() {
    return {};
  },

  // Входные параметры, передаваемые из родительский компонент
  props: {},

  // Используемые компоненты
  components: {
    Cart,
    ProductList,
  },

  // Методы, которые будут подмешаны к экземпляру Vue.
  methods: {},

  // Вычисляемые свойства, которые будут подмешаны к экземпляру Vue.
  computed: {},

  // Событие вызывается при создании компоненты
  created() {},
};
</script>

