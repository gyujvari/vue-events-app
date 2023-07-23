<template>
  <div class="body" v-if="isLoaded">
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

<style lang="scss" scoped>
.card {
  background: #fff;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 51px;
  height: 20vw;
  width: 80vw;
}

.parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1fr 2fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  border-radius: 10px;
  height: 100%;
}

.event-items:nth-child(1) {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  align-items: center;

  color: #ffffff;
  font-weight: 800;
  text-shadow: 4px 3px 0 #000000;
  font-size: 20px;
  border: 5px solid #000000;
  border-radius: 10px 10px 0px 0px;
}

.event-items:nth-child(2) {
  font-size: 20px;
  display: flex;
  justify-content: center;
  border-right: 5px solid #000000;
  border-left: 5px solid #000000;
}

.event-items:nth-child(3) {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-weight: 800;
  text-shadow: 4px 3px 0 #000000;
  font-size: 20px;
  border: 5px solid #000000;
  border-radius: 0px 0px 10px 10px;
}
</style>
