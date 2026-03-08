"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(1),
  email: z.email(),
  service: z.string().min(1),
});

const submitForm = async (initialState: any, formData: FormData) => {
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    service: formData.get("service"),
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { data } = validatedFields;
  const { name, email, service } = data;

  const response = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "oscar.oravakilberg@gmail.com",
    subject: service,
    html: `<p>Congrats on sending your <strong>first email</strong>, ${name}!</p>`,
  });

  if (response.error) {
    return {
      error: response.error.message,
      success: "",
    };
  }

  return {
    error: "",
    success: "Email sent successfully",
  };
};

export default submitForm;
