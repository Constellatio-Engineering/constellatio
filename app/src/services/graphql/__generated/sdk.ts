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
  fullTextTasks?: Maybe<IGenArticle_FullTextTasks>;
  id?: Maybe<Scalars['ID']['output']>;
  legalArea?: Maybe<IGenLegalArea>;
  mainCategoryField?: Maybe<Array<Maybe<IGenArticle_MainCategoryField>>>;
  tags?: Maybe<Array<Maybe<IGenArticle_Tags>>>;
  title?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Array<Maybe<IGenArticle_Topic>>>;
};


export type IGenArticleFullTextTasksArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenArticleLegalAreaArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenArticleMainCategoryFieldArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenArticleTagsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenArticleTopicArgs = {
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

export type IGenArticle_LegalArea_Where = {
  findOne?: InputMaybe<IGenArticle_LegalArea_WhereConnection>;
};

export type IGenArticle_LegalArea_WhereConnection = {
  LegalArea?: InputMaybe<IGenLegalArea_Nested_Where>;
};

export type IGenArticle_MainCategoryField_Where = {
  findOne?: InputMaybe<IGenArticle_MainCategoryField_WhereConnection>;
};

export type IGenArticle_MainCategoryField_WhereConnection = {
  MainCategory?: InputMaybe<IGenMainCategory_Nested_Where>;
};

export type IGenArticle_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  legalArea?: InputMaybe<IGenOrder>;
  mainCategoryField?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  tags?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  topic?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenArticle_Tags_Where = {
  findOne?: InputMaybe<IGenArticle_Tags_WhereConnection>;
};

export type IGenArticle_Tags_WhereConnection = {
  Tags?: InputMaybe<IGenTags_Nested_Where>;
};

export type IGenArticle_Topic_Where = {
  findOne?: InputMaybe<IGenArticle_Topic_WhereConnection>;
};

export type IGenArticle_Topic_WhereConnection = {
  Topic?: InputMaybe<IGenTopic_Nested_Where>;
};

export type IGenArticle_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenArticle_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenArticle_Where>>>;
  fullTextTasks?: InputMaybe<IGenCaisyField_Richtext_Where>;
  legalArea?: InputMaybe<IGenArticle_LegalArea_Where>;
  mainCategoryField?: InputMaybe<IGenArticle_MainCategoryField_Where>;
  tags?: InputMaybe<IGenArticle_Tags_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
  topic?: InputMaybe<IGenArticle_Topic_Where>;
};

export type IGenArticle_FullTextTasks = {
  __typename?: 'Article_fullTextTasks';
  connections?: Maybe<Array<Maybe<IGenArticle_FullTextTasks_Connections>>>;
  json?: Maybe<Scalars['JSON']['output']>;
};


export type IGenArticle_FullTextTasksConnectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenArticle_FullTextTasks_Connections = IGenAsset | IGenCallout | IGenCardSelectionGame | IGenDragNDropGame | IGenFillInGapsGame;

export type IGenArticle_MainCategoryField = IGenMainCategory;

export type IGenArticle_Tags = IGenTags;

export type IGenArticle_Topic = IGenTopic;

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
  text?: Maybe<IGenCallout_Text>;
  title?: Maybe<Scalars['String']['output']>;
};


