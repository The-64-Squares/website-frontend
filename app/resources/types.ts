export type Resource = {
  title: string;
  description: string;
  type: string;
  downloadUrl: string;
  rating: number;
  downloads: number;
};

export type Tools = {
  name: string;
  description: string;
  url: string;
  type: string;
  free: boolean;
}[];

export type ClubResources = {
  title: string;
  description: string;
  type: string;
  memberOnly: boolean;
}[];

export type Resources = {
  beginnerGuides: Resource[];
  intermediateResources: Resource[];
  advancedMaterials: Resource[];
};
