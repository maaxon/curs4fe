const buildEnv = import.meta.env;

const envs = {
    FIREBASE_API_KEY: buildEnv["VITE_FIREBASE_API_KEY"] ?? "",
    FIREBASE_AUTH_DOMAIN: buildEnv["VITE_FIREBASE_AUTH_DOMAIN"] ?? "",
    FIREBASE_PROJECT_ID: buildEnv["VITE_FIREBASE_PROJECT_ID"] ?? "",
    FIREBASE_STORAGE_BUCKET: buildEnv["VITE_FIREBASE_STORAGE_BUCKET"] ?? "",
    FIREBASE_MESSAGING_SENDER_ID: buildEnv["VITE_FIREBASE_MESSAGING_SENDER_ID"] ?? "",
    FIREBASE_APPID: buildEnv["VITE_FIREBASE_APPID"] ?? "",
    FIREBASE_MEASUREMENT_ID: buildEnv["VITE_FIREBASE_MEASUREMENT_ID"] ?? "",
};

export const getBuildEnv = (key: keyof typeof envs) => envs[key];
