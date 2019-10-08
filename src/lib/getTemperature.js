import client from "./client";

function getTemperature() {
  return client.get("/");
}

export default getTemperature;
