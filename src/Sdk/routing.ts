const routing = {
    coverageUrl: '/v2/coverage',
    jobsUrl: '/v2/jobs',
    licenseUnsubscribeUrl: '/v2/unsubscribe',
    newsroomsUrl: '/v2/newsrooms',
    newsroomCategoriesUrl: '/v2/newsrooms/:newsroom_id/categories',
    newsroomContactsUrl: '/v2/newsrooms/:newsroom_id/contacts',
    newsroomLanguagesUrl: '/v2/newsrooms/:newsroom_id/languages',
    /** @deprecated Please use newsroomSubscribeUrl instead */
    newsroomSubscriptionsUrl: '/v2/newsrooms/:newsroom_id/subscriptions',
    newsroomSubscribeUrl: '/v2/newsrooms/:newsroom_id/subscribe',
    newsroomUnsubscribeUrl: '/v2/newsrooms/:newsroom_id/unsubscribe',
    newsroomThemesUrl: '/v2/newsrooms/:newsroom_id/themes',
    newsroomWebhooksUrl: '/v2/newsrooms/:newsroom_id/webhooks',
    newsroomDomainsUrl: '/v2/newsrooms/:newsroom_id/domains',
    senderAddressesUrl: '/v2/sender-addresses',
    storiesUrl: '/v2/stories',
    storiesSearchUrl: '/v2/stories/search',
};

export default routing;
