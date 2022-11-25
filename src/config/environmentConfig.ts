type EnvironmentConfig = {
  mainServerApiBasePath: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const EnvironmentConfig = {
  mainServerApiBasePath: import.meta.env.VITE_BASE_SERVER_PATH,
  mainClientApiBasePath: import.meta.env.VITE_BASE_CLIENT_PATH,
  defaultProcratinasionMinutesDuration: import.meta.env
    .VITE_DEFAULT_PROCRASTINATION_MINUTES_DURATION,
};
