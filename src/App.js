// import logo from "./logo.svg";
// import "./App.css";
// import { useEffect, useState } from "react";

// function App() {
//   const [countries, setCountries] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");

//   const handleChange = (e) => {
//     setSearch(e.target.value);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resp = await fetch("https://restcountries.com/v3.1/all");
//         const data = await resp.json();
//         setCountries(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const data = countries.filter((country) =>
//       country.name.common.toLowerCase().includes(search.toLowerCase())
//     );
//     setFiltered(data);
//   }, [search]);

//   console.log(countries);
//   return (
//     <div>
//       <div className="inp">
//         <input
//           type="text"
//           placeholder="Enter a country"
//           onChange={(e) => handleChange(e)}
//         />
//       </div>
//       <div className="App">
//         <div className="countryCard">
//         {search === ""
//           ? countries.map((country) => {
//               return (
                
//                 <div>
//                   <img src={country.flags.png} alt={country.flag}></img>
//                   <p>{country.name.common}</p>
//                 </div>
                
//               );
//             })
//           : filtered.map((country) => {
//               return (
                
//                 <div >
//                   <img src={country.flags.png} alt={country.flag}></img>
//                   <p>{country.name.common}</p>
//                 </div>
                
//               );
//             })}
//             </div>
//       </div>
//     </div>
//   );
// }

// export default App;






import { useEffect, useState } from "react";
import axios from "axios";
import CountriesSearch from './Component/CountriesSearch';

function App() {
  const [countryData, setCountryData] = useState([]);
  const [filterCountryData, setFilterCountryData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const fetchCountryData = async () => {
    let url = "https://restcountries.com/v3.1/all";
    try {
      let response = await axios.get(url);
      setCountryData(response.data);
      setFilterCountryData(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  const searchCountries = async () => {
    if (searchText === "") {
      setFilterCountryData(countryData);
    }

    let url = "https://restcountries.com/v3.1/all";

    try {
      let response = await axios.get(url);

      const filteredData = response.data.filter((country) =>
        country.name.common.toLowerCase().includes(searchText.toLowerCase())
      );

      setFilterCountryData(filteredData);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    searchCountries();
  }, [searchText]);

  return (
    <div>
      <div className="searchSection">
        <form>
          <input
            type="text"
            placeholder="Search for countries..."
            value={searchText}
            onChange={(e) => handleChange(e)}
          />
        </form>
      </div>
      <div className="App">
        {filterCountryData &&
          filterCountryData.map((ele) => <CountriesSearch data={ele} />)}
      </div>
    </div>
  );
}

export default App;