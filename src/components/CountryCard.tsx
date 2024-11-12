import { Country } from "../types";
import "./CountryCard.scss";

export const CountryCard = ({
  countryDetails,
  onDetailsClick,
}: CountryCardProps) => {
  return (
    <div className="country-card" onClick={onDetailsClick}>
      {<img className="country-flag" src={countryDetails.flags.svg} />}
      <div className="country-data">
        <p className="country-name">{countryDetails.name.common}</p>
        <div className="country-statistics">
          <div>
            Population: <span>{countryDetails.population}</span>
          </div>
          <div>
            Region: <span>{countryDetails.region}</span>
          </div>
          <div>
            Capital: <span>{countryDetails.capital}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CountryCardProps {
  countryDetails: Country;
  onDetailsClick: () => void;
}
