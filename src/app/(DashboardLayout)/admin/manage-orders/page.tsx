/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Loading from "@/components/shared/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteOrder, getAllOrders, updateOrder } from "@/services/orders";
import { IOrderDB, ShippingStatus } from "@/types/order";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageOrder = () => {
  const [orders, setOrdders] = useState<IOrderDB[]>();

  const [page, setPage] = useState(1);
  //   const [limit, setLimit] = useState(10);
  const [selectedStatus, setSelectedStatus] =
    useState<ShippingStatus>("PENDING");
  const [selectedOrderId, setSelectedOrderId] = useState<
    ShippingStatus | string
  >("");
  const [openStatusDialog, setOpenStatusDialog] = useState(false);

  const orderStatusOptions = [
    { label: "PENDING", value: "PENDING" },
    { label: "PROCESSING", value: "PROCESSING" },
    { label: "SHIPPED", value: "SHIPPED" },
    { label: "DELIVERED", value: "DELIVERED" },
    { label: "CANCELED", value: "CANCELED" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrders();
        const orders = data?.data?.data || [];
        // Filter orders for the specific user
        setOrdders(orders);
      } catch (error) {
      } finally {
        // setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateOrder = async (orderId: string, status: ShippingStatus) => {
    if (orderId && status) {
      // Check if both orderId and status are provided
      try {
        // Update the payload structure to match what your `updateOrder` expects
        const result = await updateOrder(orderId, { status });

        // Check if the response contains success data
        if (result?.success) {
          toast.success(result?.message);
          setOpenStatusDialog(false);
          setOrdders((orders) =>
            orders?.map((order) =>
              order._id === orderId
                ? { ...order, shippingStatus: status }
                : order
            )
          );
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // Log the error and show toast message on failure
        console.error(err);
        toast.error("Failed to update order");
      }
    } else {
      toast.error("Invalid order ID or status.");
    }
  };
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;

    try {
      const result = await deleteOrder(id);

      toast.success("Order deleted successfully");

      setOrdders((orders) => orders?.filter((order) => order._id !== id));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to delete order:", error.message);
    }
  };

  if (!orders) return <Loading />;
  if (orders?.length < 1) {
    return (
      <div>
        <h2 className="text-center font-bold text-3xl mb-14">
          Till now There is no order to show!!
        </h2>
      </div>
    );
  }
  return (
    <div className=" p-6 border-2 shadow-md rounded-2xl overflow-x-auto">
      <h2 className="text-center font-bold text-3xl mb-14">
        All of your Orders
      </h2>

      <Table>
        <TableCaption className="mt-8">
          A list of your recent Orders
        </TableCaption>
        <TableHeader className="text-l">
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Update Shipping Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="font-medium">{order.user.name}</TableCell>
              <TableCell className="font-medium">
                {order?.products[0]?.product?.name}
              </TableCell>
              <TableCell>{order?.paymentStatus}</TableCell>

              <TableCell className="">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="cursor-pointer" variant="outline">
                      {order?.shippingStatus}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-2">
                    <DropdownMenuGroup>
                      {orderStatusOptions?.map((option) => (
                        <DropdownMenuItem
                          key={option?.label}
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedStatus(option?.value as ShippingStatus);
                            setOpenStatusDialog(true);
                            setSelectedOrderId(order?._id);
                          }}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>{order?.totalPrice}</TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-purple-600">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this Order data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleDelete(order._id)}
                      >
                        Confirm Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-6 gap-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>

        <span className="flex items-center font-medium text-lg">
          Page {page}
        </span>

        <Button
          variant="outline"
          disabled={orders?.length < 12} // Disable if less than 5, assuming no more pages
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
      <AlertDialog open={openStatusDialog} onOpenChange={setOpenStatusDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Status Update</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the status to{" "}
              <span className="font-semibold text-purple-600">
                {selectedStatus}
              </span>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => handleUpdateOrder(selectedOrderId, selectedStatus)}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageOrder;
