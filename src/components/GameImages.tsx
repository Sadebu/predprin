export const GAME_IMAGES = {
  hero: 'https://image.qwenlm.ai/generated-images/d152008a-274f-4c87-864e-13ef8a054db9/_result.png',
  act1: 'https://image.qwenlm.ai/generated-images/8218874a-7ef6-4e44-be2f-0ea0ab42d21d/_result.png',
  act2: 'https://image.qwenlm.ai/generated-images/6201fb8e-4679-43b9-a33d-bb17545d04f8/_result.png',
  act3: 'https://image.qwenlm.ai/generated-images/a91be6b8-9c9e-4544-a825-ad0730cd157d/_result.png',
  act4: 'https://image.qwenlm.ai/generated-images/77e54c65-18be-4c3c-b990-97f404f419e8/_result.png',
  act5: 'https://image.qwenlm.ai/generated-images/56a36caf-6c3a-49bf-84d2-505bc9de969b/_result.png',
  act6: 'https://image.qwenlm.ai/generated-images/b7090278-846c-4b0a-84b1-1db819fca87f/_result.png',
};

export const getActImage = (act: number): string => {
  const images: Record<number, string> = {
    1: GAME_IMAGES.act1,
    2: GAME_IMAGES.act2,
    3: GAME_IMAGES.act3,
    4: GAME_IMAGES.act4,
    5: GAME_IMAGES.act5,
    6: GAME_IMAGES.act6,
  };
  return images[act] || GAME_IMAGES.hero;
};
