// 7.9
// Exercise TypeScript: real weather API with fetch and async/await

export {};

interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
  };
}

async function getParisWeather(): Promise<WeatherResponse> {
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=Europe/Paris"
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
  }

  const data = (await response.json()) as WeatherResponse;

  return data;
}

async function main(): Promise<void> {
  try {
    const weather = await getParisWeather();

    console.log("Latitude:", weather.latitude);
    console.log("Longitude:", weather.longitude);
    console.log("Timezone:", weather.timezone);
    console.log("Time:", weather.current.time);
    console.log("Temperature:", weather.current.temperature_2m, "°C");
    console.log("Humidity:", weather.current.relative_humidity_2m, "%");
    console.log("Wind speed:", weather.current.wind_speed_10m, "km/h");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}

main();