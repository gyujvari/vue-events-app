<template>
  <div>
    <button @click="randomize()">Show</button>
    <pre>
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
      count.value = Math.floor(Math.random() * 3);
      selectedItem.value = events.value.filter(
        (item) => item.index === count.value
      );
    };

    return {
      events,
      randomize,
      selectedItem,
    };
  },
};
</script>

<style scoped></style>
