
// async sleep
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// asyncify any function
export const future = (f) => new Promise(resolve => resolve(f()));
