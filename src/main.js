import { DiscordSDK } from "@discord/embedded-app-sdk";

const discord = new DiscordSDK("1373645689409507358");

let count = 0;
const counterEl = document.getElementById("counter");
const button = document.getElementById("increment");

discord.ready.then(() => {
  console.log("Discord SDK ready");

  discord.activities.subscribe("ACTIVITY_INSTANCE_STATE_UPDATE", ({ data }) => {
    if (data?.count !== undefined) {
      count = data.count;
      counterEl.textContent = count;
    }
  });

  discord.activities.getInstanceState().then((state) => {
    if (state?.count !== undefined) {
      count = state.count;
      counterEl.textContent = count;
    }
  });

  button.onclick = () => {
    count += 1;
    counterEl.textContent = count;
    discord.activities.setInstanceState({ count });
  };
});
