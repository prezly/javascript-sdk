import ApiClient from '../ApiClient';
import {ContactType, EmailSubscription, Newsroom} from '../../types';
import {
    NewsroomSubscribeRequest,
    NewsroomUnsubscribeRequest,
    UpdateNewsroomUnsubscribeDetailsRequest,
} from './types';
import routing from '../routing';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export default class Subscriptions {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    public async subscribeToNewsroom(
        newsroomId: NewsroomId,
        payload: NewsroomSubscribeRequest<ContactType.PERSON | ContactType.ORGANISATION>,
    ): Promise<EmailSubscription> {
        const url = routing.newsroomSubscribeUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ subscription: EmailSubscription }>(url, {
            payload,
        });

        return response.payload.subscription;
    }

    public async unsubscribeFromNewsroom(
        newsroomId: NewsroomId,
        payload: NewsroomUnsubscribeRequest,
    ): Promise<EmailSubscription> {
        const url = routing.newsroomUnsubscribeUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ subscription: EmailSubscription }>(url, {
            payload,
        });

        return response.payload.subscription;
    }

    public async updateNewsroomUnsubscribeDetails(
        newsroomId: NewsroomId,
        subscriptionId: EmailSubscription['id'],
        payload: UpdateNewsroomUnsubscribeDetailsRequest,
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
