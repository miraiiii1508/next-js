import { getUserId } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React, { ReactNode, Suspense } from "react";
import LoadingOutline from "./@outline/LoadingOutline";
import LoadingPlayer from "./@player/LoadingPlayer";
import LessonWrapper from "./LessonWrapper";

const layout = async ({
  outline,
  player,
}: {
  outline: React.ReactNode;
  player: ReactNode;
}) => {
  const { userId } = auth();
  if (!userId) return null;
  const findUser = await getUserId({ userId });
  if (!findUser) return null;
  return (
    <LessonWrapper>
      <Suspense fallback={<LoadingPlayer />}>{player}</Suspense>
      <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
    </LessonWrapper>
  );
};

export default layout;
