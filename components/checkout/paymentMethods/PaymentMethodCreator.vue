<template>
	<form action="#" @submit.prevent="store">
		<div class="field">
			<label class="label" for="card-element">
		      Credit or debit card
		    </label>
		    <div id="card-element">
		      <!-- A Stripe Element will be inserted here. -->
		    </div>
		</div>
		<div class="field">
			<p class="control">
				<button class="button is-info" :disabled="storing">
					Save card
				</button>
				<a href="#" class="button is-text" @click.prevent="$emit('cancel')">
					Cancel
				</a>
			</p>	
		</div>
	</form>
</template>

<script>
	export default {
		data () {
			return {
				stripe: null,
				card: null,
				storing: false
			}

		},

		methods: {
			async store () {
				this.storing = true
				const { token, error } = await this.stripe.createToken(this.card)

				if (error) {

				}else {
					let response = await this.$axios.$post('payment-methods', {
						token: token.id
					})

					this.$emit('added', response.data)
				}

				this.storing = false
			}
		},

		mounted () {
			const stripe = Stripe('pk_test_O1rtQkDW73J6UG39dTf35MWv00BJoHrEP9')

			this.stripe = stripe
			
			this.card = this.stripe.elements().create('card', {
				style: {
					base: {
						fontSize: '16px'
					}
				}
			})

			this.card.mount('#card-element')
		}
	}
</script>