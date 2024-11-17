import { useState, useEffect } from "react";
import CreateGroup from "../components/CreateGroup";
import MyPages from "../components/MyPages";

const Popup = () => {
  const [activeTab, setActiveTab] = useState("myPages");
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("pages") || "[]");
    setPages(savedGroups);
  }, []);

  const handleCreateGroup = (groupName: string, groupSites: string[]) => {
    const newGroup = { name: groupName, sites: groupSites };
    const newGroups = [...pages, newGroup];
    setPages(newGroups);
    localStorage.setItem("pages", JSON.stringify(newGroups));
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "myPages":
        return <MyPages pages={pages} />;
      case "createGroup":
        return <CreateGroup onCreate={handleCreateGroup} />;
      default:
        return <p>Choose a tab to get started!</p>;
    }
  };

  return (
    <div className="bg-[#101010] h-screen w-screen text-white font-mono p-4 placeholder-black">
      <h1 className="">Your Websites</h1>
      <div className="tabs flex flex-col items-start font-bold mt-4">
        <button
          onClick={() => setActiveTab("myPages")}
          className="hover:text-[#ff9]"
        >
          my pages
        </button>
        <button
          onClick={() => setActiveTab("createGroup")}
          className="hover:text-[#ff9]"
        >
          create group
        </button>
      </div>
      {renderActiveTab()}
    </div>
  );
};

export default Popup;
