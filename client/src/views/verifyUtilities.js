const incidents = []; // Active Incidents
export const bannedObjects = ["cell phone" ]; // Array of banned objects
export const notBannedObjects = ["keyboard", "mouse", "laptop"]
export const pointDownObjects = ["person"]


export const cheatingObject = (detections) => {
  const hasBannedObject = detections.some((detection) => bannedObjects.includes(detection.class)); // if theres ONE detection that includes a banned object
  const personCount = detections.filter((detection) => detection.class === "person").length;
  const isCheating = personCount > 1;
  checkAndResetIncidents("Banned Object", hasBannedObject);
  checkAndResetIncidents("Person Count", isCheating);
}

function checkAndResetIncidents(flagType, hasBannedObject) {
  for (let i = incidents.length - 1; i >= 0; i--) {
    const incident = incidents[i];
    if (!hasBannedObject && incident.flagType === flagType) { // if the parsed behaviour matches the behaviour of this incident AND if it's no longer active
      incidents.splice(i, 1); // Remove the incident from the list
      console.log("Incident reset for " + flagType);
    }
  }
}

export const drawRect = (detections, ctx) => {
  // Loop through each prediction
  detections.forEach(prediction => {

    // Extract boxes and classes
    const [x, y, width, height] = prediction['bbox']; 
    const text = prediction['class']; 

    // Set styling
    const color = Math.floor(Math.random()*16777215).toString(16);
    ctx.strokeStyle = '#' + color
    ctx.font = '18px Arial';

    // Draw rectangles and text
    ctx.beginPath();   
    ctx.fillStyle = '#' + color
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height); 
    ctx.stroke();
  });
}