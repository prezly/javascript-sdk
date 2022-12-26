import type { NewsroomRef } from '../../types';

type NewsroomId = NewsroomRef['uuid'] | NewsroomRef['id'];

export interface ListResponse {
    members: NewsroomRef[];
}

export interface LinkRequest {
    members: NewsroomId[];
}

export interface LinkResponse {
    members: NewsroomRef[];
}
