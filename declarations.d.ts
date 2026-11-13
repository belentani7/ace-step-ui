declare interface Track {
  id: string;
  title: string;
  lyrics?: string;
  style?: string;
  duration?: number;
  created_at?: string;
  createdAt?: string;
  tags?: string[];
  audio_url?: string;
  audioUrl?: string;
  is_public?: boolean;
  isPublic?: boolean;
  like_count?: number;
  likeCount?: number;
  view_count?: number;
  viewCount?: number;
  user_id?: string;
  userId?: string;
  creator?: string;
  creator_avatar?: string;
  creatorAvatar?: string;
  ditModel?: string;
  generation_params?: any;
  status?: string;
}

declare interface UserProfile {
  id: string;
  name: string;
  song_count?: number;
}

declare interface TrainingPoint {
  step: number;
  x: number;
  loss: number;
  y: number;
}

declare module 'react-native-reanimated' {
  export * from 'react-native-reanimated/lib/typescript/reanimated2';
  export function interpolate(value: number, inputRange: number[], outputRange: number[]): number;
  export function useAnimatedRef(): any;
  export function useAnimatedStyle(factory: () => any): any;
  export function useScrollOffset(): any;
  export function withTiming(value: number, config?: any): any;
  export function withSpring(value: number, config?: any): any;
  export const Extrapolate: { CLAMP: 'clamp'; EXTEND: 'extend'; IDENTITY: 'identity' };
  export namespace Animated {
    export interface Style extends Record<string, any> {}
  }
  export const Text: any;
  export const View: any;
  export const ScrollView: any;
}