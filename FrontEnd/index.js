const dropZone = document.querySelector(".drop-zone");
const browseBtn = document.querySelector(".browseBtn");
const fileInput = document.querySelector("#fileInput");

// Function to add the "dragged" class
function addDraggedClass() {
    if (!dropZone.classList.contains("dragged")) {
        dropZone.classList.add("dragged");
    }
}

// Function to remove the "dragged" class
function removeDraggedClass() {
    dropZone.classList.remove("dragged");
}

// "dragover" event is fired continuously when an element or text selection
// is being dragged and the mouse pointer is over a valid drop target.
dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    addDraggedClass();
});

// "dragleave" event is fired when a dragged element or text selection leaves a valid drop target.
dropZone.addEventListener("dragleave", () => {
    removeDraggedClass();
});

// "drop" event is fired when an element or text selection is dropped on a valid drop target.
dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    removeDraggedClass();
});

// Add event listener for mouseenter to keep the animation when hovering
dropZone.addEventListener("mouseenter", () => {
    addDraggedClass();
});

// Add event listener for mouseleave to remove the animation when not hovering
dropZone.addEventListener("mouseleave", () => {
    removeDraggedClass();
});

// Function to trigger file input click when browseBtn is clicked
browseBtn.addEventListener("click", () => {
    fileInput.click();
});
