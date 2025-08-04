import type { DeferredJobsApiClient } from '../../api';
import { routing } from '../../routing';
import type { ExtendedTemplate, Template } from '../../types';

import type { CreateRequest, UpdateRequest } from './types';

type TemplateId = Template['id'];

export type Client = ReturnType<typeof createClient>;

export function createClient(api: DeferredJobsApiClient) {
    async function list(): Promise<Template[]> {
        const url = routing.templatesUrl;
        const { templates } = await api.get<{ templates: Template[] }>(url);
        return templates;
    }

    async function get(templateId: TemplateId): Promise<ExtendedTemplate> {
        const url = routing.templatesUrl;
        const { template } = await api.get<{ template: ExtendedTemplate }>(`${url}/${templateId}`);
        return template;
    }

    async function create(payload: CreateRequest): Promise<ExtendedTemplate> {
        const url = routing.templatesUrl;
        const { template } = await api.post<{ template: ExtendedTemplate }>(url, {
            payload,
        });
        return template;
    }

    async function update(
        templateId: TemplateId,
        payload: UpdateRequest,
    ): Promise<ExtendedTemplate> {
        const url = routing.templatesUrl;
        const { template } = await api.patch<{ template: ExtendedTemplate }>(
            `${url}/${templateId}`,
            {
                payload,
            },
        );
        return template;
    }

    async function doDelete(templateId: TemplateId): Promise<void> {
        const url = routing.templatesUrl;
        return api.delete(`${url}/${templateId}`);
    }

    return {
        list,
        get,
        create,
        update,
        delete: doDelete,
    };
}
