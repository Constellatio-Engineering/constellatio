import { type DocumentNode } from "graphql";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars 
{
  Boolean: { input: boolean; output: boolean };
  DateTime: { input: any; output: any };
  Float: { input: number; output: number };
  ID: { input: string; output: string };
  Int: { input: number; output: number };
  JSON: { input: any; output: any };
  String: { input: string; output: string };
}

export interface IGenAsset 
{
  __typename?: "Asset";
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  author?: Maybe<Scalars["String"]["output"]>;
  blurHash?: Maybe<Scalars["String"]["output"]>;
  copyright?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  dominantColor?: Maybe<Scalars["String"]["output"]>;
  height?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  keywords?: Maybe<Scalars["String"]["output"]>;
  originType?: Maybe<Scalars["String"]["output"]>;
  originalName?: Maybe<Scalars["String"]["output"]>;
  src?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  width?: Maybe<Scalars["Int"]["output"]>;
}

export interface IGenAsset_Connection 
{
  __typename?: "Asset_Connection";
  edges?: Maybe<Maybe<IGenAsset_ConnectionEdge>[]>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]["output"]>;
}

export interface IGenAsset_ConnectionEdge 
{
  __typename?: "Asset_ConnectionEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<IGenAsset>;
}

export interface IGenAsset_Sort 
{
  author?: InputMaybe<IGenOrder>;
  blurHash?: InputMaybe<IGenOrder>;
  copyright?: InputMaybe<IGenOrder>;
  description?: InputMaybe<IGenOrder>;
  dominantColor?: InputMaybe<IGenOrder>;
  height?: InputMaybe<IGenOrder>;
  keywords?: InputMaybe<IGenOrder>;
  originType?: InputMaybe<IGenOrder>;
  originalName?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  width?: InputMaybe<IGenOrder>;
}

export interface IGenAsset_Where 
{
  AND?: InputMaybe<InputMaybe<IGenAsset_Where>[]>;
  OR?: InputMaybe<InputMaybe<IGenAsset_Where>[]>;
  author?: InputMaybe<IGenCaisyField_String_Where>;
  blurHash?: InputMaybe<IGenCaisyField_String_Where>;
  copyright?: InputMaybe<IGenCaisyField_String_Where>;
  description?: InputMaybe<IGenCaisyField_String_Where>;
  dominantColor?: InputMaybe<IGenCaisyField_Color_Where>;
  height?: InputMaybe<IGenCaisyField_Number_WhereInt>;
  keywords?: InputMaybe<IGenCaisyField_String_Where>;
  originType?: InputMaybe<IGenCaisyField_String_Where>;
  originalName?: InputMaybe<IGenCaisyField_String_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
  width?: InputMaybe<IGenCaisyField_Number_WhereInt>;
}

export interface IGenCaisyDocument_Meta 
{
  __typename?: "CaisyDocument_Meta";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  locale?: Maybe<Scalars["String"]["output"]>;
  locales?: Maybe<Maybe<Scalars["String"]["output"]>[]>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
}

