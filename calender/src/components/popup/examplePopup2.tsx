import "./examplePopup.css"

interface PopupProperties {
    id: number;
}
const ExamplePopup2: React.FC<PopupProperties> = ({ id }) => {
    return (
        <div className="example-popup-container">
            <p className="example-popup-text">{id}</p>
        </div>
    );
};
export default ExamplePopup2;