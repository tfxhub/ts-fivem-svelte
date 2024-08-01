import { DebugItem } from '$typings/events';
import { toggleVisible } from './visibility';
import { ClientSendEvents } from '$enums/events';
import { DebugEventSend, SendEvent } from '$utils/eventsHandlers';

/**
 * The debug actions that will show up in the debug menu.
 */
const SendDebuggers: DebugItem[] = [
    {
        label: 'Visibility',
        actions: [
            {
                label: 'True',
                action: () => toggleVisible(true),
            },
            {
                label: 'False',
                action: () => toggleVisible(false),
            },
        ],
    },
    {
        label: 'Slider',
        actions: [
            {
                label: 'Change Value',
                action: (value: number) => DebugEventSend(ClientSendEvents.imageResize, value),
                value: 50,
                type: 'slider',
            },
        ],
    },
    {
        label: 'Checkbox',
        actions: [
            {
                label: 'Toggle',
                action: (value: number) => DebugEventSend(ClientSendEvents.imageInvert, value),
                value: false,
                type: 'checkbox',
            },
        ],
    },
    {
        label: 'Text',
        actions: [
            {
                label: 'Type',
                action: (value: string) => DebugEventSend(ClientSendEvents.changeText, value),
                type: 'text',
                placeholder: 'Type here',
            },
        ],
    },
    {
        label: 'Button',
        actions: [
            {
                label: 'Reset Text',
                action: () => DebugEventSend(ClientSendEvents.resetText),
            },
        ],
    },

    {
        label: 'Debug receiver example.',
        actions: [
            {
                label: 'Emulates a POST To Client and get back a response.',
                type: 'text',
                placeholder: 'Type text to reverse.',
                action: (value: string) =>
                    SendEvent('debug', value).then((reversed: string) =>
                        console.log(reversed, 'color: red', 'color: white', 'color: green'),
                    ),
            },
        ],
    },
];

export default SendDebuggers;
