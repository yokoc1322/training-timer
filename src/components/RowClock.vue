<template>
  <div class="row">
    <div class="col-4"></div>
    <span class="col-4 text-center secondary--text display-3">{{currentTime}}</span>
    <div class="col-4"></div>
  </div>
</template>

<script>
import moment from "moment/moment";

export default {
  name: "RowClock",
  data: () => ({
    currentTime: "XX:XX:XX"
  }),
  mounted: function() {
    setInterval(() => {
      this.setCurrentTime();
    }, 1000);
  },
  methods: {
    setCurrentTime: function() {
      this.currentTime = moment().format("HH:mm:ss");
    }
  }
};
</script>
