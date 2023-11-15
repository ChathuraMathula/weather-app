import "../../../../../css/AddCityListItem.css";

export default function AddCityListItem({ city, onClickListItem }) {

    const onClickListItemHandler = () => {

        onClickListItem(city.name, city.country);
    }

    return (
        <li
            onClick={onClickListItemHandler}
        >
            {
                city.state
                    ? `${city.name}, ${city.country} (${city.state})`
                    : `${city.name}, ${city.country}`
            }
        </li>
    );
}