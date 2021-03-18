// Шаблон верстки компонента
<template>
  <div class="cart-item">
    {{ itemData.productName }} : {{ itemData.price }} x {{ itemData.quantity }}
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

  // Вычисляемые свойства, которые будут подмешаны к экземпляру Vue.
  computed: {
    ...mapGetters("cart", ["data"]),

    itemData() {
      return this.data[this.id];
    },
  },
};
</script>

