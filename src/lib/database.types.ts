
export type Profile = {
  id: string;
  updated_at: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: string | null;
  category: string | null;
  age_group: string | null;
  dob: string | null;
  board: string | null;
  school: string | null;
  grade: string | null;
  address: string | null;
  mobile: string | null;
  alt_contact: string | null;
  referral_code: string | null;
  profession: string | null;
  company_name: string | null;
  contact_person: string | null;
  services_offered: string | null;
};

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
