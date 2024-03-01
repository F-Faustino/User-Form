import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import ListUsers from "../../components/ListUsers/ListUsers";
import { User } from "../../redux/usersReducer";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { fetchUsers } from "../../redux/thunks";
import { Country } from "../../redux/countriesReducer";

interface RevisitedProps {
  allUsers: User[],
  countries: Country[],
  getAllUsers: () => void;
}

function Revisited(props: RevisitedProps) {

  useEffect(()=> {
    const fetchData = async () => {
      await props.getAllUsers()
    }
    fetchData()
  },[])

  return (
    <div>
      <Header/>
      <div className="home_container">
        <ListUsers newUsers={props.allUsers} allCountries={props.countries} addClickUser={() => null} border={true} />
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    allUsers: state.users ? state.users.allUsers : [],
    countries: state.countries ? state.countries.countries : [],
  };
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllUsers: async () => { await fetchUsers()}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Revisited)