const dropZone = document.querySelector(".drop-zone");

// "dargover" event is fired continuously when an element or text selection
// is being dragged and the mouse pointer is over a valid drop target.
dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();

    if(!dropZone.classList.contains("dragged")) {
        dropZone.classList.add("dragged");
    } 
});

// "dragleave" event is fired when a dragged element or text selection leaves a valid drop target.
dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragged");
});

// "drop" event is fired when an element or text selection is dropped on a valid drop target.
dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragged");
});
