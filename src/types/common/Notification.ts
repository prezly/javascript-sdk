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

export interface Notification<T extends string = string> {
    id: string;
    type: T;
    style: NotificationStyle;
    title: string;
    description: string;
    actions: NotificationAction[];
}
