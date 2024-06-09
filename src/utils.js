export function formatTimestamp(timestamp){
    const date = new Date(timestamp);

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // Months are zero-based, so we add 1
    const day = date.getUTCDate();

    const formattedTime = `${hours}:${minutes}:${seconds}`
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    return `${formattedTime} ${formattedDate}`;


}

export function extractFileName(path) {
    return path.split('/').pop();
}