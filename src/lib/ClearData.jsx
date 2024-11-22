import { ConfirmationModal } from "/src/lib/ui/Modal";

export default function ClearData() {
  return (
    <ConfirmationModal message="Clear Data" onConfirm={() => {}} onCancel={() => {}}>
      <h3 class="text-xl font-bold">Are you sure?</h3>
      <p class="py-4">
        You are about to delete all the data linked to this Chrome extension. This includes any synced data related to
        FTCE on your Google account.
      </p>
    </ConfirmationModal>
  );
}