export interface IGenCaisyField_Color_Where 
{
  contains?: InputMaybe<Scalars["String"]["input"]>;
  eq?: InputMaybe<Scalars["String"]["input"]>;
  neq?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenCaisyField_Number_WhereInt 
{
  eq?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  neq?: InputMaybe<Scalars["Int"]["input"]>;
}

export interface IGenCaisyField_Richtext_Where 
{
  contains?: InputMaybe<Scalars["String"]["input"]>;
  eq?: InputMaybe<Scalars["String"]["input"]>;
  neq?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenCaisyField_String_Where 
{
  contains?: InputMaybe<Scalars["String"]["input"]>;
  eq?: InputMaybe<Scalars["String"]["input"]>;
  neq?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenCaisy_Field_Document_NotFound 
{
  __typename?: "Caisy_Field_Document_NotFound";
  id?: Maybe<Scalars["ID"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
}

export interface IGenCallout 
{
  __typename?: "Callout";
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  expandable?: Maybe<Scalars["Boolean"]["output"]>;
  icon?: Maybe<IGenAsset>;
  id?: Maybe<Scalars["ID"]["output"]>;
  internalTitle?: Maybe<Scalars["String"]["output"]>;
  text?: Maybe<IGenTextElement>;
  title?: Maybe<Scalars["String"]["output"]>;
}

export interface IGenCalloutIconArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenCalloutTextArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenCallout_Connection 
{
  __typename?: "Callout_Connection";
  edges?: Maybe<Maybe<IGenCallout_ConnectionEdge>[]>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]["output"]>;
}

export interface IGenCallout_ConnectionEdge 
{
  __typename?: "Callout_ConnectionEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<IGenCallout>;
}

export interface IGenCallout_Sort 
{
  expandable?: InputMaybe<IGenOrder>;
  icon?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  text?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
}

export interface IGenCallout_Where 
{
  AND?: InputMaybe<InputMaybe<IGenCallout_Where>[]>;
  OR?: InputMaybe<InputMaybe<IGenCallout_Where>[]>;
  expandable?: InputMaybe<Scalars["Boolean"]["input"]>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
}

export interface IGenCase 
{
  __typename?: "Case";
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  facts?: Maybe<IGenCase_Facts>;
  id?: Maybe<Scalars["ID"]["output"]>;
  legalArea?: Maybe<Scalars["String"]["output"]>;
  sections?: Maybe<Maybe<IGenCase_Sections>[]>;
  title?: Maybe<Scalars["String"]["output"]>;
  topic?: Maybe<IGenTopic>;
}

export interface IGenCaseFactsArgs 
{
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenCaseSectionsArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenCaseTopicArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenCaseSection 
{
  __typename?: "CaseSection";
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  content?: Maybe<IGenCaseSection_Content>;
  game?: Maybe<IGenDragNDrop>;
  id?: Maybe<Scalars["ID"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
}

export interface IGenCaseSectionContentArgs 
{
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenCaseSectionGameArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenCaseSection_Connection 
{
  __typename?: "CaseSection_Connection";
  edges?: Maybe<Maybe<IGenCaseSection_ConnectionEdge>[]>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]["output"]>;
}

export interface IGenCaseSection_ConnectionEdge 
{
  __typename?: "CaseSection_ConnectionEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<IGenCaseSection>;
}

export interface IGenCaseSection_Sort 
{
  game?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
}

export interface IGenCaseSection_Where 
{
  AND?: InputMaybe<InputMaybe<IGenCaseSection_Where>[]>;
  OR?: InputMaybe<InputMaybe<IGenCaseSection_Where>[]>;
  content?: InputMaybe<IGenCaisyField_Richtext_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
}

export interface IGenCaseSection_Content 
{
  __typename?: "CaseSection_content";
  connections?: Maybe<Maybe<IGenCaseSection_Content_Connections>[]>;
  json?: Maybe<Scalars["JSON"]["output"]>;
}

export interface IGenCaseSection_ContentConnectionsArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export type IGenCaseSection_Content_Connections = IGenCaisy_Field_Document_NotFound;

export interface IGenCase_Connection 
{
  __typename?: "Case_Connection";
  edges?: Maybe<Maybe<IGenCase_ConnectionEdge>[]>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]["output"]>;
}

export interface IGenCase_ConnectionEdge 
{
  __typename?: "Case_ConnectionEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<IGenCase>;
}

export enum IGenCase_LegalArea 
  {
  CivilLaw = "civil_law",
  PublicLaw = "public_law"
}

export interface IGenCase_LegalArea_Where 
{
  eq?: InputMaybe<IGenCase_LegalArea>;
}

export interface IGenCase_Sort 
{
  legalArea?: InputMaybe<IGenOrder>;
  sections?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  topic?: InputMaybe<IGenOrder>;
}

export interface IGenCase_Where 
{
  AND?: InputMaybe<InputMaybe<IGenCase_Where>[]>;
  OR?: InputMaybe<InputMaybe<IGenCase_Where>[]>;
  facts?: InputMaybe<IGenCaisyField_Richtext_Where>;
  legalArea?: InputMaybe<IGenCase_LegalArea_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
}

export interface IGenCase_Facts 
{
  __typename?: "Case_facts";
  connections?: Maybe<Maybe<IGenCase_Facts_Connections>[]>;
  json?: Maybe<Scalars["JSON"]["output"]>;
}

export interface IGenCase_FactsConnectionsArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export type IGenCase_Facts_Connections = IGenCaisy_Field_Document_NotFound;

export type IGenCase_Sections = IGenCaseSection;

export interface IGenDragNDrop 
{
  __typename?: "DragNDrop";
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  game?: Maybe<Scalars["JSON"]["output"]>;
  helpNote?: Maybe<IGenTextElement>;
  id?: Maybe<Scalars["ID"]["output"]>;
  internalTitle?: Maybe<Scalars["String"]["output"]>;
  question?: Maybe<Scalars["String"]["output"]>;
}

export interface IGenDragNDropHelpNoteArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenDragNDrop_Connection 
{
  __typename?: "DragNDrop_Connection";
  edges?: Maybe<Maybe<IGenDragNDrop_ConnectionEdge>[]>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]["output"]>;
}

export interface IGenDragNDrop_ConnectionEdge 
{
  __typename?: "DragNDrop_ConnectionEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<IGenDragNDrop>;
}

export interface IGenDragNDrop_Sort 
{
  helpNote?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  question?: InputMaybe<IGenOrder>;
}

export interface IGenDragNDrop_Where 
{
  AND?: InputMaybe<InputMaybe<IGenDragNDrop_Where>[]>;
  OR?: InputMaybe<InputMaybe<IGenDragNDrop_Where>[]>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  question?: InputMaybe<IGenCaisyField_String_Where>;
}

export interface IGenFillInGapsGame 
{
  __typename?: "FillInGapsGame";
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  fillGameParagraph?: Maybe<IGenTextElement>;
  helpNote?: Maybe<IGenTextElement>;
  id?: Maybe<Scalars["ID"]["output"]>;
  internalTitle?: Maybe<Scalars["String"]["output"]>;
  question?: Maybe<Scalars["String"]["output"]>;
}

export interface IGenFillInGapsGameFillGameParagraphArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenFillInGapsGameHelpNoteArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenFillInGapsGame_Connection 
{
  __typename?: "FillInGapsGame_Connection";
  edges?: Maybe<Maybe<IGenFillInGapsGame_ConnectionEdge>[]>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]["output"]>;
}

export interface IGenFillInGapsGame_ConnectionEdge 
{
  __typename?: "FillInGapsGame_ConnectionEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<IGenFillInGapsGame>;
}

export interface IGenFillInGapsGame_Sort 
{
  fillGameParagraph?: InputMaybe<IGenOrder>;
  helpNote?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  question?: InputMaybe<IGenOrder>;
}

export interface IGenFillInGapsGame_Where 
{
  AND?: InputMaybe<InputMaybe<IGenFillInGapsGame_Where>[]>;
  OR?: InputMaybe<InputMaybe<IGenFillInGapsGame_Where>[]>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  question?: InputMaybe<IGenCaisyField_String_Where>;
}

export interface IGenImageWrapperCard 
{
  __typename?: "ImageWrapperCard";
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  downloadable?: Maybe<Scalars["Boolean"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  image?: Maybe<IGenAsset>;
  internalTitle?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
}

export interface IGenImageWrapperCardImageArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenImageWrapperCard_Connection 
{
  __typename?: "ImageWrapperCard_Connection";
  edges?: Maybe<Maybe<IGenImageWrapperCard_ConnectionEdge>[]>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]["output"]>;
}

export interface IGenImageWrapperCard_ConnectionEdge 
{
  __typename?: "ImageWrapperCard_ConnectionEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<IGenImageWrapperCard>;
}

export interface IGenImageWrapperCard_Sort 
{
  downloadable?: InputMaybe<IGenOrder>;
  image?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
}

export interface IGenImageWrapperCard_Where 
{
  AND?: InputMaybe<InputMaybe<IGenImageWrapperCard_Where>[]>;
  OR?: InputMaybe<InputMaybe<IGenImageWrapperCard_Where>[]>;
  downloadable?: InputMaybe<Scalars["Boolean"]["input"]>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
}

export interface IGenLegalArea 
{
  __typename?: "LegalArea";
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars["ID"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
}

export interface IGenLegalArea_Connection 
{
  __typename?: "LegalArea_Connection";
  edges?: Maybe<Maybe<IGenLegalArea_ConnectionEdge>[]>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]["output"]>;
}

export interface IGenLegalArea_ConnectionEdge 
{
  __typename?: "LegalArea_ConnectionEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<IGenLegalArea>;
}

export interface IGenLegalArea_Sort 
{
  title?: InputMaybe<IGenOrder>;
}

export interface IGenLegalArea_Where 
{
  AND?: InputMaybe<InputMaybe<IGenLegalArea_Where>[]>;
  OR?: InputMaybe<InputMaybe<IGenLegalArea_Where>[]>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
}

export enum IGenOrder 
  {
  Asc = "ASC",
  Desc = "DESC"
}

export interface IGenPage 
{
  __typename?: "Page";
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  components?: Maybe<Maybe<IGenPage_Components>[]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  internalTitle?: Maybe<Scalars["String"]["output"]>;
  nameInNavigation?: Maybe<Scalars["String"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
}

export interface IGenPageComponentsArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenPageInfo 
{
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage?: Maybe<Scalars["Boolean"]["output"]>;
  hasPreviousPage?: Maybe<Scalars["Boolean"]["output"]>;
  startCursor?: Maybe<Scalars["String"]["output"]>;
}

export interface IGenPage_Connection 
{
  __typename?: "Page_Connection";
  edges?: Maybe<Maybe<IGenPage_ConnectionEdge>[]>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]["output"]>;
}

export interface IGenPage_ConnectionEdge 
{
  __typename?: "Page_ConnectionEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<IGenPage>;
}

export interface IGenPage_Sort 
{
  components?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  nameInNavigation?: InputMaybe<IGenOrder>;
  slug?: InputMaybe<IGenOrder>;
}

export interface IGenPage_Where 
{
  AND?: InputMaybe<InputMaybe<IGenPage_Where>[]>;
  OR?: InputMaybe<InputMaybe<IGenPage_Where>[]>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  nameInNavigation?: InputMaybe<IGenCaisyField_String_Where>;
  slug?: InputMaybe<IGenCaisyField_String_Where>;
}

export type IGenPage_Components = IGenCallout | IGenCaseSection | IGenDragNDrop | IGenFillInGapsGame | IGenImageWrapperCard | IGenLegalArea | IGenSelectionCard | IGenTextElement | IGenTopic;

export interface IGenQuery 
{
  Asset?: Maybe<IGenAsset>;
  Callout?: Maybe<IGenCallout>;
  Case?: Maybe<IGenCase>;
  CaseSection?: Maybe<IGenCaseSection>;
  DragNDrop?: Maybe<IGenDragNDrop>;
  FillInGapsGame?: Maybe<IGenFillInGapsGame>;
  ImageWrapperCard?: Maybe<IGenImageWrapperCard>;
  LegalArea?: Maybe<IGenLegalArea>;
  Page?: Maybe<IGenPage>;
  __typename?: 'Query';
  SelectionCard?: Maybe<IGenSelectionCard>;
  TextElement?: Maybe<IGenTextElement>;
  Topic?: Maybe<IGenTopic>;
  allAsset?: Maybe<IGenAsset_Connection>;
  allCallout?: Maybe<IGenCallout_Connection>;
  allCase?: Maybe<IGenCase_Connection>;
  allCaseSection?: Maybe<IGenCaseSection_Connection>;
  allDragNDrop?: Maybe<IGenDragNDrop_Connection>;
  allFillInGapsGame?: Maybe<IGenFillInGapsGame_Connection>;
  allImageWrapperCard?: Maybe<IGenImageWrapperCard_Connection>;
  allLegalArea?: Maybe<IGenLegalArea_Connection>;
  allPage?: Maybe<IGenPage_Connection>;
  allSelectionCard?: Maybe<IGenSelectionCard_Connection>;
  allTextElement?: Maybe<IGenTextElement_Connection>;
  allTopic?: Maybe<IGenTopic_Connection>;
}

export interface IGenQueryAssetArgs 
{
  id: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenQueryCalloutArgs 
{
  id: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenQueryCaseArgs 
{
  id: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenQueryCaseSectionArgs 
{
  id: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenQueryDragNDropArgs 
{
  id: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenQueryFillInGapsGameArgs 
{
  id: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenQueryImageWrapperCardArgs 
{
  id: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenQueryLegalAreaArgs 
{
  id: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenQueryPageArgs 
{
  id: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenQuerySelectionCardArgs 
{
  id: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenQueryTextElementArgs 
{
  id: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenQueryTopicArgs 
{
  id: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenQueryAllAssetArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<InputMaybe<IGenAsset_Sort>[]>;
  where?: InputMaybe<InputMaybe<IGenAsset_Where>[]>;
}

export interface IGenQueryAllCalloutArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<InputMaybe<IGenCallout_Sort>[]>;
  where?: InputMaybe<InputMaybe<IGenCallout_Where>[]>;
}

export interface IGenQueryAllCaseArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<InputMaybe<IGenCase_Sort>[]>;
  where?: InputMaybe<InputMaybe<IGenCase_Where>[]>;
}

export interface IGenQueryAllCaseSectionArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<InputMaybe<IGenCaseSection_Sort>[]>;
  where?: InputMaybe<InputMaybe<IGenCaseSection_Where>[]>;
}

export interface IGenQueryAllDragNDropArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<InputMaybe<IGenDragNDrop_Sort>[]>;
  where?: InputMaybe<InputMaybe<IGenDragNDrop_Where>[]>;
}

export interface IGenQueryAllFillInGapsGameArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<InputMaybe<IGenFillInGapsGame_Sort>[]>;
  where?: InputMaybe<InputMaybe<IGenFillInGapsGame_Where>[]>;
}

export interface IGenQueryAllImageWrapperCardArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<InputMaybe<IGenImageWrapperCard_Sort>[]>;
  where?: InputMaybe<InputMaybe<IGenImageWrapperCard_Where>[]>;
}

export interface IGenQueryAllLegalAreaArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<InputMaybe<IGenLegalArea_Sort>[]>;
  where?: InputMaybe<InputMaybe<IGenLegalArea_Where>[]>;
}

export interface IGenQueryAllPageArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<InputMaybe<IGenPage_Sort>[]>;
  where?: InputMaybe<InputMaybe<IGenPage_Where>[]>;
}

export interface IGenQueryAllSelectionCardArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<InputMaybe<IGenSelectionCard_Sort>[]>;
  where?: InputMaybe<InputMaybe<IGenSelectionCard_Where>[]>;
}

export interface IGenQueryAllTextElementArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<InputMaybe<IGenTextElement_Sort>[]>;
  where?: InputMaybe<InputMaybe<IGenTextElement_Where>[]>;
}

export interface IGenQueryAllTopicArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<InputMaybe<IGenTopic_Sort>[]>;
  where?: InputMaybe<InputMaybe<IGenTopic_Where>[]>;
}

export interface IGenSelectionCard 
{
  __typename?: "SelectionCard";
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  game?: Maybe<Scalars["JSON"]["output"]>;
  helpNote?: Maybe<IGenTextElement>;
  id?: Maybe<Scalars["ID"]["output"]>;
  internalTitle?: Maybe<Scalars["String"]["output"]>;
  question?: Maybe<Scalars["String"]["output"]>;
}

export interface IGenSelectionCardHelpNoteArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenSelectionCard_Connection 
{
  __typename?: "SelectionCard_Connection";
  edges?: Maybe<Maybe<IGenSelectionCard_ConnectionEdge>[]>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]["output"]>;
}

export interface IGenSelectionCard_ConnectionEdge 
{
  __typename?: "SelectionCard_ConnectionEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<IGenSelectionCard>;
}

export interface IGenSelectionCard_Sort 
{
  helpNote?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  question?: InputMaybe<IGenOrder>;
}

export interface IGenSelectionCard_Where 
{
  AND?: InputMaybe<InputMaybe<IGenSelectionCard_Where>[]>;
  OR?: InputMaybe<InputMaybe<IGenSelectionCard_Where>[]>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  question?: InputMaybe<IGenCaisyField_String_Where>;
}

export interface IGenTextElement 
{
  __typename?: "TextElement";
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars["ID"]["output"]>;
  internalTitle?: Maybe<Scalars["String"]["output"]>;
  richTextContent?: Maybe<IGenTextElement_RichTextContent>;
}

export interface IGenTextElementRichTextContentArgs 
{
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenTextElement_Connection 
{
  __typename?: "TextElement_Connection";
  edges?: Maybe<Maybe<IGenTextElement_ConnectionEdge>[]>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]["output"]>;
}

export interface IGenTextElement_ConnectionEdge 
{
  __typename?: "TextElement_ConnectionEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<IGenTextElement>;
}

export interface IGenTextElement_Sort 
{
  internalTitle?: InputMaybe<IGenOrder>;
}

export interface IGenTextElement_Where 
{
  AND?: InputMaybe<InputMaybe<IGenTextElement_Where>[]>;
  OR?: InputMaybe<InputMaybe<IGenTextElement_Where>[]>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  richTextContent?: InputMaybe<IGenCaisyField_Richtext_Where>;
}

export interface IGenTextElement_RichTextContent 
{
  __typename?: "TextElement_richTextContent";
  connections?: Maybe<Maybe<IGenTextElement_RichTextContent_Connections>[]>;
  json?: Maybe<Scalars["JSON"]["output"]>;
}

export interface IGenTextElement_RichTextContentConnectionsArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export type IGenTextElement_RichTextContent_Connections = IGenCaisy_Field_Document_NotFound;

export interface IGenTopic 
{
  __typename?: "Topic";
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars["ID"]["output"]>;
  legalArea?: Maybe<IGenLegalArea>;
  title?: Maybe<Scalars["String"]["output"]>;
}

export interface IGenTopicLegalAreaArgs 
{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
}

export interface IGenTopic_Connection 
{
  __typename?: "Topic_Connection";
  edges?: Maybe<Maybe<IGenTopic_ConnectionEdge>[]>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]["output"]>;
}

