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

export type IGenArticle = {
  __typename?: 'Article';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  asdf?: Maybe<Array<Maybe<IGenArticle_Asdf>>>;
  id?: Maybe<Scalars['ID']['output']>;
};


export type IGenArticleAsdfArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenArticle_Connection = {
  __typename?: 'Article_Connection';
  edges?: Maybe<Array<Maybe<IGenArticle_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenArticle_ConnectionEdge = {
  __typename?: 'Article_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenArticle>;
};

export type IGenArticle_Sort = {
  asdf?: InputMaybe<IGenOrder>;
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenArticle_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenArticle_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenArticle_Where>>>;
};

export type IGenArticle_Asdf = IGenArticle | IGenCase | IGenLegalArea | IGenMainCategory | IGenSubCategory | IGenTags | IGenTopic;

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
  calloutType?: Maybe<Scalars['String']['output']>;
  expandable?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  text?: Maybe<IGenTextElement>;
};


export type IGenCalloutTextArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export enum IGenCallout_CalloutType {
  BestPractice = 'bestPractice',
  Definition = 'definition',
  Example = 'example',
  LawReference = 'lawReference',
  Quote = 'quote',
  Remember = 'remember',
  SpecialProblem = 'specialProblem'
}

export type IGenCallout_CalloutType_Where = {
  eq?: InputMaybe<IGenCallout_CalloutType>;
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
  calloutType?: InputMaybe<IGenOrder>;
  createdAt?: InputMaybe<IGenOrder>;
  expandable?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  text?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenCallout_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenCallout_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenCallout_Where>>>;
  calloutType?: InputMaybe<IGenCallout_CalloutType_Where>;
  expandable?: InputMaybe<Scalars['Boolean']['input']>;
};

export type IGenCardSelectionGame = {
  __typename?: 'CardSelectionGame';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  game?: Maybe<Scalars['JSON']['output']>;
  helpNote?: Maybe<IGenTextElement>;
  id?: Maybe<Scalars['ID']['output']>;
  question?: Maybe<Scalars['String']['output']>;
};


export type IGenCardSelectionGameHelpNoteArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenCardSelectionGame_Connection = {
  __typename?: 'CardSelectionGame_Connection';
  edges?: Maybe<Array<Maybe<IGenCardSelectionGame_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenCardSelectionGame_ConnectionEdge = {
  __typename?: 'CardSelectionGame_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenCardSelectionGame>;
};

export type IGenCardSelectionGame_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  helpNote?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  question?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenCardSelectionGame_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenCardSelectionGame_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenCardSelectionGame_Where>>>;
  question?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenCase = {
  __typename?: 'Case';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  durationToCompleteInMinutes?: Maybe<Scalars['Int']['output']>;
  facts?: Maybe<IGenTextElement>;
  fullTextTasks?: Maybe<IGenCase_FullTextTasks>;
  id?: Maybe<Scalars['ID']['output']>;
  legalArea?: Maybe<Array<Maybe<IGenCase_LegalArea>>>;
  mainCategoryField?: Maybe<Array<Maybe<IGenCase_MainCategoryField>>>;
  subCategoryField?: Maybe<Array<Maybe<IGenCase_SubCategoryField>>>;
  tags?: Maybe<Array<Maybe<IGenCase_Tags>>>;
  title?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Array<Maybe<IGenCase_Topic>>>;
};


export type IGenCaseFactsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenCaseFullTextTasksArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenCaseLegalAreaArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenCaseMainCategoryFieldArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenCaseSubCategoryFieldArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenCaseTagsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenCaseTopicArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
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

export type IGenCase_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  durationToCompleteInMinutes?: InputMaybe<IGenOrder>;
  facts?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  legalArea?: InputMaybe<IGenOrder>;
  mainCategoryField?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  subCategoryField?: InputMaybe<IGenOrder>;
  tags?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  topic?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenCase_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenCase_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenCase_Where>>>;
  durationToCompleteInMinutes?: InputMaybe<IGenCaisyField_Number_WhereInt>;
  fullTextTasks?: InputMaybe<IGenCaisyField_Richtext_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenCase_FullTextTasks = {
  __typename?: 'Case_fullTextTasks';
  connections?: Maybe<Array<Maybe<IGenCase_FullTextTasks_Connections>>>;
  json?: Maybe<Scalars['JSON']['output']>;
};


export type IGenCase_FullTextTasksConnectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenCase_FullTextTasks_Connections = IGenCallout | IGenCardSelectionGame | IGenDragNDropGame | IGenFillInGapsGame | IGenImageWrapperCard;

export type IGenCase_LegalArea = IGenLegalArea;

export type IGenCase_MainCategoryField = IGenMainCategory;

export type IGenCase_SubCategoryField = IGenSubCategory;

export type IGenCase_Tags = IGenTags;

export type IGenCase_Topic = IGenTopic;

export type IGenDragNDropGame = {
  __typename?: 'DragNDropGame';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  game?: Maybe<Scalars['JSON']['output']>;
  helpNote?: Maybe<IGenTextElement>;
  id?: Maybe<Scalars['ID']['output']>;
  question?: Maybe<Scalars['String']['output']>;
};


export type IGenDragNDropGameHelpNoteArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenDragNDropGame_Connection = {
  __typename?: 'DragNDropGame_Connection';
  edges?: Maybe<Array<Maybe<IGenDragNDropGame_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenDragNDropGame_ConnectionEdge = {
  __typename?: 'DragNDropGame_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenDragNDropGame>;
};

export type IGenDragNDropGame_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  helpNote?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  question?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenDragNDropGame_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenDragNDropGame_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenDragNDropGame_Where>>>;
  question?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenFillInGapsGame = {
  __typename?: 'FillInGapsGame';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  fillGameParagraph?: Maybe<IGenTextElement>;
  helpNote?: Maybe<IGenTextElement>;
  id?: Maybe<Scalars['ID']['output']>;
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
  publishedAt?: InputMaybe<IGenOrder>;
  question?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenFillInGapsGame_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenFillInGapsGame_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenFillInGapsGame_Where>>>;
  question?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenImageWrapperCard = {
  __typename?: 'ImageWrapperCard';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  downloadable?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<IGenAsset>;
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
  publishedAt?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenImageWrapperCard_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenImageWrapperCard_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenImageWrapperCard_Where>>>;
  downloadable?: InputMaybe<Scalars['Boolean']['input']>;
};

export type IGenLegalArea = {
  __typename?: 'LegalArea';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars['ID']['output']>;
  legalAreaName?: Maybe<Scalars['String']['output']>;
};

export type IGenLegalArea_Connection = {
  __typename?: 'LegalArea_Connection';
  edges?: Maybe<Array<Maybe<IGenLegalArea_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenLegalArea_ConnectionEdge = {
  __typename?: 'LegalArea_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenLegalArea>;
};

export type IGenLegalArea_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  legalAreaName?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenLegalArea_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenLegalArea_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenLegalArea_Where>>>;
  legalAreaName?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenMainCategory = {
  __typename?: 'MainCategory';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  icon?: Maybe<IGenAsset>;
  id?: Maybe<Scalars['ID']['output']>;
  mainCategory?: Maybe<Scalars['String']['output']>;
};


export type IGenMainCategoryIconArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenMainCategory_Connection = {
  __typename?: 'MainCategory_Connection';
  edges?: Maybe<Array<Maybe<IGenMainCategory_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenMainCategory_ConnectionEdge = {
  __typename?: 'MainCategory_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenMainCategory>;
};

export type IGenMainCategory_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  icon?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  mainCategory?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenMainCategory_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenMainCategory_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenMainCategory_Where>>>;
  mainCategory?: InputMaybe<IGenCaisyField_String_Where>;
};

export enum IGenOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type IGenPageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type IGenQuery = {
  __typename?: 'Query';
  Article?: Maybe<IGenArticle>;
  Asset?: Maybe<IGenAsset>;
  Callout?: Maybe<IGenCallout>;
  CardSelectionGame?: Maybe<IGenCardSelectionGame>;
  Case?: Maybe<IGenCase>;
  DragNDropGame?: Maybe<IGenDragNDropGame>;
  FillInGapsGame?: Maybe<IGenFillInGapsGame>;
  ImageWrapperCard?: Maybe<IGenImageWrapperCard>;
  LegalArea?: Maybe<IGenLegalArea>;
  MainCategory?: Maybe<IGenMainCategory>;
  SubCategory?: Maybe<IGenSubCategory>;
  Tags?: Maybe<IGenTags>;
  TextElement?: Maybe<IGenTextElement>;
  Topic?: Maybe<IGenTopic>;
  allArticle?: Maybe<IGenArticle_Connection>;
  allAsset?: Maybe<IGenAsset_Connection>;
  allCallout?: Maybe<IGenCallout_Connection>;
  allCardSelectionGame?: Maybe<IGenCardSelectionGame_Connection>;
  allCase?: Maybe<IGenCase_Connection>;
  allDragNDropGame?: Maybe<IGenDragNDropGame_Connection>;
  allFillInGapsGame?: Maybe<IGenFillInGapsGame_Connection>;
  allImageWrapperCard?: Maybe<IGenImageWrapperCard_Connection>;
  allLegalArea?: Maybe<IGenLegalArea_Connection>;
  allMainCategory?: Maybe<IGenMainCategory_Connection>;
  allSubCategory?: Maybe<IGenSubCategory_Connection>;
  allTags?: Maybe<IGenTags_Connection>;
  allTextElement?: Maybe<IGenTextElement_Connection>;
  allTopic?: Maybe<IGenTopic_Connection>;
};


export type IGenQueryArticleArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryAssetArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryCalloutArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryCardSelectionGameArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryCaseArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryDragNDropGameArgs = {
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


export type IGenQueryLegalAreaArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryMainCategoryArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQuerySubCategoryArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryTagsArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryTextElementArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryTopicArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryAllArticleArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenArticle_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenArticle_Where>>>;
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


export type IGenQueryAllCardSelectionGameArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenCardSelectionGame_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenCardSelectionGame_Where>>>;
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


export type IGenQueryAllDragNDropGameArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenDragNDropGame_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenDragNDropGame_Where>>>;
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


export type IGenQueryAllLegalAreaArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenLegalArea_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenLegalArea_Where>>>;
};


export type IGenQueryAllMainCategoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenMainCategory_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenMainCategory_Where>>>;
};


export type IGenQueryAllSubCategoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenSubCategory_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenSubCategory_Where>>>;
};


export type IGenQueryAllTagsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenTags_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenTags_Where>>>;
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


export type IGenQueryAllTopicArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenTopic_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenTopic_Where>>>;
};

export type IGenSubCategory = {
  __typename?: 'SubCategory';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars['ID']['output']>;
  mainCategory?: Maybe<Array<Maybe<IGenSubCategory_MainCategory>>>;
  subCategory?: Maybe<Scalars['String']['output']>;
};


export type IGenSubCategoryMainCategoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenSubCategory_Connection = {
  __typename?: 'SubCategory_Connection';
  edges?: Maybe<Array<Maybe<IGenSubCategory_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenSubCategory_ConnectionEdge = {
  __typename?: 'SubCategory_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenSubCategory>;
};

export type IGenSubCategory_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  mainCategory?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  subCategory?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenSubCategory_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenSubCategory_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenSubCategory_Where>>>;
  subCategory?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenSubCategory_MainCategory = IGenMainCategory;

export type IGenTags = {
  __typename?: 'Tags';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars['ID']['output']>;
  tagName?: Maybe<Scalars['String']['output']>;
};

export type IGenTags_Connection = {
  __typename?: 'Tags_Connection';
  edges?: Maybe<Array<Maybe<IGenTags_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenTags_ConnectionEdge = {
  __typename?: 'Tags_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenTags>;
};

export type IGenTags_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  tagName?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenTags_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenTags_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenTags_Where>>>;
  tagName?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenTextElement = {
  __typename?: 'TextElement';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars['ID']['output']>;
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
  publishedAt?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenTextElement_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenTextElement_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenTextElement_Where>>>;
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

export type IGenTopic = {
  __typename?: 'Topic';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars['ID']['output']>;
  topicName?: Maybe<Scalars['String']['output']>;
};

export type IGenTopic_Connection = {
  __typename?: 'Topic_Connection';
  edges?: Maybe<Array<Maybe<IGenTopic_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenTopic_ConnectionEdge = {
  __typename?: 'Topic_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenTopic>;
};

export type IGenTopic_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  topicName?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenTopic_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenTopic_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenTopic_Where>>>;
  topicName?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenAssetFragment = { __typename?: 'Asset', title?: string | null, src?: string | null, originType?: string | null, keywords?: string | null, id?: string | null, dominantColor?: string | null, description?: string | null, copyright?: string | null, author?: string | null };

export type IGenCalloutFragment = { __typename: 'Callout', id?: string | null, calloutType?: string | null, expandable?: boolean | null, text?: (
    { __typename?: 'TextElement' }
    & IGenTextElementFragment
  ) | null };

export type IGenCardSelectionGameFragment = { __typename?: 'CardSelectionGame', id?: string | null, game?: any | null, question?: string | null, helpNote?: (
    { __typename?: 'TextElement' }
    & IGenTextElementFragment
  ) | null };

export type IGenCaseOverviewFragment = { __typename: 'Case', id?: string | null, title?: string | null, durationToCompleteInMinutes?: number | null, subCategoryField?: Array<(
    { __typename?: 'SubCategory' }
    & IGenSubCategoryFragment
  ) | null> | null, topic?: Array<(
    { __typename?: 'Topic' }
    & IGenTopicFragment
  ) | null> | null };

export type IGenDragNDropGameFragment = { __typename: 'DragNDropGame', id?: string | null, game?: any | null, question?: string | null, helpNote?: (
    { __typename?: 'TextElement' }
    & IGenTextElementFragment
  ) | null };

export type IGenFillInGapsGameFragment = { __typename: 'FillInGapsGame', id?: string | null, question?: string | null, fillGameParagraph?: (
    { __typename?: 'TextElement' }
    & IGenTextElementFragment
  ) | null, helpNote?: (
    { __typename?: 'TextElement' }
    & IGenTextElementFragment
  ) | null };

export type IGenFullCaseFragment = { __typename: 'Case', id?: string | null, title?: string | null, durationToCompleteInMinutes?: number | null, facts?: (
    { __typename?: 'TextElement' }
    & IGenTextElementFragment
  ) | null, fullTextTasks?: (
    { __typename?: 'Case_fullTextTasks' }
    & IGenFullTextTasksFragment
  ) | null, legalArea?: Array<(
    { __typename?: 'LegalArea' }
    & IGenLegalAreaFragment
  ) | null> | null, mainCategoryField?: Array<(
    { __typename?: 'MainCategory' }
    & IGenMainCategoryFragment
  ) | null> | null, subCategoryField?: Array<(
    { __typename?: 'SubCategory' }
    & IGenSubCategoryFragment
  ) | null> | null, tags?: Array<(
    { __typename?: 'Tags' }
    & IGenTagsFragment
  ) | null> | null, topic?: Array<(
    { __typename?: 'Topic' }
    & IGenTopicFragment
  ) | null> | null };

export type IGenFullTextTasksFragment = { __typename: 'Case_fullTextTasks', json?: any | null, connections?: Array<(
    { __typename: 'Callout' }
    & IGenCalloutFragment
  ) | (
    { __typename: 'CardSelectionGame' }
    & IGenCardSelectionGameFragment
  ) | (
    { __typename: 'DragNDropGame' }
    & IGenDragNDropGameFragment
  ) | (
    { __typename: 'FillInGapsGame' }
    & IGenFillInGapsGameFragment
  ) | (
    { __typename: 'ImageWrapperCard' }
    & IGenImageWrapperCardFragment
  ) | null> | null };

export type IGenImageWrapperCardFragment = { __typename: 'ImageWrapperCard', id?: string | null, downloadable?: boolean | null, image?: (
    { __typename?: 'Asset' }
    & IGenAssetFragment
  ) | null };

export type IGenLegalAreaFragment = { __typename: 'LegalArea', id?: string | null, legalAreaName?: string | null };

export type IGenMainCategoryFragment = { __typename: 'MainCategory', id?: string | null, mainCategory?: string | null, icon?: (
    { __typename?: 'Asset' }
    & IGenAssetFragment
  ) | null };

export type IGenSubCategoryFragment = { __typename: 'SubCategory', id?: string | null, subCategory?: string | null, mainCategory?: Array<(
    { __typename?: 'MainCategory' }
    & IGenMainCategoryFragment
  ) | null> | null };

export type IGenTagsFragment = { __typename: 'Tags', id?: string | null, tagName?: string | null };

export type IGenTextElementFragment = { __typename?: 'TextElement', id?: string | null, richTextContent?: { __typename?: 'TextElement_richTextContent', json?: any | null, connections?: Array<{ __typename: 'Caisy_Field_Document_NotFound' } | null> | null } | null };

export type IGenTopicFragment = { __typename: 'Topic', id?: string | null, topicName?: string | null };

export type IGenGetAllCaseOverviewQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type IGenGetAllCaseOverviewQuery = { __typename?: 'Query', allCase?: { __typename?: 'Case_Connection', totalCount?: number | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage?: boolean | null } | null, edges?: Array<{ __typename?: 'Case_ConnectionEdge', node?: (
        { __typename?: 'Case' }
        & IGenCaseOverviewFragment
      ) | null } | null> | null } | null };

export type IGenGetAllMainCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type IGenGetAllMainCategoryQuery = { __typename?: 'Query', allMainCategory?: { __typename?: 'MainCategory_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'MainCategory_ConnectionEdge', node?: (
        { __typename?: 'MainCategory' }
        & IGenMainCategoryFragment
      ) | null } | null> | null } | null };

export type IGenGetAllSubCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type IGenGetAllSubCategoryQuery = { __typename?: 'Query', allSubCategory?: { __typename?: 'SubCategory_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'SubCategory_ConnectionEdge', node?: (
        { __typename?: 'SubCategory' }
        & IGenSubCategoryFragment
      ) | null } | null> | null } | null };

