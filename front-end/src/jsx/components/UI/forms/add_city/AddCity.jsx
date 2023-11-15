import { useEffect, useState } from "react";
import "../../../../../css/AddCity.css";
import { ADD_CITY_URL, GET_CITIES_BY_NAME_URL } from "../../../../../js/constants/constants";
import AddCityButton from "../../buttons/AddCityButton";
import AddCityForm from "./AddCityForm";
import AddCityInput from "./AddCityInput";

export default function AddCity({ onAddCity }) {

    const [inputValue, setInputValue] = useState("");
    const [cities, setCities] = useState([]);
    const [cityName, setCityName] = useState("");
    const [countryName, setCountryName] = useState("");
    const [isChanging, setIsChanging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [addCityDisabled, setAddCityDisabled] = useState(true);

    useEffect(() => {
        if (!inputValue || inputValue.length < 2) {
            return;
        }

        const inputValues = inputValue.split(",");

        setCityName(inputValues[0].trim());

        if (inputValues.length == 2) {
            setCountryName(inputValues[1].trim().toUpperCase());
        } else {
            setCountryName("");
        }


    }, [inputValue])

    useEffect(() => {
        if (!isChanging || !cityName) {
            return;
        }

        const body = {
            cityName: cityName,
            countryName: countryName
        };

        const timeout = setTimeout(() => {
            setIsLoading(true);
            fetch(GET_CITIES_BY_NAME_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then(res => res.json())
                .then(data => {
                    setCities([...data])
                    setIsLoading(false);
                });
        }, 1000);

        return () => clearTimeout(timeout);

    }, [cityName, countryName])


    const onAddCityHandler = async (event) => {
        event.preventDefault();

        if (cityName && countryName) {
            const body = {
                cityName: cityName,
                countryName: countryName
            };

            onAddCity(false);

            await fetch(ADD_CITY_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then(res => res.json())
                .then(cityCodes => {
                    onAddCity(cityCodes);
                    setInputValue("");
                    setIsChanging(false);
                    setAddCityDisabled(true);
                })
        }
    };


    const onChangeInputValueHandler = (event) => {
        const input = event.target.value;

        setIsChanging(true);
        setAddCityDisabled(true);
        setCities([]);

        if (!input) {
            setIsChanging(false);
        }
        setInputValue(input);
    }

    const onClickListItemHandler = (cityName, countryName) => {
        setInputValue(`${cityName}, ${countryName}`);
        setIsChanging(false);
        setAddCityDisabled(false);
    }

    return (
        <AddCityForm onSubmit={onAddCityHandler} >
            <AddCityInput
                value={inputValue}
                onChange={onChangeInputValueHandler}
                placeholder="Enter a city (eg: Colombo,LK)"
                isChanging={isChanging}
                cities={cities}
                onClickListItem={onClickListItemHandler}
            />
            <AddCityButton
                type="submit"
                disabled={addCityDisabled}
                isChanging={isChanging}
                isLoading={isLoading}
            />
        </AddCityForm>
    );
}