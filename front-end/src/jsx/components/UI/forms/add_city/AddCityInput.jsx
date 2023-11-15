import "../../../../../css/AddCityInput.css";
import AddCityList from "./AddCityList";

export default function AddCityInput({
    value,
    onChange,
    placeholder,
    isChanging,
    cities,
    onClickListItem
}) {

    const onClickListItemHandler = (cityName, countryName) => {
        onClickListItem(cityName, countryName);
    }

    return (
        <div className="add-city-input__container">
            <input
                id="add-city"
                value={value}
                onChange={onChange}
                placeholder={placeholder} />
            {
                isChanging && value && cities.length > 0
                    ? <AddCityList cities={cities} onClickListItem={onClickListItemHandler} />
                    : null
            }
        </div>
    );
}