export interface Country {
    id: number,
    en: string,
    pt: string,
}

export interface CountriesState {
    countries: Country[]
}

const initialCountriesState: CountriesState = {
    countries: []
}

const countriesReducer = (state = initialCountriesState as CountriesState, action: any) => {
    switch (action.type) {
        case "SAVE_COUNTRIES":
            return {...state, countries: action.payload.countries}
        default: return state
    }
}

export default countriesReducer;