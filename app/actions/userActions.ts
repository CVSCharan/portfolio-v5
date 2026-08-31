"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function getUserProfile() {
  const users = await db.orm.public.User.all();
  if (users.length === 0) {
    // Create an empty profile if none exists
    const res = await db.orm.public.User.create({ 
      name: '', 
      email: '', 
      bio: null, 
      story: null, 
      avatar: null 
    });
    return res;
  }
  return users[0];
}

export async function updateUserProfile(data: {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  story: string | null;
  avatar: string | null;
}) {
  await db.orm.public.User.where({ id: data.id }).update({
    name: data.name,
    email: data.email,
    bio: data.bio,
    story: data.story,
    avatar: data.avatar
  });
  revalidatePath("/admin/personal");
}
