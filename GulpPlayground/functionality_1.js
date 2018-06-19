function drawScene() {
	localizeObjects();
	removeHiddenSurfaces();
	projectPolygons();
	rasterizePolygons();
}

function localizeObjects() {
	translateObjectsToCameraCoords();
	rotateObjectsToCameraCoords();
}

function removeHiddenSurfaces() {
	frustumCullObjects();
	backfaceCullPolygons();
	frustumCullPolygons();
	frustumClipPolygons();
}

function projectPolygons() {
}

function rasterizePolygons() {
	rasterizeTopTriangle();
	rasterizeBottomTriangle();
}