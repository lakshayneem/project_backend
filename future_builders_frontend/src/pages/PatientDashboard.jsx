import { useEffect, useState } from "react";
import {
  getUpcoming,
  getHistory,
  cancelAppointment,
} from "../api/appointmentApi";

import {
  updateWellness,
  getTodayWellness,
  getWellnessHistory,
} from "../api/wellnessApi";

import { Link } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


// To show Mon–Sun even if data missing
const WEEK_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


const PatientDashboard = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [history, setHistory] = useState([]);

  const [weeklyData, setWeeklyData] = useState([]);

  const [wellness, setWellness] = useState({
    water: 0,
    steps: 0,
    sleep: 0,
    mood: "Normal",
  });

  // -------------------------
  // LOAD TODAY + 7 DAY HISTORY
  // -------------------------
  const loadWellnessAll = async () => {
    // Get today's metrics
    const res = await getTodayWellness();
    if (res.data.data) setWellness(res.data.data);

    // Get weekly history
    const hist = await getWellnessHistory();
    const dbData = hist.data.data;

    // Format weekly data (DB → chart)
    const formatted = dbData.map((item) => {
      const dayName = new Date(item.date).toLocaleDateString("en-US", {
        weekday: "short",
      });
      return {
        day: dayName,
        water: item.water,
        steps: item.steps,
        sleep: item.sleep,
      };
    });

    // Fill missing days with 0 values so chart always shows 7 days
    const finalWeek = WEEK_ORDER.map((d) => {
      const entry = formatted.find((x) => x.day === d);
      return (
        entry || {
          day: d,
          water: 0,
          steps: 0,
          sleep: 0,
        }
      );
    });

    setWeeklyData(finalWeek);
  };

  // -------------------------
  // SAVE TODAY'S WELLNESS
  // -------------------------
  const saveWellness = async () => {
    await updateWellness(wellness);
    await loadWellnessAll(); // refresh chart + today
  };

  // -------------------------
  // LOAD APPOINTMENTS + WELLNESS
  // -------------------------
  const loadData = async () => {
    const u = await getUpcoming();
    const h = await getHistory();

    setUpcoming(u.data);
    setHistory(h.data);

    await loadWellnessAll();
  };

  useEffect(() => {
    loadData();
  }, []);

  // -------------------------
  // INSIGHTS PANEL
  // -------------------------
  const insights = [];
  if (wellness.water < 8)
    insights.push(`Drink ${8 - wellness.water} more glasses of water 💧`);
  if (wellness.steps < 5000) insights.push("Try walking a bit more today 🚶");
  if (wellness.sleep < 6) insights.push("Your sleep seems low — take rest 😴");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Patient Dashboard</h1>

      <Link
        to="/patient/doctors"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Book Appointment
      </Link>

      {/* WELLNESS INPUT SECTION */}
      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-bold mb-4">Today's Wellness Metrics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Water */}
          <div>
            <label className="font-semibold flex items-center gap-2 mb-1">
              💧 Water Intake (glasses)
            </label>
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={wellness.water}
              onChange={(e) =>
                setWellness({ ...wellness, water: Number(e.target.value) })
              }
              placeholder="How many glasses?"
            />
          </div>

          {/* Steps */}
          <div>
            <label className="font-semibold flex items-center gap-2 mb-1">
              🚶 Steps Count
            </label>
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={wellness.steps}
              onChange={(e) =>
                setWellness({ ...wellness, steps: Number(e.target.value) })
              }
              placeholder="How many steps?"
            />
          </div>

          {/* Sleep */}
          <div>
            <label className="font-semibold flex items-center gap-2 mb-1">
              😴 Sleep Hours
            </label>
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={wellness.sleep}
              onChange={(e) =>
                setWellness({ ...wellness, sleep: Number(e.target.value) })
              }
              placeholder="How many hours?"
            />
          </div>

          {/* Mood */}
          <div>
            <label className="font-semibold flex items-center gap-2 mb-1">
              🙂 Mood
            </label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={wellness.mood}
              onChange={(e) =>
                setWellness({ ...wellness, mood: e.target.value })
              }
              placeholder="Happy / Tired / Normal"
            />
          </div>
        </div>

        <button
          onClick={saveWellness}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Save Metrics
        </button>
      </div>

      {/* INSIGHTS */}
      <div className="bg-yellow-100 p-4 mt-6 rounded-lg">
        <h3 className="font-bold text-lg">Today's Health Suggestions</h3>
        {insights.length === 0 ? (
          <p>You are doing great today! 🎉</p>
        ) : (
          insights.map((i, idx) => <p key={idx}>• {i}</p>)
        )}
      </div>

      {/* WEEKLY CHART */}
      <div className="bg-white shadow p-6 mt-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Weekly Health Progress</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="steps"
              stroke="#4f46e5"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="water"
              stroke="#10b981"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="sleep"
              stroke="#facc15"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PatientDashboard;
