import { SafeEventBus } from "./event-bus.safe";

export type EventBus = SafeEventBus;
export const bus = new SafeEventBus();
export { SafeEventBus } from "./event-bus.safe";
