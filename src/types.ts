export interface Cca3List {
  [key: string]: string;
}

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  capital: string[];
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  region: string;
  subregion: string;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [key: string]: {
      name: string;
      nativeName: string;
    };
  };
  borders: string[];
  tld: string[];
  cca3: string;
}