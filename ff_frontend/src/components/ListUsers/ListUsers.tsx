import { useTranslation } from "react-i18next";
import "./ListUsers.css"
import { User } from "../../redux/usersReducer";
import moment from "moment";
import { Country } from "../../redux/countriesReducer";

interface ListUsersProps {
  newUsers: User[],
  allCountries: Country[],
  addClickUser: (user: User) => void,
  border: boolean
}

function ListUsers(props: ListUsersProps){

  const { t, i18n: {language} } = useTranslation();
  const onClick = (user: User) => {
    props.addClickUser(user)
  }
  return(
      <div className={props.border ? "list_container border" : "list_container left_border"}>
        <span>{t('list.title')}</span>
        <div className="titles">
          <div className="first column">{t("list.name")}</div>
          <div className="column">{t("list.country")}</div>
          <div className="column">{t("list.birthday")}</div>
        </div>
        {props.newUsers && props.newUsers.length > 0 ? props.newUsers.map((user, key) => {
          const usersCountry = props.allCountries.find((element: Country) => element.id === user.countryId)
          return (
          <div key={key} className="rows" onClick={() => onClick(user)}>
            <div className="first row">{user.name}</div>
            <div className="row">{usersCountry ? (language === 'en' ? usersCountry.en : usersCountry.pt) : null}</div>
            <div className="row">{moment(user.birthday).format('DD/MM/YYYY')}</div>
          </div>
        )}) : null}
      </div>
  );
}

export default ListUsers