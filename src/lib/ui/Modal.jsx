import { createSignal, createResource, children, Switch, Match, Suspense } from "solid-js";

export default function Modal(props) {
  let id;

  return (
    <>
      <button class="btn" on:click={() => id.showModal()}>
        {props.message}
      </button>
      <dialog ref={id} class="modal">
        <div class="modal-box">
          {props.children}
          <div class="modal-action">
            <form method="dialog ">
              <div class="flex space-x-4">
                <For each={props.buttons}>
                  {(btn, i) => (
                    <button class={"btn " + btn.class} on:click={btn.onClick}>
                      {btn.action}
                    </button>
                  )}
                </For>
              </div>
            </form>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export function ConfirmationModal(props) {
  const safeChildren = children(() => props.children);

  return (
    <Modal
      message={props.message}
      buttons={[
        {
          action: "Confirm",
          onClick: props.onConfirm,
          class: "btn-success",
        },
        {
          action: "Cancel",
          onClick: props.onCancel,
          class: "btn-error",
        },
      ]}
    >
      {safeChildren()}
    </Modal>
  );
}
