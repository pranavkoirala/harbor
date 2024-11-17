import { useState } from "react";

const CreateGroup = ({
  onCreate,
}: {
  onCreate: (name: string, sites: string[]) => void;
}) => {
  const [groupName, setGroupName] = useState("");
  const [groupSites, setGroupSites] = useState<string[]>([]);

  const handleAddSite = (e: React.FormEvent) => {
    e.preventDefault();
    const newSite = (e.target as HTMLFormElement).elements.namedItem(
      "newSite"
    ) as HTMLInputElement;
    let site = newSite.value.trim();

    if (!/^https?:\/\//i.test(site)) {
      site = `https://${site}`;
    }

    if (!site.includes(".")) {
      site = `${site}.com`;
    }

    setGroupSites([...groupSites, site]);
    newSite.value = "";
  };

  const handleRemoveSite = (site: string) => {
    setGroupSites(groupSites.filter((s) => s !== site));
  };

  const handleCreate = () => {
    onCreate(groupName, groupSites);
    setGroupName("");
    setGroupSites([]);
  };

  return (
    <div className="bg-[#222] flex items-center flex-col justify-center p-6 mt-4 space-y-6">
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="bg-[#333] text-white p-1 rounded w-full sm:w-80"
      />
      <form
        onSubmit={handleAddSite}
        className="flex items-center space-x-4 w-full sm:w-80"
      >
        <input
          type="text"
          name="newSite"
          placeholder="Add Site"
          className="bg-[#333] text-white p-1 rounded flex-grow"
        />
        <button
          type="submit"
          className="bg-[#666] text-white p-1 rounded ml-2 hover:bg-[#333]"
        >
          Add Site
        </button>
      </form>
      <div className="w-full sm:w-80 space-y-2 mt-4">
        {groupSites.length > 0 && (
          <>
            <p className="text-white">Added Sites:</p>
            <ul className="space-y-1">
              {groupSites.map((site, index) => (
                <li key={index} className="flex justify-between text-white">
                  <a
                    href={site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#9f9f] transition-colors"
                  >
                    {site}
                  </a>
                  <button
                    onClick={() => handleRemoveSite(site)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <button
        onClick={handleCreate}
        className="bg-[#9f9f] text-black p-1 rounded w-full sm:w-80 mt-4 hover:bg-[#0f0f]"
      >
        Create Group
      </button>
    </div>
  );
};

export default CreateGroup;
