export interface Notification<T extends string = string> {
    id: string;
    type: T;
    style: Notification.Style;
    title: string;
    description: string;
    actions: Notification.Action[];
}

export namespace Notification {
    export enum Style {
        SUCCESS = 'success',
        INFO = 'info',
        WARNING = 'warning',
        DANGER = 'danger',
    }

    export interface Action {
        target: string;
        name: string;
    }
}
