interface PopupProperties {
    closePopup: () => void;
    isOpen: boolean;
    children: React.ReactNode;
}

const PopupComponent: React.FC<PopupProperties> = ({ closePopup, isOpen = false, children }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-background">

            <button className="background-close"
                onClick={closePopup}
            ></button>


            <div className="popup-container">
                <div className="popup-header">
                    <button
                        className="close-button"
                        onClick={closePopup}>X</button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default PopupComponent;