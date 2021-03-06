import ApiClient from '../ApiClient';
import { Newsroom } from '../../types';
import { NewsroomSubscriptionCreateRequest } from './types';
import routing from '../routing';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export default class NewsroomSubscriptions {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    public async subscribe(
        newsroomId: NewsroomId,
        payload: NewsroomSubscriptionCreateRequest,
    ): Promise<void> {
        const url = routing.newsroomSubscriptionsUrl.replace(':newsroom_id', String(newsroomId));
        await this.apiClient.post(url, {
            payload,
        });
    }
}
