/**
 * Feature Flags
 *
 * Toggle features on/off without touching component code.
 * Set a flag to `true` to enable, `false` to disable.
 */
export const FEATURE_FLAGS = {
  /** Show the collapsible multi-select filter on the Projects page */
  filterProjects: false,

  /** Show the collapsible multi-select filter on the Blog page */
  filterBlogs: false,
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;
