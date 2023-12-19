const initialState = {
    isLoggedIn: false,
    email: null,
    firstName: null,
    lastName: null,
    contactNumber: null,
    role: [],
    token: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                ...action.payload,
                isLoggedIn: true,
            };
        case 'CLEAR_USER':
            return initialState; // reset to initial state when logging out
        default:
            return state;
    }
};

export default userReducer;