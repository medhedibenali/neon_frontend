<script lang="ts">
	import type { PartialUser } from '@/types';
	import { Root, Image, Fallback } from '../ui/avatar';

	export let user: PartialUser;
	export let className: string = 'h-8 w-8';
</script>

<Root class={`${className}`}>
	<Image
		src={import.meta.env.VITE_BACKEND_URL + user.profilePicture}
		alt={user.username}
	/>
	<Fallback>{user.username.charAt(0).toUpperCase()}</Fallback>
</Root>