export interface IGenTopic_ConnectionEdge 
{
  __typename?: "Topic_ConnectionEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<IGenTopic>;
}

export interface IGenTopic_Sort 
{
  legalArea?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
}

export interface IGenTopic_Where 
{
  AND?: InputMaybe<InputMaybe<IGenTopic_Where>[]>;
  OR?: InputMaybe<InputMaybe<IGenTopic_Where>[]>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
}

export interface IGenAssetFragment { __typename?: "Asset"; author?: string | null; copyright?: string | null; description?: string | null; dominantColor?: string | null; id?: string | null; keywords?: string | null; originType?: string | null; src?: string | null; title?: string | null }

export interface IGenCalloutFragment 
{
  __typename?: "Callout"; icon?: (
    { __typename?: "Asset" }
    & IGenAssetFragment
  ) | null; id?: string | null; text?: (
    { __typename?: "TextElement" }
    & IGenTextElementFragment
  ) | null; title?: string | null; 
}

export interface IGenCaseSectionFragment 
{
  __typename?: "CaseSection"; content?: { __typename?: "CaseSection_content"; json?: any | null } | null; game?: { __typename?: "DragNDrop"; game?: any | null; helpNote?: (
    { __typename?: "TextElement" }
    & IGenTextElementFragment
  ) | null; id?: string | null; } | null; id?: string | null; title?: string | null; 
}

