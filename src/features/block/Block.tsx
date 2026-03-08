import { Page } from "@/payload-types";

type Blocks = NonNullable<Page["sections"]>[number];
type HeaderBlock = Extract<Blocks, { blockType: "Headers" }>;
type ServiceBlock = Extract<Blocks, { blockType: "Services" }>;

const Block = ({ block }: { block: Blocks }) => {
  if (block.blockType === "Headers") {
    return <div>This is a Header block of type {block.type}</div>;
  }

  if (block.blockType === "Services") {
    return (
      <div>
        This is a Services block with services{" "}
        {block.services?.map((service) => service.title)}
      </div>
    );
  }
};

export default Block;
