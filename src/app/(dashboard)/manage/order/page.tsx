import OrderCourse from "@/app/component/order/OrderCourse";
import { getAllOrderCourseAdmin } from "@/lib/actions/order.actions";
import { EOrderStatus } from "@/type/enum";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: EOrderStatus;
  };
}) => {
  const getAllOrder = await getAllOrderCourseAdmin({
    page:searchParams.page || 1,  
    limit: 10,
    search: searchParams.search,
    status:searchParams.status
  });

  return (
    <div>
      <OrderCourse data={JSON.parse(JSON.stringify(getAllOrder))} />
    </div>
  );
};

export default page;
