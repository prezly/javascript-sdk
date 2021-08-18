import ApiClient from '../ApiClient';
import { ContactType, EmailSubscription, Newsroom } from '../../types';
import {
    SubscribeRequest,
    UnsubscribeRequest,
    UpdateUnsubscribeDetailsRequest,
} from './types';
import routing from '../routing';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export default class Subscriptions {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    public async subscribeToNewsroom<Type extends ContactType>(
        newsroomId: NewsroomId,
        payload: SubscribeRequest<Type>,
    ): Promise<EmailSubscription> {
        const url = routing.newsroomSubscribeUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ subscription: EmailSubscription }>(url, {
            payload,
        });

        return response.payload.subscription;
    }

    public async unsubscribeFromNewsroom(
        newsroomId: NewsroomId,
        payload: UnsubscribeRequest,
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
        payload: UpdateUnsubscribeDetailsRequest,
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

    public async unsubscribeFromLicense(
        payload: UnsubscribeRequest,
    ): Promise<EmailSubscription> {
        const url = routing.licenseUnsubscribeUrl;
        const response = await this.apiClient.post<{ subscription: EmailSubscription }>(url, {
            payload,
        });

        return response.payload.subscription;
    }

    public async updateLicenseUnsubscribeDetails(
        subscriptionId: EmailSubscription['id'],
        payload: UpdateUnsubscribeDetailsRequest,
    ): Promise<EmailSubscription> {
        const url = routing.licenseUnsubscribeUrl;
        const response = await this.apiClient.patch<{ subscription: EmailSubscription }>(
            `${url}/${subscriptionId}`,
            {
                payload,
            },
        );

        return response.payload.subscription;
    }
}
