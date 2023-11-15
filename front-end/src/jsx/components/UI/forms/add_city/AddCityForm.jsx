import "../../../../../css/AddCityForm.css";

export default function AddCityForm({ children, onSubmit }) {
    return (
        <div className="add-city-form-outer__container">
            <form onSubmit={onSubmit} className="add-city-form__container">
                {children}
            </form>
        </div>
    );
}