import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Header.css"
import { Link } from "react-router-dom";
import moment from "moment";

export default function Header(){

    const { t, i18n: {changeLanguage, language} } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(language);

    const changeToEN = () => {
        if(currentLanguage !== "en"){
            const newLanguage = "en";
            setCurrentLanguage(newLanguage);
            changeLanguage(newLanguage);
            moment.locale('en');
        }
    }

    const changeToPT = () => {
        if(currentLanguage !== "pt"){
            const newLanguage = "pt";
            setCurrentLanguage(newLanguage);
            changeLanguage(newLanguage);
            moment.locale('pt');
        }
    }
    return(
        <div className="container">
            <Link to="/" className="title">{"User Form Application"}</Link>
            <div className="options">
                <Link to="/revisited" className="page">{t('header.revisited')}</Link>
                <div className={currentLanguage === 'en' ? "language_option selected" : "language_option"} onClick={() => changeToEN()}>{"EN"}</div>
                <div className={currentLanguage === 'pt' ? "language_option selected" : "language_option"} onClick={() => changeToPT()}>{"PT"}</div>
            </div>
        </div>
    );
}