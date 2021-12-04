<template>
  <b-container class="p-0">
    <h4>Filters</h4>
    <b-row>
      <b-col>
        <label for="typeFilter">Type</label>
        <b-form-select
          id="typeFilter"
          class="rounded border-dark w-100 mb-1"
          style="padding: 6px 12px"
          v-model="selectedType"
          :options="types"
          v-on:change="emitToParent"
        />
        <label for="participantsFilter">Participants</label>
        <b-form-input
          id="participantsFilter"
          class="border-dark mb-1"
          type="number"
          min="0"
          max="8"
          v-model="participants"
          v-on:change="emitToParent"
        />
        <label for="priceFilter">Budget range:</label>
        <vue-slider
          v-model="minMaxPrice"
          :enable-cross="false"
          :min="min"
          :max="max"
          :interval="intervalPrice"
          v-on:change="emitToParent"
        />
        <b-row>
          <b-col>
            <label for="minPrice">{{ minMaxPrice[0] }}</label>
          </b-col>
          <b-col class="text-end">
            <label for="maxPrice">{{ minMaxPrice[1] }}</label>
          </b-col>
        </b-row>
        {{ filters }}
        <label for="accessibilityFilter">
          Difficulty range: {{ minMaxAccessibility[0] }} -
          {{ minMaxAccessibility[1] }}
        </label>
        <vue-slider
          v-model="minMaxAccessibility"
          :enable-cross="false"
          :min="min"
          :max="max"
          :interval="intervalAccessibility"
          v-on:change="emitToParent"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default Vue.extend({
  components: {
    VueSlider,
  },
  data() {
    return {
      types: [
        { value: "education", text: "Education" },
        { value: "recreational", text: "Recreational" },
        { value: "social", text: "Social" },
        { value: "diy", text: "DIY" },
        { value: "charity", text: "Charity" },
        { value: "cooking", text: "Cooking" },
        { value: "relaxation", text: "Relaxation" },
        { value: "music", text: "Music" },
        { value: "busywork", text: "Busywork" },
      ],
      selectedType: "",
      participants: "",
      min: 0,
      max: 1,
      intervalPrice: 0.05,
      intervalAccessibility: 0.1,
      minMaxPrice: [0, 1],
      minMaxAccessibility: [0, 1],
      filters: [{}],
    };
  },
  computed: {},
  methods: {
    emitToParent() {
      this.filters = [
        this.selectedType,
        this.participants,
        this.minMaxPrice[0],
        this.minMaxPrice[1],
        this.minMaxAccessibility[0],
        this.minMaxAccessibility[1],
      ];
      this.$emit("childToParent", this.filters);
    },
  },
});
</script>

<style scoped></style>
