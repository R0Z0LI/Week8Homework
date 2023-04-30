import { useRef, useEffect, useState } from "react";

const Authentication: React.FC<{
  onSubmit: (email: string, password: string) => void;
  exist: Boolean;
}> = (props) => {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const password = passwordInputRef.current!.value;
    const email = emailInputRef.current!.value;

    if (password?.trim().length === 0 || email?.trim().length === 0) {
      return;
    }

    props.onSubmit(email, password);
  };
  return (
    <div>
      <form className="p-2" onSubmit={onSubmitHandler}>
        <div className="flex flex-col p-2">
          <label htmlFor="name" className="pb-1">
            Email
          </label>
          <input
            className="border-2 border-black w-60 rounded-lg p-1 focus:bg-sky-200"
            type="email"
            required
            id="name"
            ref={emailInputRef}
          />
          {props.exist === true && (
            <p className="text-orange-700">This email is already in use</p>
          )}
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="email" className="pb-1">
            Password
          </label>
          <input
            className="border-2 border-black w-60 rounded-lg p-1 focus:bg-sky-200"
            type="password"
            required
            id="email"
            ref={passwordInputRef}
          />
        </div>
        <button className="border-2 border-black rounded-lg m-2 p-1 active:bg-sky-200">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Authentication;
