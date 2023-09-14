export const cheatingObject = (detections) => {
  let personCounter = 0;
  // Loop through each prediction
  detections.forEach(prediction => {
    
    // Extract classes for each frame
    const object = prediction['class']; 
    const bannedObjects = ["cell phone", "laptop", "keyboard", "mouse"]; // Array of banned objects

    // Cheating Conditions
    switch (object) {
      case "person":
        personCounter++;
        break;
      case personCounter > 1:
        console.log("Cheating Detected! More than one person in the room.");
        // Raise Flagged Incident
        break;
      case bannedObjects.includes(object):
        console.log("Cheating Detected! Banned object spotted in frame.")
        // Raise Flagged Incident
        break;
      default:
        console.log("No cheating detected.");
    }
  });
}