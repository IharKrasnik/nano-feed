const emojis = ['🔥', '⚡️', '✨', '🚀', '🌶', '💥', '💯', '👍', '💫', '🌚', '🌞', '🎇', '🎆'];

export default function (options) {
	const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
	return randomEmoji;
}
