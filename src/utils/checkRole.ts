import { getGroups } from "./entitlement/getGroups";

const opsRoles = [
  "service.legal.admin",
  "service.storage.admin",
  "service.schemea-service.admin",
];
const opsGroup = "users.datalake.ops";
const adminRoles = [
  "service.workflow.admin",
  "service.search.admin",
  "service.entitlements.admin",
];
const adminGroup = "users.datalake.admins";

export async function checkRole(
  authToken: string,
  data_partition_id: string
): Promise<boolean> {
  try {
    const groups = await getGroups(data_partition_id, authToken);
    return groups.some(
      (group: any) =>
        group.name in opsRoles || opsGroup || adminRoles || adminGroup
    );
  } catch (error) {
    console.error("Error checking admin role:", error);
    return false;
  }
}
