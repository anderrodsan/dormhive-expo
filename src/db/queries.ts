import { AuthContext } from "@/provider/AuthProvider";
import { supabase } from "@/utils/supabase";
import { useContext } from "react";

/* User Profiles */

export async function getUser() {
  //get user from context
  const auth = useContext(AuthContext);
  const user = auth.user;

  return user;
}

export async function getProfile(userId: string) {
  // Get user Profile
  const { data: profile } = await supabase
    .from("users")
    .select("*, user_attributes(*, dorms(id, name, logo))")
    .eq("id", userId)
    .single();

  return profile;
}

/* Events */

export async function getEvents() {
  const { data: events, error } = await supabase
    .from("events")
    .select("*, users(*)")
    .order("date", { ascending: true });
  console.log(error);
  return events;
}

export async function getMyEvents(id: string) {
  const { data: events, error } = await supabase
    .from("events")
    .select("*, users(*)")
    .eq("creator_id", id)
    .order("date", { ascending: true });
  console.log(error);
  return events;
}

export async function getEventsWithStatus(userId: string) {
  const { data: events, error } = await supabase
    .from("events")
    .select(
      `
      *,
      users(*),
      event_status!left(status, user_id)
    `
    )
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  // Append status for the logged user if present, otherwise set to null
  const eventsWithStatus = events.map((event) => {
    const eventStatus = event.event_status.find(
      (status) => status.user_id === userId
    );
    return {
      ...event,
      status: eventStatus ? eventStatus.status : null,
    };
  });

  return eventsWithStatus;
}

export async function getEventById(id: string) {
  const { data: event } = await supabase
    .from("events")
    .select(
      "*, users(username, avatar_url), event_status(status, user_id, users(username))"
    )
    .match({ id: id })
    .single();

  return event;
}

export async function getEventStatus(event_id: string) {
  const { data: statuses } = await supabase
    .from("event_status")
    .select("*, users(username)")
    .match({ event_id: event_id });
  //console.log("event status", statuses);
  return statuses;
}

export async function getEventStatusById(event_id: string, user_id: string) {
  const { data: event } = await supabase
    .from("event_status")
    .select("*")
    .match({ event_id: event_id, user_id: user_id })
    .single();

  return event;
}

// Get all event statuses for a user, to filter the event list
export async function getAllEventStatusById(user_id: string) {
  const { data: statuses } = await supabase
    .from("event_status")
    .select("*")
    .match({ user_id: user_id })
    .single();
  return statuses;
}

/* Products */

export async function getProducts() {
  const { data: products } = await supabase
    .from("products")
    .select("*, users(id, username, avatar_url)")
    .order("created_at", { ascending: false });

  return products;
}

export async function getMyProducts(id: string) {
  console.log(id);
  const { data: products } = await supabase
    .from("products")
    .select("*, users(username, avatar_url)")
    .eq("creator_id", id)
    .order("created_at", { ascending: false });
  console.log("products:", products);
  return products;
}

export async function getProductById(id: string): Promise<any> {
  const { data: product } = await supabase
    .from("products")
    .select("*, users(username, avatar_url)")
    .match({ id: id })
    .single();

  return product;
}

export async function getProductImages(id: string) {
  const { data, error } = await supabase.storage.from("products").list(id, {
    limit: 100,
    offset: 0,
    //sort by the upload date
    sortBy: {
      column: "created_at",
      order: "asc",
    },
  });

  console.log(data);

  //save the image paths in a new array: [id/name1.png, id/name2.png]
  const imagePaths = data?.map(({ name }) => id + "/" + name);
  return imagePaths;
}

export async function getProductChats() {
  const { data: chats } = await supabase
    .from("product_chats")
    .select(
      "*, products(img, title), buyer:buyer_id (username), seller:seller_id (username)"
    )
    .order("created_at", { ascending: false });
  console.log(chats);
  return chats;
}

export async function getProductChatById(id: string) {
  const { data: chat } = await supabase
    .from("product_chats")
    .select(
      "*, products(img, title), buyer:buyer_id (username), seller:seller_id (username)"
    )
    .match({ id: id })
    .single();
  console.log(chat);

  return chat;
}

export async function getProductMessages(id: string) {
  const { data: chats } = await supabase
    .from("product_messages")
    .select("*, users(*)")
    .match({ chat_id: id })
    .order("created_at", { ascending: false });

  return chats;
}

/* Alerts */

export async function getAlerts() {
  // get alerts -> users (creator_id) -> user_attributes(user_id)
  const { data: alerts } = await supabase
    .from("alerts")
    .select(
      "*, users(username, avatar_url, full_name, role: user_attributes(role))"
    )
    .order("created_at", { ascending: false });
  //console.log(alerts);
  return alerts;
}

export async function getAlertById(id: string): Promise<any> {
  const { data: alert } = await supabase
    .from("alerts")
    .select("*, users(full_name, avatar_url)")
    .match({ id: id })
    .single();

  return alert;
}

/** Dorm Data */
export async function getDorm(id: string) {
  const { data: dorm } = await supabase
    .from("dorms")
    .select("*")
    .match({ id: id })
    .single();

  return dorm;
}

/** Groups */

export async function getGroups() {
  // get groups
  const { data: groups } = await supabase
    .from("groups")
    .select("id, title, type, icon")
    .order("created_at", { ascending: true });
  console.log(groups);
  return groups;
}

export async function getGroup(id: any) {
  // get groups
  const { data: group } = await supabase
    .from("groups")
    .select("id, title, type, icon, count:group_members(count)")
    .match({ id: id })
    .single();
  //console.log(group);
  return group;
}

export async function getGroupById(id: string) {
  const { data: group } = await supabase
    .from("groups")
    .select("*")
    .match({ id: id })
    .single();

  return group;
}

//Messages

export async function getMessages(id: any) {
  const { data: messages } = await supabase
    .from("messages")
    .select("*, users(username, avatar_url)")
    .match({ group_id: id })
    .order("created_at", { ascending: false });

  console.log("messages", messages);
  return messages;
}
