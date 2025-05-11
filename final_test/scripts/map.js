document.addEventListener("DOMContentLoaded", () => {
	const zoomWrapper = document.getElementById("map-zoom-wrapper");
	const zoomIn = document.getElementById("zoom-in");
	const zoomOut = document.getElementById("zoom-out");
	const mapContainer = document.querySelector(".map-container");
	const markers = document.querySelectorAll(".map-marker");

	let currentZoom = 2;
	let translateX = 250;
	let translateY = 150;
	let isDragging = false;
	let startX = 0;
	let startY = 0;

	function updateTransform() {
		zoomWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;

		markers.forEach(marker => {
			marker.style.transform = `translate(-50%, -50%) scale(${1 / currentZoom})`;
		});
	}

	zoomIn.addEventListener("click", () => {
		currentZoom = Math.min(currentZoom + 0.25, 4);
		updateTransform();
	});

	zoomOut.addEventListener("click", () => {
		currentZoom = Math.max(0.5, currentZoom - 0.25);
		updateTransform();
	});

	const mapImage = document.querySelector(".map-image");
	mapImage.ondragstart = () => false;

	mapContainer.addEventListener("mousedown", (e) => {
		isDragging = true;
		startX = e.clientX - translateX;
		startY = e.clientY - translateY;
		mapContainer.classList.add("dragging");
		e.preventDefault(); 
	});

	window.addEventListener("mouseup", () => {
		isDragging = false;
		mapContainer.classList.remove("dragging");
	});

	window.addEventListener("mouseleave", () => {
		isDragging = false;
		mapContainer.classList.remove("dragging");
	});

	window.addEventListener("mousemove", (e) => {
		if (!isDragging) return;
		translateX = e.clientX - startX;
		translateY = e.clientY - startY;
		updateTransform();
	});

	markers.forEach(marker => {
		marker.addEventListener("click", (e) => {
			e.stopPropagation();
			document.querySelectorAll(".marker-popup.visible").forEach(p => p.classList.remove("visible"));
			const popupId = marker.getAttribute("data-popup-id");
			const popup = document.getElementById(popupId);
			if (popup) popup.classList.toggle("visible");
		});
	});

	document.addEventListener("click", () => {
		document.querySelectorAll(".marker-popup.visible").forEach(p => p.classList.remove("visible"));
	});

	updateTransform()
});
