import { useState } from "react";

const MyPages = ({ pages }: { pages: any[] }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [updatedPages, setUpdatedPages] = useState(pages);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleOpen = (site: string) => {
    window.open(site, "_blank");
  };

  const handleRemove = (index: number) => {
    const page = updatedPages[index];
    page.sites.forEach((site: string) => {
      window.open(site, "_blank");
    });

    const newPages = updatedPages.filter((_, i) => i !== index);
    setUpdatedPages(newPages);
    localStorage.setItem("pages", JSON.stringify(newPages));
  };

  const handleOpenAll = async (index: number) => {
    const page = updatedPages[index];
    for (const site of page.sites) {
      window.open(site, "_blank");
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  };

  return (
    <div className="bg-[#222] p-6 mt-4 space-y-6 overflow-y-auto max-h-[80vh]">
      {updatedPages.length === 0 ? (
        <p className="text-center text-white mt-10">
          no pages yet, create one! think it's a mistake? switch to create and
          back to pages.
        </p>
      ) : (
        updatedPages.map((page, index) => (
          <div key={index} className="bg-[#333] p-4 rounded space-y-4">
            <div className="flex justify-between items-center cursor-pointer">
              <h3 className="text-white text-lg font-semibold">{page.name}</h3>
              <div>
                <button
                  onClick={() => handleToggle(index)}
                  className="text-blue-500 text-sm mr-4"
                >
                  {expandedIndex === index ? "Collapse" : "Expand"}
                </button>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-500 text-sm"
                >
                  X
                </button>
                <button
                  onClick={() => handleOpenAll(index)}
                  className="text-green-500 text-sm ml-4"
                >
                  Open All
                </button>
              </div>
            </div>
            {expandedIndex === index && (
              <ul className="space-y-2">
                {page.sites.map((site: string, idx: number) => (
                  <li key={idx} className="text-white">
                    <button
                      onClick={() => handleOpen(site)}
                      className="hover:text-[#9f9f] transition-colors"
                    >
                      {site}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyPages;
