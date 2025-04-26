document.addEventListener("DOMContentLoaded", () => {
	const zoomWrapper = document.getElementById("map-zoom-wrapper");
	const zoomIn = document.getElementById("zoom-in");
	const zoomOut = document.getElementById("zoom-out");
	const mapContainer = document.querySelector(".map-container");

	let currentZoom = 1.0;
	let translateX = 0;
	let translateY = 0;
	let isDragging = false;
	let startX = 0;
	let startY = 0;

	// Update zoom + drag transform
	function updateTransform() {
		zoomWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
	}

	// Zoom in/out buttons
	zoomIn.addEventListener("click", () => {
		currentZoom = Math.min(currentZoom + 0.25, 4);
		updateTransform();
	});

	zoomOut.addEventListener("click", () => {
		currentZoom = Math.max(0.5, currentZoom - 0.25);
		updateTransform();
	});

	// Prevent image ghost-drag
	const mapImage = document.querySelector(".map-image");
	mapImage.ondragstart = () => false;

	// Begin drag
	mapContainer.addEventListener("mousedown", (e) => {
		isDragging = true;
		startX = e.clientX - translateX;
		startY = e.clientY - translateY;
		mapContainer.classList.add("dragging");
		e.preventDefault(); // prevent default image drag
	});

	// End drag
	window.addEventListener("mouseup", () => {
		isDragging = false;
		mapContainer.classList.remove("dragging");
	});

	window.addEventListener("mouseleave", () => {
		isDragging = false;
		mapContainer.classList.remove("dragging");
	});

	// Update drag position on mouse move (instant)
	window.addEventListener("mousemove", (e) => {
		if (!isDragging) return;
		translateX = e.clientX - startX;
		translateY = e.clientY - startY;
		updateTransform();
	});

	// Marker click popup toggle
	const markers = document.querySelectorAll(".map-marker");
	markers.forEach(marker => {
		marker.addEventListener("click", (e) => {
			e.stopPropagation();
			document.querySelectorAll(".marker-popup.visible").forEach(p => p.classList.remove("visible"));
			const popupId = marker.getAttribute("data-popup-id");
			const popup = document.getElementById(popupId);
			if (popup) popup.classList.toggle("visible");
		});
	});

	// Close popups on outside click
	document.addEventListener("click", () => {
		document.querySelectorAll(".marker-popup.visible").forEach(p => p.classList.remove("visible"));
	});
});
