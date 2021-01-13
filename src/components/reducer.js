export const initialState = {
	user : null,
	search : '',
	path : '/',
	pack : {
		id: '',
		tickets: 0
	}
};

const reducer = (state, action) => {

	switch(action.type) {
		case 'SET_USER':
			return {
				...state,
				user: action.user,
			};

		case 'SET_PATH':
			return {
				...state,
				path: action.path,
			};

		case 'SET_SEARCH':
			return {
				...state,
				search: action.search,
			};

		case 'SET_PACK':
			return {
				...state,
				pack: { 
					id: action.packid,
					tickets: action.tickets
				}
			};

		default:
			return state;
	}
};

export default reducer;