export interface IGenCaseFragment 
{
  __typename?: "Case"; facts?: { __typename?: "Case_facts"; json?: any | null } | null; id?: string | null; legalArea?: string | null; sections?: ((
    { __typename?: "CaseSection" }
    & IGenCaseSectionFragment
  ) | null)[] | null; title?: string | null; topic?: { __typename?: "Topic"; title?: string | null } | null; 
}

export interface IGenDragNDropFragment 
{
  __typename?: "DragNDrop"; game?: any | null; helpNote?: (
    { __typename?: "TextElement" }
    & IGenTextElementFragment
  ) | null; id?: string | null; question?: string | null; 
}

export interface IGenFillInGapsGameFragment 
{
  __typename?: "FillInGapsGame"; fillGameParagraph?: (
    { __typename?: "TextElement" }
    & IGenTextElementFragment
  ) | null; helpNote?: (
    { __typename?: "TextElement" }
    & IGenTextElementFragment
  ) | null; id?: string | null; question?: string | null; 
}

export interface IGenImageWrapperCardFragment 
{
  __typename?: "ImageWrapperCard"; downloadable?: boolean | null; id?: string | null; image?: (
    { __typename?: "Asset" }
    & IGenAssetFragment
  ) | null; title?: string | null; 
}

export interface IGenSelectionCardFragment 
{
  __typename?: "SelectionCard"; game?: any | null; helpNote?: (
    { __typename?: "TextElement" }
    & IGenTextElementFragment
  ) | null; id?: string | null; question?: string | null; 
}

