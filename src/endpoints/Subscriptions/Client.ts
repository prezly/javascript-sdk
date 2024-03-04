import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { Contact, EmailSubscription, Newsroom } from '../../types';

import type {
    SubscribeRequest,
    UnsubscribeRequest,
    UpdateUnsubscribeDetailsRequest,
} from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function subscribeToNewsroom<Type extends Contact.Type>(
        newsroomId: NewsroomId,
        payload: SubscribeRequest<Type>,
    ): Promise<EmailSubscription> {
        const url = routing.newsroomSubscribeUrl.replace(':newsroom_id', String(newsroomId));
        const { subscription } = await api.post<{ subscription: EmailSubscription }>(url, {
            payload,
        });

        return subscription;
    }

    async function unsubscribeFromNewsroom(
        newsroomId: NewsroomId,
        payload: UnsubscribeRequest,
    ): Promise<EmailSubscription> {
        const url = routing.newsroomUnsubscribeUrl.replace(':newsroom_id', String(newsroomId));
        const { subscription } = await api.post<{ subscription: EmailSubscription }>(url, {
            payload,
        });

        return subscription;
    }

    async function updateNewsroomUnsubscribeDetails(
        newsroomId: NewsroomId,
        subscriptionId: EmailSubscription['id'],
        payload: UpdateUnsubscribeDetailsRequest,
    ): Promise<EmailSubscription> {
        const url = routing.newsroomUnsubscribeUrl.replace(':newsroom_id', String(newsroomId));
        const { subscription } = await api.patch<{ subscription: EmailSubscription }>(
            `${url}/${subscriptionId}`,
            {
                payload,
            },
        );

        return subscription;
    }

    async function unsubscribeFromLicense(payload: UnsubscribeRequest): Promise<EmailSubscription> {
        const url = routing.licenseUnsubscribeUrl;
        const { subscription } = await api.post<{ subscription: EmailSubscription }>(url, {
            payload,
        });

        return subscription;
    }

    async function updateLicenseUnsubscribeDetails(
        subscriptionId: EmailSubscription['id'],
        payload: UpdateUnsubscribeDetailsRequest,
    ): Promise<EmailSubscription> {
        const url = routing.licenseUnsubscribeUrl;
        const { subscription } = await api.patch<{ subscription: EmailSubscription }>(
            `${url}/${subscriptionId}`,
            {
                payload,
            },
        );

        return subscription;
    }

    return {
        subscribeToNewsroom,
        unsubscribeFromNewsroom,
        unsubscribeFromLicense,
        updateNewsroomUnsubscribeDetails,
        updateLicenseUnsubscribeDetails,
    };
}
