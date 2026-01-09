
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "../input/input";
import FormParameters from "../util/formParams";
import Spinner from "../ui/spinner";

export default function SignIn({ closeAddChoir }) {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const form = new FormData(e.target);
            const email = form.get("email");
            const password = form.get("password");

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.status === 401) {
                setError(data.error || "Invalid credentials");
                return;
            }

            // LOGGED IN BUT NOT ADMIN → REDIRECT
            if (res.status === 403) {
                closeAddChoir();
                setIsSignedIn(false);
                localStorage.removeItem("formdata");
                router.replace("/unauthorized");
                return;
            }

            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            // Success
            setIsSignedIn(true);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            // ALWAYS stop spinner
            setIsLoading(false);
        }
    }


    useEffect(() => {
        const onEsc = (e) => e.key === "Escape" && closeAddChoir;
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-lg"
            // onClick={() => setIsFormParams(false)}
            onClick={closeAddChoir}
        >
            <div
                className="bg-white p-8 rounded shadow-md w-full max-w-md mx-2"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4">Admin Sign In</h2>

                    {error && <p className="text-red-500 mb-3">{error}</p>}

                    <Input name="email" type="email" placeholder="Email" id="email" />
                    <Input name="password" type="password" placeholder="Password" id="password" />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`
w-full mt-4 py-2 rounded flex items-center justify-center gap-2
text-white transition
${isLoading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"}
`}
                    >
                        {isLoading ? (
                            <>
                                <Spinner />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}

                    </button>

                    <button
                        type="button"
                        onClick={closeAddChoir}
                        className="text-sm text-gray-500 mt-5 inline-block hover:underline"
                    >
                        Go back
                    </button>
                </form>
            </div>

            {isSignedIn && <FormParameters closeAddChoir={closeAddChoir} />}
        </div>
    );
}


