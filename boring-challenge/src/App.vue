<template>
  <div id="app">
    <b-container>
      <div class="vh-100 text-left">
        <div class="container-centered">
          <b-card no-body>
            <b-tabs card>
              <b-container class="filter-tab">
                <b-tab title="Home" active>
                  <b-row>
                    <b-col >
                      <tab-home :activity="activity" :previousActivity="previousActivity"/>
                      <b-button pill variant="outline-primary" size="sm" @click="getPreviousActivity()">Get previous activity</b-button>
                      <div class="d-flex justify-content-center">
                        <b-button pill variant="primary" size="lg" @click="getActivity()">I'm bored!</b-button>
                      </div>
                    </b-col>
                    <b-col>
                      <activity-filters v-on:childToParent="onFilterChange"/>
                      <div class="d-flex justify-content-center pt-2">
                        <b-button pill variant="primary" size="lg" @click="getFilteredActivity()">Show me something specific!</b-button>
                      </div>
                    </b-col>
                  </b-row>
                </b-tab>
              </b-container>
              <!-- <b-tab title="Filters">
                <tab-filters/>
                
              </b-tab> -->
            </b-tabs>
          </b-card>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios'

import TabHome from './components/TabHome.vue'
import ActivityFilters from './components/ActivityFilters.vue'

export default Vue.extend({
  name: 'App',
  components: {
    TabHome,
    ActivityFilters,
  },
  data() {
    return {
      activity: [],
      previousActivity: [],
      fromChild: [],
    };
  },
  mounted() {
    axios
      .get("http://www.boredapi.com/api/activity/")
      .then((response) => (this.activity = response.data))
      .then((response) => (this.previousActivity = response.data))
      .catch((error) => console.log(error));
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
          minprice: this.fromChild[2],
          maxprice: this.fromChild[3],
          minaccessibility: this.fromChild[4],
          maxaccessibility: this.fromChild[5],
        }
      })
      .then((response) => (this.activity = response.data))
      .catch((error) => console.log(error));
    },
    onFilterChange (value: []) {
      this.fromChild = value
    },
    getPreviousActivity() {
      this.activity = this.previousActivity;
    },
  }
});
</script>

<style scoped>
.container-centered {
  top: 25%;
  left: 50%;
  width: 80%;
  transform: translateX(-50%);
  position: relative;
  height: min-content;
}
</style>
