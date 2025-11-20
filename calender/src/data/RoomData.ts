import { EventDetails, EventPreview } from "./datatypes/eventDatatypes"
import { Room } from "./datatypes/roomDatatypes";
// a temporary file containing a list of all events

class RoomList {
    roomArray: Array<Room> = [
        {
            id: 0,
            name: "Canteen",
            posX: 65,
            posY: 10,
            sizeX: 25,
            sizeY: 25
        },
        {
            id: 1,
            name: "Entrance Hall",
            posX: 35,
            posY: 10,
            sizeX: 30,
            sizeY: 40
        },
        {
            id: 2,
            name: "Kitchen",
            posX: 65,
            posY: 35,
            sizeX: 25,
            sizeY: 15
        },
        {
            id: 3,
            name: "Room 001",
            posX: 15,
            posY: 10,
            sizeX: 20,
            sizeY: 10
        },
        {
            id: 4,
            name: "Room 002",
            posX: 15,
            posY: 20,
            sizeX: 5,
            sizeY: 35
        },
        {
            id: 5,
            name: "Room 003",
            posX: 25,
            posY: 25,
            sizeX: 10,
            sizeY: 25
        },
        {
            id: 6,
            name: "Room 004",
            posX: 15,
            posY: 55,
            sizeX: 25,
            sizeY: 10
        },
        {
            id: 7,
            name: "Room 005",
            posX: 45,
            posY: 55,
            sizeX: 30,
            sizeY: 10
        },
        {
            id: 8,
            name: "Room 006",
            posX: 75,
            posY: 50,
            sizeX: 15,
            sizeY: 15
        },
        {
            id: 9,
            name: "Room 007",
            posX: 25,
            posY: 65,
            sizeX: 15,
            sizeY: 10
        },
        {
            id: 10,
            name: "Room 008",
            posX: 45,
            posY: 65,
            sizeX: 15,
            sizeY: 10
        },
        {
            id: 11,
            name: "Room 009",
            posX: 25,
            posY: 75,
            sizeX: 35,
            sizeY: 10
        }
    ]

    getRoomById(ID: number, fullData: boolean = false): Room | string {
        let result: Room | string = "Room not found";
        for (let i = 0; i < this.roomArray.length; i++) {
            if (ID === this.roomArray[i].id) {

                result = fullData ? this.roomArray[i] : this.roomArray[i].name
                break;
            }
        }
        return result;
    }

    getAllRooms(): Array<Room> {
        return this.roomArray;
    }

}

export default new RoomList();