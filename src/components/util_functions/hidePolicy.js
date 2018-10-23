export function hidePolicy(policy) {
  document.getElementById(policy).classList.remove("show-policy");

  let signIn = document.querySelector(".sign-in");
  if (signIn) signIn.classList.add("webkit-scroll");

  let userDash = document.querySelector(".user-dashboard");
  if (userDash) userDash.classList.add("webkit-scroll");
}
