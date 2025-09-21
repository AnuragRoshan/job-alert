import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import AutocompleteInput from "../components/AutocompleteInput";
import { getKeywordSuggestions } from "../data/keywords";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Landing from "./landing";
import {
  Plus,
  Mail,
  Bell,
  Trash2,
  Edit,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Play,
  LogOut,
  User,
} from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();

  // All state declarations must be before any conditional returns
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    email: "",
    keywords: "",
    frequency: "daily",
  });
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [keywordSuggestions, setKeywordSuggestions] = useState([]);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [companyInput, setCompanyInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [testingAlert, setTestingAlert] = useState(null);

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (status === "authenticated" && session) {
      fetchAlerts();
    }
  }, [status, session]);

  // Show landing page for non-authenticated users
  if (status === "unauthenticated") {
    return <Landing />;
  }

  const fetchAlerts = async () => {
    try {
      const response = await fetch("/api/alerts");
      const data = await response.json();
      if (data.success) {
        setAlerts(data.data);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Company autocomplete functions
  const searchCompanies = async (query) => {
    if (!query || query.length < 2) {
      setCompanySuggestions([]);
      return;
    }

    setCompanyLoading(true);
    try {
      const response = await fetch(
        `/api/companies/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setCompanySuggestions(data.companies || []);
    } catch (error) {
      console.error("Company search error:", error);
      setCompanySuggestions([]);
    } finally {
      setCompanyLoading(false);
    }
  };

  const handleCompanyInputChange = (value) => {
    setCompanyInput(value);
    setFormData({ ...formData, company: value });
    searchCompanies(value);
  };

  const handleCompanySelect = (company) => {
    setCompanyInput(company.name);
    setFormData({
      ...formData,
      company: company.name,
      website: company.domain,
    });
    setCompanySuggestions([]);
  };

  // Keywords autocomplete functions
  const handleKeywordInputChange = (value) => {
    setKeywordInput(value);
    setFormData({ ...formData, keywords: value });

    // Get last word being typed for suggestions
    const words = value.split(",");
    const lastWord = words[words.length - 1].trim();
    const suggestions = getKeywordSuggestions(lastWord);
    setKeywordSuggestions(suggestions);
  };

  const handleKeywordSelect = (keyword) => {
    const words = formData.keywords.split(",");
    words[words.length - 1] = keyword;
    const newValue = words.join(", ").replace(/,\s*$/, "");
    setKeywordInput(newValue);
    setFormData({ ...formData, keywords: newValue });
    setKeywordSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading(
      editingId ? "Updating alert..." : "Creating alert..."
    );

    try {
      const url = editingId ? `/api/alerts/${editingId}` : "/api/alerts";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchAlerts();
        setShowAddForm(false);
        setEditingId(null);
        setFormData({
          company: "",
          website: "",
          email: "",
          keywords: "",
          frequency: "daily",
        });
        setCompanyInput("");
        setKeywordInput("");
        setCompanySuggestions([]);
        setKeywordSuggestions([]);

        toast.success(
          editingId
            ? "Alert updated successfully!"
            : "Alert created successfully! You'll receive job notifications soon.",
          { id: toastId, duration: 5000 }
        );
      } else {
        toast.error(data.error || "Failed to save alert. Please try again.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Error saving alert:", error);
      toast.error("An error occurred. Please try again.", { id: toastId });
    }
  };

  const handleEdit = (alert) => {
    setFormData({
      company: alert.company,
      website: alert.website,
      email: alert.email,
      keywords: alert.keywords.join(", "),
      frequency: alert.frequency,
    });
    setCompanyInput(alert.company);
    setKeywordInput(alert.keywords.join(", "));
    setCompanySuggestions([]);
    setKeywordSuggestions([]);
    setEditingId(alert._id);
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this alert?")) {
      const toastId = toast.loading("Deleting alert...");

      try {
        const response = await fetch(`/api/alerts/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (data.success) {
          await fetchAlerts();
          toast.success("Alert deleted successfully!", { id: toastId });
        } else {
          toast.error(data.error || "Failed to delete alert.", { id: toastId });
        }
      } catch (error) {
        console.error("Error deleting alert:", error);
        toast.error("An error occurred while deleting.", { id: toastId });
      }
    }
  };

  const testAlert = async (alertId) => {
    setTestingAlert(alertId);
    const toastId = toast.loading("Testing alert...");

    try {
      const response = await fetch("/api/scrape/check-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertId }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          `Test successful! Found ${data.jobsFound} jobs for ${data.company}.`,
          { id: toastId, duration: 6000 }
        );
      } else {
        toast.error(`Test failed: ${data.error}`, { id: toastId });
      }
    } catch (error) {
      toast.error(`Test error: ${error.message}`, { id: toastId });
    } finally {
      setTestingAlert(null);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      company: "",
      website: "",
      email: "",
      keywords: "",
      frequency: "daily",
    });
    setCompanyInput("");
    setKeywordInput("");
    setCompanySuggestions([]);
    setKeywordSuggestions([]);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {status === "loading"
              ? "Checking authentication..."
              : "Loading your job alerts..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {alerts.length}
            </div>
            <div className="text-gray-600">Active Alerts</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {alerts.filter((a) => a.status === "active").length}
            </div>
            <div className="text-gray-600">Monitoring</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">Automated</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Your Job Alerts
            </h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Add Alert
            </button>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="mb-6 p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
              <h3 className="text-lg font-semibold mb-4 text-blue-800">
                {editingId ? "Edit Alert" : "Add New Alert"}
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <AutocompleteInput
                      value={companyInput}
                      onChange={handleCompanyInputChange}
                      onSelect={handleCompanySelect}
                      suggestions={companySuggestions}
                      loading={companyLoading}
                      placeholder="Google, Microsoft, etc."
                      renderSuggestion={(company) => (
                        <div className="flex items-center space-x-3">
                          <img
                            src={company.logo}
                            alt={`${company.name} logo`}
                            className="w-6 h-6 rounded"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          <span className="text-gray-900">{company.name}</span>
                          <span className="text-gray-500 text-sm">
                            {company.domain}
                          </span>
                        </div>
                      )}
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Careers Page URL *
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://company.com/careers"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Examples: https://careers.google.com/jobs/results/,
                    https://careers.microsoft.com/professionals/us/en/search-results
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Keywords (comma separated)
                    </label>
                    <AutocompleteInput
                      value={keywordInput}
                      onChange={handleKeywordInputChange}
                      onSelect={handleKeywordSelect}
                      suggestions={keywordSuggestions}
                      placeholder="software engineer, remote, frontend"
                      renderSuggestion={(keyword) => (
                        <div className="flex items-center">
                          <span className="text-gray-900">{keyword}</span>
                        </div>
                      )}
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Leave empty to get alerts for all jobs
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check Frequency
                    </label>
                    <select
                      value={formData.frequency}
                      onChange={(e) =>
                        setFormData({ ...formData, frequency: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="hourly">Every Hour</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Save size={16} />
                    {editingId ? "Update" : "Save"} Alert
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Alerts List */}
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {alert.company}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          alert.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {alert.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <Mail className="inline mr-1" size={14} />
                      {alert.email}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      🌐{" "}
                      <a
                        href={alert.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {alert.website.length > 50
                          ? alert.website.substring(0, 50) + "..."
                          : alert.website}
                      </a>
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Keywords:{" "}
                      {alert.keywords.length > 0
                        ? alert.keywords.join(", ")
                        : "All jobs"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Checks: {alert.frequency} • Last:{" "}
                      {new Date(alert.lastChecked).toLocaleDateString()}{" "}
                      {new Date(alert.lastChecked).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => testAlert(alert._id)}
                      disabled={testingAlert === alert._id}
                      className="text-green-600 hover:text-green-800 p-1 disabled:opacity-50"
                      title="Test Alert"
                    >
                      {testingAlert === alert._id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                      ) : (
                        <Play size={16} />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(alert)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(alert._id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {alerts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No job alerts yet. Add your first alert to get started!</p>
              </div>
            )}
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Plus className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                1. Add Alerts
              </h3>
              <p className="text-gray-600 text-sm">
                Set up alerts for companies with keywords and email preferences.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Bell className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                2. Auto Monitor
              </h3>
              <p className="text-gray-600 text-sm">
                Our system checks career pages automatically based on your
                frequency.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                3. Get Notified
              </h3>
              <p className="text-gray-600 text-sm">
                Receive instant email alerts when matching jobs are found.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-orange-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                4. Apply Fast
              </h3>
              <p className="text-gray-600 text-sm">
                Click the link in your email to apply before others even know
                about it.
              </p>
            </div>
          </div>
        </div>

        {/* Free Email Services Info */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            📧 Free Email Services Supported:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-white rounded p-3">
              <strong>Gmail</strong>
              <br />
              <span className="text-gray-600">500+ emails/day</span>
            </div>
            <div className="bg-white rounded p-3">
              <strong>SendGrid</strong>
              <br />
              <span className="text-gray-600">100 emails/day</span>
            </div>
            <div className="bg-white rounded p-3">
              <strong>Resend</strong>
              <br />
              <span className="text-gray-600">3000/month (~100/day)</span>
            </div>
            <div className="bg-white rounded p-3">
              <strong>Outlook</strong>
              <br />
              <span className="text-gray-600">300+ emails/day</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
