<template>
  <div>
    <div class="btn-container">
      <button v-if="isToggled" @click="hide()">Hide</button>
      <button v-else @click="randomize()">Show</button>
    </div>
    <pre v-if="isToggled">
      {{ selectedItem }}
    </pre>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "EventsComponent",

  setup() {
    const store = useStore();
    const count = ref(0);
    const selectedItem = ref();
    const isToggled = ref(false);

    const events = computed(() => {
      return store.getters.getData;
    });

    onMounted(() => {
      getData();
    });

    const getData = () => {
      store.dispatch("getData");
    };

    const randomize = () => {
      isToggled.value = true;
      count.value = Math.floor(Math.random() * 3);
      selectedItem.value = events.value.filter(
        (item) => item.index === count.value
      );
    };

    const hide = () => {
      isToggled.value = false;
    };

    return {
      events,
      randomize,
      selectedItem,
      isToggled,
      hide,
    };
  },
};
</script>

<style scoped></style>
