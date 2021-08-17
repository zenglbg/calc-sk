<template>
  <div class="home" ref="wrap"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import {} from "skchart";
import { drawChart } from "./home";
export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const wrap = ref<HTMLElement>();

    // const myChart = computed(() => {
    //   return wrap.value && init(wrap.value);
    // });

    onMounted(() => {
      drawChart(wrap);
    });

    return { wrap };
  },
});
</script>

<style>
.home {
  height: 70vh;
  widows: 100vw;
}
</style>
