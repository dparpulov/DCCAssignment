<template>
  <div id="app">
    <b-container class="d-flex justify-content-center" style="margin-top: 15%;">
      <b-card no-body class="w-75">
        <b-tabs card>
          <b-tab title="Home" active>
            <b-row>
              <b-col>
                <TabHome
                  :activity="activity"
                  :previousActivity="previousActivity"
                />
                <b-button
                  pill
                  variant="outline-primary"
                  size="sm"
                  @click="getPreviousActivity"
                >
                  Get previous activity
                </b-button>
                <div class="d-flex justify-content-center align-items-end mt-3">
                  <b-button
                    pill
                    variant="primary"
                    size="lg"
                    @click="getActivity"
                  >
                    I'm bored!
                  </b-button>
                </div>
              </b-col>
              <b-col class="d-flex flex-column">
                <ActivityFilters @childToParent="handleFilterChange" />
                <b-button
                  pill
                  variant="primary"
                  size="lg"
                  class="mt-auto mx-auto w-75 "
                  @click="getFilteredActivity"
                >
                  Show me something specific!
                </b-button>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Saved">
            <SavedActivities />
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import VueCompositionAPI, { defineComponent, ref, onMounted } from '@vue/composition-api'
Vue.use(VueCompositionAPI)

import TabHome from "./components/TabHome.vue";
import ActivityFilters from "./components/ActivityFilters.vue";
import SavedActivities from "./components/SavedActivities.vue";
import {Filters} from "@/Types/types";


export default defineComponent({
  components: {
    TabHome,
    ActivityFilters,
    SavedActivities,
  },
  setup() {
    const activity = ref({});
    const previousActivity = ref({});
    const filters = ref();

    const BASE_URL = "http://www.boredapi.com/api/activity/";

    function getActivity() {
      previousActivity.value = activity.value;
      axios
        .get(BASE_URL)
        .then((response) => (activity.value = response.data))
        .catch((error) => console.log(error));
    }
    function getFilteredActivity() {
      previousActivity.value = activity.value;
      axios
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
        .then((response) => (activity.value = response.data))
        .catch((error) => console.log(error));
    }
    function handleFilterChange(filtersValues: Filters) {
      filters.value = filtersValues;
    }
    function getPreviousActivity() {
      activity.value = previousActivity.value;
    }

    onMounted(() => {
      getActivity()
    })

    return {
      activity,
      previousActivity,
      getActivity,
      getFilteredActivity,
      handleFilterChange,
      getPreviousActivity,
    }
  },
})
</script>

<style scoped></style>
