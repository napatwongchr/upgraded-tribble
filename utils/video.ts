export const findPastTimeContent = (
  contentObj: { [key: string]: string },
  currentTime: string
) => {
  const sortedTimes = Object.keys(contentObj).sort();
  let pastTimeContent = null;

  for (let i = sortedTimes.length - 1; i >= 0; i--) {
    if (sortedTimes[i] <= currentTime) {
      pastTimeContent = contentObj[sortedTimes[i]];
      break;
    }
  }

  return pastTimeContent;
};

export const convertCurrentTimeToElapsed = (elapsedSec: number | undefined) => {
  if (elapsedSec) {
    const elapsedMs = Math.floor(elapsedSec * 1000);
    const ms = elapsedMs % 1000;
    const min = Math.floor(elapsedMs / 60000);
    const seconds = Math.floor((elapsedMs - min * 60000) / 1000);
    return (
      min.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0") +
      ":" +
      ms.toString().padStart(3, "0")
    );
  }
  return "";
};
