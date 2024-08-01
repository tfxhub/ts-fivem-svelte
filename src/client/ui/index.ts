import { UISendActions } from "./actions";

export function SendUIEvent(action: UISendActions, data: any) {
    SendNUIMessage({
        action: action,
        data: data
    });
}