export type IGenGetCaseByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type IGenGetCaseByIdQuery = { __typename?: 'Query', Case?: (
    { __typename?: 'Case' }
    & IGenFullCaseFragment
  ) | null };

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
export const MainCategoryFragmentDoc = gql`
    fragment MainCategory on MainCategory {
  __typename
  id
  icon {
    ...Asset
  }
  mainCategory
}
    `;
export const SubCategoryFragmentDoc = gql`
    fragment SubCategory on SubCategory {
  __typename
  id
  subCategory
  mainCategory {
    ...MainCategory
  }
}
    `;
export const TopicFragmentDoc = gql`
    fragment Topic on Topic {
  __typename
  id
  topicName
}
    `;
export const CaseOverviewFragmentDoc = gql`
    fragment CaseOverview on Case {
  __typename
  id
  title
  durationToCompleteInMinutes
  subCategoryField {
    ...SubCategory
  }
  topic {
    ...Topic
  }
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
export const FillInGapsGameFragmentDoc = gql`
    fragment FillInGapsGame on FillInGapsGame {
  __typename
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
export const CardSelectionGameFragmentDoc = gql`
    fragment CardSelectionGame on CardSelectionGame {
  id
  game
  question
  helpNote {
    ...TextElement
  }
}
    `;
export const DragNDropGameFragmentDoc = gql`
    fragment DragNDropGame on DragNDropGame {
  __typename
  id
  game
  question
  helpNote {
    ...TextElement
  }
}
    `;
export const ImageWrapperCardFragmentDoc = gql`
    fragment ImageWrapperCard on ImageWrapperCard {
  __typename
  id
  downloadable
  image {
    ...Asset
  }
}
    `;
export const CalloutFragmentDoc = gql`
    fragment Callout on Callout {
  __typename
  id
  calloutType
  expandable
  text {
    ...TextElement
  }
}
    `;
export const FullTextTasksFragmentDoc = gql`
    fragment FullTextTasks on Case_fullTextTasks {
  __typename
  json
  connections {
    __typename
    ...FillInGapsGame
    ...CardSelectionGame
    ...DragNDropGame
    ...ImageWrapperCard
    ...Callout
  }
}
    `;
export const LegalAreaFragmentDoc = gql`
    fragment LegalArea on LegalArea {
  __typename
  id
  legalAreaName
}
    `;
export const TagsFragmentDoc = gql`
    fragment Tags on Tags {
  __typename
  id
  tagName
}
    `;
export const FullCaseFragmentDoc = gql`
    fragment FullCase on Case {
  __typename
  id
  title
  durationToCompleteInMinutes
  facts {
    ...TextElement
  }
  fullTextTasks {
    ...FullTextTasks
  }
  legalArea {
    ...LegalArea
  }
  mainCategoryField {
    ...MainCategory
  }
  subCategoryField {
    ...SubCategory
  }
  tags {
    ...Tags
  }
  topic {
    ...Topic
  }
}
    `;
export const GetAllCaseOverviewDocument = gql`
    query getAllCaseOverview($after: String) {
  allCase(first: 100, after: $after) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        ...CaseOverview
      }
    }
  }
}
    ${CaseOverviewFragmentDoc}
${SubCategoryFragmentDoc}
${MainCategoryFragmentDoc}
${AssetFragmentDoc}
${TopicFragmentDoc}`;
export const GetAllMainCategoryDocument = gql`
    query getAllMainCategory {
  allMainCategory {
    totalCount
    edges {
      node {
        ...MainCategory
      }
    }
  }
}
    ${MainCategoryFragmentDoc}
${AssetFragmentDoc}`;
export const GetAllSubCategoryDocument = gql`
    query getAllSubCategory {
  allSubCategory {
    totalCount
    edges {
      node {
        ...SubCategory
      }
    }
  }
}
    ${SubCategoryFragmentDoc}
${MainCategoryFragmentDoc}
${AssetFragmentDoc}`;
export const GetCaseByIdDocument = gql`
    query getCaseById($id: ID!) {
  Case(id: $id) {
    ...FullCase
  }
}
    ${FullCaseFragmentDoc}
${TextElementFragmentDoc}
${FullTextTasksFragmentDoc}
${FillInGapsGameFragmentDoc}
${CardSelectionGameFragmentDoc}
${DragNDropGameFragmentDoc}
${ImageWrapperCardFragmentDoc}
${AssetFragmentDoc}
${CalloutFragmentDoc}
${LegalAreaFragmentDoc}
${MainCategoryFragmentDoc}
${SubCategoryFragmentDoc}
${TagsFragmentDoc}
${TopicFragmentDoc}`;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    getAllCaseOverview(variables?: IGenGetAllCaseOverviewQueryVariables, options?: C): Promise<IGenGetAllCaseOverviewQuery> {
      return requester<IGenGetAllCaseOverviewQuery, IGenGetAllCaseOverviewQueryVariables>(GetAllCaseOverviewDocument, variables, options) as Promise<IGenGetAllCaseOverviewQuery>;
    },
    getAllMainCategory(variables?: IGenGetAllMainCategoryQueryVariables, options?: C): Promise<IGenGetAllMainCategoryQuery> {
      return requester<IGenGetAllMainCategoryQuery, IGenGetAllMainCategoryQueryVariables>(GetAllMainCategoryDocument, variables, options) as Promise<IGenGetAllMainCategoryQuery>;
    },
    getAllSubCategory(variables?: IGenGetAllSubCategoryQueryVariables, options?: C): Promise<IGenGetAllSubCategoryQuery> {
      return requester<IGenGetAllSubCategoryQuery, IGenGetAllSubCategoryQueryVariables>(GetAllSubCategoryDocument, variables, options) as Promise<IGenGetAllSubCategoryQuery>;
    },
    getCaseById(variables: IGenGetCaseByIdQueryVariables, options?: C): Promise<IGenGetCaseByIdQuery> {
      return requester<IGenGetCaseByIdQuery, IGenGetCaseByIdQueryVariables>(GetCaseByIdDocument, variables, options) as Promise<IGenGetCaseByIdQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;