export interface IGenTextElementFragment { __typename?: "TextElement"; id?: string | null; richTextContent?: { __typename?: "TextElement_richTextContent"; connections?: ({ __typename: "Caisy_Field_Document_NotFound" } | null)[] | null; json?: any | null } | null }

export type IGenCasesQueryVariables = Exact<{ [key: string]: never }>;

export interface IGenCasesQuery 
{
  __typename?: "Query"; allCase?: { __typename?: "Case_Connection"; edges?: ({ __typename?: "Case_ConnectionEdge"; node?: (
    { __typename?: "Case" }
    & IGenCaseFragment
  ) | null; } | null)[] | null; } | null; 
}

export type IGenCaseByIdQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export interface IGenCaseByIdQuery 
{
  Case?: (
    { __typename?: "Case" }
    & IGenCaseFragment
  ) | null; __typename?: "Query"; 
}

export type IGenPageQueryVariables = Exact<{
  slug: Scalars["String"]["input"];
}>;

export interface IGenPageQuery 
{
  __typename?: "Query"; allPage?: { __typename?: "Page_Connection"; edges?: ({ __typename?: "Page_ConnectionEdge"; node?: { __typename?: "Page"; components?: ((
    { __typename?: "Callout" }
    & IGenCalloutFragment
  ) | { __typename?: "CaseSection" } | (
    { __typename?: "DragNDrop" }
    & IGenDragNDropFragment
  ) | (
    { __typename?: "FillInGapsGame" }
    & IGenFillInGapsGameFragment
  ) | (
    { __typename?: "ImageWrapperCard" }
    & IGenImageWrapperCardFragment
  ) | { __typename?: "LegalArea" } | (
    { __typename?: "SelectionCard" }
    & IGenSelectionCardFragment
  ) | (
    { __typename?: "TextElement" }
    & IGenTextElementFragment
  ) | { __typename?: "Topic" } | null)[] | null; id?: string | null; nameInNavigation?: string | null; slug?: string | null; } | null; } | null)[] | null; } | null; 
}

