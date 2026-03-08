import type { Block, CollectionConfig } from "payload";

const HeadersBlock: Block = {
  slug: "Headers",
  fields: [
    {
      type: "select",
      name: "type",
      options: [
        {
          value: "centered",
          label: "Centered",
        },
      ],
    },
    { type: "relationship", name: "background image", relationTo: "media" },
  ],
};

const ServicesBlock: Block = {
  slug: "Services",
  fields: [
    {
      type: "array",
      name: "services",
      fields: [
        {
          type: "text",
          name: "title",
        },
        {
          type: "textarea",
          name: "description",
        },
        {
          type: "text",
          name: "page-slug",
        },
      ],
    },
  ],
};

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "page-route",
  },
  fields: [
    {
      type: "text",
      name: "page-route",
      unique: true,
    },
    {
      name: "sections",
      type: "blocks",
      blocks: [HeadersBlock, ServicesBlock],
    },
  ],
};
