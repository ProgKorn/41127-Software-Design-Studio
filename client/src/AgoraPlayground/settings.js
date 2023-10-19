import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "e5709f8be2604869864acfa71a1f8b42";
const token =
  "007eJxTYJBbV7V+92n2jzOn/vhSmPNWYhdL71xn7xvsD1c4b3gS/e2FAkOqqbmBZZpFUqqRmYGJhZmlhZlJYnJaorlhoiFQ1MTo3E6D1IZARgbeslUsjAwQCOKzMOQmZuYxMAAAHegh2w==";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";