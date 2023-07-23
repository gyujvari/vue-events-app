<template>
  <div>
    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "EventsComponent",
  props: {
    events: String,
  },

  setup() {
    const data = ref();

    onMounted(() => {
      getData();
    });

    const getData = async () => {
      await axios
        .get("https://simple-events-api.onrender.com/events")
        .then((response) => {
          data.value = response.data;
          console.log(response, "response");
        });
    };

    return {
      data,
    };
  },
};
</script>

<style scoped></style>
