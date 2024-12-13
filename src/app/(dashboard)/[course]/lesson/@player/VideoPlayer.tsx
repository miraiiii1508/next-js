import { Button } from "@/components/ui/button";
import LessonNavigation from "../LessonNavigation";
import useGlobalStore from "@/store";
const VideoPlayer = ({
  video,
  nextLesson,
  prevLesson,
}: {
  video: string;
  nextLesson: string;
  prevLesson: string;
}) => {
  const {expendedPlayer , setExpendedPlayer} = useGlobalStore()
  return (
    <>
      <div className="relative mb-5 aspect-video">
        <iframe
          className="w-full h-full object-fill"
          width="929"
          height="522"
          src={`https://www.youtube.com/embed/${video}`}
          title="Who?"
        ></iframe>
      </div>
      <div className="flex items-center justify-between mb-10">
        <LessonNavigation nextLesson={nextLesson} prevLesson={prevLesson} />
        <Button
        onClick={()=>{setExpendedPlayer(!expendedPlayer)}}
        >{expendedPlayer ?'Mặc định' : 'Mở rộng'}</Button>
      </div>
    </>
  );
};

export default VideoPlayer;
