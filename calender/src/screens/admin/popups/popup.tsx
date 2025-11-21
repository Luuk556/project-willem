interface PopupUsersProps {
    closePopup: () => void;
    openPopup: Object;
    children: React.ReactNode;
}

const Popup: React.FC<PopupUsersProps> = ({ closePopup, openPopup, children }) => {

    const clickClosePopup = (e: React.MouseEvent<HTMLElement>) => {
        if(e.target === e.currentTarget){
            closePopup();
        }
    }

    if(Object.keys(openPopup).length) return(
        <div className="popup-background" onClick={(mouseTarget) => clickClosePopup(mouseTarget)}>
            <div className="popup-container">
                <div className="popup-header">
                    <button className="close-button" onClick={(mouseTarget) => clickClosePopup(mouseTarget)}>X</button>
                </div>
                { children }
            </div>
        </div>
    )
}

export default Popup;