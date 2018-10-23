export function showPolicy(policy) {
  document.getElementById(policy).classList.add("show-policy", "webkit-scroll");

  let signIn = document.querySelector(".sign-in");
  if (signIn) signIn.classList.remove("webkit-scroll");

  let userDash = document.querySelector(".user-dashboard");
  if (userDash) userDash.classList.remove("webkit-scroll");
}