export const AssetFragmentDoc = gql`
    fragment Asset on Asset {
  title
  src
  originType
  keywords
  id
  dominantColor
  description
  copyright
  author
}
    `;
export const TextElementFragmentDoc = gql`
    fragment TextElement on TextElement {
  id
  richTextContent {
    connections {
      __typename
    }
    json
  }
}
    `;
export const CalloutFragmentDoc = gql`
    fragment Callout on Callout {
  id
  title
  icon {
    ...Asset
  }
  text {
    ...TextElement
  }
}
    `;
export const CaseSectionFragmentDoc = gql`
    fragment CaseSection on CaseSection {
  id
  title
  game {
    id
    helpNote {
      ...TextElement
    }
    game
  }
  content {
    json
  }
}
    `;
export const CaseFragmentDoc = gql`
    fragment Case on Case {
  id
  title
  legalArea
  topic {
    title
  }
  facts {
    json
  }
  sections {
    ... on CaseSection {
      ...CaseSection
    }
  }
}
    `;
export const DragNDropFragmentDoc = gql`
    fragment DragNDrop on DragNDrop {
  id
  game
  question
  helpNote {
    ...TextElement
  }
}
    `;
export const FillInGapsGameFragmentDoc = gql`
    fragment FillInGapsGame on FillInGapsGame {
  id
  question
  fillGameParagraph {
    ...TextElement
  }
  helpNote {
    ...TextElement
  }
}
    `;
