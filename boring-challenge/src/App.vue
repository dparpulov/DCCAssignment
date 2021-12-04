<template>
  <div id="app">
    <b-container class="d-flex justify-content-center" style="margin-top: 15%;">
      <b-card no-body class="w-75">
        <b-tabs card>
          <b-tab title="Home" active>
            <b-row>
              <b-col>
                <tab-home
                  :activity="activity"
                  :previousActivity="previousActivity"
                />
                <b-button
                  pill
                  variant="outline-primary"
                  size="sm"
                  @click="getPreviousActivity()"
                >
                  Get previous activity
                </b-button>
                <div class="d-flex justify-content-center align-items-end mt-3">
                  <b-button
                    pill
                    variant="primary"
                    size="lg"
                    @click="getActivity()"
                  >
                    I'm bored!
                  </b-button>
                </div>
              </b-col>
              <b-col class="d-flex flex-column">
                <activity-filters v-on:childToParent="onFilterChange" />
                <b-button
                  pill
                  variant="primary"
                  size="lg"
                  @click="getFilteredActivity()"
                  class="mt-auto mx-auto w-75 "
                >
                  Show me something specific!
                </b-button>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Saved">
            <saved-activities />
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

import TabHome from "./components/TabHome.vue";
import ActivityFilters from "./components/ActivityFilters.vue";
import SavedActivities from "./components/SavedActivities.vue";

export default Vue.extend({
  name: "App",
  components: {
    TabHome,
    ActivityFilters,
    SavedActivities,
  },
  data() {
    return {
      activity: [],
      previousActivity: [],
      fromChild: [],
    };
  },
  mounted() {
    this.getActivity();
  },
  methods: {
    getActivity() {
      this.previousActivity = this.activity;
      axios
        .get("http://www.boredapi.com/api/activity/")
        .then((response) => (this.activity = response.data))
        .catch((error) => console.log(error));
    },
    getFilteredActivity() {
      this.previousActivity = this.activity;
      axios
        .get("http://www.boredapi.com/api/activity/", {
          params: {
            type: this.fromChild[0],
            participants: this.fromChild[1],
            minPrice: this.fromChild[2],
            maxPrice: this.fromChild[3],
            minAccessibility: this.fromChild[4],
            maxAccessibility: this.fromChild[5],
          },
        })
        .then((response) => (this.activity = response.data))
        .catch((error) => console.log(error));
    },
    onFilterChange(value: []) {
      this.fromChild = value;
    },
    getPreviousActivity() {
      this.activity = this.previousActivity;
    },
  },
});
</script>

<style scoped></style>
