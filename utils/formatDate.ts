import { formatDistanceToNow } from "date-fns";

export const formatDate = (date: string) =>
  formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
