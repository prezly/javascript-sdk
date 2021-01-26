import ApiClient from "../ApiClient";
import {Newsroom} from "../../types";
import {NewsroomSubscriptionCreateRequest} from "./types";
import routing from "../routing";

export default class NewsroomSubscriptions {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    public async create(
        newsroomId: Newsroom['id'],
        payload: NewsroomSubscriptionCreateRequest,
    ): Promise<void> {
        const url = routing.newsroomSubscriptionsUrl.replace(':newsroom_id', String(newsroomId));
        await this.apiClient.post(url, {
            payload,
        });
    }
}