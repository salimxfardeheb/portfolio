import { FormData } from "../variables";

export async function sendEmail(data: FormData) {
  try {
    const res = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.error || "Erreur lors de l’envoi de l’email");
    }

    return { success: true, message: response.message };
  } catch (err) {
    console.error(err);
    return { success: false, message: String(err) };
  }
}
