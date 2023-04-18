import { useRef } from "react";

const Authentication: React.FC<{
  onSubmit: (email: string, password: string) => void;
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
          <label htmlFor="name">Email</label>
          <input
            className="border-2 border-black"
            type="email"
            required
            id="name"
            ref={emailInputRef}
          />
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="email">Password</label>
          <input
            className="border-2 border-black"
            type="password"
            required
            id="email"
            ref={passwordInputRef}
          />
        </div>
        <button className="border-2 border-black m-2 p-1">Submit</button>
      </form>
    </div>
  );
};
export default Authentication;
