export const state = () => ({
	categories: []
})

export const getters = {
	categories (state) {
		return state.categories
	}
}

export const mutations = {
	SET_CATEGORIES(state, categories) {
		state.categories = categories
	}
}

export const actions = {
	async nuxtServerInit({ commit }) {
		try {
			let response = await this.$axios.$get('categories')

			commit('SET_CATEGORIES', response.data)
		} catch(e) {
			// statements
			console.log(e.response);
		}
		
	}
}