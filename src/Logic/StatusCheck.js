export function statusCheck(status) {
  const currentStatus = status;
  const open = "open";

  if (currentStatus.toUpperCase() === open.toUpperCase()) {
    return <span className="green">{status}</span>;
  }

  return <span className="red">{status}</span>;
}
