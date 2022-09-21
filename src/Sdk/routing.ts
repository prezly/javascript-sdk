const routing = {
    campaignsUrl: '/v2/campaigns',
    campaignRecipientsUrl: '/v2/campaigns/:campaign_id/recipients',
    coverageUrl: '/v2/coverage',
    jobsUrl: '/v2/jobs',
    licenseUrl: '/v2/licenses',
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
    newsroomPrivacyRequestsUrl: '/v2/newsrooms/:newsroom_id/privacy-requests',
    newsroomDomainsUrl: '/v2/newsrooms/:newsroom_id/domains',
    newsroomGalleriesUrl: '/v2/newsrooms/:newsroom_id/galleries',
    senderAddressesUrl: '/v2/sender-addresses',
    storiesUrl: '/v2/stories',
    storiesSearchUrl: '/v2/stories/search',
    storyCoverageUrl: '/v1/stories/:story_id/reports/coverage',
    snippetsUrl: '/v2/snippets',
};

export default routing;
