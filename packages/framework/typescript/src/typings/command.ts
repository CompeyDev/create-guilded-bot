import { Embed, Member, Message, User } from "guilded.js";
import { ExtendedClient } from "../structures/Client";

export type ResCtx = {
  meta: {
    user: Member;
    raw: Message;
  };
  ctx: {
    getOptions: () => null | string[];
    reply: (content: string | Embed) => void;
  };
};

export type CommandType = {
  name: string;
  description: string;
  run: (context: { interaction: ResCtx }) => {};
};
