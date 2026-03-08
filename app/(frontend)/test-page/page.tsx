import { getPayload } from "payload";
import config from "@payload-config";
import Block from "@/src/features/block/Block";
import { notFound } from "next/navigation";

const payload = await getPayload({ config });

const TestPage = async () => {
  const result = await payload
    .find({
      collection: "pages",
      where: {
        "page-route": {
          equals: "test-page",
        },
      },
    })
    .catch(() => ({ docs: [] }));

  const { docs = [] } = result;
  const [page] = docs;

  if (!page) {
    return notFound();
  }

  const { sections = [] } = page;

  return (
    <div>
      <h1>TestPage</h1>
      {sections?.map((section) => (
        <Block key={section.id} block={section} />
      ))}
    </div>
  );
};

export default TestPage;
