import type { NewsroomRef } from '../../types';

type NewsroomId = NewsroomRef['uuid'] | NewsroomRef['id'];

export interface ListResponse {
    members: NewsroomRef[];
}

export interface UpdateRequest {
    members: NewsroomId[];
}

export interface UpdateResponse {
    members: NewsroomRef[];
}
