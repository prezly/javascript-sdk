
import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Contact, EmailSubscription, Newsroom } from '../../types';

import type { SubscribeRequest, UnsubscribeRequest, UpdateUnsubscribeDetailsRequest } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export class Client {
    private readonly apiClient: DeferredJobsApiClient;

    constructor(apiClient: DeferredJobsApiClient) {
        this.apiClient = apiClient;
    }

    public async subscribeToNewsroom<Type extends Contact.Type>(
        newsroomId: NewsroomId,
        payload: SubscribeRequest<Type>,
    ): Promise<EmailSubscription> {
        const url = routing.newsroomSubscribeUrl.replace(':newsroom_id', String(newsroomId));
        const { subscription } = await this.apiClient.post<{ subscription: EmailSubscription }>(
            url,
            {
                payload,
            },
        );

        return subscription;
    }

    public async unsubscribeFromNewsroom(
        newsroomId: NewsroomId,
        payload: UnsubscribeRequest,
    ): Promise<EmailSubscription> {
        const url = routing.newsroomUnsubscribeUrl.replace(':newsroom_id', String(newsroomId));
        const { subscription } = await this.apiClient.post<{ subscription: EmailSubscription }>(
            url,
            {
                payload,
            },
        );

        return subscription;
    }

    public async updateNewsroomUnsubscribeDetails(
        newsroomId: NewsroomId,
        subscriptionId: EmailSubscription['id'],
        payload: UpdateUnsubscribeDetailsRequest,
    ): Promise<EmailSubscription> {
        const url = routing.newsroomUnsubscribeUrl.replace(':newsroom_id', String(newsroomId));
        const { subscription } = await this.apiClient.patch<{ subscription: EmailSubscription }>(
            `${url}/${subscriptionId}`,
            {
                payload,
            },
        );

        return subscription;
    }

    public async unsubscribeFromLicense(payload: UnsubscribeRequest): Promise<EmailSubscription> {
        const url = routing.licenseUnsubscribeUrl;
        const { subscription } = await this.apiClient.post<{ subscription: EmailSubscription }>(
            url,
            {
                payload,
            },
        );

        return subscription;
    }

    public async updateLicenseUnsubscribeDetails(
        subscriptionId: EmailSubscription['id'],
        payload: UpdateUnsubscribeDetailsRequest,
    ): Promise<EmailSubscription> {
        const url = routing.licenseUnsubscribeUrl;
        const { subscription } = await this.apiClient.patch<{ subscription: EmailSubscription }>(
            `${url}/${subscriptionId}`,
            {
                payload,
            },
        );

        return subscription;
    }
}
