export default function(state, { type, payload }) {

    console.log('here', state, type, payload);
    switch(type) {
        case "LOGIN_USER":
            return {
                currentUser: payload.user,
                isAuth: payload.isAuth
            }
        default :
         return state;
    }

}