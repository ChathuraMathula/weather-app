import "../../../../../css/AddCityList.css";
import AddCityListItem from "./AddCityListItem";

export default function AddCityList({ cities, onClickListItem }) {

    const onClickListItemHandler = (cityName, countryName) => {
        onClickListItem(cityName, countryName);
    }

    return (
        <ul className="add-city-list">
            {cities.map((city, i) => {
                return (
                    <AddCityListItem
                        key={city.id}
                        city={city}
                        onClickListItem={onClickListItemHandler}
                    />
                );
            })}
        </ul>
    );
}