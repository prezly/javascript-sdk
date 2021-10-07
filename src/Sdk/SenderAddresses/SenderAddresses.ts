import { SenderAddress } from '../../types';

import ApiClient from '../ApiClient';
import routing from '../routing';

import { SenderAddressCreateRequest, SenderAddressUpdateRequest } from './types';

export default class SenderAddresses {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    public async list(): Promise<SenderAddress[]> {
        const response = await this.apiClient.get<{ senders: SenderAddress[] }>(
            routing.senderAddressesUrl,
        );
        return response.payload.senders;
    }

    public async create(
        payload: SenderAddressCreateRequest,
    ): Promise<SenderAddress> {
        const response = await this.apiClient.post<{ sender: SenderAddress }>(
            routing.senderAddressesUrl,
            { payload },
        );
        return response.payload.sender;
    }

    public async get(
        senderId: SenderAddress['id'],
    ): Promise<SenderAddress> {
        const response = await this.apiClient.get<{ sender: SenderAddress }>(
            `${(routing.senderAddressesUrl)}/${senderId}`,
        );
        return response.payload.sender;
    }

    public async update(
        senderId: SenderAddress['id'],
        payload: SenderAddressUpdateRequest,
    ): Promise<SenderAddress> {
        const response = await this.apiClient.patch<{ sender: SenderAddress }>(
            `${(routing.senderAddressesUrl)}/${senderId}`,
            { payload },
        );
        return response.payload.sender;
    }

    public async remove(senderId: SenderAddress['id']): Promise<void> {
        await this.apiClient.delete(`${routing.senderAddressesUrl}/${senderId}`);
    }
}
