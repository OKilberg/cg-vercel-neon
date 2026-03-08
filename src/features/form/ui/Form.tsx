"use client";

import { useActionState } from "react";
import submitForm from "../api/submitForm.server";
import { tv } from "tailwind-variants";

const initialState = {
  error: "",
  success: "",
};

const inputField = tv({
  base: "border p-2 text-base font-light",
});

const button = tv({
  base: "p-2 rounded-sm bg-blue-400 active:bg-blue-500",
});

const form = tv({
  base: "flex flex-col gap-4 max-w-md p-4 bg-gray-200 rounded-lg",
});

const label = tv({
  base: "flex flex-col gap-2 text-sm font-bold",
});

const Form = () => {
  const [state, formAction, isPending] = useActionState(
    submitForm,
    initialState,
  );
  return (
    <form action={formAction} className={form()}>
      <label className={label()}>
        Name
        <input
          required
          type="text"
          name="name"
          placeholder="Name"
          className={inputField()}
        />
      </label>
      <label className={label()}>
        Email
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          className={inputField()}
        />
      </label>
      <label className={label()}>
        Service
        <select required name="service" className={inputField()}>
          <option value="technical-inspection">Technical Inspection</option>
          <option value="consulting">Consulting</option>
          <option value="other">Other</option>
        </select>
      </label>
      <div className="flex flex-col pt-6">
        <button disabled={isPending} type="submit" className={button()}>
          Submit
        </button>
      </div>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-500">{state.success}</p>}
    </form>
  );
};

export default Form;
