"use client";
import { useState, useEffect } from "react";
import GroupDropDown from "../../components/GroupDropDown";
import CreateGroupForm from "@/components/CreateGroupForm";
import { getGroups } from "@/utils/entitlement/getGroups";
import { signIn, useSession } from "next-auth/react";
import TitleBanner from "@/components/TitleBanner";
import styles from "./entitlements.module.css";
import { FaTimes } from "react-icons/fa";
import AddIDtoGroupForm from "@/components/AddIDtoGroupForm";

type GroupItem = {
  name: string;
  email: string;
  description: string;
};

export default function EntitlementsPage() {
  const [GroupItems, setGroupItems] = useState<GroupItem[]>([]);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [showCreateGroupTask, setShowCreateGroupTask] = useState(true);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [showAddMemberTask, setShowAddMemberTask] = useState(true);
  const data_partition_id = "bootcamp";
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && (!session || !session.accessToken)) {
      signIn("azure-ad", { callbackUrl: "/entitlements" });
      return;
    }
    if (session && session.accessToken) {
      getGroups(data_partition_id, session.accessToken).then((groups) => {
        setGroupItems(
          groups.map((item: GroupItem) => ({
            name: item.name,
            email: item.email,
            description: item.description,
          }))
        );
      });
    }
  }, [session]);

  const description =
    "See groups with access, make more groups or add members.";

  return (
    <div>
      {/* Title */}
      <TitleBanner
        title="Entitlements API"
        description={description}
        back={true}
      />

      <div className={styles.tasks}>
        {/* -------------CREATE GROUP---------------- */}
        {showCreateGroupTask && (
          <div className={styles.task_container}>
            <button
              className={styles.close_button}
              onClick={() => setShowCreateGroupTask(false)}
            >
              <FaTimes />
            </button>
            <p>Here you can create groups</p>
            <button
              className="button"
              onClick={() => setShowCreateGroupForm(true)}
            >
              Add
            </button>
          </div>
        )}

        {/* -------------ADD MEMBER---------------- */}
        {showAddMemberTask && (
          <div className={styles.task_container}>
            <button
              className={styles.close_button}
              onClick={() => setShowAddMemberTask(false)}
            >
              <FaTimes />
            </button>
            <p>Here you can add members to groups</p>
            <button
              className="button"
              onClick={() => setShowAddMemberForm(true)}
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* ---------------Task form popups---------------- */}
      {showCreateGroupForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded max-h-[90vh] overflow-y-auto">
            <CreateGroupForm />
            <button
              className="button"
              onClick={() => setShowCreateGroupForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showAddMemberForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded max-h-[90vh] overflow-y-auto">
            <AddIDtoGroupForm />
            <button
              className="button"
              onClick={() => setShowAddMemberForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* -------------GROUPS---------------- */}
      <ul className={styles.group_table}>
        <p className="text-small text-[#3D3D3D] pb-5">
          {" "}
          List of your access groups
        </p>
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
