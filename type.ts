export type Champion = {
    id: string;
    name: string;
    title: string;
    lore: string;
    key: string;
    image: {
      full: string;
    };
    passive: {
      name: string;
      description: string;
    };
    spells: {
      id: string;
      name: string;
      description: string;
    }[];
  };