export const ImageWrapperCardFragmentDoc = gql`
    fragment ImageWrapperCard on ImageWrapperCard {
  id
  title
  downloadable
  image {
    ...Asset
  }
}
    `;
export const SelectionCardFragmentDoc = gql`
    fragment SelectionCard on SelectionCard {
  id
  game
  question
  helpNote {
    ...TextElement
  }
}
    `;
export const CasesDocument = gql`
    query Cases {
  allCase {
    edges {
      node {
        ...Case
      }
    }
  }
}
    ${CaseFragmentDoc}
${CaseSectionFragmentDoc}
${TextElementFragmentDoc}`;
export const CaseByIdDocument = gql`
    query CaseById($id: ID!) {
  Case(id: $id) {
    ...Case
  }
}
    ${CaseFragmentDoc}
${CaseSectionFragmentDoc}
${TextElementFragmentDoc}`;
export const PageDocument = gql`
    query Page($slug: String!) {
  allPage(where: {slug: {eq: $slug}}) {
    edges {
      node {
        id
        nameInNavigation
        slug
        components {
          ...TextElement
          ...Callout
          ...ImageWrapperCard
          ...DragNDrop
          ...SelectionCard
          ...FillInGapsGame
        }
      }
    }
  }
}
    ${TextElementFragmentDoc}
${CalloutFragmentDoc}
${AssetFragmentDoc}
${ImageWrapperCardFragmentDoc}
${DragNDropFragmentDoc}
${SelectionCardFragmentDoc}
${FillInGapsGameFragmentDoc}`;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>;
export function getSdk<C, E>(requester: Requester<C, E>) 
{
  return {
    async CaseById(variables: IGenCaseByIdQueryVariables, options?: C): Promise<IGenCaseByIdQuery> 
    {
      return requester<IGenCaseByIdQuery, IGenCaseByIdQueryVariables>(CaseByIdDocument, variables, options) as Promise<IGenCaseByIdQuery>;
    },
    async Cases(variables?: IGenCasesQueryVariables, options?: C): Promise<IGenCasesQuery> 
    {
      return requester<IGenCasesQuery, IGenCasesQueryVariables>(CasesDocument, variables, options) as Promise<IGenCasesQuery>;
    },
    async Page(variables: IGenPageQueryVariables, options?: C): Promise<IGenPageQuery> 
    {
      return requester<IGenPageQuery, IGenPageQueryVariables>(PageDocument, variables, options) as Promise<IGenPageQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
