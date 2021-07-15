import { Newsroom, Gallery } from '../../types';

import ApiClient from '../ApiClient';
import routing from '../routing';

import { GalleryCreateRequest, GalleryUpdateRequest } from './types';

type NewsroomId = Newsroom['uuid'] | Newsroom['id'];

export default class NewsroomGalleries {
    private readonly apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    public async list(newsroomId: NewsroomId): Promise<Gallery[]> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ albums: Gallery[] }>(url);
        return response.payload.albums;
    }

    public async create(
        newsroomId: NewsroomId,
        payload: GalleryCreateRequest,
    ): Promise<Gallery> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.post<{ album: Gallery }>(url, {
            payload,
        });
        return response.payload.album;
    }

    public async get(
        newsroomId: NewsroomId,
        galleryId: Gallery['id'],
    ): Promise<Gallery> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.get<{ album: Gallery }>(
            `${url}/${galleryId}`,
        );
        return response.payload.album;
    }

    public async update(
        newsroomId: NewsroomId,
        galleryId: Gallery['id'],
        payload: GalleryUpdateRequest,
    ): Promise<Gallery> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        const response = await this.apiClient.patch<{ album: Gallery }>(
            `${url}/${galleryId}`,
            {
                payload,
            },
        );
        return response.payload.album;
    }

    public async remove(newsroomId: NewsroomId, galleryId: Gallery['id']): Promise<void> {
        const url = routing.newsroomGalleriesUrl.replace(':newsroom_id', String(newsroomId));
        await this.apiClient.delete(`${url}/${galleryId}`);
    }
}
