<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-icon class="mr-2">mdi-alarm</v-icon>
        <span>Training Timer</span>
      </div>

      <v-spacer />
      <v-app-bar-nav-icon @click="addAlarm">
        <v-icon>mdi-plus-thick</v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-content>
      <v-container>
        <RowClock class="timer-row" />
        <RowAlarm
          class="timer-row"
          @delete-alarm="deleteAlarm(key)"
          v-for="key in timers"
          :key="key"
        />
      </v-container>
    </v-content>
    <v-footer padless>
      <div class="grey darken-4 w-100 white--text">
        <div class="container">
          <p class="mb-0 text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit</p>
          <p class="mb-0 text-center text-small">音声利用: OtoLogic (https://otologic.jp/) [CC BY 4.0]</p>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import RowAlarm from "./components/RowAlarm";
import RowClock from "./components/RowClock";

export default {
  name: "App",

  components: {
    RowAlarm,
    RowClock
  },

  data: () => ({
    timers: [],
    timerCount: 0
  }),

  methods: {
    addAlarm: function() {
      this.timers.push(this.timerCount);
      this.timerCount += 1;
    },
    deleteAlarm: function(key) {
      this.timers = this.timers.filter(value => {
        return key != value;
      });
    }
  }
};
</script>


<style scoped>
.timer-row {
  border-bottom: 1px solid silver;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.w-100 {
  width: 100% !important;
}
.text-small {
  font-size: 0.7rem;
}
</style>
