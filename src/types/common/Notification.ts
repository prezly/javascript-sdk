export enum NotificationStyle {
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    DANGER = 'danger',
}

export interface NotificationAction {
    target: string;
    name: string;
}

export interface Notification {
    id: string;
    type: string;
    style: NotificationStyle;
    title: string;
    description: string;
    actions: NotificationAction[];
}
