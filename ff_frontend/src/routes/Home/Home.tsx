import Header from "../../components/Header/Header";
import './Home.css';
import UserForm from "../../components/UserForm/UserForm";
import ListUsers from "../../components/ListUsers/ListUsers";
import { User } from "../../redux/usersReducer";
import { connect } from "react-redux";
import { addClickUser } from "../../redux/actions";
import { AppDispatch, RootState } from "../../redux/store";
import { Country } from "../../redux/countriesReducer";

interface HomeProps {
  newUsers: User[],
  countries: Country[],
  addClickUser: (user: User) => void;
}

const Home = (props: HomeProps) => {

  return (
    <div>
      <Header/>
      <div className="home_container">
        <UserForm />
        <ListUsers newUsers={props.newUsers} allCountries={props.countries} addClickUser={props.addClickUser} border={false}/>
      </div>
    </div>
  );
}


const mapStateToProps = (state: RootState) => {
  return {
    newUsers: state.users ? state.users.newUsers : [],
    countries: state.countries ? state.countries.countries : [],
  };
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    addClickUser: (user: User) => dispatch(addClickUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)