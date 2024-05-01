export interface IStory {
  _id?: string;
  customer_id: string;
  lang: string;
  characters: ICharactersStory[];
  main_plot: string;
  creation_date?: number;
  modification_date?: number;
  story_tokens: IStoryTokens;
  image_prompt_tokens: IImagesPromptTokens;
  image_prompt: {
    main_action: {
      text: string;
    };
    personality_main_character: {
      text: string;
    };
    description_main_setting: {
      text: string;
    };
    closure_story: {
      text: string;
    };
  };
}

export interface ICharactersStory {
  kid_id: string;
  family_context?: string[];
  personal_context?: string[];
  socioemotional_context?: string[];
  aspects?: string[];
  socioemotional_qualities?: string[];
}

export interface IStoryTokens {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  source: string;
}

export interface IImagesPromptTokens {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
