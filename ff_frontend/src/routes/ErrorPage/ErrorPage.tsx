import Header from "../../components/Header/Header";
import './ErrorPage.css';
import { useTranslation } from "react-i18next";

export default function ErrorPage() {

  const { t } = useTranslation();
  return (
    <div>
      <Header/>
      <div className="errorText">
        {t('notPermited')}
      </div>
    </div>
  );
}