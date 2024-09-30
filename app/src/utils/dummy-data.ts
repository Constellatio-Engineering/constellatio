/* eslint-disable no-multiple-empty-lines,max-lines */
import { type AllCases } from "@/services/content/getAllCases";

// This is currently not used, its main purpose was to test the filtering on the overview page

// eslint-disable-next-line import/no-unused-modules
export const dummyCases: AllCases = [


  {
    __typename: "Case",
    _meta: {
      createdAt: "2023-09-26T11:43:23.841422Z"
    },
    durationToCompleteInMinutes: 90,
    id: "1",
    legalArea: {
      __typename: "LegalArea",
      id: "d4818d37-36f7-4371-b444-f777e7d74148",
      legalAreaName: "Examensklausur",
      sorting: null
    },
    mainCategoryField: [
      {
        __typename: "MainCategory",
        icon: {
          author: "",
          copyright: "",
          description: "",
          dominantColor: "#000000",
          height: 20,
          id: "66502932-ff6e-48a0-a64f-d74c7fd8ecda",
          keywords: "",
          originType: "image/svg+xml",
          src: "https://assets.caisy.io/assets/21691a6c-f949-491d-99a3-079a4bd23818/66502932-ff6e-48a0-a64f-d74c7fd8ecda/4beef6a9-ca67-4b1c-a862-812ef87d7bf1civillawcategoryicon.svg",
          title: "civil-law-category-icon",
          width: 21
        },
        id: "60d46218-087c-4170-9edc-246cc1bffcdf",
        mainCategory: "Zivilrecht",
        slug: "zivilrecht"
      }
    ],
    tags: [
      {
        __typename: "Tags",
        id: "1",
        isShownInitiallyBeforeSearch: null,
        tagName: "Tag 1"
      },
      {
        __typename: "Tags",
        id: "2",
        isShownInitiallyBeforeSearch: null,
        tagName: "Tag 2"
      },
    ],
    title: "Examensklausur Fall 1 / Thema 1 - Tag 1, 2",
    topic: [
      {
        __typename: "Topic",
        id: "1",
        sorting: 5,
        topicName: "Thema 1"
      }
    ]
  },



  {
    __typename: "Case",
    _meta: {
      createdAt: "2024-09-08T13:53:56.447992Z"
    },
    durationToCompleteInMinutes: 120,
    id: "2",
    legalArea: {
      __typename: "LegalArea",
      id: "dec5a487-4624-4646-84e8-3689a03feb4d",
      legalAreaName: "Kommunalrecht",
      sorting: 3
    },
    mainCategoryField: [
      {
        __typename: "MainCategory",
        icon: {
          author: "",
          copyright: "",
          description: "",
          dominantColor: "#000000",
          height: 20,
          id: "66502932-ff6e-48a0-a64f-d74c7fd8ecda",
          keywords: "",
          originType: "image/svg+xml",
          src: "https://assets.caisy.io/assets/21691a6c-f949-491d-99a3-079a4bd23818/66502932-ff6e-48a0-a64f-d74c7fd8ecda/4beef6a9-ca67-4b1c-a862-812ef87d7bf1civillawcategoryicon.svg",
          title: "civil-law-category-icon",
          width: 21
        },
        id: "60d46218-087c-4170-9edc-246cc1bffcdf",
        mainCategory: "Zivilrecht",
        slug: "zivilrecht"
      }
    ],
    tags: [
      {
        __typename: "Tags",
        id: "3",
        isShownInitiallyBeforeSearch: null,
        tagName: "Tag 3"
      },
    ],
    title: "Kommunalrecht Fall 1 / Thema 2 - Tag 3",
    topic: [
      {
        __typename: "Topic",
        id: "2",
        sorting: 5,
        topicName: "Thema 2"
      },
    ]
  },




  {
    __typename: "Case",
    _meta: {
      createdAt: "2023-10-24T12:41:11.654276Z"
    },
    durationToCompleteInMinutes: 30,
    id: "3",
    legalArea: {
      __typename: "LegalArea",
      id: "0dc9368e-06f3-4ca8-b1ef-f9c3e4de5843",
      legalAreaName: "BGB AT",
      sorting: 2
    },
    mainCategoryField: [
      {
        __typename: "MainCategory",
        icon: {
          author: "",
          copyright: "",
          description: "",
          dominantColor: "#000000",
          height: 20,
          id: "66502932-ff6e-48a0-a64f-d74c7fd8ecda",
          keywords: "",
          originType: "image/svg+xml",
          src: "https://assets.caisy.io/assets/21691a6c-f949-491d-99a3-079a4bd23818/66502932-ff6e-48a0-a64f-d74c7fd8ecda/4beef6a9-ca67-4b1c-a862-812ef87d7bf1civillawcategoryicon.svg",
          title: "civil-law-category-icon",
          width: 21
        },
        id: "60d46218-087c-4170-9edc-246cc1bffcdf",
        mainCategory: "Zivilrecht",
        slug: "zivilrecht"
      }
    ],
    tags: [
      {
        __typename: "Tags",
        id: "2",
        isShownInitiallyBeforeSearch: null,
        tagName: "Tag 2"
      },
    ],
    title: "BGB AT Fall 1 / Thema 1, 2 - Tag 2",
    topic: [
      {
        __typename: "Topic",
        id: "1",
        sorting: 5,
        topicName: "Thema 1"
      },
      {
        __typename: "Topic",
        id: "2",
        sorting: 6,
        topicName: "Thema 2"
      },
    ]
  },




  {
    __typename: "Case",
    _meta: {
      createdAt: "2023-10-24T12:41:11.654276Z"
    },
    durationToCompleteInMinutes: 30,
    id: "4",
    legalArea: {
      __typename: "LegalArea",
      id: "0dc9368e-06f3-4ca8-b1ef-f9c3e4de5843",
      legalAreaName: "BGB AT",
      sorting: 2
    },
    mainCategoryField: [
      {
        __typename: "MainCategory",
        icon: {
          author: "",
          copyright: "",
          description: "",
          dominantColor: "#000000",
          height: 20,
          id: "66502932-ff6e-48a0-a64f-d74c7fd8ecda",
          keywords: "",
          originType: "image/svg+xml",
          src: "https://assets.caisy.io/assets/21691a6c-f949-491d-99a3-079a4bd23818/66502932-ff6e-48a0-a64f-d74c7fd8ecda/4beef6a9-ca67-4b1c-a862-812ef87d7bf1civillawcategoryicon.svg",
          title: "civil-law-category-icon",
          width: 21
        },
        id: "60d46218-087c-4170-9edc-246cc1bffcdf",
        mainCategory: "Zivilrecht",
        slug: "zivilrecht"
      }
    ],
    tags: [
      {
        __typename: "Tags",
        id: "2",
        isShownInitiallyBeforeSearch: null,
        tagName: "Tag 2"
      },
    ],
    title: "BGB AT Fall 2 / Kein Thema - Tag 2",
    topic: []
  },




  {
    __typename: "Case",
    _meta: {
      createdAt: "2023-10-24T12:41:11.654276Z"
    },
    durationToCompleteInMinutes: 30,
    id: "5",
    legalArea: {
      __typename: "LegalArea",
      id: "0dc9368e-06f3-4ca8-b1ef-f9c3e4de5843",
      legalAreaName: "BGB AT",
      sorting: 2
    },
    mainCategoryField: [
      {
        __typename: "MainCategory",
        icon: {
          author: "",
          copyright: "",
          description: "",
          dominantColor: "#000000",
          height: 20,
          id: "66502932-ff6e-48a0-a64f-d74c7fd8ecda",
          keywords: "",
          originType: "image/svg+xml",
          src: "https://assets.caisy.io/assets/21691a6c-f949-491d-99a3-079a4bd23818/66502932-ff6e-48a0-a64f-d74c7fd8ecda/4beef6a9-ca67-4b1c-a862-812ef87d7bf1civillawcategoryicon.svg",
          title: "civil-law-category-icon",
          width: 21
        },
        id: "60d46218-087c-4170-9edc-246cc1bffcdf",
        mainCategory: "Zivilrecht",
        slug: "zivilrecht"
      }
    ],
    tags: [
      {
        __typename: "Tags",
        id: "4",
        isShownInitiallyBeforeSearch: null,
        tagName: "Tag 4"
      },
      {
        __typename: "Tags",
        id: "1",
        isShownInitiallyBeforeSearch: null,
        tagName: "Tag 1"
      },
    ],
    title: "BGB AT Fall 3 / Thema 1 - Tag 1, 4",
    topic: [
      {
        __typename: "Topic",
        id: "1",
        sorting: 5,
        topicName: "Thema 1"
      },
    ]
  },
];
