import ApiClient from '../ApiClient';
import { EmailSubscription, Newsroom } from '../../types';
import {
    NewsroomSubscribeRequest,
    NewsroomUnsubscribeRequest,
    NewsroomUpdateUnsubscribeExtraRequest,
} from './types';
import routing from '../routing';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export default class NewsroomEmailSubscriptions {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    public async subscribe(
        newsroomId: NewsroomId,
        payload: NewsroomSubscribeRequest,
    ): Promise<EmailSubscription> {
        const url = routing.newsroomSubscribeUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ subscription: EmailSubscription }>(url, {
            payload,
        });

        return response.payload.subscription;
    }

    public async unsubscribe(
        newsroomId: NewsroomId,
        payload: NewsroomUnsubscribeRequest,
    ): Promise<EmailSubscription> {
        const url = routing.newsroomUnsubscribeUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ subscription: EmailSubscription }>(url, {
            payload,
        });

        return response.payload.subscription;
    }

    public async updateUnsubscribeExtra(
        newsroomId: NewsroomId,
        subscriptionId: EmailSubscription['id'],
        payload: NewsroomUpdateUnsubscribeExtraRequest,
    ): Promise<EmailSubscription> {
        const url = routing.newsroomUnsubscribeUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.patch<{ subscription: EmailSubscription }>(
            `${url}/${subscriptionId}`,
            {
                payload,
            },
        );

        return response.payload.subscription;
    }
}
