import { createUser, getCountries, getUsers } from "../Api";
import { saveCountries, saveUsers, addUserAction } from "./actions";
import { store } from "./store";
import { User } from "./usersReducer";

const dispatch = store.dispatch

export const fetchCountries = async () => {
    const countries = await getCountries();
    dispatch(saveCountries(countries))
}

export const fetchUsers = async () => {
    const users = await getUsers();
    dispatch(saveUsers(users))
}

export const addUserThunk = async (user: User) => {
    dispatch(addUserAction(user))
    await createUser(user);
}