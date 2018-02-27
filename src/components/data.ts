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
