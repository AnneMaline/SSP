"use client";
import { useState } from "react";
import GroupDropDown from "../../components/GroupDropDown";

type GroupItem = {
  name: string;
  description: string;
  members: { id: string; role: string }[];
};

export default function EntitlementsPage() {
  const [GroupItems, setGroupItems] = useState<GroupItem[]>([
    {
      name: "Team A",
      description: "This is Team A",
      members: [
        { id: "1", role: "Developer" },
        { id: "2", role: "Tester" },
      ],
    },
    {
      name: "Team B",
      description: "This is Team B",
      members: [
        { id: "3", role: "Manager" },
        { id: "4", role: "Designer" },
      ],
    },
  ]);

  const handleDelete = (index: number) => {
    setGroupItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Entitlements</h1>
      <ul className="mb-2 mt-2">
        {GroupItems.map((item, index) => (
          <li key={index}>
            <GroupDropDown
              name={item.name}
              description={item.description}
              members={item.members}
              onDelete={() => handleDelete(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
