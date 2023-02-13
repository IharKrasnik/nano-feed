import { g as get } from "../../../../chunks/api.js";
async function load({ params }) {
  const { feedItemId } = params;
  let feedItem = await get(`feed/${feedItemId}`);
  return {
    ogTitle: `${feedItem.creators[0].fullName} post on Momentum`,
    ogDescription: `${feedItem.title || ""} ${feedItem.content || ""}`,
    ogImage: `${feedItem.attachments[0].url}`
  };
}
export {
  load
};
