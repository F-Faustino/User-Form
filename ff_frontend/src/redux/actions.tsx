import { Country } from "./countriesReducer"
import { User } from "./usersReducer"


function addUserAction(user: User) {
    return {
        type: "ADD_USER",
        payload: { user: user }
    }
};

function addClickUser(user: User) {
    return {
        type: "ADD_CLICK_USER",
        payload: { user: user }
    }
};

function saveCountries(countries: Country[]) {
    return {
        type: "SAVE_COUNTRIES",
        payload: { countries: countries }
    }
};

function saveUsers(users: User[]) {
    return {
        type: "SAVE_USERS",
        payload: { allUsers: users }
    }
};

export { addUserAction, addClickUser, saveCountries, saveUsers }