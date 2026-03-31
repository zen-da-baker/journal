export function logoutHelper() {

    localStorage.removeItem("bytesized-journal-username");

    localStorage.removeItem("bytesized-journal-token");

    window.location.reload();

}