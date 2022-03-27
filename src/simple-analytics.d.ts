type sa_event = (name: string, cb?: () => void) => void;

interface Window {
    sa_event: sa_event;
}
