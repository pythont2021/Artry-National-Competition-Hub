
export type Artwork = {
  id: number;
  user_id: string | null;
  title: string;
  artist_name: string | null;
  image_url: string;
  ai_hint: string | null;
  audience_likes: number | null;
  status: string | null;
  created_at: string | null;
};

export type Event = {
  id: number;
  title: string;
  event_date: string;
  event_time: string | null;
  location: string | null;
  description: string | null;
  category: string;
  created_at: string | null;
};

export type Testimonial = {
  id: number;
  name: string;
  artwork_title: string | null;
  quote: string | null;
  avatar_url: string | null;
  fallback_initials: string | null;
  created_at: string | null;
};

export type Vote = {
  id: number;
  artwork_id: number;
  user_id: string;
  created_at: string | null;
};
