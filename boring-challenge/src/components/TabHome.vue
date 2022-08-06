<template>
  <b-row v-if="activity">
    <b-col>
      <b-card-text>
        <div class="d-flex justify-content-center align-items-center border border-dark mb-3">
          <h5 class="font-weight-bold m-0 p-2 text-center" style="min-height: 5rem;">
            {{ activity.activity ? activity.activity : "N/A" }}
          </h5>
        </div>
        <p class="text-capitalize">Type: {{ activity.type ? activity.type : "N/A" }}</p>
        <p>
          <b-icon-person-fill v-if="activity.participants === 1" />
          <b-icon-people-fill v-else-if="activity.participants > 1" class="mx-2" />
          <span v-if="activity.participants === 1">
            {{ activity.participants ? activity.participants : "N/A" }} participant
          </span>
          <span v-else>{{ activity.participants ? activity.participants : "N/A" }} participants </span>
        </p>
        <p>
          <label for="price">Price: {{ priceString ? priceString : "N/A" }}</label>
          <b-progress
            id="price"
            :value="activity.price ? activity.price: 0"
            :max="MAX"
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
          Difficulty: {{ difficultyString ? difficultyString : "N/A" }}
        </label>
        <b-progress id="accessibility" :max="MAX" show-progress animated>
          <b-progress-bar
            :value="activity.accessibility ? activity.accessibility : 0"
            :variant="accessibilityVariant ? accessibilityVariant : 'N/A' "
          />
        </b-progress>
        <div class="d-flex justify-content-between mt-3">
          <b-button
              pill
              variant="outline-primary"
              size="sm"
              @click="getPreviousActivity"
          >
            Get previous activity
          </b-button>
          <b-button
              pill
              variant="outline-primary"
              size="sm"
              @click="saveActivity(activity)"
          >
            Save activity
          </b-button>
        </div>
        <div class="d-flex justify-content-center align-items-end mt-3">
          <b-button
              pill
              variant="primary"
              size="lg"
              @click="fetchActivity"
          >
            I'm bored!
          </b-button>
        </div>
      </b-card-text>
    </b-col>
    <b-col class="d-flex flex-column">
      <ActivityFilters @childToParent="handleFilterChange" />
      <b-button
          pill
          variant="primary"
          size="lg"
          class="mt-auto mx-auto w-75 "
          @click="fetchFilteredActivity"
      >
        Show me something specific!
      </b-button>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import {
  onMounted,
  computed,
  defineComponent,
  ref
} from '@vue/composition-api'
import {Activity, Filters} from "@/Types/types";
import axios from "axios";
import ActivityFilters from "@/components/ActivityFilters.vue";

export default defineComponent({
  components: { ActivityFilters },
  props: {},
  setup(props, { emit }) {
    const BASE_URL = "http://www.boredapi.com/api/activity/";
    const MAX = 1;

    const activity = ref();
    const previousActivity = ref();
    const filters = ref();
    const priceString = computed(() => {
      if (activity.value.price == 0) return 'Free'
      if (activity.value.price <= 0.3) return 'Low'
      if (activity.value.price <= 0.6) return 'Medium'
      if (activity.value.price > 0.6) return 'High'
    })
    const difficultyString = computed(() => {
      if (activity.value.accessibility <= 0.3) return 'Easy'
      if (activity.value.accessibility <= 0.6) return 'Medium'
      if (activity.value.accessibility > 0.6) return 'Hard'
    })
    const accessibilityVariant = computed(() => {
      if (activity.value.accessibility <= 0.3) return 'success'
      if (activity.value.accessibility <= 0.6) return 'warning'
      if (activity.value.accessibility > 0.6) return 'danger'
    })

    async function fetchActivity() {
      try {
        if (activity.value)
          previousActivity.value = activity.value;

        const { data } = await axios.get(BASE_URL);

        activity.value = data;

      } catch (error) {
        console.log(error)
      }
    }

    function handleFilterChange(filtersValues: Filters) {
      filters.value = filtersValues;
    }
    function getPreviousActivity() {
      activity.value = previousActivity.value;
    }

    async function fetchFilteredActivity() {
      try {
        previousActivity.value = activity.value;
        const { data } = await axios
          .get(BASE_URL, {
            params: {
              type: filters.value.type,
              participants: filters.value.participants,
              minprice: filters.value.minPrice,
              maxprice: filters.value.maxPrice,
              minaccessibility: filters.value.minAccessibility,
              maxaccessibility: filters.value.maxAccessibility,
            },
          })

        activity.value = data;
      } catch (error) {
        console.log(error);
      }
    }

    function saveActivity(activity: Activity) {
      emit("activityToSave", {
        activity: activity,
      });
    }

    onMounted(() => {
      fetchActivity()
    })

    return {
      MAX,
      activity,
      previousActivity,
      priceString,
      difficultyString,
      accessibilityVariant,
      fetchActivity,
      fetchFilteredActivity,
      handleFilterChange,
      getPreviousActivity,
      saveActivity,
    }
  }
})
</script>

<style scoped></style>
