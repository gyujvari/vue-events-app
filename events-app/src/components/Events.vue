<template>
  <div v-if="isLoaded">
    <div class="btn-container">
      <button v-if="isToggled" @click="hide()">Hide</button>
      <button v-else @click="randomize()">Show</button>
    </div>

    <div v-if="isToggled && selectedItem" class="card">
      <div
        :style="{
          backgroundColor: `${selectedItem[0].value.color}`,
        }"
        class="parent"
      >
        <div class="event-items">
          {{ selectedItem[0].value.name }}
        </div>
        <div class="event-items" style="background-color: white">
          {{ selectedItem[0].value.from }} - {{ selectedItem[0].value.to }}
        </div>
        <div class="event-items">
          <div
            class="talent-box"
            v-for="(talent, index) in selectedItem[0].value.talent"
            :key="index"
          >
            {{ talent }}
          </div>
        </div>
      </div>
    </div>
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

    const isLoaded = computed(() => {
      return store.getters.getIsLoaded;
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
      isLoaded,
    };
  },
};
</script>

<style scoped></style>
