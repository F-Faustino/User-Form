export interface User {
    name: string,
    surname: string,
    countryId: number,
    birthday: string
}

export interface UsersState {
    newUsers: User[],
    allUsers: User[],
    clickedUser: User | null,
    authKey: string

}

const initialUsersState: UsersState = {
    newUsers: [],
    allUsers: [],
    clickedUser: null,
    authKey: "#1234"
}

const usersReducer = (state = initialUsersState as UsersState, action: any) => {
    switch (action.type) {
        case "ADD_USER":
            let users = Object.values(state.newUsers)
            users.push(action.payload.user)
            return {...state, newUsers: users}
        case "ADD_CLICK_USER":
            return {...state, clickedUser: action.payload.user}
        case "SAVE_USERS":
            return {...state, allUsers: action.payload.allUsers}
        default: return state
    }
}

export default usersReducer;