export type IGenCalloutTextArgs = {
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
  title?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenCallout_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenCallout_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenCallout_Where>>>;
  calloutType?: InputMaybe<IGenCallout_CalloutType_Where>;
  expandable?: InputMaybe<Scalars['Boolean']['input']>;
  text?: InputMaybe<IGenCaisyField_Richtext_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenCallout_Text = {
  __typename?: 'Callout_text';
  connections?: Maybe<Array<Maybe<IGenCallout_Text_Connections>>>;
  json?: Maybe<Scalars['JSON']['output']>;
};


export type IGenCallout_TextConnectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenCallout_Text_Connections = IGenCaisy_Field_Document_NotFound;

export type IGenCardSelectionGame = {
  __typename?: 'CardSelectionGame';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  game?: Maybe<Scalars['JSON']['output']>;
  helpNote?: Maybe<IGenCardSelectionGame_HelpNote>;
  id?: Maybe<Scalars['ID']['output']>;
  question?: Maybe<Scalars['String']['output']>;
};


export type IGenCardSelectionGameHelpNoteArgs = {
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
  id?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  question?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenCardSelectionGame_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenCardSelectionGame_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenCardSelectionGame_Where>>>;
  helpNote?: InputMaybe<IGenCaisyField_Richtext_Where>;
  question?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenCardSelectionGame_HelpNote = {
  __typename?: 'CardSelectionGame_helpNote';
  connections?: Maybe<Array<Maybe<IGenCardSelectionGame_HelpNote_Connections>>>;
  json?: Maybe<Scalars['JSON']['output']>;
};


export type IGenCardSelectionGame_HelpNoteConnectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenCardSelectionGame_HelpNote_Connections = IGenCaisy_Field_Document_NotFound;

export type IGenCase = {
  __typename?: 'Case';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  durationToCompleteInMinutes?: Maybe<Scalars['Int']['output']>;
  facts?: Maybe<IGenCase_Facts>;
  fullTextTasks?: Maybe<IGenCase_FullTextTasks>;
  id?: Maybe<Scalars['ID']['output']>;
  legalArea?: Maybe<IGenLegalArea>;
  mainCategoryField?: Maybe<Array<Maybe<IGenCase_MainCategoryField>>>;
  resolution?: Maybe<IGenCase_Resolution>;
  tags?: Maybe<Array<Maybe<IGenCase_Tags>>>;
  title?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Array<Maybe<IGenCase_Topic>>>;
};


export type IGenCaseFactsArgs = {
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


export type IGenCaseResolutionArgs = {
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

export type IGenCase_LegalArea_Where = {
  findOne?: InputMaybe<IGenCase_LegalArea_WhereConnection>;
};

export type IGenCase_LegalArea_WhereConnection = {
  LegalArea?: InputMaybe<IGenLegalArea_Nested_Where>;
};

export type IGenCase_MainCategoryField_Where = {
  findOne?: InputMaybe<IGenCase_MainCategoryField_WhereConnection>;
};

export type IGenCase_MainCategoryField_WhereConnection = {
  MainCategory?: InputMaybe<IGenMainCategory_Nested_Where>;
};

export type IGenCase_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  durationToCompleteInMinutes?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  legalArea?: InputMaybe<IGenOrder>;
  mainCategoryField?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  tags?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
  topic?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenCase_Tags_Where = {
  findOne?: InputMaybe<IGenCase_Tags_WhereConnection>;
};

export type IGenCase_Tags_WhereConnection = {
  Tags?: InputMaybe<IGenTags_Nested_Where>;
};

export type IGenCase_Topic_Where = {
  findOne?: InputMaybe<IGenCase_Topic_WhereConnection>;
};

export type IGenCase_Topic_WhereConnection = {
  Topic?: InputMaybe<IGenTopic_Nested_Where>;
};

export type IGenCase_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenCase_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenCase_Where>>>;
  durationToCompleteInMinutes?: InputMaybe<IGenCaisyField_Number_WhereInt>;
  facts?: InputMaybe<IGenCaisyField_Richtext_Where>;
  fullTextTasks?: InputMaybe<IGenCaisyField_Richtext_Where>;
  legalArea?: InputMaybe<IGenCase_LegalArea_Where>;
  mainCategoryField?: InputMaybe<IGenCase_MainCategoryField_Where>;
  resolution?: InputMaybe<IGenCaisyField_Richtext_Where>;
  tags?: InputMaybe<IGenCase_Tags_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
  topic?: InputMaybe<IGenCase_Topic_Where>;
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

export type IGenCase_FullTextTasks_Connections = IGenAsset | IGenCallout | IGenCardSelectionGame | IGenDragNDropGame | IGenFillInGapsGame;

export type IGenCase_MainCategoryField = IGenMainCategory;

export type IGenCase_Resolution = {
  __typename?: 'Case_resolution';
  connections?: Maybe<Array<Maybe<IGenCase_Resolution_Connections>>>;
  json?: Maybe<Scalars['JSON']['output']>;
};


export type IGenCase_ResolutionConnectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenCase_Resolution_Connections = IGenCaisy_Field_Document_NotFound;

export type IGenCase_Tags = IGenTags;

export type IGenCase_Topic = IGenTopic;

export type IGenDragNDropGame = {
  __typename?: 'DragNDropGame';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  game?: Maybe<Scalars['JSON']['output']>;
  helpNote?: Maybe<IGenDragNDropGame_HelpNote>;
  id?: Maybe<Scalars['ID']['output']>;
  question?: Maybe<Scalars['String']['output']>;
};


export type IGenDragNDropGameHelpNoteArgs = {
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
  id?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  question?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenDragNDropGame_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenDragNDropGame_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenDragNDropGame_Where>>>;
  helpNote?: InputMaybe<IGenCaisyField_Richtext_Where>;
  question?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenDragNDropGame_HelpNote = {
  __typename?: 'DragNDropGame_helpNote';
  connections?: Maybe<Array<Maybe<IGenDragNDropGame_HelpNote_Connections>>>;
  json?: Maybe<Scalars['JSON']['output']>;
};


export type IGenDragNDropGame_HelpNoteConnectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenDragNDropGame_HelpNote_Connections = IGenCaisy_Field_Document_NotFound;

export type IGenFillInGapsGame = {
  __typename?: 'FillInGapsGame';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  fillGameParagraph?: Maybe<IGenFillInGapsGame_FillGameParagraph>;
  helpNote?: Maybe<IGenFillInGapsGame_HelpNote>;
  id?: Maybe<Scalars['ID']['output']>;
  question?: Maybe<Scalars['String']['output']>;
};


export type IGenFillInGapsGameFillGameParagraphArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenFillInGapsGameHelpNoteArgs = {
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
  id?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  question?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenFillInGapsGame_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenFillInGapsGame_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenFillInGapsGame_Where>>>;
  fillGameParagraph?: InputMaybe<IGenCaisyField_Richtext_Where>;
  helpNote?: InputMaybe<IGenCaisyField_Richtext_Where>;
  question?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenFillInGapsGame_FillGameParagraph = {
  __typename?: 'FillInGapsGame_fillGameParagraph';
  connections?: Maybe<Array<Maybe<IGenFillInGapsGame_FillGameParagraph_Connections>>>;
  json?: Maybe<Scalars['JSON']['output']>;
};


export type IGenFillInGapsGame_FillGameParagraphConnectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenFillInGapsGame_FillGameParagraph_Connections = IGenCaisy_Field_Document_NotFound;

export type IGenFillInGapsGame_HelpNote = {
  __typename?: 'FillInGapsGame_helpNote';
  connections?: Maybe<Array<Maybe<IGenFillInGapsGame_HelpNote_Connections>>>;
  json?: Maybe<Scalars['JSON']['output']>;
};


export type IGenFillInGapsGame_HelpNoteConnectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenFillInGapsGame_HelpNote_Connections = IGenCaisy_Field_Document_NotFound;

export type IGenLegalArea = {
  __typename?: 'LegalArea';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars['ID']['output']>;
  legalAreaName?: Maybe<Scalars['String']['output']>;
  sorting?: Maybe<Scalars['Int']['output']>;
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

export type IGenLegalArea_Nested_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenLegalArea_Nested_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenLegalArea_Nested_Where>>>;
  legalAreaName?: InputMaybe<IGenCaisyField_String_Where>;
  sorting?: InputMaybe<IGenCaisyField_Number_WhereInt>;
};

export type IGenLegalArea_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  legalAreaName?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  sorting?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenLegalArea_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenLegalArea_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenLegalArea_Where>>>;
  legalAreaName?: InputMaybe<IGenCaisyField_String_Where>;
  sorting?: InputMaybe<IGenCaisyField_Number_WhereInt>;
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

export type IGenMainCategory_Nested_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenMainCategory_Nested_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenMainCategory_Nested_Where>>>;
  mainCategory?: InputMaybe<IGenCaisyField_String_Where>;
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
  LegalArea?: Maybe<IGenLegalArea>;
  MainCategory?: Maybe<IGenMainCategory>;
  Search?: Maybe<IGenSearch>;
  SearchEntry?: Maybe<IGenSearchEntry>;
  SubCategory?: Maybe<IGenSubCategory>;
  Tags?: Maybe<IGenTags>;
  Topic?: Maybe<IGenTopic>;
  allArticle?: Maybe<IGenArticle_Connection>;
  allAsset?: Maybe<IGenAsset_Connection>;
  allCallout?: Maybe<IGenCallout_Connection>;
  allCardSelectionGame?: Maybe<IGenCardSelectionGame_Connection>;
  allCase?: Maybe<IGenCase_Connection>;
  allDragNDropGame?: Maybe<IGenDragNDropGame_Connection>;
  allFillInGapsGame?: Maybe<IGenFillInGapsGame_Connection>;
  allLegalArea?: Maybe<IGenLegalArea_Connection>;
  allMainCategory?: Maybe<IGenMainCategory_Connection>;
  allSearchEntry?: Maybe<IGenSearchEntry_Connection>;
  allSubCategory?: Maybe<IGenSubCategory_Connection>;
  allTags?: Maybe<IGenTags_Connection>;
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


export type IGenQueryLegalAreaArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryMainCategoryArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQuerySearchArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQuerySearchEntryArgs = {
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


export type IGenQueryAllSearchEntryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenSearchEntry_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenSearchEntry_Where>>>;
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


export type IGenQueryAllTopicArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenTopic_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenTopic_Where>>>;
};

export type IGenSearch = {
  __typename?: 'Search';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars['ID']['output']>;
  popularCategories?: Maybe<Array<Maybe<IGenSearch_PopularCategories>>>;
  popularSearches?: Maybe<Array<Maybe<IGenSearch_PopularSearches>>>;
};


export type IGenSearchPopularCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenSearchPopularSearchesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type IGenSearchEntry = {
  __typename?: 'SearchEntry';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars['ID']['output']>;
  searchField?: Maybe<Scalars['String']['output']>;
};

export type IGenSearchEntry_Connection = {
  __typename?: 'SearchEntry_Connection';
  edges?: Maybe<Array<Maybe<IGenSearchEntry_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenSearchEntry_ConnectionEdge = {
  __typename?: 'SearchEntry_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenSearchEntry>;
};

export type IGenSearchEntry_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  searchField?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenSearchEntry_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenSearchEntry_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenSearchEntry_Where>>>;
  searchField?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenSearch_PopularCategories = IGenSearchEntry;

export type IGenSearch_PopularSearches = IGenSearchEntry;

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

export type IGenSubCategory_MainCategory_Where = {
  findOne?: InputMaybe<IGenSubCategory_MainCategory_WhereConnection>;
};

export type IGenSubCategory_MainCategory_WhereConnection = {
  MainCategory?: InputMaybe<IGenMainCategory_Nested_Where>;
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
  mainCategory?: InputMaybe<IGenSubCategory_MainCategory_Where>;
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

export type IGenTags_Nested_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenTags_Nested_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenTags_Nested_Where>>>;
  tagName?: InputMaybe<IGenCaisyField_String_Where>;
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

export type IGenTopic = {
  __typename?: 'Topic';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars['ID']['output']>;
  sorting?: Maybe<Scalars['Int']['output']>;
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

export type IGenTopic_Nested_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenTopic_Nested_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenTopic_Nested_Where>>>;
  sorting?: InputMaybe<IGenCaisyField_Number_WhereInt>;
  topicName?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenTopic_Sort = {
  createdAt?: InputMaybe<IGenOrder>;
  id?: InputMaybe<IGenOrder>;
  publishedAt?: InputMaybe<IGenOrder>;
  sorting?: InputMaybe<IGenOrder>;
  topicName?: InputMaybe<IGenOrder>;
  updatedAt?: InputMaybe<IGenOrder>;
};

export type IGenTopic_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenTopic_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenTopic_Where>>>;
  sorting?: InputMaybe<IGenCaisyField_Number_WhereInt>;
  topicName?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenArticleFullTextTasksFragment = { __typename: 'Article_fullTextTasks', json?: any | null, connections?: Array<(
    { __typename: 'Asset' }
    & IGenAssetFragment
  ) | (
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
  ) | null> | null };

export type IGenArticleOverviewFragment = { __typename: 'Article', id?: string | null, title?: string | null, _meta?: { __typename?: 'CaisyDocument_Meta', createdAt?: any | null } | null, legalArea?: (
    { __typename?: 'LegalArea' }
    & IGenLegalAreaFragment
  ) | null, topic?: Array<(
    { __typename?: 'Topic' }
    & IGenTopicFragment
  ) | null> | null, mainCategoryField?: Array<(
    { __typename?: 'MainCategory' }
    & IGenMainCategoryFragment
  ) | null> | null };

export type IGenAssetFragment = { __typename?: 'Asset', title?: string | null, src?: string | null, originType?: string | null, keywords?: string | null, id?: string | null, dominantColor?: string | null, description?: string | null, copyright?: string | null, author?: string | null };

export type IGenCalloutFragment = { __typename: 'Callout', id?: string | null, calloutType?: string | null, expandable?: boolean | null, text?: { __typename?: 'Callout_text', json?: any | null, connections?: Array<{ __typename: 'Caisy_Field_Document_NotFound' } | null> | null } | null };

export type IGenCardSelectionGameFragment = { __typename?: 'CardSelectionGame', id?: string | null, game?: any | null, question?: string | null, helpNote?: { __typename?: 'CardSelectionGame_helpNote', json?: any | null, connections?: Array<{ __typename: 'Caisy_Field_Document_NotFound' } | null> | null } | null };

export type IGenCaseFullTextTasksFragment = { __typename: 'Case_fullTextTasks', json?: any | null, connections?: Array<(
    { __typename: 'Asset' }
    & IGenAssetFragment
  ) | (
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
  ) | null> | null };

export type IGenCaseOverviewFragment = { __typename: 'Case', id?: string | null, title?: string | null, durationToCompleteInMinutes?: number | null, _meta?: { __typename?: 'CaisyDocument_Meta', createdAt?: any | null } | null, legalArea?: (
    { __typename?: 'LegalArea' }
    & IGenLegalAreaFragment
  ) | null, topic?: Array<(
    { __typename?: 'Topic' }
    & IGenTopicFragment
  ) | null> | null, mainCategoryField?: Array<(
    { __typename?: 'MainCategory' }
    & IGenMainCategoryFragment
  ) | null> | null };

export type IGenDragNDropGameFragment = { __typename: 'DragNDropGame', id?: string | null, game?: any | null, question?: string | null, helpNote?: { __typename?: 'DragNDropGame_helpNote', json?: any | null, connections?: Array<{ __typename: 'Caisy_Field_Document_NotFound' } | null> | null } | null };

export type IGenFillInGapsGameFragment = { __typename: 'FillInGapsGame', id?: string | null, question?: string | null, fillGameParagraph?: { __typename?: 'FillInGapsGame_fillGameParagraph', json?: any | null, connections?: Array<{ __typename: 'Caisy_Field_Document_NotFound' } | null> | null } | null, helpNote?: { __typename?: 'FillInGapsGame_helpNote', json?: any | null, connections?: Array<{ __typename: 'Caisy_Field_Document_NotFound' } | null> | null } | null };

export type IGenFullArticleFragment = { __typename: 'Article', id?: string | null, title?: string | null, fullTextTasks?: (
    { __typename?: 'Article_fullTextTasks' }
    & IGenArticleFullTextTasksFragment
  ) | null, legalArea?: (
    { __typename?: 'LegalArea' }
    & IGenLegalAreaFragment
  ) | null, mainCategoryField?: Array<(
    { __typename?: 'MainCategory' }
    & IGenMainCategoryFragment
  ) | null> | null, tags?: Array<(
    { __typename?: 'Tags' }
    & IGenTagsFragment
  ) | null> | null, topic?: Array<(
    { __typename?: 'Topic' }
    & IGenTopicFragment
  ) | null> | null };

export type IGenFullCaseFragment = { __typename: 'Case', id?: string | null, title?: string | null, durationToCompleteInMinutes?: number | null, _meta?: { __typename?: 'CaisyDocument_Meta', updatedAt?: any | null } | null, facts?: { __typename?: 'Case_facts', json?: any | null, connections?: Array<{ __typename: 'Caisy_Field_Document_NotFound' } | null> | null } | null, fullTextTasks?: (
    { __typename?: 'Case_fullTextTasks' }
    & IGenCaseFullTextTasksFragment
  ) | null, legalArea?: (
    { __typename?: 'LegalArea' }
    & IGenLegalAreaFragment
  ) | null, mainCategoryField?: Array<(
    { __typename?: 'MainCategory' }
    & IGenMainCategoryFragment
  ) | null> | null, tags?: Array<(
    { __typename?: 'Tags' }
    & IGenTagsFragment
  ) | null> | null, topic?: Array<(
    { __typename?: 'Topic' }
    & IGenTopicFragment
  ) | null> | null, resolution?: { __typename?: 'Case_resolution', json?: any | null, connections?: Array<{ __typename: 'Caisy_Field_Document_NotFound' } | null> | null } | null };

export type IGenLegalAreaFragment = { __typename: 'LegalArea', legalAreaName?: string | null, id?: string | null, sorting?: number | null };

export type IGenMainCategoryFragment = { __typename: 'MainCategory', id?: string | null, mainCategory?: string | null, icon?: (
    { __typename?: 'Asset' }
    & IGenAssetFragment
  ) | null };

export type IGenSearchEntryFragment = { __typename: 'SearchEntry', id?: string | null, searchField?: string | null };

export type IGenTagsFragment = { __typename: 'Tags', id?: string | null, tagName?: string | null };

export type IGenTopicFragment = { __typename: 'Topic', id?: string | null, topicName?: string | null, sorting?: number | null };

export type IGenGetPopularSearchesQueryVariables = Exact<{ [key: string]: never; }>;


export type IGenGetPopularSearchesQuery = { __typename?: 'Query', Search?: { __typename: 'Search', id?: string | null, popularCategories?: Array<(
      { __typename?: 'SearchEntry' }
      & IGenSearchEntryFragment
    ) | null> | null, popularSearches?: Array<(
      { __typename?: 'SearchEntry' }
      & IGenSearchEntryFragment
    ) | null> | null } | null };

export type IGenGetAllArticlesByLegalAreaQueryVariables = Exact<{
  legalAreaName: Scalars['String']['input'];
}>;


export type IGenGetAllArticlesByLegalAreaQuery = { __typename?: 'Query', allArticle?: { __typename?: 'Article_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'Article_ConnectionEdge', node?: { __typename?: 'Article', id?: string | null } | null } | null> | null } | null };

export type IGenGetAllArticlesByMainCategoryQueryVariables = Exact<{
  mainCategoryName: Scalars['String']['input'];
}>;


export type IGenGetAllArticlesByMainCategoryQuery = { __typename?: 'Query', allArticle?: { __typename?: 'Article_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'Article_ConnectionEdge', node?: { __typename?: 'Article', id?: string | null } | null } | null> | null } | null };

export type IGenGetAllArticlesByTagQueryVariables = Exact<{
  tagName: Scalars['String']['input'];
}>;


export type IGenGetAllArticlesByTagQuery = { __typename?: 'Query', allArticle?: { __typename?: 'Article_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'Article_ConnectionEdge', node?: { __typename?: 'Article', id?: string | null } | null } | null> | null } | null };

export type IGenGetAllArticlesByTopicQueryVariables = Exact<{
  topicName: Scalars['String']['input'];
}>;


export type IGenGetAllArticlesByTopicQuery = { __typename?: 'Query', allArticle?: { __typename?: 'Article_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'Article_ConnectionEdge', node?: { __typename?: 'Article', id?: string | null } | null } | null> | null } | null };

export type IGenGetAllCasesByLegalAreaQueryVariables = Exact<{
  legalAreaName: Scalars['String']['input'];
}>;


export type IGenGetAllCasesByLegalAreaQuery = { __typename?: 'Query', allCase?: { __typename?: 'Case_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'Case_ConnectionEdge', node?: { __typename?: 'Case', id?: string | null } | null } | null> | null } | null };

export type IGenGetAllCasesByMainCategoryQueryVariables = Exact<{
  mainCategoryName: Scalars['String']['input'];
}>;


export type IGenGetAllCasesByMainCategoryQuery = { __typename?: 'Query', allCase?: { __typename?: 'Case_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'Case_ConnectionEdge', node?: { __typename?: 'Case', id?: string | null } | null } | null> | null } | null };

export type IGenGetAllCasesByTagQueryVariables = Exact<{
  tagName: Scalars['String']['input'];
}>;


export type IGenGetAllCasesByTagQuery = { __typename?: 'Query', allCase?: { __typename?: 'Case_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'Case_ConnectionEdge', node?: { __typename?: 'Case', id?: string | null } | null } | null> | null } | null };

export type IGenGetAllCasesByTopicQueryVariables = Exact<{
  topicName: Scalars['String']['input'];
}>;


export type IGenGetAllCasesByTopicQuery = { __typename?: 'Query', allCase?: { __typename?: 'Case_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'Case_ConnectionEdge', node?: { __typename?: 'Case', id?: string | null } | null } | null> | null } | null };

export type IGenGetAllCaseOverviewQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type IGenGetAllCaseOverviewQuery = { __typename?: 'Query', allCase?: { __typename?: 'Case_Connection', totalCount?: number | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage?: boolean | null } | null, edges?: Array<{ __typename?: 'Case_ConnectionEdge', node?: (
        { __typename?: 'Case' }
        & IGenCaseOverviewFragment
      ) | null } | null> | null } | null };

export type IGenGetAllCasesByCategoryDetailsQueryVariables = Exact<{
  legalAreaName: Scalars['String']['input'];
  mainCategory: Scalars['String']['input'];
}>;


export type IGenGetAllCasesByCategoryDetailsQuery = { __typename?: 'Query', allCase?: { __typename?: 'Case_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'Case_ConnectionEdge', node?: { __typename?: 'Case', id?: string | null } | null } | null> | null } | null };

export type IGenGetAllArticleOverviewQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type IGenGetAllArticleOverviewQuery = { __typename?: 'Query', allArticle?: { __typename?: 'Article_Connection', totalCount?: number | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage?: boolean | null } | null, edges?: Array<{ __typename?: 'Article_ConnectionEdge', node?: (
        { __typename?: 'Article' }
        & IGenArticleOverviewFragment
      ) | null } | null> | null } | null };

export type IGenGetAllLegalAreaQueryVariables = Exact<{ [key: string]: never; }>;


export type IGenGetAllLegalAreaQuery = { __typename?: 'Query', allLegalArea?: { __typename?: 'LegalArea_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'LegalArea_ConnectionEdge', node?: (
        { __typename?: 'LegalArea' }
        & IGenLegalAreaFragment
      ) | null } | null> | null } | null };

export type IGenGetAllMainCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type IGenGetAllMainCategoryQuery = { __typename?: 'Query', allMainCategory?: { __typename?: 'MainCategory_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'MainCategory_ConnectionEdge', node?: (
        { __typename?: 'MainCategory' }
        & IGenMainCategoryFragment
      ) | null } | null> | null } | null };

export type IGenGetArticleByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type IGenGetArticleByIdQuery = { __typename?: 'Query', Article?: (
    { __typename?: 'Article' }
    & IGenFullArticleFragment
  ) | null };

export type IGenGetCaseByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type IGenGetCaseByIdQuery = { __typename?: 'Query', Case?: (
    { __typename?: 'Case' }
    & IGenFullCaseFragment
  ) | null };

export type IGenGetLegalAreaByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type IGenGetLegalAreaByIdQuery = { __typename?: 'Query', LegalArea?: (
    { __typename?: 'LegalArea' }
    & IGenLegalAreaFragment
  ) | null };

export type IGenGetMainCategoryByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type IGenGetMainCategoryByIdQuery = { __typename?: 'Query', MainCategory?: (
    { __typename?: 'MainCategory' }
    & IGenMainCategoryFragment
  ) | null };

export type IGenGetTagsByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type IGenGetTagsByIdQuery = { __typename?: 'Query', Tags?: (
    { __typename?: 'Tags' }
    & IGenTagsFragment
  ) | null };

export type IGenGetTopicByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type IGenGetTopicByIdQuery = { __typename?: 'Query', Topic?: (
    { __typename?: 'Topic' }
    & IGenTopicFragment
  ) | null };

export const LegalAreaFragmentDoc = gql`
    fragment LegalArea on LegalArea {
  legalAreaName
  id
  sorting
  __typename
}
    `;
export const TopicFragmentDoc = gql`
    fragment Topic on Topic {
  __typename
  id
  topicName
  sorting
}
    `;
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
export const ArticleOverviewFragmentDoc = gql`
    fragment ArticleOverview on Article {
  __typename
  id
  title
  _meta {
    createdAt
  }
  legalArea {
    ...LegalArea
  }
  topic {
    ...Topic
  }
  mainCategoryField {
    ...MainCategory
  }
}
    `;
export const CaseOverviewFragmentDoc = gql`
    fragment CaseOverview on Case {
  __typename
  id
  title
  _meta {
    createdAt
  }
  durationToCompleteInMinutes
  legalArea {
    ...LegalArea
  }
  topic {
    ...Topic
  }
  mainCategoryField {
    ...MainCategory
  }
}
    `;
export const FillInGapsGameFragmentDoc = gql`
    fragment FillInGapsGame on FillInGapsGame {
  __typename
  id
  question
  fillGameParagraph {
    connections {
      __typename
    }
    json
  }
  helpNote {
    connections {
      __typename
    }
    json
  }
}
    `;
export const CardSelectionGameFragmentDoc = gql`
    fragment CardSelectionGame on CardSelectionGame {
  id
  game
  question
  helpNote {
    connections {
      __typename
    }
    json
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
    connections {
      __typename
    }
    json
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
    connections {
      __typename
    }
    json
  }
}
    `;
export const ArticleFullTextTasksFragmentDoc = gql`
    fragment ArticleFullTextTasks on Article_fullTextTasks {
  __typename
  json
  connections {
    __typename
    ...FillInGapsGame
    ...CardSelectionGame
    ...DragNDropGame
    ...Callout
    ...Asset
  }
}
    `;
export const TagsFragmentDoc = gql`
    fragment Tags on Tags {
  __typename
  id
  tagName
}
    `;
export const FullArticleFragmentDoc = gql`
    fragment FullArticle on Article {
  __typename
  id
  title
  fullTextTasks {
    ...ArticleFullTextTasks
  }
  legalArea {
    ...LegalArea
  }
  mainCategoryField {
    ...MainCategory
  }
  tags {
    ...Tags
  }
  topic {
    ...Topic
  }
}
    `;
export const CaseFullTextTasksFragmentDoc = gql`
    fragment CaseFullTextTasks on Case_fullTextTasks {
  __typename
  json
  connections {
    __typename
    ...FillInGapsGame
    ...CardSelectionGame
    ...DragNDropGame
    ...Callout
    ...Asset
  }
}
    `;
export const FullCaseFragmentDoc = gql`
    fragment FullCase on Case {
  __typename
  _meta {
    updatedAt
  }
  id
  title
  durationToCompleteInMinutes
  facts {
    connections {
      __typename
    }
    json
  }
  fullTextTasks {
    ...CaseFullTextTasks
  }
  legalArea {
    ...LegalArea
  }
  mainCategoryField {
    ...MainCategory
  }
  tags {
    ...Tags
  }
  topic {
    ...Topic
  }
  resolution {
    connections {
      __typename
    }
    json
  }
}
    `;
export const SearchEntryFragmentDoc = gql`
    fragment SearchEntry on SearchEntry {
  __typename
  id
  searchField
}
    `;
export const GetPopularSearchesDocument = gql`
    query getPopularSearches {
  Search {
    __typename
    id
    popularCategories {
      ...SearchEntry
    }
    popularSearches {
      ...SearchEntry
    }
  }
}
    ${SearchEntryFragmentDoc}`;
export const GetAllArticlesByLegalAreaDocument = gql`
    query getAllArticlesByLegalArea($legalAreaName: String!) {
  allArticle(
    where: {AND: [{legalArea: {findOne: {LegalArea: {legalAreaName: {eq: $legalAreaName}}}}}]}
  ) {
    totalCount
    edges {
      node {
        id
      }
    }
  }
}
    `;
export const GetAllArticlesByMainCategoryDocument = gql`
    query getAllArticlesByMainCategory($mainCategoryName: String!) {
  allArticle(
    where: {AND: [{mainCategoryField: {findOne: {MainCategory: {mainCategory: {eq: $mainCategoryName}}}}}]}
  ) {
    totalCount
    edges {
      node {
        id
      }
    }
  }
}
    `;
export const GetAllArticlesByTagDocument = gql`
    query getAllArticlesByTag($tagName: String!) {
  allArticle(where: {AND: [{tags: {findOne: {Tags: {tagName: {eq: $tagName}}}}}]}) {
    totalCount
    edges {
      node {
        id
      }
    }
  }
}
    `;
export const GetAllArticlesByTopicDocument = gql`
    query getAllArticlesByTopic($topicName: String!) {
  allArticle(
    where: {AND: [{topic: {findOne: {Topic: {topicName: {eq: $topicName}}}}}]}
  ) {
    totalCount
    edges {
      node {
        id
      }
    }
  }
}
    `;
export const GetAllCasesByLegalAreaDocument = gql`
    query getAllCasesByLegalArea($legalAreaName: String!) {
  allCase(
    where: {AND: [{legalArea: {findOne: {LegalArea: {legalAreaName: {eq: $legalAreaName}}}}}]}
  ) {
    totalCount
    edges {
      node {
        id
      }
    }
  }
}
    `;
export const GetAllCasesByMainCategoryDocument = gql`
    query getAllCasesByMainCategory($mainCategoryName: String!) {
  allCase(
    where: {AND: [{mainCategoryField: {findOne: {MainCategory: {mainCategory: {eq: $mainCategoryName}}}}}]}
  ) {
    totalCount
    edges {
      node {
        id
      }
    }
  }
}
    `;
export const GetAllCasesByTagDocument = gql`
    query getAllCasesByTag($tagName: String!) {
  allCase(where: {AND: [{tags: {findOne: {Tags: {tagName: {eq: $tagName}}}}}]}) {
    totalCount
    edges {
      node {
        id
      }
    }
  }
}
    `;
export const GetAllCasesByTopicDocument = gql`
    query getAllCasesByTopic($topicName: String!) {
  allCase(
    where: {AND: [{topic: {findOne: {Topic: {topicName: {eq: $topicName}}}}}]}
  ) {
    totalCount
    edges {
      node {
        id
      }
    }
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
${LegalAreaFragmentDoc}
${TopicFragmentDoc}
${MainCategoryFragmentDoc}
${AssetFragmentDoc}`;
export const GetAllCasesByCategoryDetailsDocument = gql`
    query getAllCasesByCategoryDetails($legalAreaName: String!, $mainCategory: String!) {
  allCase(
    where: {legalArea: {findOne: {LegalArea: {legalAreaName: {eq: $legalAreaName}}}}, mainCategoryField: {findOne: {MainCategory: {mainCategory: {eq: $mainCategory}}}}}
  ) {
    edges {
      node {
        id
      }
    }
    totalCount
  }
}
    `;
export const GetAllArticleOverviewDocument = gql`
    query getAllArticleOverview($after: String) {
  allArticle(first: 100, after: $after) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        ...ArticleOverview
      }
    }
  }
}
    ${ArticleOverviewFragmentDoc}
${LegalAreaFragmentDoc}
${TopicFragmentDoc}
${MainCategoryFragmentDoc}
${AssetFragmentDoc}`;
export const GetAllLegalAreaDocument = gql`
    query getAllLegalArea {
  allLegalArea {
    totalCount
    edges {
      node {
        ...LegalArea
      }
    }
  }
}
    ${LegalAreaFragmentDoc}`;
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
export const GetArticleByIdDocument = gql`
    query getArticleById($id: ID!) {
  Article(id: $id) {
    ...FullArticle
  }
}
    ${FullArticleFragmentDoc}
${ArticleFullTextTasksFragmentDoc}
${FillInGapsGameFragmentDoc}
${CardSelectionGameFragmentDoc}
${DragNDropGameFragmentDoc}
${CalloutFragmentDoc}
${AssetFragmentDoc}
${LegalAreaFragmentDoc}
${MainCategoryFragmentDoc}
${TagsFragmentDoc}
${TopicFragmentDoc}`;
export const GetCaseByIdDocument = gql`
    query getCaseById($id: ID!) {
  Case(id: $id) {
    ...FullCase
  }
}
    ${FullCaseFragmentDoc}
${CaseFullTextTasksFragmentDoc}
${FillInGapsGameFragmentDoc}
${CardSelectionGameFragmentDoc}
${DragNDropGameFragmentDoc}
${CalloutFragmentDoc}
${AssetFragmentDoc}
${LegalAreaFragmentDoc}
${MainCategoryFragmentDoc}
${TagsFragmentDoc}
${TopicFragmentDoc}`;
export const GetLegalAreaByIdDocument = gql`
    query getLegalAreaById($id: ID!) {
  LegalArea(id: $id) {
    ...LegalArea
  }
}
    ${LegalAreaFragmentDoc}`;
export const GetMainCategoryByIdDocument = gql`
    query getMainCategoryById($id: ID!) {
  MainCategory(id: $id) {
    ...MainCategory
  }
}
    ${MainCategoryFragmentDoc}
${AssetFragmentDoc}`;
export const GetTagsByIdDocument = gql`
    query getTagsById($id: ID!) {
  Tags(id: $id) {
    ...Tags
  }
}
    ${TagsFragmentDoc}`;
export const GetTopicByIdDocument = gql`
    query getTopicById($id: ID!) {
  Topic(id: $id) {
    ...Topic
  }
}
    ${TopicFragmentDoc}`;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    getPopularSearches(variables?: IGenGetPopularSearchesQueryVariables, options?: C): Promise<IGenGetPopularSearchesQuery> {
      return requester<IGenGetPopularSearchesQuery, IGenGetPopularSearchesQueryVariables>(GetPopularSearchesDocument, variables, options) as Promise<IGenGetPopularSearchesQuery>;
    },
    getAllArticlesByLegalArea(variables: IGenGetAllArticlesByLegalAreaQueryVariables, options?: C): Promise<IGenGetAllArticlesByLegalAreaQuery> {
      return requester<IGenGetAllArticlesByLegalAreaQuery, IGenGetAllArticlesByLegalAreaQueryVariables>(GetAllArticlesByLegalAreaDocument, variables, options) as Promise<IGenGetAllArticlesByLegalAreaQuery>;
    },
    getAllArticlesByMainCategory(variables: IGenGetAllArticlesByMainCategoryQueryVariables, options?: C): Promise<IGenGetAllArticlesByMainCategoryQuery> {
      return requester<IGenGetAllArticlesByMainCategoryQuery, IGenGetAllArticlesByMainCategoryQueryVariables>(GetAllArticlesByMainCategoryDocument, variables, options) as Promise<IGenGetAllArticlesByMainCategoryQuery>;
    },
    getAllArticlesByTag(variables: IGenGetAllArticlesByTagQueryVariables, options?: C): Promise<IGenGetAllArticlesByTagQuery> {
      return requester<IGenGetAllArticlesByTagQuery, IGenGetAllArticlesByTagQueryVariables>(GetAllArticlesByTagDocument, variables, options) as Promise<IGenGetAllArticlesByTagQuery>;
    },
    getAllArticlesByTopic(variables: IGenGetAllArticlesByTopicQueryVariables, options?: C): Promise<IGenGetAllArticlesByTopicQuery> {
      return requester<IGenGetAllArticlesByTopicQuery, IGenGetAllArticlesByTopicQueryVariables>(GetAllArticlesByTopicDocument, variables, options) as Promise<IGenGetAllArticlesByTopicQuery>;
    },
    getAllCasesByLegalArea(variables: IGenGetAllCasesByLegalAreaQueryVariables, options?: C): Promise<IGenGetAllCasesByLegalAreaQuery> {
      return requester<IGenGetAllCasesByLegalAreaQuery, IGenGetAllCasesByLegalAreaQueryVariables>(GetAllCasesByLegalAreaDocument, variables, options) as Promise<IGenGetAllCasesByLegalAreaQuery>;
    },
    getAllCasesByMainCategory(variables: IGenGetAllCasesByMainCategoryQueryVariables, options?: C): Promise<IGenGetAllCasesByMainCategoryQuery> {
      return requester<IGenGetAllCasesByMainCategoryQuery, IGenGetAllCasesByMainCategoryQueryVariables>(GetAllCasesByMainCategoryDocument, variables, options) as Promise<IGenGetAllCasesByMainCategoryQuery>;
    },
    getAllCasesByTag(variables: IGenGetAllCasesByTagQueryVariables, options?: C): Promise<IGenGetAllCasesByTagQuery> {
      return requester<IGenGetAllCasesByTagQuery, IGenGetAllCasesByTagQueryVariables>(GetAllCasesByTagDocument, variables, options) as Promise<IGenGetAllCasesByTagQuery>;
    },
    getAllCasesByTopic(variables: IGenGetAllCasesByTopicQueryVariables, options?: C): Promise<IGenGetAllCasesByTopicQuery> {
      return requester<IGenGetAllCasesByTopicQuery, IGenGetAllCasesByTopicQueryVariables>(GetAllCasesByTopicDocument, variables, options) as Promise<IGenGetAllCasesByTopicQuery>;
    },
    getAllCaseOverview(variables?: IGenGetAllCaseOverviewQueryVariables, options?: C): Promise<IGenGetAllCaseOverviewQuery> {
      return requester<IGenGetAllCaseOverviewQuery, IGenGetAllCaseOverviewQueryVariables>(GetAllCaseOverviewDocument, variables, options) as Promise<IGenGetAllCaseOverviewQuery>;
    },
    getAllCasesByCategoryDetails(variables: IGenGetAllCasesByCategoryDetailsQueryVariables, options?: C): Promise<IGenGetAllCasesByCategoryDetailsQuery> {
      return requester<IGenGetAllCasesByCategoryDetailsQuery, IGenGetAllCasesByCategoryDetailsQueryVariables>(GetAllCasesByCategoryDetailsDocument, variables, options) as Promise<IGenGetAllCasesByCategoryDetailsQuery>;
    },
    getAllArticleOverview(variables?: IGenGetAllArticleOverviewQueryVariables, options?: C): Promise<IGenGetAllArticleOverviewQuery> {
      return requester<IGenGetAllArticleOverviewQuery, IGenGetAllArticleOverviewQueryVariables>(GetAllArticleOverviewDocument, variables, options) as Promise<IGenGetAllArticleOverviewQuery>;
    },
    getAllLegalArea(variables?: IGenGetAllLegalAreaQueryVariables, options?: C): Promise<IGenGetAllLegalAreaQuery> {
      return requester<IGenGetAllLegalAreaQuery, IGenGetAllLegalAreaQueryVariables>(GetAllLegalAreaDocument, variables, options) as Promise<IGenGetAllLegalAreaQuery>;
    },
    getAllMainCategory(variables?: IGenGetAllMainCategoryQueryVariables, options?: C): Promise<IGenGetAllMainCategoryQuery> {
      return requester<IGenGetAllMainCategoryQuery, IGenGetAllMainCategoryQueryVariables>(GetAllMainCategoryDocument, variables, options) as Promise<IGenGetAllMainCategoryQuery>;
    },
    getArticleById(variables: IGenGetArticleByIdQueryVariables, options?: C): Promise<IGenGetArticleByIdQuery> {
      return requester<IGenGetArticleByIdQuery, IGenGetArticleByIdQueryVariables>(GetArticleByIdDocument, variables, options) as Promise<IGenGetArticleByIdQuery>;
    },
    getCaseById(variables: IGenGetCaseByIdQueryVariables, options?: C): Promise<IGenGetCaseByIdQuery> {
      return requester<IGenGetCaseByIdQuery, IGenGetCaseByIdQueryVariables>(GetCaseByIdDocument, variables, options) as Promise<IGenGetCaseByIdQuery>;
    },
    getLegalAreaById(variables: IGenGetLegalAreaByIdQueryVariables, options?: C): Promise<IGenGetLegalAreaByIdQuery> {
      return requester<IGenGetLegalAreaByIdQuery, IGenGetLegalAreaByIdQueryVariables>(GetLegalAreaByIdDocument, variables, options) as Promise<IGenGetLegalAreaByIdQuery>;
    },
    getMainCategoryById(variables: IGenGetMainCategoryByIdQueryVariables, options?: C): Promise<IGenGetMainCategoryByIdQuery> {
      return requester<IGenGetMainCategoryByIdQuery, IGenGetMainCategoryByIdQueryVariables>(GetMainCategoryByIdDocument, variables, options) as Promise<IGenGetMainCategoryByIdQuery>;
    },
    getTagsById(variables: IGenGetTagsByIdQueryVariables, options?: C): Promise<IGenGetTagsByIdQuery> {
      return requester<IGenGetTagsByIdQuery, IGenGetTagsByIdQueryVariables>(GetTagsByIdDocument, variables, options) as Promise<IGenGetTagsByIdQuery>;
    },
    getTopicById(variables: IGenGetTopicByIdQueryVariables, options?: C): Promise<IGenGetTopicByIdQuery> {
      return requester<IGenGetTopicByIdQuery, IGenGetTopicByIdQueryVariables>(GetTopicByIdDocument, variables, options) as Promise<IGenGetTopicByIdQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;