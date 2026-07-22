export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          clerk_user_id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: "student" | "admin";
          onboarding_completed: boolean;
          total_xp: number;
          current_streak: number;
          longest_streak: number;
          last_active_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & {
          clerk_user_id: string;
          email: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      career_categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          icon: string | null;
          sort_order: number;
        };
        Insert: Partial<Database["public"]["Tables"]["career_categories"]["Row"]> & {
          slug: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["career_categories"]["Row"]>;
      };
      careers: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category_id: string | null;
          short_description: string;
          overview: string;
          day_in_life: string | null;
          avg_salary_min: number | null;
          avg_salary_max: number | null;
          salary_currency: string;
          demand: "Low" | "Moderate" | "High" | "Very High" | "Emerging";
          difficulty: "Beginner" | "Intermediate" | "Advanced";
          ai_impact: "Low" | "Moderate" | "High" | "Transforming";
          future_outlook: string | null;
          remote_friendly: boolean;
          required_education: string | null;
          skills: string[];
          tools: string[];
          certifications: string[];
          roadmap: Json;
          recommended_courses: Json;
          sample_projects: string[];
          interview_questions: string[];
          gradient_from: string | null;
          gradient_to: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["careers"]["Row"]> & {
          slug: string;
          title: string;
          short_description: string;
          overview: string;
        };
        Update: Partial<Database["public"]["Tables"]["careers"]["Row"]>;
      };
      simulations: {
        Row: {
          id: string;
          career_id: string;
          title: string;
          description: string;
          estimated_minutes: number;
          difficulty: "Beginner" | "Intermediate" | "Advanced";
          scenario: Json;
          scoring_rubric: Json;
          xp_reward: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["simulations"]["Row"]> & {
          career_id: string;
          title: string;
          description: string;
        };
        Update: Partial<Database["public"]["Tables"]["simulations"]["Row"]>;
      };
      simulation_attempts: {
        Row: {
          id: string;
          clerk_user_id: string;
          simulation_id: string;
          status: "in_progress" | "completed" | "abandoned";
          responses: Json;
          compatibility_score: number | null;
          strengths: string[];
          weaknesses: string[];
          recommended_skills: string[];
          ai_feedback: string | null;
          xp_earned: number;
          started_at: string;
          completed_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["simulation_attempts"]["Row"]> & {
          clerk_user_id: string;
          simulation_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["simulation_attempts"]["Row"]>;
      };
      quiz_results: {
        Row: {
          id: string;
          clerk_user_id: string;
          answers: Json;
          top_career_ids: string[];
          ai_summary: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["quiz_results"]["Row"]> & {
          clerk_user_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["quiz_results"]["Row"]>;
      };
      xp_events: {
        Row: {
          id: string;
          clerk_user_id: string;
          amount: number;
          reason: string;
          related_id: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["xp_events"]["Row"]> & {
          clerk_user_id: string;
          amount: number;
          reason: string;
        };
        Update: Partial<Database["public"]["Tables"]["xp_events"]["Row"]>;
      };
      badges: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string;
          icon: string;
          criteria: Json;
        };
        Insert: Partial<Database["public"]["Tables"]["badges"]["Row"]> & {
          slug: string;
          name: string;
          description: string;
          icon: string;
        };
        Update: Partial<Database["public"]["Tables"]["badges"]["Row"]>;
      };
      user_badges: {
        Row: {
          id: string;
          clerk_user_id: string;
          badge_id: string;
          earned_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["user_badges"]["Row"]> & {
          clerk_user_id: string;
          badge_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["user_badges"]["Row"]>;
      };
      certificates: {
        Row: {
          id: string;
          clerk_user_id: string;
          simulation_attempt_id: string;
          career_id: string;
          certificate_number: string;
          compatibility_score: number;
          pdf_url: string | null;
          issued_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["certificates"]["Row"]> & {
          clerk_user_id: string;
          simulation_attempt_id: string;
          career_id: string;
          certificate_number: string;
          compatibility_score: number;
        };
        Update: Partial<Database["public"]["Tables"]["certificates"]["Row"]>;
      };
      bookmarks: {
        Row: {
          id: string;
          clerk_user_id: string;
          career_id: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["bookmarks"]["Row"]> & {
          clerk_user_id: string;
          career_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookmarks"]["Row"]>;
      };
      notifications: {
        Row: {
          id: string;
          clerk_user_id: string;
          title: string;
          body: string;
          type: "system" | "achievement" | "reminder" | "social";
          is_read: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["notifications"]["Row"]> & {
          clerk_user_id: string;
          title: string;
          body: string;
        };
        Update: Partial<Database["public"]["Tables"]["notifications"]["Row"]>;
      };
    };
    Views: {
      leaderboard: {
        Row: {
          clerk_user_id: string;
          full_name: string | null;
          avatar_url: string | null;
          total_xp: number;
          current_streak: number;
          rank: number;
        };
      };
    };
  };
}
