import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type IGenAsset = {
  __typename?: 'Asset';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  author?: Maybe<Scalars['String']['output']>;
  blurHash?: Maybe<Scalars['String']['output']>;
  copyright?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dominantColor?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keywords?: Maybe<Scalars['String']['output']>;
  originType?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  src?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type IGenAsset_Connection = {
  __typename?: 'Asset_Connection';
  edges?: Maybe<Array<Maybe<IGenAsset_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenAsset_ConnectionEdge = {
  __typename?: 'Asset_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenAsset>;
};

export type IGenAsset_Sort = {
  author?: InputMaybe<IGenOrder>;
  blurHash?: InputMaybe<IGenOrder>;
  copyright?: InputMaybe<IGenOrder>;
  createdAt?: InputMaybe<IGenOrder>;
  description?: InputMaybe<IGenOrder>;
  dominantColor?: InputMaybe<IGenOrder>;
  height?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  keywords?: InputMaybe<IGenOrder>;
  originType?: InputMaybe<IGenOrder>;
  originalName?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
  width?: InputMaybe<IGenOrder>;
};

export type IGenAsset_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenAsset_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenAsset_Where>>>;
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
};

export type IGenCaisyDocument_Meta = {
  __typename?: 'CaisyDocument_Meta';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  locales?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type IGenCaisyField_Color_Where = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
};

export type IGenCaisyField_Number_WhereInt = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

export type IGenCaisyField_Richtext_Where = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
};

export type IGenCaisyField_String_Where = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
};

