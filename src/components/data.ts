export interface Ticket {
  name: string;
  start_at: string;
  end_at: string;
  alarm_at: string;
  user: string;
  tags: string[];
  //  children: ticket[]
  //  status: 'open' | 'closed' attribute
  attributes: { [key: string]: string };
}
export function parseLine(src: string): Ticket {
  const items = src.split(" ");
  const user = items.find((i: string) => !!i.match(/^👤.*/g));
  const alarmAt = items.find((i: string) => !!i.match(/^⏰.*/g));
  const tags = items
    .filter((i: string) => !!i.match(/^#.*/g))
    .map((i: string) => i.replace(/#/g, ""));

  return {
    name: items[0],
    start_at: items[1],
    end_at: items[2],
    alarm_at: alarmAt ? alarmAt.replace(/⏰/g, "") : "",
    user: user ? user.replace(/👤/g, "") : "",
    tags: tags,
    attributes: {}
  };
}

export function parseLines(src: string): Ticket[] {
  return src.split("\n").map(parseLine);
}
