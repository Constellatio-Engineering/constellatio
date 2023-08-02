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
  description?: InputMaybe<IGenOrder>;
  dominantColor?: InputMaybe<IGenOrder>;
  height?: InputMaybe<IGenOrder>;
  keywords?: InputMaybe<IGenOrder>;
  originType?: InputMaybe<IGenOrder>;
  originalName?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
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
  expandable?: InputMaybe<IGenOrder>;
  icon?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  text?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
};

export type IGenCallout_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenCallout_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenCallout_Where>>>;
  expandable?: InputMaybe<Scalars['Boolean']['input']>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenDragNDrop = {
  __typename?: 'DragNDrop';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  game?: Maybe<Scalars['JSON']['output']>;
  helpNote?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  internalTitle?: Maybe<Scalars['String']['output']>;
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
  helpNote?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
};

export type IGenDragNDrop_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenDragNDrop_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenDragNDrop_Where>>>;
  helpNote?: InputMaybe<IGenCaisyField_String_Where>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenHeadline = {
  __typename?: 'Headline';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type IGenHeadline_Connection = {
  __typename?: 'Headline_Connection';
  edges?: Maybe<Array<Maybe<IGenHeadline_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type IGenHeadline_ConnectionEdge = {
  __typename?: 'Headline_ConnectionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<IGenHeadline>;
};

export type IGenHeadline_Sort = {
  title?: InputMaybe<IGenOrder>;
};

export type IGenHeadline_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenHeadline_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenHeadline_Where>>>;
  title?: InputMaybe<IGenCaisyField_String_Where>;
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
  downloadable?: InputMaybe<IGenOrder>;
  image?: InputMaybe<IGenOrder>;
  internalTitle?: InputMaybe<IGenOrder>;
  title?: InputMaybe<IGenOrder>;
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
  internalTitle?: InputMaybe<IGenOrder>;
  nameInNavigation?: InputMaybe<IGenOrder>;
  slug?: InputMaybe<IGenOrder>;
};

export type IGenPage_Where = {
  AND?: InputMaybe<Array<InputMaybe<IGenPage_Where>>>;
  OR?: InputMaybe<Array<InputMaybe<IGenPage_Where>>>;
  internalTitle?: InputMaybe<IGenCaisyField_String_Where>;
  nameInNavigation?: InputMaybe<IGenCaisyField_String_Where>;
  slug?: InputMaybe<IGenCaisyField_String_Where>;
};

export type IGenPage_Components = IGenCallout | IGenDragNDrop | IGenHeadline | IGenImageWrapperCard | IGenTextElement;

export type IGenQuery = {
  __typename?: 'Query';
  Asset?: Maybe<IGenAsset>;
  Callout?: Maybe<IGenCallout>;
  DragNDrop?: Maybe<IGenDragNDrop>;
  Headline?: Maybe<IGenHeadline>;
  ImageWrapperCard?: Maybe<IGenImageWrapperCard>;
  Page?: Maybe<IGenPage>;
  TextElement?: Maybe<IGenTextElement>;
  allAsset?: Maybe<IGenAsset_Connection>;
  allCallout?: Maybe<IGenCallout_Connection>;
  allDragNDrop?: Maybe<IGenDragNDrop_Connection>;
  allHeadline?: Maybe<IGenHeadline_Connection>;
  allImageWrapperCard?: Maybe<IGenImageWrapperCard_Connection>;
  allPage?: Maybe<IGenPage_Connection>;
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


export type IGenQueryDragNDropArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type IGenQueryHeadlineArgs = {
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


export type IGenQueryAllDragNDropArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenDragNDrop_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenDragNDrop_Where>>>;
};


export type IGenQueryAllHeadlineArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenHeadline_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenHeadline_Where>>>;
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


export type IGenQueryAllTextElementArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<IGenTextElement_Sort>>>;
  where?: InputMaybe<Array<InputMaybe<IGenTextElement_Where>>>;
};

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
  internalTitle?: InputMaybe<IGenOrder>;
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

export type IGenDragNDropFragment = { __typename?: 'DragNDrop', id?: string | null, game?: any | null, helpNote?: string | null };

export type IGenHeadlineFragment = { __typename?: 'Headline', id?: string | null, title?: string | null };

export type IGenImageWrapperCardFragment = { __typename?: 'ImageWrapperCard', id?: string | null, title?: string | null, downloadable?: boolean | null, image?: (
    { __typename?: 'Asset' }
    & IGenAssetFragment
  ) | null };

export type IGenTextElementFragment = { __typename?: 'TextElement', id?: string | null, richTextContent?: { __typename?: 'TextElement_richTextContent', json?: any | null, connections?: Array<{ __typename: 'Caisy_Field_Document_NotFound' } | null> | null } | null };

export type IGenPageQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type IGenPageQuery = { __typename?: 'Query', allPage?: { __typename?: 'Page_Connection', edges?: Array<{ __typename?: 'Page_ConnectionEdge', node?: { __typename?: 'Page', id?: string | null, nameInNavigation?: string | null, slug?: string | null, components?: Array<(
          { __typename?: 'Callout' }
          & IGenCalloutFragment
        ) | (
          { __typename?: 'DragNDrop' }
          & IGenDragNDropFragment
        ) | (
          { __typename?: 'Headline' }
          & IGenHeadlineFragment
        ) | (
          { __typename?: 'ImageWrapperCard' }
          & IGenImageWrapperCardFragment
        ) | (
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
export const DragNDropFragmentDoc = gql`
    fragment DragNDrop on DragNDrop {
  id
  game
  helpNote
}
    `;
export const HeadlineFragmentDoc = gql`
    fragment Headline on Headline {
  id
  title
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
export const PageDocument = gql`
    query Page($slug: String!) {
  allPage(where: {slug: {eq: $slug}}) {
    edges {
      node {
        id
        nameInNavigation
        slug
        components {
          ...Headline
          ...TextElement
          ...Callout
          ...ImageWrapperCard
          ...DragNDrop
        }
      }
    }
  }
}
    ${HeadlineFragmentDoc}
${TextElementFragmentDoc}
${CalloutFragmentDoc}
${AssetFragmentDoc}
${ImageWrapperCardFragmentDoc}
${DragNDropFragmentDoc}`;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    Page(variables: IGenPageQueryVariables, options?: C): Promise<IGenPageQuery> {
      return requester<IGenPageQuery, IGenPageQueryVariables>(PageDocument, variables, options) as Promise<IGenPageQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;