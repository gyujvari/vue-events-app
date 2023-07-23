<template>
  <div>
    <pre>
      {{ events }}
    </pre>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "EventsComponent",

  setup() {
    const store = useStore();

    const events = computed(() => {
      return store.getters.getData;
    });

    onMounted(() => {
      getData();
    });

    const getData = () => {
      store.dispatch("getData");
    };

    return {
      events,
    };
  },
};
</script>

<style scoped></style>
