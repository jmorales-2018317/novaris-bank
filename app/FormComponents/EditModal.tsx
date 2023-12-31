"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

interface Props {
  formFunction: JSX.Element;
  title: string
  description: string
  redirectOnClose: string
}

const EditModal = ({ formFunction, title, description, redirectOnClose }: Props) => {
  const router = useRouter();
  return (
    <Sheet
    defaultOpen={true}
    onOpenChange={() => router.replace(redirectOnClose)}
    >
      <SheetContent  side={ title == "Edit User" ? 'bottom' : title == "Edit Bank Account" ? "bottom" : "right"} className={ title == "Edit User" ? "overflow-y-auto h-full" : ""}>
        <SheetHeader>
          <SheetTitle className="text-violet-700">{title}</SheetTitle>
          <SheetDescription>
          {description}
          </SheetDescription>
        </SheetHeader>
        {formFunction}
      </SheetContent>
    </Sheet>
  );
};

export default EditModal;
