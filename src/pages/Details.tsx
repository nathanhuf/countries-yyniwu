import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Country } from "../types";
import { useCountriesStore } from "../hooks/useCountries";
import "./Details.scss";

export const Details = () => {
  const { name } = useParams();
  const [details, setDetails] = useState<Country>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { cca3List } = useCountriesStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!name) {
        return;
      }
      setIsLoading(true);
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const data = await response.json();
      setDetails(data[0]);
      setIsLoading(false);
    };
    fetchData();
  }, [name]);

  const gotoPrevious = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="container-header">
        <button className="back-button" onClick={gotoPrevious}>
          <ArrowLeftIcon width="12px" />
          Back
        </button>
      </div>
      <div className="container-body">
        {!isLoading && details && (
          <>
            {<img className="country-flag" src={details.flags.svg} alt="country flag"/>}
            <div className="country-info">
              <h1 className="country-name">{details.name.common}</h1>
              <div className="country-details">
                <div className="col-1">
                  <div>
                    Native Name:{" "}
                    <span>
                      {Object.values(details.name.nativeName)[0].common}
                    </span>
                  </div>
                  <div>
                    Population: <span>{details.population}</span>
                  </div>
                  <div>
                    Region: <span>{details.region}</span>
                  </div>
                  <div>
                    Sub Region: <span>{details.subregion}</span>
                  </div>
                  <div>
                    Capital: <span>{details.capital}</span>
                  </div>
                </div>
                <div className="col-2">
                  <div>
                    Top Level Domain: <span>{details.tld}</span>
                  </div>
                  <div>
                    Currencies:{" "}
                    <span>
                      {Object.values(details.currencies)
                        .map((currency) => currency.name)
                        .join(", ")}
                    </span>
                  </div>
                  <div>
                    Language:{" "}
                    <span>{Object.values(details.languages).join(", ")}</span>
                  </div>
                </div>
              </div>
              <div className="country-borders">
                <div>Border Countries:</div>
                <div className="borders-wrapper">
                  {cca3List &&
                    details.borders &&
                    details.borders.map((cca3) => (
                      <span key={cca3} className="border">
                        {cca3List[cca3]}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
        {isLoading && (
          <div className="loading-indicator">Loading in progress...</div>
        )}
      </div>
    </div>
  );
};
