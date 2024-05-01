export interface IBook {
  _id?: string;
  customer_id: string;
  story_id: string;
  story_text: string;
  story_title: string;
  is_story_approved: boolean;
  is_active: boolean;
  image_prompts: string;
  creation_date: number;
  modification_date?: number;
  story_audio_path?: string;
  kid_name: string;
  is_modified_by_user?: boolean;
  covers?: {
    main?: string;
    mini?: string;
  };
}
