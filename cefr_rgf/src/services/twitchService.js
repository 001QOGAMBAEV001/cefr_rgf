const TwitchApi = require('twitch-api-v5');

const twitchApi = new TwitchApi({
    clientId: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
});

exports.getStreamInfo = async (twitchUrl) => {
    try {
        const channelName = twitchUrl.split('/').pop();
        const { stream } = await twitchApi.streams.channel({ channelName });

        if (stream) {
            return {
                isLive: true,
                viewers: stream.viewers,
                startedAt: stream.created_at,
            };
        } else {
            return {
                isLive: false,
            };
        }
    } catch (error) {
        console.error('Twitch API xatosi:', error);
        throw new Error('Twitch ma\'lumotlarini olishda xatolik yuz berdi');
    }
};