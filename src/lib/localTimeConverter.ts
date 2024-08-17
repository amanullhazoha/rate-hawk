import { parseISO } from "date-fns";
import { toZonedTime, format as formatInTimeZone } from "date-fns-tz";

export const localTimeConverter = (freeCancellationBefore: any) => {
  const utcDate = parseISO(freeCancellationBefore);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = toZonedTime(utcDate, timeZone);

  const formattedWithTimezone = formatInTimeZone(
    localDate,
    "dd/MM/yyyy hh:mm a",
    { timeZone },
  );

  return formattedWithTimezone;
};
