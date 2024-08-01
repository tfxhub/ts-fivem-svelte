import { helloWorld } from '@common/index';
import { log } from '@common/utils';
import { SendUIEvent } from './ui';
import { UIReceiveActions, UISendActions } from './ui/actions';

on('onClientResourceStart', (name: string) => {
    if (name != GetCurrentResourceName()) return;

    log.info('Client script started.');

    log.debug(helloWorld());
});

RegisterCommand('pidev', () => {
    log.info('Sending:', UISendActions.ShowUI, ' = ', true);
    SendUIEvent(UISendActions.ShowUI, true);
    SetNuiFocus(true, true);
}, false);

RegisterNuiCallback(UIReceiveActions.CloseUI, (_: any, cb: Function) => {
    SendUIEvent(UISendActions.ShowUI, false);
    SetNuiFocus(false, false);
    cb(1);
});