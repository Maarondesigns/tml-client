export function fixAddFormHeight() {
  //get height of add-forms
  let form = document.getElementById("add-forms");
  let currentHeight = form.getBoundingClientRect().height;
  //if add-form is open...
  if (Math.round(currentHeight) !== 20) {
    //set height to height of children and scroll to bottom
    let fullHeight = 0;
    form.childNodes.forEach(
      x => (fullHeight += x.getBoundingClientRect().height)
    );
    form.style.height = fullHeight + 40 + "px";
    window.scrollTo(0, document.body.scrollHeight);
  }
}
