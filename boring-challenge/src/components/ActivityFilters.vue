<template>
    <b-container class="filter-tab">
			<h4>Filters</h4>
			<b-row>
				<b-col>
					<div>
						<label for="typeFilter">Type</label>
						<br>
						<b-form-select class="rounded border-dark w-100" 
														style="padding-top:6px;
															padding-bottom:6px;
															padding-left:12px;
															padding-right:12px"
													v-model="selectedType" :options="types" v-on:change="emitToParent"/>
					</div>
					<div>
						<label for="participantsFilter">Participants</label>
						<b-form-input class="border-dark" type="number" min="0" max="8" v-model="participants" v-on:change="emitToParent"></b-form-input>
					</div>
					<label for="priceFilter">Max. Budget: {{maxPrice}}</label>
					<div>
						<vue-slider v-model="minMaxPrice" :enable-cross="false" :min="0" :max="1" interval="0.05" v-on:change="emitToParent"></vue-slider>
						<b-row>
							<b-col>
								<label for="minPrice">{{minMaxPrice[0]}}</label>
							</b-col>
							<b-col class="text-end">
								<label for="maxPrice">{{minMaxPrice[1]}}</label>
							</b-col>
						</b-row>

					</div>
					<label for="accessibilityFilter">Max. Difficulty: {{maxAccessibility}}</label>
					<div>
						<vue-slider v-model="minMaxAccessibility" :enable-cross="false" :min="0" :max="1" interval="0.1" v-on:change="emitToParent"></vue-slider>
						<b-row>
							<b-col>
								<label for="minAccessibility">{{minMaxAccessibility[0]}}</label>
							</b-col>
							<b-col class="text-end">
								<label for="maxAccessibility">{{minMaxAccessibility[1]}}</label>
							</b-col>
						</b-row>
					</div>
				</b-col>
			</b-row>
		</b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default Vue.extend({
	components: {
		VueSlider
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
			maxPrice: "",
			minMaxPrice: [0, 1],
			maxAccessibility: "",
			minMaxAccessibility: [0, 1],
			filters: [{}],
		};
	},
	methods: {
		emitToParent () {
			this.filters = [
				this.selectedType,
				this.participants,
				this.minMaxPrice[0],
				this.minMaxPrice[1],
				this.minMaxAccessibility[0],
				this.minMaxAccessibility[1],
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