import { wsSend } from "./connection";

import fs from 'flatstore';
import { getPrimaryGamePanel } from "./room";



export function addChatMessage(msg) {

    if (!msg)
        return null;

    if (!msg.payload)
        return null;

    let channel = 'chat';
    let chatMessages = [];

    if (Array.isArray(msg.payload)) {

        for (var i = 0; i < msg.payload.length; i++) {
            let payload = msg.payload[i];
            if (payload.room_slug) {
                channel = 'chat/' + payload.room_slug;
            } else {
                channel = 'chat';
            }

            chatMessages = getChatMessages(channel);
            chatMessages.push(payload);
            saveChatMessages(channel, chatMessages);
        }

        if (msg.payload.length > 0)
            fs.set('chatUpdated', Date.now());

    } else {
        if (msg.payload.room_slug) {
            channel = 'chat/' + msg.payload.room_slug;
        }

        chatMessages = getChatMessages(channel);
        chatMessages.push(msg.payload);
        saveChatMessages(channel, chatMessages);
    }




    // localStorage.removeItem(key)
}

export function clearChatMessages(channel) {
    channel = channel || 'chat';
    localStorage.removeItem(channel);
    fs.set(channel, []);
}

export function filterChatMessages(chatMessages, chatMode) {
    chatMode = chatMode || 'all';

    if (chatMode == 'game') {
        let game = fs.get('game');
        if (game) {
            let filtered = [];
            for (var msg of chatMessages) {
                if (msg.room_slug)
                    continue;
                if (msg.game_slug == game.game_slug) {
                    filtered.push(msg);
                }
            }
            chatMessages = filtered;
        }
    }
    else if (chatMode == 'room') {
        let filtered = [];
        let gamepanel = getPrimaryGamePanel();
        for (var msg of chatMessages) {
            if (msg.room_slug == gamepanel?.room?.room_slug) {
                filtered.push(msg);
            }
        }
        chatMessages = filtered;
    }
    return chatMessages;
}

export function saveChatMessages(channel, chatMessages) {

    let count = chatMessages.length;
    if (count > 100) {
        chatMessages = chatMessages.slice(count - 100, count);
    }

    fs.set(channel, chatMessages);
    localStorage.setItem(channel, JSON.stringify(chatMessages));
    fs.set('chatUpdated', Date.now());
}
export function getChatMessages(channel) {

    // let channel = 'chat';
    // if (chatMode != 'all') {
    //     channel = 'chat/' + chatMode;
    // }
    let chatMessages = fs.get(channel);
    if (!chatMessages) {
        chatMessages = JSON.parse(localStorage.getItem(channel));
        if (!chatMessages)
            chatMessages = [];
    }

    // chatMessages = filterChatMessages(chatMessages, chatMode);

    return chatMessages;
}

export async function sendChatMessage() {

    let message = fs.get('chatMessage');
    if (!message)
        return false;

    let game = fs.get('game');
    let game_slug = game?.game_slug;

    let gamepanel = getPrimaryGamePanel();
    let room_slug = gamepanel?.room?.room_slug;

    let payload = { message, game_slug, room_slug }

    await wsSend({ type: 'chat', payload })
}