export type IGenCaisy_Field_Document_NotFound = {
  __typename?: 'Caisy_Field_Document_NotFound';
  id?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type IGenCallout = {
  __typename?: 'Callout';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  expandable?: Maybe<Scalars['Boolean']['output']>;
  icon?: Maybe<IGenAsset>;
  id?: Maybe<Scalars['ID']['output']>;
  internalTitle?: Maybe<Scalars['String']['output']>;
  text?: Maybe<IGenTextElement>;
  title?: Maybe<Scalars['String']['output']>;
};


export type IGenCalloutIconArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenCalloutTextArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenCallout_Connection = {
  __typename?: 'Callout_Connection';
  edges?: Maybe<Array<Maybe<IGenCallout_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenCallout_ConnectionEdge = {
  __typename?: 'Callout_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenCallout>;
};

export type IGenCallout_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  expandable?: InputMaybe<IGenOrder>;
  icon?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  text?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenCallout_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenCallout_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenCallout_Where>>>;
  expandable?: InputMaybe<Scalars['Boolean']['input']>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenCase = {
  __typename?: 'Case';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  facts?: Maybe<IGenCase_Facts>;
  id?: Maybe<Scalars['ID']['output']>;
  legalArea?: Maybe<Scalars['String']['output']>;
  sections?: Maybe<Array<Maybe<IGenCase_Sections>>>;
  title?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<IGenCase_Topic>;
};


export type IGenCaseFactsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenCaseSectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenCaseTopicArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenCase_Connection = {
  __typename?: 'Case_Connection';
  edges?: Maybe<Array<Maybe<IGenCase_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenCase_ConnectionEdge = {
  __typename?: 'Case_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenCase>;
};

export enum IGenCase_LegalArea {
  CivilLaw = 'civil_law',
  PublicLaw = 'public_law'
}

export type IGenCase_LegalArea_Where = {
  eq?: InputMaybe<IGenCase_LegalArea>;
};

export type IGenCase_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  legalArea?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  sections?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  topic?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenCase_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenCase_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenCase_Where>>>;
  facts?: InputMaybe<IGenCaisyField_Richtext_Where>;
  legalArea?: InputMaybe<IGenCase_LegalArea_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenCase_Facts = {
  __typename?: 'Case_facts';
  connections?: Maybe<Array<Maybe<IGenCase_Facts_Connections>>>;
  json?: Maybe<Scalars['JSON']['output']>;
};


export type IGenCase_FactsConnectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenCase_Facts_Connections = IGenCaisy_Field_Document_NotFound;

export type IGenCase_Sections = IGenCallout | IGenCategory | IGenDragNDrop | IGenFillInGapsGame | IGenImageWrapperCard | IGenPageHeader | IGenSelectionCard | IGenSubcategory | IGenTextElement;

export type IGenCase_Topic = IGenCallout | IGenCategory | IGenDragNDrop | IGenFillInGapsGame | IGenImageWrapperCard | IGenPageHeader | IGenSelectionCard | IGenSubcategory | IGenTextElement;

export type IGenCases = {
  __typename?: 'Cases';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type IGenCases_Connection = {
  __typename?: 'Cases_Connection';
  edges?: Maybe<Array<Maybe<IGenCases_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenCases_ConnectionEdge = {
  __typename?: 'Cases_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenCases>;
};

export type IGenCategory = {
  __typename?: 'Category';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  icon?: Maybe<IGenAsset>;
  id?: Maybe<Scalars['ID']['output']>;
  subcategories?: Maybe<Array<Maybe<IGenCategory_Subcategories>>>;
  title?: Maybe<Scalars['String']['output']>;
};


export type IGenCategoryIconArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenCategorySubcategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenCategory_Connection = {
  __typename?: 'Category_Connection';
  edges?: Maybe<Array<Maybe<IGenCategory_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenCategory_ConnectionEdge = {
  __typename?: 'Category_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenCategory>;
};

export type IGenCategory_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  icon?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  subcategories?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenCategory_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenCategory_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenCategory_Where>>>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenCategory_Subcategories = IGenSubcategory;

export type IGenDragNDrop = {
  __typename?: 'DragNDrop';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  game?: Maybe<Scalars['JSON']['output']>;
  helpNote?: Maybe<IGenTextElement>;
  id?: Maybe<Scalars['ID']['output']>;
  internalTitle?: Maybe<Scalars['String']['output']>;
  question?: Maybe<Scalars['String']['output']>;
};


export type IGenDragNDropHelpNoteArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenDragNDrop_Connection = {
  __typename?: 'DragNDrop_Connection';
  edges?: Maybe<Array<Maybe<IGenDragNDrop_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenDragNDrop_ConnectionEdge = {
  __typename?: 'DragNDrop_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenDragNDrop>;
};

export type IGenDragNDrop_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  helpNote?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  question?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenDragNDrop_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenDragNDrop_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenDragNDrop_Where>>>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  question?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenFillInGapsGame = {
  __typename?: 'FillInGapsGame';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  fillGameParagraph?: Maybe<IGenTextElement>;
  helpNote?: Maybe<IGenTextElement>;
  id?: Maybe<Scalars['ID']['output']>;
  internalTitle?: Maybe<Scalars['String']['output']>;
  question?: Maybe<Scalars['String']['output']>;
};


export type IGenFillInGapsGameFillGameParagraphArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenFillInGapsGameHelpNoteArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenFillInGapsGame_Connection = {
  __typename?: 'FillInGapsGame_Connection';
  edges?: Maybe<Array<Maybe<IGenFillInGapsGame_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenFillInGapsGame_ConnectionEdge = {
  __typename?: 'FillInGapsGame_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenFillInGapsGame>;
};

export type IGenFillInGapsGame_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  fillGameParagraph?: InputMaybe<IGenOrder>;
  helpNote?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  question?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenFillInGapsGame_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenFillInGapsGame_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenFillInGapsGame_Where>>>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  question?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenImageWrapperCard = {
  __typename?: 'ImageWrapperCard';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  downloadable?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<IGenAsset>;
  internalTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type IGenImageWrapperCardImageArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenImageWrapperCard_Connection = {
  __typename?: 'ImageWrapperCard_Connection';
  edges?: Maybe<Array<Maybe<IGenImageWrapperCard_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenImageWrapperCard_ConnectionEdge = {
  __typename?: 'ImageWrapperCard_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenImageWrapperCard>;
};

export type IGenImageWrapperCard_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  downloadable?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  image?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenImageWrapperCard_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenImageWrapperCard_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenImageWrapperCard_Where>>>;
  downloadable?: InputMaybe<Scalars['Boolean']['input']>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export enum IGenOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type IGenPage = {
  __typename?: 'Page';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  components?: Maybe<Array<Maybe<IGenPage_Components>>>;
  id?: Maybe<Scalars['ID']['output']>;
  internalTitle?: Maybe<Scalars['String']['output']>;
  nameInNavigation?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};


export type IGenPageComponentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenPageHeader = {
  __typename?: 'PageHeader';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  categories?: Maybe<Array<Maybe<IGenPageHeader_Categories>>>;
  id?: Maybe<Scalars['ID']['output']>;
  internalTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type IGenPageHeaderCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenPageHeader_Connection = {
  __typename?: 'PageHeader_Connection';
  edges?: Maybe<Array<Maybe<IGenPageHeader_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenPageHeader_ConnectionEdge = {
  __typename?: 'PageHeader_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenPageHeader>;
};

export type IGenPageHeader_Sort = {
  categories?: InputMaybe<IGenOrder>;
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenPageHeader_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenPageHeader_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenPageHeader_Where>>>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenPageHeader_Categories = IGenCategory;

export type IGenPageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type IGenPage_Connection = {
  __typename?: 'Page_Connection';
  edges?: Maybe<Array<Maybe<IGenPage_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenPage_ConnectionEdge = {
  __typename?: 'Page_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenPage>;
};

export type IGenPage_Sort = {
  components?: InputMaybe<IGenOrder>;
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  nameInNavigation?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  slug?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenPage_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenPage_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenPage_Where>>>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  nameInNavigation?: InputMaybe<IGenCaisyField_String_Where>;
  slug?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenPage_Components = IGenCallout | IGenCategory | IGenDragNDrop | IGenFillInGapsGame | IGenImageWrapperCard | IGenPageHeader | IGenSelectionCard | IGenSubcategory | IGenTextElement;

export type IGenQuery = {
  __typename?: 'Query';
  Asset?: Maybe<IGenAsset>;
  Callout?: Maybe<IGenCallout>;
  Case?: Maybe<IGenCase>;
  Cases?: Maybe<IGenCases>;
  Category?: Maybe<IGenCategory>;
  DragNDrop?: Maybe<IGenDragNDrop>;
  FillInGapsGame?: Maybe<IGenFillInGapsGame>;
  ImageWrapperCard?: Maybe<IGenImageWrapperCard>;
  Page?: Maybe<IGenPage>;
  PageHeader?: Maybe<IGenPageHeader>;
  SelectionCard?: Maybe<IGenSelectionCard>;
  Subcategory?: Maybe<IGenSubcategory>;
  TextElement?: Maybe<IGenTextElement>;
  allAsset?: Maybe<IGenAsset_Connection>;
  allCallout?: Maybe<IGenCallout_Connection>;
  allCase?: Maybe<IGenCase_Connection>;
  allCases?: Maybe<IGenCases_Connection>;
  allCategory?: Maybe<IGenCategory_Connection>;
  allDragNDrop?: Maybe<IGenDragNDrop_Connection>;
  allFillInGapsGame?: Maybe<IGenFillInGapsGame_Connection>;
  allImageWrapperCard?: Maybe<IGenImageWrapperCard_Connection>;
  allPage?: Maybe<IGenPage_Connection>;
  allPageHeader?: Maybe<IGenPageHeader_Connection>;
  allSelectionCard?: Maybe<IGenSelectionCard_Connection>;
  allSubcategory?: Maybe<IGenSubcategory_Connection>;
  allTextElement?: Maybe<IGenTextElement_Connection>;
};


export type IGenQueryAssetArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryCalloutArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryCaseArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryCasesArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryCategoryArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryDragNDropArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryFillInGapsGameArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryImageWrapperCardArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryPageArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryPageHeaderArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQuerySelectionCardArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQuerySubcategoryArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryTextElementArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryAllAssetArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenAsset_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenAsset_Where>>>;
};


export type IGenQueryAllCalloutArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenCallout_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenCallout_Where>>>;
};


export type IGenQueryAllCaseArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenCase_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenCase_Where>>>;
};


export type IGenQueryAllCategoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenCategory_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenCategory_Where>>>;
};


export type IGenQueryAllDragNDropArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenDragNDrop_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenDragNDrop_Where>>>;
};


export type IGenQueryAllFillInGapsGameArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenFillInGapsGame_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenFillInGapsGame_Where>>>;
};


export type IGenQueryAllImageWrapperCardArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenImageWrapperCard_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenImageWrapperCard_Where>>>;
};


export type IGenQueryAllPageArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenPage_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenPage_Where>>>;
};


export type IGenQueryAllPageHeaderArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenPageHeader_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenPageHeader_Where>>>;
};


export type IGenQueryAllSelectionCardArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenSelectionCard_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenSelectionCard_Where>>>;
};


export type IGenQueryAllSubcategoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenSubcategory_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenSubcategory_Where>>>;
};


export type IGenQueryAllTextElementArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenTextElement_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenTextElement_Where>>>;
};

export type IGenSelectionCard = {
  __typename?: 'SelectionCard';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  game?: Maybe<Scalars['JSON']['output']>;
  helpNote?: Maybe<IGenTextElement>;
  id?: Maybe<Scalars['ID']['output']>;
  internalTitle?: Maybe<Scalars['String']['output']>;
  question?: Maybe<Scalars['String']['output']>;
};


export type IGenSelectionCardHelpNoteArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenSelectionCard_Connection = {
  __typename?: 'SelectionCard_Connection';
  edges?: Maybe<Array<Maybe<IGenSelectionCard_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenSelectionCard_ConnectionEdge = {
  __typename?: 'SelectionCard_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenSelectionCard>;
};

export type IGenSelectionCard_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  helpNote?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  question?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenSelectionCard_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenSelectionCard_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenSelectionCard_Where>>>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  question?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenSubcategory = {
  __typename?: 'Subcategory';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  cases?: Maybe<Array<Maybe<IGenSubcategory_Cases>>>;
  id?: Maybe<Scalars['ID']['output']>;
  internalTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type IGenSubcategoryCasesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenSubcategory_Connection = {
  __typename?: 'Subcategory_Connection';
  edges?: Maybe<Array<Maybe<IGenSubcategory_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenSubcategory_ConnectionEdge = {
  __typename?: 'Subcategory_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenSubcategory>;
};

export type IGenSubcategory_Sort = {
  cases?: InputMaybe<IGenOrder>;
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenSubcategory_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenSubcategory_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenSubcategory_Where>>>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenSubcategory_Cases = IGenCallout | IGenCategory | IGenDragNDrop | IGenFillInGapsGame | IGenImageWrapperCard | IGenPageHeader | IGenSelectionCard | IGenSubcategory | IGenTextElement;

export type IGenTextElement = {
  __typename?: 'TextElement';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars['ID']['output']>;
  internalTitle?: Maybe<Scalars['String']['output']>;
  richTextContent?: Maybe<IGenTextElement_RichTextContent>;
};


export type IGenTextElementRichTextContentArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenTextElement_Connection = {
  __typename?: 'TextElement_Connection';
  edges?: Maybe<Array<Maybe<IGenTextElement_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenTextElement_ConnectionEdge = {
  __typename?: 'TextElement_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenTextElement>;
};

export type IGenTextElement_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenTextElement_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenTextElement_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenTextElement_Where>>>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  richTextContent?: InputMaybe<IGenCaisyField_Richtext_Where>;
};

export type IGenTextElement_RichTextContent = {
  __typename?: 'TextElement_richTextContent';
  connections?: Maybe<Array<Maybe<IGenTextElement_RichTextContent_Connections>>>;
  json?: Maybe<Scalars['JSON']['output']>;
};


export type IGenTextElement_RichTextContentConnectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenTextElement_RichTextContent_Connections = IGenCaisy_Field_Document_NotFound;

export type IGenAssetFragment = { __typename?: 'Asset', title?: string | null, src?: string | null, originType?: string | null, keywords?: string | null, id?: string | null, dominantColor?: string | null, description?: string | null, copyright?: string | null, author?: string | null };

export type IGenCalloutFragment = { __typename?: 'Callout', id?: string | null, title?: string | null, icon?: (
    { __typename?: 'Asset' }
    & IGenAssetFragment
  ) | null, text?: (
    { __typename?: 'TextElement' }
    & IGenTextElementFragment
  ) | null };

export type IGenCaseFragment = { __typename?: 'Case', id?: string | null, title?: string | null, legalArea?: string | null, facts?: { __typename?: 'Case_facts', json?: any | null } | null };

export type IGenDragNDropFragment = { __typename?: 'DragNDrop', id?: string | null, game?: any | null, question?: string | null, helpNote?: (
    { __typename?: 'TextElement' }
    & IGenTextElementFragment
  ) | null };

export type IGenFillInGapsGameFragment = { __typename?: 'FillInGapsGame', id?: string | null, question?: string | null, fillGameParagraph?: (
    { __typename?: 'TextElement' }
    & IGenTextElementFragment
  ) | null, helpNote?: (
    { __typename?: 'TextElement' }
    & IGenTextElementFragment
  ) | null };

export type IGenImageWrapperCardFragment = { __typename?: 'ImageWrapperCard', id?: string | null, title?: string | null, downloadable?: boolean | null, image?: (
    { __typename?: 'Asset' }
    & IGenAssetFragment
  ) | null };

export type IGenSelectionCardFragment = { __typename?: 'SelectionCard', id?: string | null, game?: any | null, question?: string | null, helpNote?: (
    { __typename?: 'TextElement' }
    & IGenTextElementFragment
  ) | null };

export type IGenTextElementFragment = { __typename?: 'TextElement', id?: string | null, richTextContent?: { __typename?: 'TextElement_richTextContent', json?: any | null, connections?: Array<{ __typename: 'Caisy_Field_Document_NotFound' } | null> | null } | null };

export type IGenCasesQueryVariables = Exact<{ [key: string]: never; }>;


export type IGenCasesQuery = { __typename?: 'Query', allCase?: { __typename?: 'Case_Connection', edges?: Array<{ __typename?: 'Case_ConnectionEdge', node?: (
        { __typename?: 'Case' }
        & IGenCaseFragment
      ) | null } | null> | null } | null };

export type IGenCaseByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type IGenCaseByIdQuery = { __typename?: 'Query', Case?: (
    { __typename?: 'Case' }
    & IGenCaseFragment
  ) | null };

export type IGenPageQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type IGenPageQuery = { __typename?: 'Query', allPage?: { __typename?: 'Page_Connection', edges?: Array<{ __typename?: 'Page_ConnectionEdge', node?: { __typename?: 'Page', id?: string | null, nameInNavigation?: string | null, slug?: string | null, components?: Array<(
          { __typename?: 'Callout' }
          & IGenCalloutFragment
        ) | { __typename?: 'Category' } | (
          { __typename?: 'DragNDrop' }
          & IGenDragNDropFragment
        ) | (
          { __typename?: 'FillInGapsGame' }
          & IGenFillInGapsGameFragment
        ) | (
          { __typename?: 'ImageWrapperCard' }
          & IGenImageWrapperCardFragment
        ) | { __typename?: 'PageHeader', categories?: Array<{ __typename?: 'Category', title?: string | null, id?: string | null, icon?: { __typename?: 'Asset', src?: string | null, title?: string | null } | null } | null> | null } | (
          { __typename?: 'SelectionCard' }
          & IGenSelectionCardFragment
        ) | { __typename?: 'Subcategory' } | (
          { __typename?: 'TextElement' }
          & IGenTextElementFragment
        ) | null> | null } | null } | null> | null } | null };

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
export const CaseFragmentDoc = gql`
    fragment Case on Case {
  id
  title
  legalArea
  facts {
    json
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
    ${CaseFragmentDoc}`;
export const CaseByIdDocument = gql`
    query CaseById($id: ID!) {
  Case(id: $id) {
    ...Case
  }
}
    ${CaseFragmentDoc}`;
export const PageDocument = gql`
    query Page($slug: String!) {
  allPage(where: {slug: {eq: $slug}}) {
    edges {
      node {
        id
        nameInNavigation
        slug
        components {
          ... on PageHeader {
            categories {
              ... on Category {
                title
                id
                icon {
                  src
                  title
                }
              }
            }
          }
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
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    Cases(variables?: IGenCasesQueryVariables, options?: C): Promise<IGenCasesQuery> {
      return requester<IGenCasesQuery, IGenCasesQueryVariables>(CasesDocument, variables, options) as Promise<IGenCasesQuery>;
    },
    CaseById(variables: IGenCaseByIdQueryVariables, options?: C): Promise<IGenCaseByIdQuery> {
      return requester<IGenCaseByIdQuery, IGenCaseByIdQueryVariables>(CaseByIdDocument, variables, options) as Promise<IGenCaseByIdQuery>;
    },
    Page(variables: IGenPageQueryVariables, options?: C): Promise<IGenPageQuery> {
      return requester<IGenPageQuery, IGenPageQueryVariables>(PageDocument, variables, options) as Promise<IGenPageQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;