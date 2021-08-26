<template>
  <div id="app">
    <b-container>
      <div class="vh-100 text-left">
        <div class="container-centered">
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Home" active>
                This is home
              </b-tab>
              <b-tab title="Filters">
                This is with filters
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  components: {
  }
});
</script>

<style scoped>
.container-centered {
  top: 25%;
  left: 50%;
  width: 50%;
  transform: translateX(-50%);
  position: relative;
  height: min-content;
}
</style>
