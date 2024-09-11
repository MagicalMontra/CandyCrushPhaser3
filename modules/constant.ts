import { isMobileOrTablet } from './game/utilis/Mobile';

export const API_ROOT = '/';

export const DEBUG = true;

export let CAMERA_DEBUG = false;

export const DEPTH_DEBUG = false;

export const ZOOM_LEVEL = CAMERA_DEBUG
  ? (isMobileOrTablet() ? 0.4 : 0.5) * 0.5
  : isMobileOrTablet()
  ? 0.4
  : 0.5;

export const CAMERA_BOUND_SCALE = isMobileOrTablet() ? 2.6 : 2;

export const ASSET_URL =
  process.env.NEXT_PUBLIC_ASSET_URL ??
  'https://vercel-static-files.s3.ap-southeast-1.amazonaws.com';
