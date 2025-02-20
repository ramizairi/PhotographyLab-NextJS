import { useState } from "react";
import RightImage from "./RightImage";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    const endpoint = `https://sheetdb.io/api/v1/yx4qr54ow58nm`;
    const data = {
      data: [{ name, email, message }],
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setResponseMessage("Your message has been sent successfully! We will get back to you soon.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setResponseMessage("There was an error sending your message.");
      }
    } catch (error) {
      setResponseMessage("There was an error sending your message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 py-16 md:py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-stretch gap-8">
          {/* Contact Form */}
          <div className="w-full lg:w-7/12">
            <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-black/30 p-8 backdrop-blur-xl transition-all duration-500 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/10 sm:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>
              <div className="relative">
                <h2 className="mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                  Get in touch
                </h2>
                <p className="mb-8 text-lg font-medium text-gray-400">
                  We offre a wide range of services with low prices and high quality to help you grow your business.
                </p>

                {responseMessage && (
                  <div className="mb-6 rounded-lg bg-green-700 p-4 text-lg font-medium text-white backdrop-blur-sm">
                    {responseMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full rounded-lg border border-gray-800 bg-black/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-gray-800 bg-black/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Your Message
                    </label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter your Message"
                      className="w-full rounded-lg border border-gray-800 bg-black/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 px-8 py-4 text-white backdrop-blur-sm transition-all duration-300 hover:from-gray-700 hover:to-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70"
                  >
                    <span className="relative z-10 flex items-center justify-center font-medium">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="-ml-1 mr-3 h-5 w-5 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-600/50 to-transparent transition-transform duration-300 group-hover:translate-x-0"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <RightImage />
        </div>
      </div>
    </section>
  );
};

export default Contact;
