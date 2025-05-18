import { discord } from "@discord/embedded-app-sdk";

let count = 0;
const counterEl = document.getElementById('counter');
const button = document.getElementById('increment');

// Connect to Discord
discord.ready.then(() => {
  console.log("Discord SDK ready");

  // Join shared activity state
  discord.activities.subscribe('ACTIVITY_INSTANCE_STATE_UPDATE', ({ data }) => {
    if (data && data.count !== undefined) {
      count = data.count;
      counterEl.textContent = count;
    }
  });

  // Request initial state
  discord.activities.getInstanceState().then((state) => {
    if (state && state.count !== undefined) {
      count = state.count;
      counterEl.textContent = count;
    }
  });

  // When button clicked, update shared state
  button.onclick = () => {
    count += 1;
    counterEl.textContent = count;

    discord.activities.setInstanceState({ count });
  };
});
