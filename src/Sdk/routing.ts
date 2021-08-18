const routing = {
    coverageUrl: '/v2/coverage',
    newsroomsUrl: '/v2/newsrooms',
    newsroomCategoriesUrl: '/v2/newsrooms/:newsroom_id/categories',
    newsroomContactsUrl: '/v2/newsrooms/:newsroom_id/contacts',
    newsroomLanguagesUrl: '/v2/newsrooms/:newsroom_id/languages',
    /** @deprecated Please use newsroomSubscribeUrl instead */
    newsroomSubscriptionsUrl: '/v2/newsrooms/:newsroom_id/subscriptions',
    newsroomSubscribeUrl: '/v2/newsrooms/:newsroom_id/subscribe',
    newsroomUnsubscribeUrl: '/v2/newsrooms/:newsroom_id/unsubscribe',
    licenseUnsubscribeUrl: '/v2/unsubscribe',
    newsroomThemesUrl: '/v2/newsrooms/:newsroom_id/themes',
    newsroomWebhooksUrl: '/v2/newsrooms/:newsroom_id/webhooks',
    newsroomDomainsUrl: '/v2/newsrooms/:newsroom_id/domains',
    storiesUrl: '/v2/stories',
    storiesSearchUrl: '/v2/stories/search',
};

export default routing;
