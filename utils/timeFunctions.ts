export const calculateTimeDifference = (timestamp: Date) => {
  const currentTime = new Date();
  const differenceInSeconds = Math.floor((currentTime.getTime() - timestamp.getTime()) / 1000);

  if (differenceInSeconds < 5) { 
    return 'now';
  } else if (differenceInSeconds < 60) {
    return `${differenceInSeconds} seconds ago`;
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    return timestamp.toLocaleDateString();
  }
};
