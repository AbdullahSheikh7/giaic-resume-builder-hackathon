const shareButton = document.getElementById('shareButton');
const shareModal = document.getElementById('shareModal');
const shareLink = document.getElementById('share-link');
const shareLinkCopy = document.getElementById('share-link-copy');

shareLinkCopy.addEventListener("click", async () => {
  await navigator.clipboard.writeText(shareLink.value)
  alert("Link copied")
})

window.addEventListener("click", e => {
  if (!e.target.closest("#shareModal") && !e.target.closest("#shareButton")) {
    shareModal.classList.remove("open")
    // console.log(true);
  }
})

// Position and show modal on button click
shareButton.addEventListener('click', (event) => {
  shareModal.classList.toggle("open")
});

// Hide modal on mouse out
shareModal.addEventListener('mouseleave', () => {
  shareModal.classList.remove("open")
});
