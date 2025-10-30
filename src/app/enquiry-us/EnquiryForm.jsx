"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EnquiryForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        enquiryType: "",
        message: "",
        preferredContactMethod: "Email",
        preferredTime: "",
    });

    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Indian 10-digit phone number validation
        const phoneRegex = /^[6-9]\d{9}$/;

        // ✅ If phone field is filled or preferred contact is Phone
        if (formData.preferredContactMethod === "Phone" || formData.phone.trim() !== "") {
            if (!phoneRegex.test(formData.phone.trim())) {
                toast.error("Please enter a valid 10-digit Indian phone number.");
                return;
            }
        }

        const loadingToast = toast.loading("Submitting your enquiry...");
        setIsSubmitting(true);

        try {
            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key] || "");
            }
            if (image) {
                data.append("image", image);
            }

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/enquiries/send-enquiry`,
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            toast.success("Enquiry sent successfully!", { id: loadingToast });

            setFormData({
                fullName: "",
                email: "",
                phone: "",
                enquiryType: "",
                message: "",
                preferredContactMethod: "Email",
                preferredTime: "",
            });
            setImage(null);
            setShowModal(true);

        } catch (error) {
            console.error("Enquiry submission failed:", error);
            toast.error("Failed to send enquiry. Please try again.", { id: loadingToast });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* ===== Enquiry Form ===== */}
            <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-white p-6 rounded-xl m-4 shadow-md md:mt-16"
            >
                <h2 className="font-heading text-2xl font-bold text-[#9CAF88] mb-4 text-center">
                    Enquiry & Cancellation Form
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                        <label className="font-home text-sm text-gray-700 font-medium">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="font-body w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div>
                        <label className="font-home text-sm text-gray-700 font-medium">
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="font-body w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div>
                        <label className="font-home text-sm text-gray-700 font-medium">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="font-body w-full p-2 border border-gray-300 rounded"
                            placeholder="10-digit number"
                        />
                    </div>

                    <div>
                        <label className="font-home text-sm text-gray-700 font-medium">
                            Enquiry Type *
                        </label>
                        <select
                            name="enquiryType"
                            value={formData.enquiryType}
                            onChange={handleChange}
                            required
                            className="font-body w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="" disabled hidden>
                                Select Type
                            </option>
                            <option value="Product">Product Related</option>
                            <option value="Bulk">Bulk Order</option>
                            <option value="Custom">Custom Design Request</option>
                            <option value="General">General Query</option>
                            <option value="Cancellation">Order Cancellation Query</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="font-home text-sm text-gray-700 font-medium">
                        Message *
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="font-body w-full p-2 border border-gray-300 rounded"
                        placeholder="Type your message here..."
                    />
                </div>

                <div className="mt-4">
                    <label className="font-home text-sm text-gray-700 font-medium">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1"
                    />
                    {image && <p className="text-sm mt-1">Selected: {image.name}</p>}
                </div>

                <div className="mt-4">
                    <label className="font-home text-sm text-gray-700 font-medium">
                        Preferred Contact Method
                    </label>
                    <div className="flex items-center gap-4 mt-1">
                        <label className="font-body">
                            <input
                                type="radio"
                                name="preferredContactMethod"
                                value="Email"
                                checked={formData.preferredContactMethod === "Email"}
                                onChange={handleChange}
                                className="mr-1"
                            />
                            Email
                        </label>
                        <label className="font-body">
                            <input
                                type="radio"
                                name="preferredContactMethod"
                                value="Phone"
                                checked={formData.preferredContactMethod === "Phone"}
                                onChange={handleChange}
                                className="mr-1"
                            />
                            Phone
                        </label>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="font-home text-sm text-gray-700 font-medium">
                        Preferred Time to Contact
                    </label>
                    <input
                        type="text"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="font-body w-full p-2 border border-gray-300 rounded"
                        placeholder="e.g., Weekdays 10AM–4PM"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="font-home mt-6 w-full bg-[#9CAF88] text-white py-2 rounded hover:bg-green-700 transition"
                >
                    {isSubmitting ? "Submitting..." : "Send Enquiry"}
                </button>
            </form>

            {/* ===== Success Modal ===== */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-4 text-center relative animate-fadeIn">
                        <h3 className="text-2xl font-bold font-heading text-[#9CAF88] mb-2">
                            Thank You for Your Enquiry!
                        </h3>
                        <p className="font-body text-gray-700 ">
                            We’ve received your query and our team will contact you shortly.
                            Please stay patient, or feel free to reach us at:
                        </p>
                        <p className="font-home text-gray-900 mt-3 ">
                            📞 +91 9220440585 <br />
                            ✉️ trendikalait@gmail.com
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="font-heading mt-5 bg-[#9CAF88] text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EnquiryForm;
