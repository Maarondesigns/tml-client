import { showAddForms } from "./showAddForms";

export function showAddFormTwice() {
  showAddForms();
  setTimeout(() => {
    document.body.style.overflow = "unset";
    showAddForms();
  }, 400);
}
