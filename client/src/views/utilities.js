export const cheatingObject = (detections) => {
  var personCounter = 0; // Keep track of how many people are in the frame
  // Loop through each prediction
  detections.forEach(prediction => { // Looking at one prediction at a time
    
    // Extract classes for each frame
    const object = prediction['class']; 
    const bannedObjects = ["cell phone", "laptop", "keyboard", "mouse"]; // Array of banned objects

    if (object === "person") { // Is this prediction a person?
      personCounter++; // Add to the person counter for the room
    }

    var isCheating = objectConditions(object, bannedObjects, personCounter);
    if (isCheating) {
      // Raise Flagged Incident
      console.log("I am raising a flag");
    }
  });
}

function objectConditions(object, bannedObjects, personCounter) { // Return true if cheating is detected
  var cheating = false; // Initially, assume no cheating
  // Cheating Conditions
  if (personCounter > 1) { // Cheating Action -- more than one person in the room
    cheating = true;
    console.log("Cheating Detected! More than one person in the room.");
  }
  if (bannedObjects.includes(object)) { // Cheating Action -- using a banned object i.e cell phone
    cheating = true;
    console.log("Cheating Detected! Banned object spotted in frame.");
  }

  return cheating;
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