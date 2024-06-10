import { createApi } from 'unsplash-js';

export const useUnsplash = () => {
  const config = useRuntimeConfig().public.unsplashAccessKey;
  const unsplash = createApi({
    accessKey: config as string,
  });

  return unsplash;
};
