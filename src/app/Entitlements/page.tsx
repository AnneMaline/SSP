"use client";
import { useState, useEffect } from "react";
import GroupDropDown from "../../components/GroupDropDown";
import CreateGroupForm from "@/components/CreateGroupForm";
import { getGroups } from "@/utils/entitlement/getGroups";

type GroupItem = {
  name: string;
  email: string;
  description: string;
};

export default function EntitlementsPage() {
  const [GroupItems, setGroupItems] = useState<GroupItem[]>([]);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const roleRequired = "";
  const data_partition_id = "bootcamp";

  useEffect(() => {
    getGroups(roleRequired, data_partition_id).then((groups) =>
      setGroupItems(
        groups.map((item: GroupItem) => ({
          name: item.name,
          email: item.email,
          description: item.description,
        }))
      )
    );
  }, []);

  return (
    <div>
      <h1>Entitlements</h1>

      {/* -------------CREATE GROUP---------------- */}
      <button
        className="bg-green-500 text-white px-4 py-2"
        onClick={() => setShowCreateGroupForm(true)}
      >
        Create Group
      </button>
      {showCreateGroupForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <CreateGroupForm />
            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2"
              onClick={() => setShowCreateGroupForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* -------------GROUPS---------------- */}
      <ul className="mb-2 mt-2">
        {GroupItems.map((item) => (
          <li key={item.email}>
            <GroupDropDown
              name={item.name}
              group_email={item.email}
              description={item.description}
              data_partition_id={data_partition_id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
