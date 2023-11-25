import { MdEdit } from "react-icons/md";
import React from "react";
import Link from "next/link";

type EditPostBtnProps = {
  id: string;
};

const EditPostBtn = ({ id }: EditPostBtnProps) => {
  return (
    <Link className=" btn btn-circle btn-ghost" href={`/edit/${id}`}>
      <MdEdit />
    </Link>
  );
};

export default EditPostBtn;
