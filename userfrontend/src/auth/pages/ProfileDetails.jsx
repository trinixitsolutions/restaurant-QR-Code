import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import AuthLayout from "../layout/AuthLayout";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

export default function ProfileDetails() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [contact, setContact] = useState("");
  const [tableRoom, setTableRoom] = useState("");
  const [location, setLocation] = useState("");
  const { saveUser } = useAuth();


  const [touched, setTouched] = useState({
    email: false,
    name: false,
    contact: false,
    tableRoom: false,
  });

  /* ================= VALIDATIONS ================= */

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isNameValid =
    /^[A-Za-z]+( [A-Za-z]+)*$/.test(name) && name.length <= 26;

  const isContactValid =
    countryCode === "+91"
      ? /^[0-9]{10}$/.test(contact)
      : /^[0-9]{6,15}$/.test(contact);

  const isTableValid = /^[0-9]+$/.test(tableRoom);

  const isFormValid =
    isEmailValid && isNameValid && isContactValid && isTableValid;

  /* ================= HANDLERS ================= */

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    let value = e.target.value
      .replace(/[^A-Za-z ]/g, "")
      .replace(/\s+/g, " ");
    if (value.length <= 26) setName(value);
  };

  const handleContactChange = (e) => {
    const digits = e.target.value.replace(/[^0-9]/g, "");

    // 🔒 Swiggy/Zomato style hard limit
    if (countryCode === "+91" && digits.length > 10) return;

    setContact(digits);
  };

  const handleContinue = () => {
    setTouched({
      email: true,
      name: true,
      contact: true,
      tableRoom: true,
    });

    if (!isFormValid) return;


    navigate("/dashboard");
  };

  return (
    <PageWrapper>
      <AuthLayout>
        <h2 className="text-xl font-semibold text-center mb-8">
          Hotel Management
        </h2>

        <div className="space-y-4">

          {/* EMAIL */}
          <InputField
            placeholder="email@domain.com"
            value={email}
            onChange={handleEmailChange}
            onBlur={() =>
              setTouched((t) => ({ ...t, email: true }))
            }
          />
          {touched.email && !isEmailValid && (
            <p className="text-xs text-red-500">
              Enter a valid email address
            </p>
          )}

          {/* NAME */}
          <InputField
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            onBlur={() =>
              setTouched((t) => ({ ...t, name: true }))
            }
          />
          {touched.name && !isNameValid && (
            <p className="text-xs text-red-500">
              Name should contain only letters (max 26 characters)
            </p>
          )}

          {/* CONTACT */}
          <div className="flex gap-2">
            <select
              value={countryCode}
              onChange={(e) => {
                setCountryCode(e.target.value);
                setContact("");
              }}
              className="w-28 border rounded-lg px-2 py-2 text-sm"
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
            </select>

            <InputField
              placeholder="Mobile Number"
              value={contact}
              onChange={handleContactChange}
              onBlur={() =>
                setTouched((t) => ({ ...t, contact: true }))
              }
            />
          </div>
          {touched.contact && !isContactValid && (
            <p className="text-xs text-red-500">
              Enter a valid mobile number
            </p>
          )}

          {/* TABLE */}
          <InputField
            placeholder="Table / Room Number"
            value={tableRoom}
            onChange={(e) =>
              setTableRoom(
                e.target.value.replace(/[^0-9]/g, "")
              )
            }
            onBlur={() =>
              setTouched((t) => ({ ...t, tableRoom: true }))
            }
          />
          {touched.tableRoom && !isTableValid && (
            <p className="text-xs text-red-500">
              Table / Room number is required
            </p>
          )}

          {/* LOCATION */}
          <InputField
            placeholder="Location (Optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <PrimaryButton
            text="Continue"
            onClick={handleContinue}
            disabled={!isFormValid}
          />
        </div>
      </AuthLayout>
    </PageWrapper>
  );
}
