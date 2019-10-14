<template>
	<article class="message">
		<div class="message-body">
			<h1 class="title is-5">Payment method</h1>

			<template v-if="selecting">
				<PaymentMethodSelector 
					:payment-methods="paymentMethods"
					:selected-payment-method="selectedPaymentMethod"
					@click="paymentMethodSelected"
				/>
			</template>

			<template v-else-if="creating">
				Create Payment Method
			</template>
			
			<template v-else>
				<template v-if="selectedPaymentMethod">
					<p>
						{{selectedPaymentMethod.card_type}} ending {{selectedPaymentMethod.last_four}} 
					</p>
					<br>
				</template>
				<div class="field is-grouped">
					<p class="control">
						<a href="" class="button is-info" @click.prevent="selecting = true">Change payment method</a>
					</p>
					<p class="control">
						<a href="" class="button is-info" @click.prevent="creating = true">Add n payment method</a>
					</p>
				</div>
			</template>	

			
		</div>
	</article>
</template>

<script>
	import PaymentMethodSelector from './PaymentMethodSelector'
	// import ShippingAddressCreator from './ShippingAddressCreator'

	export default {
		data() {
			return {
				selecting: false,
				creating: false,
				localPaymentMethods: this.paymentMethods,
				selectedPaymentMethod: null
			}
		},

		components: {
			PaymentMethodSelector,
		},

		props: {
			paymentMethods: {
				required: true,
				type:Array
			}
		},

		watch: {
			selectedPaymentMethod (paymentMethod) {
				this.$emit('input', paymentMethod.id)
			}
		},

		computed: {
			defaultPaymentMethod() {
				return this.localPaymentMethods.find(a => a.default === 1)
			}
		},

		methods: {
			paymentMethodSelected (paymentMethod) {
				this.switchPaymentMethod(paymentMethod)
				this.selecting = false
			},

			switchPaymentMethod (paymentMethod) {
				this.selectedPaymentMethod = paymentMethod
			},

			created (paymentMethod) {
				this.localPaymentMethods.push(paymentMethod)
				this.creating = false

				this.switchPaymentMethod(paymentMethod)
			}
		},

		created () {
			if(this.paymentMethods.length) {
				this.switchPaymentMethod(this.defaultPaymentMethod)
			}
		}
	}
</script>