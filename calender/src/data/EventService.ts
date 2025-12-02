import axios from "axios";
import { EventPreview } from "./datatypes/eventDatatypes";

class EventService {
    private eventPreviewList: EventPreview[] = []
    public async getEventPreviewsByDate(date: Date): Promise<void> {
        try {
            const response = await axios.get<EventPreview[]>(
                "http://localhost:5295/event/event-previews",
                { params: { date } }
            );
            this.eventPreviewList = response.data;
        } catch (error) {
            console.error("Failed to fetch event previews:", error);
            this.eventPreviewList = [];
        }
    }
}

export default EventService;