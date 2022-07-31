<template>
  <b-container class="p-0">
    <h4>Filters</h4>
    <b-row>
      <b-col>
        <label class="mb-1" for="typeFilter">Type</label>
        <b-form-select
          id="typeFilter"
          class="rounded border-dark w-100 mb-3 px-1 py-2"
          v-model="selectedType"
          :options="types"
          @change="emitToParent"
        />
        <label class="mb-1" for="participantsFilter">Participants</label>
        <b-form-input
          id="participantsFilter"
          class="border-dark mb-3"
          type="number"
          min="0"
          max="8"
          v-model="participants"
          @change="emitToParent"
        />
        <label class="mb-1" for="priceFilter">Budget range:</label>
        <vue-slider
          v-model="minMaxPrice"
          :enable-cross="false"
          :min="min"
          :max="max"
          :interval="intervalPrice"
          @change="emitToParent"
        />
        <b-row class="mb-3">
          <b-col>
            <label for="minPrice">{{ minMaxPrice[0] }}</label>
          </b-col>
          <b-col class="text-end">
            <label for="maxPrice">{{ minMaxPrice[1] }}</label>
          </b-col>
        </b-row>
        <label class="mb-1" for="accessibilityFilter">
          Difficulty range: {{ minMaxAccessibility[0] }} -
          {{ minMaxAccessibility[1] }}
        </label>
        <vue-slider
          v-model="minMaxAccessibility"
          :enable-cross="false"
          :min="min"
          :max="max"
          :interval="intervalAccessibility"
          class="mb-3"
          @change="emitToParent"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { defineComponent, ref, onMounted } from "@vue/composition-api";

export default defineComponent({
  components: {
    VueSlider,
  },
  setup(props,{ emit }) {
    const types = ref([
      { value: "", text: "All" },
      { value: "education", text: "Education" },
      { value: "recreational", text: "Recreational" },
      { value: "social", text: "Social" },
      { value: "diy", text: "DIY" },
      { value: "charity", text: "Charity" },
      { value: "cooking", text: "Cooking" },
      { value: "relaxation", text: "Relaxation" },
      { value: "music", text: "Music" },
      { value: "busywork", text: "Busywork" },
    ])
    const selectedType = ref("");
    const participants = ref(1);
    const min = ref(0);
    const max = ref(1);
    const intervalPrice = ref(0.05);
    const intervalAccessibility = ref(0.1);
    const minMaxPrice = ref([0, 1]);
    const minMaxAccessibility = ref([0, 1]);

    function emitToParent() {
      emit("childToParent", {
        type: selectedType.value,
        participants: participants.value,
        minPrice: minMaxPrice.value[0],
        maxPrice: minMaxPrice.value[1],
        minAccessibility: minMaxAccessibility.value[0],
        maxAccessibility: minMaxAccessibility.value[1],
      });
    }

    onMounted(() => {
      emitToParent()
    })

    return {
      types,
      selectedType,
      participants,
      min,
      max,
      intervalPrice,
      intervalAccessibility,
      minMaxPrice,
      minMaxAccessibility,
      emitToParent,
    }
  },
});
</script>

<style scoped></style>
