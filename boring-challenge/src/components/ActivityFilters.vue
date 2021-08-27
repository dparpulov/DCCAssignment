<template>
    <b-container class="filter-tab">
			<h4>Filters</h4>
			<b-row>
				<b-col>
					<div>
						<label for="typeFilter">Type</label>
						<br>
							<b-form-select v-model="selectedType" :options="types" v-on:change="emitToParent"></b-form-select>
					</div>
					<div>
						<label for="participantsFilter">Participants</label>
						<b-form-input type="number" min="0" max="8" v-model="participants" v-on:change="emitToParent"></b-form-input>
					</div>
					<label for="budgetFilter">Max. Budget: {{maxBudget}}</label>
					<div>
						<b-form-input v-model="maxBudget" type="range" min="0" max="1" step="0.05" v-on:change="emitToParent"></b-form-input>
					</div>
					<label for="accessibilityFilter">Max. Difficulty: {{maxAccessibility}}</label>
					<div>
						<b-form-input v-model="maxAccessibility" type="range" min="0" max="1" step="0.05" v-on:change="emitToParent"></b-form-input>
					</div>
				</b-col>
			</b-row>
		</b-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	components: {
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
			maxBudget: "",
			maxAccessibility: "",
			filters: [{}],
		};
	},
	methods: {
		emitToParent () {
			this.filters = [
				this.selectedType,
				this.participants,
				this.maxBudget,
				this.maxAccessibility
			]
      this.$emit('childToParent', this.filters)
    }
	}
})
</script>

<style scoped>
.filter-tab {
	padding: 0;
}
</style>