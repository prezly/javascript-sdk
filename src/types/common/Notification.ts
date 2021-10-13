enum Style {
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    DANGER = 'danger',
}

interface Action {
    target: string;
    name: string;
}

export default interface Notification {
    id: string;
    type: string;
    style: Style;
    title: string;
    description: string;
    actions: Action[];
}
