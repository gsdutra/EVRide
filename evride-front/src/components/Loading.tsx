import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadingState {
  loading: boolean;
}

export default function Loading(props: LoadingState) {
  return (
    props.loading?
    <div className="fixed w-full top-0 h-full z-30 bg-[#222222bb] flex justify-center items-center">
        <ClipLoader className="" size={140} color="#0DDDFF" />
    </div>
    :
    <></>
  );
}