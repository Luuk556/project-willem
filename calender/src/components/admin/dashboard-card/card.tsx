import { FC, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface RoomDetails {
    id: number;
    name: string;
    capacity: number;
    sizeX: number;
    sizeY: number;
    positionX: number;
    positionY: number;
}

const CardDashboard: FC = ({ cardHeads, cardData, openPopup }) => {
const [search, setSearch] = useState({searchData: ""});

const filterList = (list: Array<RoomDetails>, input_text: string) => {
    if(input_text === "") return list
    const filterd_list = list.filter((room) =>
        room.name.toLowerCase().startsWith(input_text.toLowerCase())
    )
    return ((filterd_list.length) ? filterd_list : [])
}

return (
    <section className="dashboard-card">
        <p className="dashboard-card__title">Rooms</p>
        <input
            type="text"
            className="dashboard-card__search"
            placeholder="Search Room"
            onChange={search => {setSearch(searchData => ({...cardData, searchData: search.target.value.trim()}))}}
        />
        <div className="dashboard-card__table">
            <div className="dashboard-card__table-row dashboard-card__table-row--header" style={{ ["--row-count" as any]: cardHeads.length+1 }}>
                {cardHeads.map((head: String) => (
                    <p>{head}</p>
                ))}
                    <p>Edit</p>
            </div>
            {filterList(cardData, search.searchData).map((data) => (
                <div key={data.id} className="dashboard-card__table-row" style={{ ["--row-count" as any]: cardHeads.length+1 }}>
                    <p>{ data.name }</p>
                    <p>{ data.capacity }</p>
                    <p onClick={() => {openPopup(data)}}><FontAwesomeIcon icon={faPenToSquare} /></p>
                </div>
            ))}
        </div>
    </section>
)
};

export default CardDashboard