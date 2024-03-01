import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./UserForm.css"
import { User } from "../../redux/usersReducer";
import { addClickUser } from "../../redux/actions";
import { connect, useDispatch } from "react-redux";
import moment from "moment";
import { CircleLoader } from "react-spinners";
import { addUserThunk, fetchCountries } from "../../redux/thunks";
import { Country } from "../../redux/countriesReducer";
import { RootState } from "../../redux/store";

interface UserFormProps { 
    newUsers: User[];
    countries: Country[];
    clickUser: User | null;
    addUser: (user: User) => void;
    addClickUser: (user: User) => void;
    getAllCountries: () => void;
}

function UserForm(props: UserFormProps){

    const { t, i18n: {language} } = useTranslation();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [countryId, setCountry] = useState(0);
    const [birthday, setBirthday] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        props.getAllCountries()
    }, [])

    const onSave = (e: any) => {
        e.preventDefault()
        setLoading(true);
        props.addClickUser({name, surname, countryId, birthday})
        props.addUser({name, surname, countryId, birthday})
        setName('')
        setSurname('')
        setCountry(0)
        setBirthday('')
        setLoading(false)
    }

    const getCountryName = (id: number) => {
        if(language === 'en'){
            return props.countries.find((country) => country.id === id)?.en
        } else {
            return props.countries.find((country) => country.id === id)?.pt
        }
    }

    const getAge = (birthday: string) => {
        const yearsOld = moment().diff(moment(birthday), 'years')
        if(yearsOld === 0){
            const monthsOld = moment().diff(moment(birthday), 'months')
            if(monthsOld === 0){
                return moment().diff(moment(birthday), 'days').toString() + t('form.greetingDays')
            } else {
                return monthsOld.toString() + t('form.greetingMonths')
            }
        } else  {
            return yearsOld.toString() + t('form.greetingYears')
        }
    }

    let disableButton = name === '' || surname === '' || birthday === '' || countryId === 0 || moment().diff(moment(birthday), 'days') < 1
    return(
        <div className="formContainer">
            <h2>{t('form.titleForm')}</h2>
            <form onSubmit={onSave}>
                <div className="formColumnRow">
                    <div className="formText">{t("form.nameText")}</div>
                    <input className="formInput" required value={name} onChange={(event) => setName(event.target.value)} type="text" id="fname" name="fname" />
                </div>   
                <div className="formColumnRow">    
                    <div className="formText">{t("form.surnameText")}</div>
                    <input className="formInput" required value={surname} onChange={(event) => setSurname(event.target.value)} type="text" id="fsurname" name="fsurname" />
                </div>
                <div className="formColumnRow">   
                    <div className="formText">{t("form.countriesText")}</div>
                    <select className="formInput" required  value={countryId} onChange={(event) => setCountry(parseInt(event.target.value))} name="cars" id="cars">
                        <option value={0}>{t("form.countriesPlaceholder")}</option>
                        {props.countries && props.countries.map((country) => (
                            <option key={country.id} value={country.id}>{language === 'en' ? country.en : country.pt}</option>
                        ))}
                    </select>
                </div>
                <div className="formColumnRow">   
                    <div className="formText">{t("form.birthdayText")}</div>
                    <input className="formInput" required  value={birthday} onChange={(event) => setBirthday(event.target.value)} type="date" id="fbirthdate" name="fbirthdate"/>
                </div>
                {loading ? 
                    <button className="btn" disabled={true}>{t('form.loading')}</button>
                :   
                    <button className="btn" disabled={disableButton}>{t('form.save')}</button>
                }
            </form>
            {props.clickUser ? 
                <div className="greetings">{
                    t('form.greeting',{
                        name: props.clickUser?.name,
                        country: getCountryName(props.clickUser?.countryId),
                        day: moment(props.clickUser.birthday).format('D'),
                        month: moment(props.clickUser.birthday).locale(language).format('MMMM'),
                        year: getAge(props.clickUser.birthday).toString()
                    })}
                </div>
            : null}
        </div>
    );
}

const mapStateToProps = (state: RootState) => {
    return {
        newUsers: state.users ? state.users.newUsers : [],
        clickUser: state.users ? state.users.clickedUser : null,
        countries: state.countries ? state.countries.countries : [],
    };
  }
  
  const mapDispatchToProps = (dispatch: any) => {
    return {
      addUser: async (user: User) => { await addUserThunk(user)},
      addClickUser: (user: User) => dispatch(addClickUser(user)),
      getAllCountries: async () => { await fetchCountries()}
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserForm)