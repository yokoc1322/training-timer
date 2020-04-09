<template>
  <div :class="{accent: isFinished}" class="row alarm-row">
    <div class="col-4"></div>
    <span
      :class="{'white--text': isFinished, 'secondary--text': !isFinished}"
      class="col-4 text-center display-3"
    >{{ currentAlarm | momentStr}}</span>
    <div class="ml-auto col-2 d-flex flex-column align-center justify-space-between">
      <div>
        <input
          :class="{'white--text': isFinished}"
          class="alarm-input"
          @input="setAlarm"
          :disabled="isRunning"
          v-model="inputtedHour"
          type="number"
        />
        <span class="alarm-delimiter font-weight-bold">:</span>
        <input
          :class="{'white--text': isFinished}"
          class="alarm-input"
          @input="setAlarm"
          :disabled="isRunning"
          v-model="inputtedMinute"
          type="number"
        />
        <span class="alarm-delimiter font-weight-bold">:</span>
        <input
          :class="{'white--text': isFinished}"
          class="alarm-input"
          @input="setAlarm"
          :disabled="isRunning"
          v-model="inputtedSecond"
          type="number"
        />
      </div>

      <v-switch class="mt-0" v-model="isRepeat" label="repeat" dense hide-details ripple></v-switch>

      <button
        v-if="!isRunning"
        ripple
        @click="startAlarm"
        class="alarm-btn v-btn primary v-size--small"
      >
        <span class="v-btn__content">Start</span>
      </button>

      <button v-else ripple @click="stopAlarm" class="alarm-btn v-btn primary v-size--small">
        <span class="v-btn__content">Stop</span>
      </button>
    </div>
    <button @click="$emit('delete-alarm')" class="alarm-close v-btn">
      <v-icon>mdi-close</v-icon>
    </button>
  </div>
</template>

<script>
import moment from "moment/moment";
export default {
  name: "RowAlarm",
  data: () => ({
    inputtedHour: 0,
    inputtedMinute: 1,
    inputtedSecond: 0,
    inputtedAlarm: null,
    currentAlarm: null,
    isRunning: false,
    isFinished: false,
    isRepeat: false,
    runningInterval: null
  }),
  beforeMount: function() {
    this.setAlarm();
  },
  methods: {
    setAlarm: function() {
      this.inputtedAlarm = moment(
        `${this.inputtedHour}:${this.inputtedMinute}:${this.inputtedSecond}`,
        "HH:mm:ss"
      );
      this.currentAlarm = moment(this.inputtedAlarm);
    },
    startAlarm: function() {
      this.stopAlarm();
      this.currentAlarm = moment(this.inputtedAlarm);
      this.isRunning = true;
      this.isFinished = false;

      this.runningInterval = setInterval(() => {
        this.currentAlarm.subtract(1, "seconds");
        this.currentAlarm = moment(this.currentAlarm);
        if (this.currentAlarm.format("HH:mm:ss") == "00:00:00") {
          this.finishAlarm();
          this.sound();
          if (this.isRepeat) {
            this.startAlarm();
          }
        }
      }, 1000);
    },
    finishAlarm: function() {
      clearInterval(this.runningInterval);
      this.runningInterval = null;
      this.isFinished = true;
      this.isRunning = false;
    },

    stopAlarm: function() {
      clearInterval(this.runningInterval);
      this.runningInterval = null;
      this.isFinished = false;
      this.isRunning = false;
      this.currentAlarm = moment(this.inputtedAlarm);
    },

    sound: function() {
      let sound = new Audio("Onmtp-Ding05-1.mp3");
      sound.play();
    }
  },
  filters: {
    momentStr: function(moment_value) {
      return moment_value.format("HH:mm:ss");
    }
  }
};
</script>

<style scoped>
.alarm-input {
  width: 2rem;
  background-color: #11111111;
  border-radius: 3px;
}

.alarm-input[disabled] {
  background-color: #11111155;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.alarm-row {
  position: relative;
}
.alarm-close {
  position: absolute;
  top: 2px;
  right: 2px;
}

.alarm-btn {
  width: 6.5rem;
}
</style>
