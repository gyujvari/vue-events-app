<template>
  <div v-if="isLoaded" class="body">
    <div class="btn-container">
      <button class="btn" v-if="isToggled" @click="hide()">Hide</button>
      <button class="btn" v-else @click="randomize()">Show</button>
    </div>
    <div v-show="isToggled">
      <div class="card">
        <div
          v-if="selectedItem"
          :style="{
            backgroundColor: `${selectedItem[0].value.color}`,
          }"
          class="parent"
        >
          <div v-if="selectedItem" class="event-items">
            {{ selectedItem[0].value.name }}
          </div>
          <div
            v-if="selectedItem"
            class="event-items"
            style="background-color: white"
          >
            {{ selectedItem[0].value.from }} - {{ selectedItem[0].value.to }}
          </div>
          <div v-if="selectedItem" class="event-items">
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
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import anime from "animejs/lib/anime.es.js";

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
      animateButton();
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
      if (selectedItem.value && isToggled.value == true) {
        animateCard();
      }
    };

    const animateButton = () => {
      anime({
        targets: ".btn",
        duration: 1500,
        elasticity: 400,
        width: 120,
      });
    };

    const animateCard = () => {
      anime({
        targets: ".card",
        duration: 1500,
        elasticity: 800,
        width: 900,
      });
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
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 51px;
  height: 20vw;
  width: 80vw;
  padding: 5px;
  border-radius: 15px;
  transition: opacity 0.5s;
}

.parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1fr 2fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  border-radius: 15px;
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
  font-size: 30px;
  border: 10px solid #000000;
  border-radius: 15px 15px 0px 0px;
}

.event-items:nth-child(2) {
  font-size: 20px;
  display: flex;
  justify-content: center;
  border-right: 10px solid #000000;
  border-left: 10px solid #000000;
  align-items: center;
  font-weight: 500;
}

.event-items:nth-child(3) {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-weight: 800;
  text-shadow: 4px 3px 0 #000000;
  font-size: 30px;
  border: 10px solid #000000;
  border-radius: 0px 0px 15px 15px;

  .talent-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border-right: 10px solid #000000;
  }

  .talent-box:last-child {
    border-right: 0px;
  }

  .btn-container {
    align-self: flex-end;
  }
}

.btn {
  border: 0;
  outline: 0;
  cursor: pointer;
  color: white;
  background-color: rgb(25, 49, 168);
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 8px;
  display: inline-block;
  min-height: 28px;
  transition: background-color 0.24s, box-shadow 0.24s;
  margin-left: 70%;
}
</style>
