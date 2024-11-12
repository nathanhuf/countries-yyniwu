import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { Cca3List, Country } from "../types";
import { CountryCard, useSearchInput, useDropdown } from "../components";
import { useCountriesStore } from "../hooks/useCountries";
import "./Home.scss";

export const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {cca3List, setCca3List} = useCountriesStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery, setSearchQuery, SearchInput } = useSearchInput();
  const {
    selectedItem: selectedRegion,
    updateDropdownList,
    Dropdown: RegionDropdown,
  } = useDropdown(searchParams.get("region") || "", []);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountriesData();
    fetchInitialData();
  }, []);

  useEffect(() => {
    setSearchParams({ region: selectedRegion });
    fetchCountriesData();
    setSearchQuery("");
  }, [selectedRegion]);

  useEffect(() => {
    getFilteredCountries(searchQuery);
  }, [searchQuery, countries]);

  const fetchCountriesData = useCallback(async () => {
    setIsLoading(true);
    const response =
      selectedRegion === ""
        ? await fetch(`https://restcountries.com/v3.1/all`)
        : await fetch(
          `https://restcountries.com/v3.1/region/${selectedRegion}`
        );
    const data: Country[] = await response.json();
    setCountries(data);
    setIsLoading(false);
  }, [selectedRegion, cca3List, setCountries, setCca3List, updateDropdownList]);

  const fetchInitialData = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const data: Country[] = await response.json();
    setCca3List(
      data.reduce<Cca3List>((acc, { name, cca3 }) => {
        acc[cca3] = name.common;
        return acc;
      }, {})
    );
    updateDropdownList(
      Array.from(
        new Set(data.map((country: Country) => country.region))
      ).sort()
    );
    setIsLoading(false);
  }, [setCca3List, updateDropdownList]);

  const goToDetails = useCallback(
    (name: string) => {
      navigate(`/details/${name}`);
    },
    [navigate]
  );

  const getFilteredCountries = useCallback(
    debounce((query: string) => {
      const trimmedQuery = query.trim();
      if (trimmedQuery.length === 0) {
        setFilteredCountries(countries);
      }

      setFilteredCountries(
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(trimmedQuery.toLowerCase())
        )
      );
    }, 300),
    [countries, setFilteredCountries]
  );

  return (
    <div className="container">
      <header>
        {SearchInput}
        {RegionDropdown}
      </header>
      <section className="country--list">
        {isLoading && <span className="loading-indicator">Loading...</span>}
        {!isLoading &&
          filteredCountries.map((country: Country) => (
            <CountryCard
              key={country.cca3}
              countryDetails={country}
              onDetailsClick={() => goToDetails(country.name.common)}
            />
          ))}
      </section>
    </div>
  );
};
