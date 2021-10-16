export interface Config {
    apiUrl: string;
}

const development: Config = {
    apiUrl: "http://localhost:3001",
};

export let config: Config;
switch (process.env.REACT_APP_ENVIRONMENT) {
    case "development":
        config = development;
        break;
    default:
        console.warn("Defaulting to development config! Is this intended?");
        config = development;
        break;
}
