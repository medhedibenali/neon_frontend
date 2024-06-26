import { auth } from '@/stores';
import { Channel, Socket } from 'phoenix';
import { get } from 'svelte/store';

export function getSocket(service: string): Socket {
	const socket = new Socket(`ws://${import.meta.env.VITE_BACKEND_BASE_URL}/${service}/socket`, {
		params: {
			token: get(auth)?.token ?? null
		}
	});
	socket.connect();

	return socket;
}

export function getChatTopic(username: string): string {
	return `chat:${username}`;
}

export function getChannel(socket: Socket, topic: string): Promise<Channel> {
	return new Promise((resolve, reject) => {
		const channel = socket.channel(topic);

		channel
			.join()
			.receive('ok', () => {
				resolve(channel);
			})
			.receive('error', (resp) => {
				reject(resp);
			});
	});
}
