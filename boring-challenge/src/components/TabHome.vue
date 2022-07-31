<template>
  <b-card-text>
    <div class="d-flex justify-content-center align-items-center border border-dark mb-3">
      <h5 class="font-weight-bold m-0 p-2 text-center" style="min-height: 5rem;">
        {{ activity.activity }}
      </h5>
    </div>
    <p class="text-capitalize">Type: {{ activity.type }}</p>
    <p>
      <b-icon-person-fill v-if="activity.participants === 1" />
      <b-icon-people-fill v-else-if="activity.participants > 1" class="mx-2" />
      <span v-if="activity.participants === 1">
        {{ activity.participants }} participant
      </span>
      <span v-else>{{ activity.participants }} participants </span>
    </p>
    <p>
      <label for="price">Price: {{ getPriceString() }}</label>
      <b-progress
        id="price"
        :value="activity.price"
        :max="max"
        show-progress
        animated
      />
    </p>
    <p>
      Visit at:
      <a :href="activity.link ? activity.link : undefined">
        {{ activity.link ? activity.link : "N/A" }}
      </a>
    </p>
    <label for="accessibility">
      Difficulty: {{ getDifficultyString() }}
    </label>
    <b-progress id="accessibility" :max="max" show-progress animated>
      <b-progress-bar
        :value="activity.accessibility"
        :variant="getAccessibilityVariant()"
      />
    </b-progress>
  </b-card-text>
</template>

<script lang="ts">
import Vue from "vue";
import VueCompositionAPI from '@vue/composition-api'
import { defineComponent, ref } from '@vue/composition-api'
import {Activity} from "@/Types/types";
Vue.use(VueCompositionAPI)

export default defineComponent({
  props: {
    activity: {
      type: Object as () => Activity,
      required: true,
    },
  },
  setup(props) {
    const max = ref(1)

    function getPriceString(): string {
      if (props.activity.price == 0) return 'Free'
      if (props.activity.price <= 0.3) return 'Low'
      if (props.activity.price <= 0.6) return 'Medium'
      return 'High'
    }

    function getDifficultyString(): string {
      if (props.activity.accessibility <= 0.3) return 'Easy'

      if (props.activity.accessibility <= 0.6) return 'Medium'

      return 'Hard'
    }

    function getAccessibilityVariant(): string {
      if (props.activity.accessibility <= 0.3) return 'success'

      if (props.activity.accessibility <= 0.6) return 'warning'

      return 'danger'
    }

    return {
      max,
      getPriceString,
      getDifficultyString,
      getAccessibilityVariant,
    }
  }
})
</script>

<style scoped></style>
